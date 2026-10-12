import { z } from "zod";
import { title, limit } from "../common";
import type { BlockMeta } from "./meta";

export const CoursesPropsSchema = z.object({
  title,
  limit,
  showPrice: z.boolean(),
});
export type CoursesProps = z.infer<typeof CoursesPropsSchema>;
export const defaultCoursesProps = (): CoursesProps => ({ title: "Kurse", limit: 12, showPrice: true });
export const coursesMeta: BlockMeta = {
  label: { de: "Kurse", en: "Courses" },
  description: { de: "Kurse aus der Vereinsverwaltung", en: "Courses from club management" },
  category: "data",
  icon: "CalendarDays",
};
