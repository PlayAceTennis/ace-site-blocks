import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const LegalImpressumPropsSchema = z.object({ title });
export type LegalImpressumProps = z.infer<typeof LegalImpressumPropsSchema>;

export const defaultLegalImpressumProps = (): LegalImpressumProps => ({ title: "Impressum" });

export const legalImpressumMeta: BlockMeta = {
  label: { de: "Impressum", en: "Imprint" },
  description: { de: "Automatisch aus Vereinsdaten erzeugt", en: "Generated from club data" },
  category: "legal",
  icon: "Scale",
};
