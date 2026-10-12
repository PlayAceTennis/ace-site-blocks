import { z } from "zod";
import { assetUrl, hexColor } from "./common";

export const FONT_PAIRS = ["modern", "classic", "friendly", "sporty", "elegant", "rounded"] as const;
export const RADII = ["none", "sm", "md", "lg"] as const;
export const THEME_MODES = ["light", "dark"] as const;

export const ThemeSchema = z.object({
  primaryColor: hexColor,
  accentColor: hexColor.optional(),
  fontPair: z.enum(FONT_PAIRS),
  radius: z.enum(RADII),
  mode: z.enum(THEME_MODES),
  /** Header logo; falls back to the club logo. */
  logoUrl: assetUrl.optional(),
  faviconUrl: assetUrl.optional(),
});
export type Theme = z.infer<typeof ThemeSchema>;

export const DEFAULT_THEME: Theme = {
  primaryColor: "#1f7a4d",
  fontPair: "modern",
  radius: "md",
  mode: "light",
};

/**
 * Renderer-side parse: a value this package version does not know (e.g. a font pair added
 * later) falls back to the default instead of failing the whole site bundle.
 */
export const LenientThemeSchema = z
  .object({
    primaryColor: hexColor.catch(DEFAULT_THEME.primaryColor),
    accentColor: hexColor.optional().catch(undefined),
    fontPair: z.enum(FONT_PAIRS).catch(DEFAULT_THEME.fontPair),
    radius: z.enum(RADII).catch(DEFAULT_THEME.radius),
    mode: z.enum(THEME_MODES).catch(DEFAULT_THEME.mode),
    logoUrl: assetUrl.optional().catch(undefined),
    faviconUrl: assetUrl.optional().catch(undefined),
  })
  .catch(DEFAULT_THEME);
