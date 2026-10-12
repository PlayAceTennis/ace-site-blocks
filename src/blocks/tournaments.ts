import { z } from "zod";
import { title, limit } from "../common";
import type { BlockMeta } from "./meta";

export const TournamentsPropsSchema = z.object({
  title,
  limit,
  showCompleted: z.boolean(),
});
export type TournamentsProps = z.infer<typeof TournamentsPropsSchema>;
export const defaultTournamentsProps = (): TournamentsProps => ({ title: "Turniere", limit: 12, showCompleted: false });
export const tournamentsMeta: BlockMeta = {
  label: { de: "Turniere", en: "Tournaments" },
  description: { de: "Turniere aus der Vereinsverwaltung", en: "Tournaments from club management" },
  category: "data",
  icon: "Trophy",
};
