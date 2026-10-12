import { describe, expect, test } from "bun:test";
import { BLOCK_REGISTRY, BLOCK_TYPES, SUPPORTED_BLOCK_TYPES, createBlock, parseBlocks } from "../block";
import { LenientThemeSchema, DEFAULT_THEME } from "../theme";
import { LenientNavSchema } from "../nav";
import { DEFAULT_SECTION, SectionSchema, isDefaultSection } from "../section";
import { ThemeSchema } from "../theme";
import { parseVideoUrl, videoEmbedUrl } from "../video";
import { ColumnsPropsSchema } from "../blocks/columns";
import { FaqPropsSchema } from "../blocks/faq";
import { ImageGalleryPropsSchema } from "../blocks/image_gallery";
import { SponsorsPropsSchema } from "../blocks/sponsors";
import { VideoEmbedPropsSchema } from "../blocks/video_embed";

describe("blocks", () => {
  test("default props of every block type parse", () => {
    for (const type of BLOCK_TYPES) {
      expect(parseBlocks([createBlock(type)]).success).toBe(true);
      expect(BLOCK_REGISTRY[type].schema.safeParse(BLOCK_REGISTRY[type].defaults()).success).toBe(true);
    }
  });

  test("javascript: href is rejected", () => {
    const block = createBlock("cta");
    block.props.button.href = "javascript:alert(1)";
    expect(parseBlocks([block]).success).toBe(false);
  });

  test("unknown block type is rejected", () => {
    expect(parseBlocks([{ id: "a", type: "nope", props: {} }]).success).toBe(false);
  });
});

describe("hero", () => {
  test("optional imageAlt is accepted and limited", () => {
    const block = createBlock("hero");
    block.props.imageAlt = "Centre Court";
    expect(parseBlocks([block]).success).toBe(true);
    block.props.imageAlt = "x".repeat(201);
    expect(parseBlocks([block]).success).toBe(false);
  });
});

describe("lenient parsing", () => {
  test("unknown theme values fall back to defaults", () => {
    const theme = LenientThemeSchema.parse({ primaryColor: "#123456", fontPair: "from-the-future", radius: "xl", mode: "light" });
    expect(theme.primaryColor).toBe("#123456");
    expect(theme.fontPair).toBe(DEFAULT_THEME.fontPair);
    expect(theme.radius).toBe(DEFAULT_THEME.radius);
  });

  test("non-object theme becomes the default theme", () => {
    expect(LenientThemeSchema.parse(null)).toEqual(DEFAULT_THEME);
  });

  test("nav drops unreadable items and keeps valid ones", () => {
    const nav = LenientNavSchema.parse({ items: [{ label: "Start", href: "/" }, { label: "Bad", href: "javascript:x" }, 42] });
    expect(nav.items).toEqual([{ label: "Start", href: "/" }]);
  });

  test("every supported block type is registered", () => {
    expect([...SUPPORTED_BLOCK_TYPES].sort()).toEqual([...BLOCK_TYPES].sort());
  });
});

describe("section", () => {
  test("a block without section still parses", () => {
    expect(parseBlocks([createBlock("cta")]).success).toBe(true);
  });

  test("a block with a valid section parses and keeps it", () => {
    const block = { ...createBlock("cta"), section: { background: "muted", spacing: "md", anchorId: "kontakt" } as const };
    const parsed = parseBlocks([block]);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data[0]?.section).toEqual(block.section);
  });

  test("image background needs an image", () => {
    expect(SectionSchema.safeParse({ background: "image", spacing: "md" }).success).toBe(false);
    expect(SectionSchema.safeParse({ background: "image", spacing: "md", imageUrl: "https://x.test/a.webp" }).success).toBe(true);
  });

  test("anchor ids are restricted", () => {
    for (const anchorId of ["main", "1abc", "has space", "UPPER", "x".repeat(41)]) {
      expect(SectionSchema.safeParse({ ...DEFAULT_SECTION, anchorId }).success).toBe(false);
    }
    expect(SectionSchema.safeParse({ ...DEFAULT_SECTION, anchorId: "mitglied-werden" }).success).toBe(true);
  });

  test("javascript: image url is rejected", () => {
    expect(SectionSchema.safeParse({ background: "image", spacing: "none", imageUrl: "javascript:alert(1)" }).success).toBe(false);
  });

  test("isDefaultSection", () => {
    expect(isDefaultSection(undefined)).toBe(true);
    expect(isDefaultSection(DEFAULT_SECTION)).toBe(true);
    expect(isDefaultSection({ ...DEFAULT_SECTION, spacing: "lg" })).toBe(false);
    expect(isDefaultSection({ ...DEFAULT_SECTION, anchorId: "a" })).toBe(false);
  });
});

describe("theme", () => {
  test("new font pairs and logo/favicon are valid", () => {
    const base = { primaryColor: "#112233", radius: "md", mode: "light" } as const;
    for (const fontPair of ["sporty", "elegant", "rounded"] as const) {
      expect(ThemeSchema.safeParse({ ...base, fontPair }).success).toBe(true);
    }
    const withAssets = { ...base, fontPair: "modern", logoUrl: "https://x.test/l.webp", faviconUrl: "https://x.test/f.webp" };
    expect(ThemeSchema.safeParse(withAssets).success).toBe(true);
    expect(ThemeSchema.safeParse({ ...withAssets, logoUrl: "javascript:x" }).success).toBe(false);
  });

  test("lenient theme drops a bad logo instead of failing", () => {
    const theme = LenientThemeSchema.parse({ primaryColor: "#112233", fontPair: "modern", radius: "md", mode: "light", logoUrl: "javascript:x" });
    expect(theme.logoUrl).toBeUndefined();
    expect(theme.primaryColor).toBe("#112233");
  });
});

