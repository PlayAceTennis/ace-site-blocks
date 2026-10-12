import { z } from "zod";
import { limit, sparteId, title } from "../common";
import type { BlockMeta } from "./meta";

export const EventsListPropsSchema = z.object({
  title,
  limit,
  sparteId,
  // The site_events RPC only returns upcoming events, so past events are not supported yet.
  showPast: z.literal(false),
});
export type EventsListProps = z.infer<typeof EventsListPropsSchema>;

export const defaultEventsListProps = (): EventsListProps => ({
  title: "Veranstaltungen",
  limit: 6,
  sparteId: null,
  showPast: false,
});

export const eventsListMeta: BlockMeta = {
  label: { de: "Veranstaltungen", en: "Events" },
  description: { de: "Kommende Termine", en: "Upcoming events" },
  category: "data",
  icon: "CalendarDays",
};
