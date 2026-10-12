import { z } from "zod";
import { title } from "../common";
import type { BlockMeta } from "./meta";

export const SPONSOR_TIERS = ["main", "premium", "partner", "supporter"] as const;
export type SponsorTier = (typeof SPONSOR_TIERS)[number];

export const SponsorsPropsSchema = z.object({
  title,
  /** Empty = all tiers. */
  tiers: z.array(z.enum(SPONSOR_TIERS)).max(SPONSOR_TIERS.length),
  layout: z.enum(["grid", "strip"]),
  grayscale: z.boolean(),
  showTierHeadings: z.boolean(),
});
export type SponsorsProps = z.infer<typeof SponsorsPropsSchema>;

export const defaultSponsorsProps = (): SponsorsProps => ({
  title: "Unsere Sponsoren",
  tiers: [],
  layout: "grid",
  grayscale: false,
  showTierHeadings: true,
});

export const sponsorsMeta: BlockMeta = {
  label: { de: "Sponsoren", en: "Sponsors" },
  description: { de: "Logos eurer Sponsoren und Partner", en: "Logos of your sponsors and partners" },
  category: "data",
  icon: "Handshake",
};
