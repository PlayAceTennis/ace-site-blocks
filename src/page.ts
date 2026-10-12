import { z } from "zod";
import { assetUrl } from "./common";

export const PAGE_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RESERVED_SLUGS = ["api", "s", "preview", "_preview", "_next", "sitemap.xml", "robots.txt", "favicon.ico"] as const;

export function isReservedSlug(slug: string): boolean {
  return (RESERVED_SLUGS as readonly string[]).includes(slug);
}

export const PageSlugSchema = z
  .string()
  .max(64)
  .regex(PAGE_SLUG_REGEX, "Invalid slug")
  .refine((s) => !isReservedSlug(s), "Reserved slug");

export const PageSeoSchema = z.object({
  title: z.string().trim().max(70).optional(),
  description: z.string().trim().max(160).optional(),
  ogImageUrl: assetUrl.optional(),
  noindex: z.boolean().optional(),
});
export type PageSeo = z.infer<typeof PageSeoSchema>;
