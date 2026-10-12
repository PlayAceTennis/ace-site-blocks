import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const MAX_STATS = 6;

export const StatItemSchema = z.object({
  value: z.string().trim().min(1).max(12),
  label: z.string().trim().min(1).max(60),
  suffix: z.string().trim().max(8).optional(),
});
export type StatItem = z.infer<typeof StatItemSchema>;

export const StatsPropsSchema = z.object({
  title,
  items: z.array(StatItemSchema).min(1).max(MAX_STATS),
});
export type StatsProps = z.infer<typeof StatsPropsSchema>;

export const defaultStatsProps = (): StatsProps => ({
  title: "",
  items: [
    { value: "250", label: "Mitglieder" },
    { value: "8", label: "Plätze" },
    { value: "1975", label: "Gegründet" },
  ],
});

export const statsMeta: BlockMeta = {
  label: { de: "Zahlen", en: "Key figures" },
  description: { de: "Große Kennzahlen, z. B. Mitglieder oder Plätze", en: "Big figures such as members or courts" },
  category: "content",
  icon: "ChartColumn",
};
