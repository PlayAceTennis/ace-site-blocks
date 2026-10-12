import { z } from "zod";
import { assetUrl, label, safeHref, title } from "../common";
import type { BlockMeta } from "./meta";

export const HeroPropsSchema = z.object({
  title,
  subtitle: z.string().trim().max(300).optional(),
  imageUrl: assetUrl.optional(),
  ctas: z.array(z.object({ label, href: safeHref })).max(2),
  layout: z.enum(["center", "left"]),
  overlay: z.boolean(),
});
export type HeroProps = z.infer<typeof HeroPropsSchema>;

export const defaultHeroProps = (): HeroProps => ({
  title: "Willkommen in unserem Verein",
  subtitle: "Tennis und Padel für alle",
  ctas: [],
  layout: "center",
  overlay: true,
});

export const heroMeta: BlockMeta = {
  label: { de: "Hero", en: "Hero" },
  description: { de: "Großer Einstieg mit Titel, Bild und Buttons", en: "Large intro with title, image and buttons" },
  category: "content",
  icon: "Image",
};
