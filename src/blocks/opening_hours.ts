import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const OpeningHoursPropsSchema = z.object({
  title,
  showSpecial: z.boolean(),
});
export type OpeningHoursProps = z.infer<typeof OpeningHoursPropsSchema>;

export const defaultOpeningHoursProps = (): OpeningHoursProps => ({
  title: "Öffnungszeiten",
  showSpecial: true,
});

export const openingHoursMeta: BlockMeta = {
  label: { de: "Öffnungszeiten", en: "Opening hours" },
  description: { de: "Regel- und Sonderöffnungszeiten", en: "Regular and special opening hours" },
  category: "data",
  icon: "Clock",
};
