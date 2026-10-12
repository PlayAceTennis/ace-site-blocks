import type { Legal } from "./legal";

export interface ImpressumClubData {
  name?: string | null;
  address?: string | null;
  postalCode?: string | null;
  city?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface ImpressumCheckResult {
  /** True when no mandatory field is missing (warnings do not affect this). */
  ok: boolean;
  missing: string[];
  warnings: string[];
}

const blank = (v: string | null | undefined) => !v || v.trim() === "";

/**
 * Checks Impressum completeness per § 5 DDG (Digitale-Dienste-Gesetz, successor of § 5 TMG):
 * provider name, full postal address, electronic contact (email or phone),
 * authorised representatives for associations, and the register entry where
 * registered (e.V.: Vereinsregister). Register data is warn-only because a club
 * may be unregistered.
 */
export function checkImpressum(legal: Legal, club: ImpressumClubData): ImpressumCheckResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (blank(club.name)) missing.push("name");
  if (blank(club.address)) missing.push("address");
  if (blank(club.postalCode)) missing.push("postalCode");
  if (blank(club.city)) missing.push("city");
  if (blank(club.email) && blank(club.phone)) missing.push("email_or_phone");
  if (!legal.representatives.some((r) => r.name.trim() !== "")) missing.push("representatives");

  if (blank(legal.registerCourt)) warnings.push("registerCourt");
  if (blank(legal.registerNumber)) warnings.push("registerNumber");

  return { ok: missing.length === 0, missing, warnings };
}
