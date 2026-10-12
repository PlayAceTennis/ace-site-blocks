import { z } from "zod";
import { label, safeHref } from "./common";

export const MAX_NAV_ITEMS = 8;

export const NavItemSchema = z.object({
  label,
  href: safeHref,
  external: z.boolean().optional(),
});
export type NavItem = z.infer<typeof NavItemSchema>;

export const NavSchema = z.object({
  items: z.array(NavItemSchema).max(MAX_NAV_ITEMS),
});
export type Nav = z.infer<typeof NavSchema>;

export const DEFAULT_NAV: Nav = { items: [] };

/** Renderer-side parse: drops items this package version cannot read instead of failing the bundle. */
export const LenientNavSchema = z
  .object({
    items: z.array(z.unknown()).transform((items) =>
      items.flatMap((item) => {
        const parsed = NavItemSchema.safeParse(item);
        return parsed.success ? [parsed.data] : [];
      }).slice(0, MAX_NAV_ITEMS),
    ),
  })
  .catch(DEFAULT_NAV);
