import { z } from "zod";
import type { BlockMeta } from "./blocks/meta";
import { HeroPropsSchema, defaultHeroProps, heroMeta } from "./blocks/hero";
import { RichTextPropsSchema, defaultRichTextProps, richTextMeta } from "./blocks/rich_text";
import { ImageTextPropsSchema, defaultImageTextProps, imageTextMeta } from "./blocks/image_text";
import { CtaPropsSchema, defaultCtaProps, ctaMeta } from "./blocks/cta";
import { NewsFeedPropsSchema, defaultNewsFeedProps, newsFeedMeta } from "./blocks/news_feed";
import { EventsListPropsSchema, defaultEventsListProps, eventsListMeta } from "./blocks/events_list";
import { OpeningHoursPropsSchema, defaultOpeningHoursProps, openingHoursMeta } from "./blocks/opening_hours";
import { ContactPropsSchema, defaultContactProps, contactMeta } from "./blocks/contact";
import { TeamsNuligaPropsSchema, defaultTeamsNuligaProps, teamsNuligaMeta } from "./blocks/teams_nuliga";
import { MembershipJoinPropsSchema, defaultMembershipJoinProps, membershipJoinMeta } from "./blocks/membership_join";
import { LegalImpressumPropsSchema, defaultLegalImpressumProps, legalImpressumMeta } from "./blocks/legal_impressum";
import { LegalPrivacyPropsSchema, defaultLegalPrivacyProps, legalPrivacyMeta } from "./blocks/legal_privacy";

export const BLOCKS_VERSION = 1;
export const MAX_BLOCKS = 60;

const blockId = z.string().min(1).max(64).regex(/^[A-Za-z0-9_-]+$/);

const def = <T extends string, P extends z.ZodType>(type: T, props: P) =>
  z.object({ id: blockId, type: z.literal(type), props });

export const BlockSchema = z.discriminatedUnion("type", [
  def("hero", HeroPropsSchema),
  def("rich_text", RichTextPropsSchema),
  def("image_text", ImageTextPropsSchema),
  def("cta", CtaPropsSchema),
  def("news_feed", NewsFeedPropsSchema),
  def("events_list", EventsListPropsSchema),
  def("opening_hours", OpeningHoursPropsSchema),
  def("contact", ContactPropsSchema),
  def("teams_nuliga", TeamsNuligaPropsSchema),
  def("membership_join", MembershipJoinPropsSchema),
  def("legal_impressum", LegalImpressumPropsSchema),
  def("legal_privacy", LegalPrivacyPropsSchema),
]);
export type Block = z.infer<typeof BlockSchema>;
export type BlockType = Block["type"];
export type BlockProps<T extends BlockType> = Extract<Block, { type: T }>["props"];

export const BlockListSchema = z.array(BlockSchema).max(MAX_BLOCKS);
export type BlockList = z.infer<typeof BlockListSchema>;

interface BlockDefinition<T extends BlockType> {
  schema: z.ZodType<BlockProps<T>>;
  defaults: () => BlockProps<T>;
  meta: BlockMeta;
}

export const BLOCK_REGISTRY: { [T in BlockType]: BlockDefinition<T> } = {
  hero: { schema: HeroPropsSchema, defaults: defaultHeroProps, meta: heroMeta },
  rich_text: { schema: RichTextPropsSchema, defaults: defaultRichTextProps, meta: richTextMeta },
  image_text: { schema: ImageTextPropsSchema, defaults: defaultImageTextProps, meta: imageTextMeta },
  cta: { schema: CtaPropsSchema, defaults: defaultCtaProps, meta: ctaMeta },
  news_feed: { schema: NewsFeedPropsSchema, defaults: defaultNewsFeedProps, meta: newsFeedMeta },
  events_list: { schema: EventsListPropsSchema, defaults: defaultEventsListProps, meta: eventsListMeta },
  opening_hours: { schema: OpeningHoursPropsSchema, defaults: defaultOpeningHoursProps, meta: openingHoursMeta },
  contact: { schema: ContactPropsSchema, defaults: defaultContactProps, meta: contactMeta },
  teams_nuliga: { schema: TeamsNuligaPropsSchema, defaults: defaultTeamsNuligaProps, meta: teamsNuligaMeta },
  membership_join: {
    schema: MembershipJoinPropsSchema,
    defaults: defaultMembershipJoinProps,
    meta: membershipJoinMeta,
  },
  legal_impressum: {
    schema: LegalImpressumPropsSchema,
    defaults: defaultLegalImpressumProps,
    meta: legalImpressumMeta,
  },
  legal_privacy: { schema: LegalPrivacyPropsSchema, defaults: defaultLegalPrivacyProps, meta: legalPrivacyMeta },
};

export const BLOCK_TYPES = Object.keys(BLOCK_REGISTRY) as BlockType[];

export function createBlock<T extends BlockType>(type: T): Extract<Block, { type: T }> {
  return { id: crypto.randomUUID(), type, props: BLOCK_REGISTRY[type].defaults() } as unknown as Extract<Block, { type: T }>;
}

export function parseBlocks(input: unknown) {
  return BlockListSchema.safeParse(input);
}
