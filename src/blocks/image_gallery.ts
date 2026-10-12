import { z } from "zod";
import { assetUrl, title } from "../common";
import type { BlockMeta } from "./meta";

export const MAX_GALLERY_IMAGES = 40;

export const GalleryImageSchema = z.object({
  url: assetUrl,
  /** Empty = decorative image. */
  alt: z.string().trim().max(200),
  caption: z.string().trim().max(200).optional(),
});
export type GalleryImage = z.infer<typeof GalleryImageSchema>;

export const ImageGalleryPropsSchema = z.object({
  title,
  images: z.array(GalleryImageSchema).min(1).max(MAX_GALLERY_IMAGES),
  layout: z.enum(["grid", "masonry", "carousel"]),
  columns: z.number().int().min(2).max(4),
  lightbox: z.boolean(),
});
export type ImageGalleryProps = z.infer<typeof ImageGalleryPropsSchema>;

export const defaultImageGalleryProps = (): ImageGalleryProps => ({
  title: "Galerie",
  images: [{ url: "/placeholder.svg", alt: "Platzhalterbild" }],
  layout: "grid",
  columns: 3,
  lightbox: true,
});

export const imageGalleryMeta: BlockMeta = {
  label: { de: "Bildergalerie", en: "Image gallery" },
  description: { de: "Mehrere Bilder als Raster, Mauerwerk oder Karussell", en: "Several images as grid, masonry or carousel" },
  category: "content",
  icon: "Images",
};
