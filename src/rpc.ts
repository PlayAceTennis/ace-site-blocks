import { z } from "zod";
import { ThemeSchema } from "./theme";
import { NavSchema } from "./nav";
import { LegalSchema } from "./legal";
import { PageSeoSchema } from "./page";

const looseRecords = z.array(z.record(z.string(), z.unknown()));
const idLike = z.union([z.string(), z.number()]);

export const SiteResolutionSchema = z.object({
  siteId: z.string(),
  clubId: z.number(),
  primaryHost: z.string().nullable(),
  isPrimary: z.boolean(),
});
export type SiteResolution = z.infer<typeof SiteResolutionSchema>;

export const SiteClubSchema = z.object({
  clubId: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  logoUrl: z.string().nullable(),
  bannerUrl: z.string().nullable(),
  primaryColor: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  postalCode: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  website: z.string().nullable(),
  social: z
    .object({
      facebook: z.string().nullish(),
      instagram: z.string().nullish(),
      tiktok: z.string().nullish(),
      twitter: z.string().nullish(),
      youtube: z.string().nullish(),
      linkedin: z.string().nullish(),
    })
    .nullable(),
  // Shapes of these jsonb columns are owned by the club tables; kept loose here.
  openingHours: z.unknown(),
  seasonalHours: z.unknown(),
  specialHours: z.unknown(),
  facilities: z.unknown(),
  courtsCount: z.number().nullable(),
});
export type SiteClub = z.infer<typeof SiteClubSchema>;

export const SitePageSummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  isHome: z.boolean(),
  sortOrder: z.number(),
});
export type SitePageSummary = z.infer<typeof SitePageSummarySchema>;

export const SiteRedirectSchema = z.object({
  fromPath: z.string(),
  toPath: z.string(),
  statusCode: z.number(),
});
export type SiteRedirect = z.infer<typeof SiteRedirectSchema>;

export const SiteBundleSchema = z.object({
  site: z.object({
    id: z.string(),
    template: z.string().nullable(),
    theme: ThemeSchema,
    nav: NavSchema,
    legal: LegalSchema,
    publishedAt: z.string().nullable(),
  }),
  club: SiteClubSchema,
  pages: z.array(SitePageSummarySchema),
  redirects: z.array(SiteRedirectSchema),
});
export type SiteBundle = z.infer<typeof SiteBundleSchema>;

/** `blocks` is intentionally unknown: validate with `parseBlocks` so the caller decides how to handle invalid blocks. */
export const SitePageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  isHome: z.boolean(),
  seo: PageSeoSchema,
  blocks: z.unknown(),
  blocksVersion: z.number().int(),
  publishedAt: z.string().nullable(),
});
export type SitePage = z.infer<typeof SitePageSchema>;

export const SiteNewsItemSchema = z.object({
  id: idLike,
  title: z.string(),
  excerpt: z.string().nullable(),
  imageUrl: z.string().nullable(),
  publishedAt: z.string(),
  isPinned: z.boolean(),
});
export type SiteNewsItem = z.infer<typeof SiteNewsItemSchema>;

export const SiteEventSchema = z.object({
  id: idLike,
  name: z.string(),
  description: z.string().nullable(),
  date: z.string(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  typeLabel: z.string().nullable(),
  location: z.string().nullable(),
  coverImageUrl: z.string().nullable(),
  price: z.union([z.string(), z.number()]).nullable(),
  externalLink: z.string().nullable(),
});
export type SiteEvent = z.infer<typeof SiteEventSchema>;

export const SiteTeamSchema = z.object({
  id: idLike,
  name: z.string(),
  level: z.string().nullable(),
  leagueName: z.string().nullable(),
  seasonLabel: z.string().nullable(),
  standings: looseRecords.nullable(),
  fixtures: looseRecords.nullable(),
  detailUrl: z.string().nullable(),
});
export type SiteTeam = z.infer<typeof SiteTeamSchema>;

export const SiteBoardMemberSchema = z.object({
  name: z.string(),
  positionTitle: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  sortOrder: z.number(),
});
export type SiteBoardMember = z.infer<typeof SiteBoardMemberSchema>;

export const SiteFeeSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  amount: z.number(),
  currency: z.string(),
  frequency: z.string().nullable(),
  membershipType: z.string().nullable(),
  minAge: z.number().nullable(),
  maxAge: z.number().nullable(),
  isJoiningFee: z.boolean(),
});
export type SiteFee = z.infer<typeof SiteFeeSchema>;

export const SiteNewsListSchema = z.array(SiteNewsItemSchema);
export const SiteEventListSchema = z.array(SiteEventSchema);
export const SiteTeamListSchema = z.array(SiteTeamSchema);
export const SiteBoardListSchema = z.array(SiteBoardMemberSchema);
export const SiteFeeListSchema = z.array(SiteFeeSchema);
