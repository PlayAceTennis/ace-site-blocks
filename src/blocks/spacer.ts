import { z } from "zod";
import type { BlockMeta } from "./meta";

export const SpacerPropsSchema = z.object({
  size: z.enum(["sm", "md", "lg", "xl"]),
  divider: z.enum(["none", "line", "dots"]),
});
export type SpacerProps = z.infer<typeof SpacerPropsSchema>;

export const defaultSpacerProps = (): SpacerProps => ({ size: "md", divider: "none" });

export const spacerMeta: BlockMeta = {
  label: { de: "Abstand", en: "Spacer" },
  description: { de: "Leerraum oder Trennlinie zwischen Bausteinen", en: "Whitespace or divider between blocks" },
  category: "content",
  icon: "SeparatorHorizontal",
};
