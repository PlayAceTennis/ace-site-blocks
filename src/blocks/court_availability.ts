import { z } from "zod";
import { title, label } from "../common";
import type { BlockMeta } from "./meta";

export const CourtAvailabilityPropsSchema = z.object({
  title,
  days: z.number().int().min(1).max(7),
  courtIds: z.array(z.uuid()).max(20).optional(),
  showBookingLink: z.boolean(),
  bookingLabel: label,
});
export type CourtAvailabilityProps = z.infer<typeof CourtAvailabilityPropsSchema>;
export const defaultCourtAvailabilityProps = (): CourtAvailabilityProps => ({ title: "Platzbelegung", days: 7, showBookingLink: true, bookingLabel: "Platz buchen" });
export const courtAvailabilityMeta: BlockMeta = {
  label: { de: "Platzbelegung", en: "Court availability" },
  description: { de: "Platzbelegung aus der Vereinsverwaltung", en: "Court availability from club management" },
  category: "data",
  icon: "CalendarDays",
};
