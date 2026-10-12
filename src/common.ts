import { z } from "zod";

export const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const hexColor = z.string().regex(HEX_COLOR_REGEX, "Invalid hex color");

// eslint-disable-next-line no-control-regex
const CONTROL_OR_SPACE = /[\u0000- \u007f]/;

function isHttps(v: string): boolean {
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
}

/** Only https:// URLs. */
export const httpsUrl = z
  .string()
  .max(2048)
  .refine((v) => !CONTROL_OR_SPACE.test(v) && isHttps(v), "Must be an https URL");

/** Relative path ("/foo", not protocol-relative "//host") or https URL. No javascript:, data:, etc. */
export const safeHref = z
  .string()
  .min(1)
  .max(2048)
  .refine((v) => {
    if (CONTROL_OR_SPACE.test(v)) return false;
    if (v.startsWith("/")) return !v.startsWith("//") && !v.includes("\\");
    return isHttps(v);
  }, "Must be a relative path or https URL");

/** Image/asset URL: https URL or site-relative path ("/x", not "//host", no backslash). */
export const assetUrl = z
  .string()
  .min(1)
  .max(2048)
  .refine((v) => {
    if (CONTROL_OR_SPACE.test(v)) return false;
    if (v.startsWith("/")) return !v.startsWith("//") && !v.includes("\\");
    return isHttps(v);
  }, "Must be an https URL or a site-relative path");

export const title = z.string().trim().max(120);
export const label = z.string().trim().min(1).max(60);

/** club_sparten.id is a uuid. */
export const sparteId = z.string().uuid().nullable();

export const limit = z.number().int().min(1).max(24);
