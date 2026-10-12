import { z } from "zod";
import { title } from "../common";
import { RICH_TEXT_MAX } from "./rich_text";
import type { BlockMeta } from "./meta";

// NOTE: `extraHtml` is untrusted and must be sanitized by consumers.
export const LegalPrivacyPropsSchema = z.object({
  title,
  extraHtml: z.string().max(RICH_TEXT_MAX).optional(),
});
export type LegalPrivacyProps = z.infer<typeof LegalPrivacyPropsSchema>;

export const defaultLegalPrivacyProps = (): LegalPrivacyProps => ({ title: "Datenschutzerklärung" });

export const legalPrivacyMeta: BlockMeta = {
  label: { de: "Datenschutz", en: "Privacy policy" },
  description: { de: "Standard-Datenschutzerklärung mit Zusatztext", en: "Standard privacy policy with extra text" },
  category: "legal",
  icon: "ShieldCheck",
};
