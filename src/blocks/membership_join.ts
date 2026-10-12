import { z } from "zod";
import { label, title } from "../common";
import type { BlockMeta } from "./meta";

export const MembershipJoinPropsSchema = z.object({
  title,
  text: z.string().trim().max(500).optional(),
  showFees: z.boolean(),
  buttonLabel: label,
});
export type MembershipJoinProps = z.infer<typeof MembershipJoinPropsSchema>;

export const defaultMembershipJoinProps = (): MembershipJoinProps => ({
  title: "Mitglied werden",
  text: "Werde Teil unseres Vereins.",
  showFees: true,
  buttonLabel: "Jetzt beitreten",
});

export const membershipJoinMeta: BlockMeta = {
  label: { de: "Mitglied werden", en: "Join the club" },
  description: { de: "Beitrittsbereich mit Beiträgen", en: "Membership section with fees" },
  category: "data",
  icon: "UserPlus",
};
