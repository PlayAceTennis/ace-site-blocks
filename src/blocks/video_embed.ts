import { z } from "zod";
import { assetUrl } from "../common";
import type { BlockMeta } from "./meta";

export const VIDEO_PROVIDERS = ["youtube", "vimeo"] as const;
export type VideoProvider = (typeof VIDEO_PROVIDERS)[number];

export const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;
export const VIMEO_ID_REGEX = /^\d{6,12}$/;

export const VideoEmbedPropsSchema = z
  .object({
    provider: z.enum(VIDEO_PROVIDERS),
    videoId: z.string().trim().min(1).max(20),
    /** Accessible name of the player; also shown before the video is loaded. */
    title: z.string().trim().min(1).max(120),
    /** Own preview image: nothing is requested from the provider before the visitor clicks. */
    posterUrl: assetUrl.optional(),
    aspect: z.enum(["16:9", "4:3"]),
  })
  .refine((v) => (v.provider === "youtube" ? YOUTUBE_ID_REGEX : VIMEO_ID_REGEX).test(v.videoId), {
    message: "Invalid video id",
    path: ["videoId"],
  });
export type VideoEmbedProps = z.infer<typeof VideoEmbedPropsSchema>;

export const defaultVideoEmbedProps = (): VideoEmbedProps => ({
  provider: "youtube",
  videoId: "dQw4w9WgXcQ",
  title: "Video",
  aspect: "16:9",
});

export const videoEmbedMeta: BlockMeta = {
  label: { de: "Video", en: "Video" },
  description: { de: "YouTube- oder Vimeo-Video mit Zwei-Klick-Schutz", en: "YouTube or Vimeo video with click-to-load privacy" },
  category: "content",
  icon: "Video",
};
