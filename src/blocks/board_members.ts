import { z } from "zod";
import { sparteId, title } from "../common";
import type { BlockMeta } from "./meta";

export const BoardMembersPropsSchema = z.object({
  title,
  /** null = whole club (plus club-wide board members when a Sparte is chosen). */
  sparteId,
  /** Contact details are only ever shown for board members who allowed it (publish_email / publish_phone). */
  showContact: z.boolean(),
  layout: z.enum(["grid", "list"]),
});
export type BoardMembersProps = z.infer<typeof BoardMembersPropsSchema>;

export const defaultBoardMembersProps = (): BoardMembersProps => ({
  title: "Vorstand",
  sparteId: null,
  showContact: false,
  layout: "grid",
});

export const boardMembersMeta: BlockMeta = {
  label: { de: "Vorstand", en: "Board" },
  description: { de: "Vorstandsmitglieder aus der Mitgliederverwaltung", en: "Board members from the member management" },
  category: "data",
  icon: "Users",
};
