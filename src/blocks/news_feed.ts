import { z } from "zod";
import { limit, sparteId, title } from "../common";
import type { BlockMeta } from "./meta";

export const NewsFeedPropsSchema = z.object({
  title,
  limit,
  sparteId,
  layout: z.enum(["grid", "list"]),
});
export type NewsFeedProps = z.infer<typeof NewsFeedPropsSchema>;

export const defaultNewsFeedProps = (): NewsFeedProps => ({
  title: "Neuigkeiten",
  limit: 6,
  sparteId: null,
  layout: "grid",
});

export const newsFeedMeta: BlockMeta = {
  label: { de: "Neuigkeiten", en: "News" },
  description: { de: "Aktuelle Beiträge des Vereins", en: "Latest club posts" },
  category: "data",
  icon: "Newspaper",
};
