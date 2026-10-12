import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const TrainersPropsSchema = z.object({
  title,
  showBio: z.boolean(),
  showLanguages: z.boolean(),
});
export type TrainersProps = z.infer<typeof TrainersPropsSchema>;
export const defaultTrainersProps = (): TrainersProps => ({ title: "Unser Trainerteam", showBio: true, showLanguages: true });
export const trainersMeta: BlockMeta = {
  label: { de: "Trainer", en: "Trainers" },
  description: { de: "Trainer aus der Vereinsverwaltung", en: "Trainers from club management" },
  category: "data",
  icon: "Users",
};
