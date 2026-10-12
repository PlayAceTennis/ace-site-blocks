import { z } from "zod";
import { sparteId, title } from "../common";
import type { BlockMeta } from "./meta";

export const TeamsNuligaPropsSchema = z.object({
  title,
  sparteId,
  show: z.enum(["standings", "fixtures", "both"]),
});
export type TeamsNuligaProps = z.infer<typeof TeamsNuligaPropsSchema>;

export const defaultTeamsNuligaProps = (): TeamsNuligaProps => ({
  title: "Mannschaften",
  sparteId: null,
  show: "both",
});

export const teamsNuligaMeta: BlockMeta = {
  label: { de: "Mannschaften (nuLiga)", en: "Teams (nuLiga)" },
  description: { de: "Tabellen und Spielpläne aus nuLiga", en: "Standings and fixtures from nuLiga" },
  category: "data",
  icon: "Trophy",
};
