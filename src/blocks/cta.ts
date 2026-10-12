import { z } from "zod";
import { label, safeHref, title } from "../common";
import type { BlockMeta } from "./meta";

export const CtaPropsSchema = z.object({
  title,
  text: z.string().trim().max(500).optional(),
  button: z.object({ label, href: safeHref }),
  variant: z.enum(["primary", "secondary", "outline"]),
});
export type CtaProps = z.infer<typeof CtaPropsSchema>;

export const defaultCtaProps = (): CtaProps => ({
  title: "Jetzt mitmachen",
  text: "Werde Teil unseres Vereins.",
  button: { label: "Mehr erfahren", href: "/" },
  variant: "primary",
});

export const ctaMeta: BlockMeta = {
  label: { de: "Call-to-Action", en: "Call to action" },
  description: { de: "Hervorgehobener Aufruf mit Button", en: "Highlighted call with a button" },
  category: "content",
  icon: "MousePointerClick",
};
