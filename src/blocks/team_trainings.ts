import { z } from "zod";
import { title, sparteId } from "../common";
import type { BlockMeta } from "./meta";

export const TeamTrainingsPropsSchema = z.object({
  title,
  sparteId,
  groupBy: z.enum(["team", "weekday"]),
});
export type TeamTrainingsProps = z.infer<typeof TeamTrainingsPropsSchema>;
export const defaultTeamTrainingsProps = (): TeamTrainingsProps => ({ title: "Trainingszeiten", sparteId: null, groupBy: "team" });
export const teamTrainingsMeta: BlockMeta = {
  label: { de: "Mannschaftstraining", en: "Team training" },
  description: { de: "Mannschaftstraining aus der Vereinsverwaltung", en: "Team training from club management" },
  category: "data",
  icon: "Users",
};
