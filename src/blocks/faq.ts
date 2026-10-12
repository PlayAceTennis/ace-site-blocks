import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const MAX_FAQ_ITEMS = 30;

// NOTE: `answerHtml` is untrusted and must be sanitized by consumers.
export const FaqItemSchema = z.object({
  question: z.string().trim().min(1).max(200),
  answerHtml: z.string().max(4000),
});
export type FaqItem = z.infer<typeof FaqItemSchema>;

export const FaqPropsSchema = z.object({
  title,
  items: z.array(FaqItemSchema).min(1).max(MAX_FAQ_ITEMS),
  /** Adds schema.org FAQPage markup (search engines may show the answers). */
  emitSchemaOrg: z.boolean(),
});
export type FaqProps = z.infer<typeof FaqPropsSchema>;

export const defaultFaqProps = (): FaqProps => ({
  title: "Häufige Fragen",
  items: [
    { question: "Wie werde ich Mitglied?", answerHtml: "<p>Über unser Beitrittsformular oder direkt bei uns im Verein.</p>" },
    { question: "Kann ich zum Probetraining kommen?", answerHtml: "<p>Ja, melde dich gern bei uns.</p>" },
  ],
  emitSchemaOrg: true,
});

export const faqMeta: BlockMeta = {
  label: { de: "FAQ", en: "FAQ" },
  description: { de: "Häufige Fragen zum Aufklappen", en: "Expandable frequently asked questions" },
  category: "content",
  icon: "CircleHelp",
};
