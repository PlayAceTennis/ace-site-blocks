import { z } from "zod";
import { assetUrl } from "./common";

export const SECTION_BACKGROUNDS = ["none", "muted", "primary", "image"] as const;
export const SECTION_SPACINGS = ["none", "sm", "md", "lg"] as const;

/** Anchor ids must not clash with the page frame ("main") and stay valid as URL fragments. */
export const ANCHOR_ID_REGEX = /^[a-z][a-z0-9-]{0,39}$/;
export const RESERVED_ANCHOR_IDS = ["main"] as const;

/**
 * Optional wrapper around any block: background, extra vertical spacing and a link anchor.
 * No section = the block renders exactly as before.
 */
export const SectionSchema = z
  .object({
    background: z.enum(SECTION_BACKGROUNDS),
    spacing: z.enum(SECTION_SPACINGS),
    imageUrl: assetUrl.optional(),
    imageAlt: z.string().trim().max(200).optional(),
    anchorId: z
      .string()
      .regex(ANCHOR_ID_REGEX, "Invalid anchor")
      .refine((v) => !(RESERVED_ANCHOR_IDS as readonly string[]).includes(v), "Reserved anchor")
      .optional(),
  })
  .refine((s) => s.background !== "image" || Boolean(s.imageUrl), {
    message: "Background image required",
    path: ["imageUrl"],
  });
export type Section = z.infer<typeof SectionSchema>;

export const DEFAULT_SECTION: Section = { background: "none", spacing: "none" };

/** True when a section changes nothing and can be dropped from the block. */
export function isDefaultSection(section: Section | undefined): boolean {
  return !section || (section.background === "none" && section.spacing === "none" && !section.anchorId);
}
