import { z } from "zod";
import { assetUrl, title } from "../common";
import { RICH_TEXT_MAX } from "./rich_text";
import type { BlockMeta } from "./meta";

// NOTE: `html` is untrusted and must be sanitized by consumers.
export const ImageTextPropsSchema = z.object({
  imageUrl: assetUrl,
  imageAlt: z.string().trim().min(1).max(200),
  html: z.string().max(RICH_TEXT_MAX),
  imagePosition: z.enum(["left", "right"]),
  title: title.optional(),
});
export type ImageTextProps = z.infer<typeof ImageTextPropsSchema>;

export const defaultImageTextProps = (): ImageTextProps => ({
  imageUrl: "/placeholder.svg",
  imageAlt: "Platzhalterbild",
  html: "<p>Text hier eingeben.</p>",
  imagePosition: "left",
});

export const imageTextMeta: BlockMeta = {
  label: { de: "Bild und Text", en: "Image and text" },
  description: { de: "Bild neben Text", en: "Image next to text" },
  category: "content",
  icon: "PanelLeft",
};
