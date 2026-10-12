import { z } from "zod";
import { hexColor } from "./common";

export const FONT_PAIRS = ["modern", "classic", "friendly"] as const;
export const RADII = ["none", "sm", "md", "lg"] as const;
export const THEME_MODES = ["light", "dark"] as const;

export const ThemeSchema = z.object({
  primaryColor: hexColor,
  accentColor: hexColor.optional(),
  fontPair: z.enum(FONT_PAIRS),
  radius: z.enum(RADII),
  mode: z.enum(THEME_MODES),
});
export type Theme = z.infer<typeof ThemeSchema>;

export const DEFAULT_THEME: Theme = {
  primaryColor: "#1f7a4d",
  fontPair: "modern",
  radius: "md",
  mode: "light",
};
