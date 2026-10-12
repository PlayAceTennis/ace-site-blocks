import { z } from "zod";
import { assetUrl, label, safeHref } from "../common";
import { RICH_TEXT_MAX } from "./rich_text";
import type { BlockMeta } from "./meta";

// NOTE: `html` is untrusted and must be sanitized by consumers. Items cannot nest other blocks.
export const ColumnItemSchema = z.object({
  heading: z.string().trim().max(120).optional(),
  html: z.string().max(RICH_TEXT_MAX / 5),
  imageUrl: assetUrl.optional(),
  imageAlt: z.string().trim().max(200).optional(),
  button: z.object({ label, href: safeHref }).optional(),
});
export type ColumnItem = z.infer<typeof ColumnItemSchema>;

/** 2 or 3 columns; the number of items is the number of columns. */
export const ColumnsPropsSchema = z.object({
  items: z.array(ColumnItemSchema).min(2).max(3),
});
export type ColumnsProps = z.infer<typeof ColumnsPropsSchema>;

export const defaultColumnsProps = (): ColumnsProps => ({
  items: [
    { heading: "Spalte 1", html: "<p>Text hier eingeben.</p>" },
    { heading: "Spalte 2", html: "<p>Text hier eingeben.</p>" },
  ],
});

export const columnsMeta: BlockMeta = {
  label: { de: "Spalten", en: "Columns" },
  description: { de: "Zwei oder drei Spalten mit Text, Bild und Button", en: "Two or three columns with text, image and button" },
  category: "content",
  icon: "Columns2",
};
