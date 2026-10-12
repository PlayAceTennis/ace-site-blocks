import { VIMEO_ID_REGEX, YOUTUBE_ID_REGEX, type VideoProvider } from "./blocks/video_embed";

export interface ParsedVideo {
  provider: VideoProvider;
  videoId: string;
}

const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"]);
const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"]);

/**
 * Extracts provider + id from a pasted video link (watch, share, embed, shorts, Vimeo page/player link).
 * Returns null for anything else, so the editor never stores an arbitrary URL.
 */
export function parseVideoUrl(input: string): ParsedVideo | null {
  const raw = input.trim();
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase();
  const segments = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be") {
    const id = segments[0];
    return id && YOUTUBE_ID_REGEX.test(id) ? { provider: "youtube", videoId: id } : null;
  }
  if (YOUTUBE_HOSTS.has(host)) {
    const fromQuery = url.searchParams.get("v");
    const fromPath = ["embed", "shorts", "live", "v"].includes(segments[0] ?? "") ? segments[1] : undefined;
    const id = fromQuery ?? fromPath;
    return id && YOUTUBE_ID_REGEX.test(id) ? { provider: "youtube", videoId: id } : null;
  }
  if (VIMEO_HOSTS.has(host)) {
    // vimeo.com/123456789 or player.vimeo.com/video/123456789
    const id = segments[0] === "video" ? segments[1] : segments[segments.length - 1];
    return id && VIMEO_ID_REGEX.test(id) ? { provider: "vimeo", videoId: id } : null;
  }
  return null;
}

/** The only URLs the renderer ever puts into an iframe (privacy-friendly hosts, autoplay after the click). */
export function videoEmbedUrl(provider: VideoProvider, videoId: string): string {
  return provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`;
}
