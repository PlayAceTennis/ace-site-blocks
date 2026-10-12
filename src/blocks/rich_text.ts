import { z } from "zod";
import type { BlockMeta } from "./meta";

export const RICH_TEXT_MAX = 50_000;

// NOTE: `html` is untrusted. Consumers (editor on save, renderer on output) MUST sanitize it.
export const RichTextPropsSchema = z.object({
  html: z.string().max(RICH_TEXT_MAX),
});
export type RichTextProps = z.infer<typeof RichTextPropsSchema>;

export const defaultRichTextProps = (): RichTextProps => ({ html: "<p>Text hier eingeben.</p>" });

export const richTextMeta: BlockMeta = {
  label: { de: "Text", en: "Text" },
  description: { de: "Formatierter Text", en: "Formatted text" },
  category: "content",
  icon: "Type",
};
