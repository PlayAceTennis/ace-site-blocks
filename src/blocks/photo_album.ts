import { z } from "zod";
import type { BlockMeta } from "./meta";

export const PhotoAlbumPropsSchema = z.object({
  albumId: z.uuid(),
  layout: z.enum(["grid", "masonry", "carousel"]),
  columns: z.number().int().min(2).max(4),
  limit: z.number().int().min(1).max(60),
  showCaptions: z.boolean(),
  lightbox: z.boolean(),
});
export type PhotoAlbumProps = z.infer<typeof PhotoAlbumPropsSchema>;
export const defaultPhotoAlbumProps = (): PhotoAlbumProps => ({ albumId: "00000000-0000-0000-0000-000000000000", layout: "grid", columns: 3, limit: 60, showCaptions: true, lightbox: true });
export const photoAlbumMeta: BlockMeta = {
  label: { de: "Fotoalbum", en: "Photo album" },
  description: { de: "Fotoalbum aus der Vereinsverwaltung", en: "Photo album from club management" },
  category: "data",
  icon: "Images",
};