describe("P3 blocks", () => {
  test("registered block types include the new ones", () => {
    for (const type of ["sponsors", "faq", "image_gallery", "stats", "testimonials", "video_embed", "spacer", "columns"] as const) {
      expect(BLOCK_TYPES).toContain(type);
    }
  });

  test("video_embed validates the id per provider", () => {
    const base = { title: "Clubfilm", aspect: "16:9" as const };
    expect(VideoEmbedPropsSchema.safeParse({ ...base, provider: "youtube", videoId: "dQw4w9WgXcQ" }).success).toBe(true);
    expect(VideoEmbedPropsSchema.safeParse({ ...base, provider: "youtube", videoId: "short" }).success).toBe(false);
    expect(VideoEmbedPropsSchema.safeParse({ ...base, provider: "youtube", videoId: "dQw4w9WgXc?" }).success).toBe(false);
    expect(VideoEmbedPropsSchema.safeParse({ ...base, provider: "vimeo", videoId: "123456789" }).success).toBe(true);
    expect(VideoEmbedPropsSchema.safeParse({ ...base, provider: "vimeo", videoId: "dQw4w9WgXcQ" }).success).toBe(false);
  });

  test("video_embed rejects a javascript: poster", () => {
    const props = { provider: "youtube", videoId: "dQw4w9WgXcQ", title: "t", aspect: "16:9", posterUrl: "javascript:x" };
    expect(VideoEmbedPropsSchema.safeParse(props).success).toBe(false);
  });

  test("columns need 2 or 3 items", () => {
    const item = { html: "<p>x</p>" };
    expect(ColumnsPropsSchema.safeParse({ items: [item] }).success).toBe(false);
    expect(ColumnsPropsSchema.safeParse({ items: [item, item] }).success).toBe(true);
    expect(ColumnsPropsSchema.safeParse({ items: [item, item, item, item] }).success).toBe(false);
  });

  test("faq and gallery need at least one item and respect their maximum", () => {
    expect(FaqPropsSchema.safeParse({ title: "", items: [], emitSchemaOrg: false }).success).toBe(false);
    const many = Array.from({ length: 31 }, () => ({ question: "q", answerHtml: "a" }));
    expect(FaqPropsSchema.safeParse({ title: "", items: many, emitSchemaOrg: false }).success).toBe(false);
    const image = { url: "https://x.test/a.webp", alt: "" };
    expect(ImageGalleryPropsSchema.safeParse({ title: "", images: [], layout: "grid", columns: 3, lightbox: true }).success).toBe(false);
    expect(ImageGalleryPropsSchema.safeParse({ title: "", images: [image], layout: "grid", columns: 5, lightbox: true }).success).toBe(false);
    expect(ImageGalleryPropsSchema.safeParse({ title: "", images: [image], layout: "masonry", columns: 4, lightbox: false }).success).toBe(true);
  });

  test("sponsors tiers must be known", () => {
    const base = { title: "", layout: "grid", grayscale: false, showTierHeadings: true };
    expect(SponsorsPropsSchema.safeParse({ ...base, tiers: ["main", "partner"] }).success).toBe(true);
    expect(SponsorsPropsSchema.safeParse({ ...base, tiers: ["gold"] }).success).toBe(false);
  });
});

describe("parseVideoUrl", () => {
  test.each<[string, "youtube" | "vimeo", string]>([
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "youtube", "dQw4w9WgXcQ"],
    ["https://youtu.be/dQw4w9WgXcQ?t=10", "youtube", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/embed/dQw4w9WgXcQ", "youtube", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", "youtube", "dQw4w9WgXcQ"],
    ["https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", "youtube", "dQw4w9WgXcQ"],
    ["youtube.com/watch?v=dQw4w9WgXcQ&list=x", "youtube", "dQw4w9WgXcQ"],
    ["https://vimeo.com/123456789", "vimeo", "123456789"],
    ["https://player.vimeo.com/video/123456789?h=abc", "vimeo", "123456789"],
  ])("%s", (input, provider, videoId) => {
    expect(parseVideoUrl(input)).toEqual({ provider, videoId });
  });

  test.each([
    "",
    "not a url",
    "https://evil.test/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com.evil.test/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=tooshort",
    "javascript:alert(1)",
    "https://vimeo.com/channels/staffpicks",
  ])("rejects %s", (input) => {
    expect(parseVideoUrl(input)).toBeNull();
  });

  test("embed urls only use the privacy hosts", () => {
    expect(videoEmbedUrl("youtube", "dQw4w9WgXcQ")).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/dQw4w9WgXcQ/);
    expect(videoEmbedUrl("vimeo", "123456789")).toMatch(/^https:\/\/player\.vimeo\.com\/video\/123456789\?.*dnt=1/);
  });
});
