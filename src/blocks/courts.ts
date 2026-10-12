import { z } from "zod";
import { title, label } from "../common";
import type { BlockMeta } from "./meta";

export const CourtsPropsSchema = z.object({
  title,
  groupBy: z.enum(["type", "none"]),
  showSurface: z.boolean(),
  showFeatures: z.boolean(),
  showBookingLink: z.boolean(),
  bookingLabel: label,
});
export type CourtsProps = z.infer<typeof CourtsPropsSchema>;
export const defaultCourtsProps = (): CourtsProps => ({ title: "Unsere Plätze", groupBy: "type", showSurface: true, showFeatures: true, showBookingLink: true, bookingLabel: "Platz buchen" });
export const courtsMeta: BlockMeta = {
  label: { de: "Plätze", en: "Courts" },
  description: { de: "Plätze aus der Vereinsverwaltung", en: "Courts from club management" },
  category: "data",
  icon: "MapPin",
};
