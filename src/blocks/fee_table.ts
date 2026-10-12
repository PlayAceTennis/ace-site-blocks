import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const FeeTablePropsSchema = z.object({
  title,
  showJoiningFees: z.boolean(),
  groupBy: z.enum(["membershipType", "none"]),
});
export type FeeTableProps = z.infer<typeof FeeTablePropsSchema>;

export const defaultFeeTableProps = (): FeeTableProps => ({
  title: "Beiträge",
  showJoiningFees: true,
  groupBy: "membershipType",
});

export const feeTableMeta: BlockMeta = {
  label: { de: "Beitragstabelle", en: "Fee table" },
  description: { de: "Mitgliedsbeiträge aus der Beitragsverwaltung", en: "Membership fees from the fee management" },
  category: "data",
  icon: "Euro",
};
