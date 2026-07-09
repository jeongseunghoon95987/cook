import { fallbackVideos } from "./fallback";
import { normalizeDishName } from "./normalize";
import { cacheGet, cacheSet } from "./redis";
import type { Video, VideosResponse } from "./types";

const CACHE_TTL = 60 * 60 * 24 * 7; // 7d (spec: 유튜브 쿼터 방어)
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";

/** "PT8M24S" -> "8:24", "PT1H2M5S" -> "1:02:05" */
function formatDuration(iso: string): string {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso);
  if (!m) return "0:00";
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const sec = Number(m[3] ?? 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(min)}:${pad(sec)}` : `${min}:${pad(sec)}`;
}

/** 1_820_000 -> "182만회" */
function formatViews(count: string | number): string {
  const n = Number(count);
  if (!Number.isFinite(n)) return "";
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1).replace(/\.0$/, "")}억회`;
  if (n >= 10_000) return `${Math.round(n / 10_000)}만회`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}천회`;
  return `${n}회`;
}

interface SearchItem {
  id: { videoId: string };
  snippet: { title: string; channelTitle: string; thumbnails: { high?: { url: string }; medium?: { url: string } } };
}
interface VideoDetail {
  id: string;
  contentDetails: { duration: string };
  statistics: { viewCount: string };
}

async function searchYouTube(dish: string): Promise<Video[]> {
  const key = process.env.YOUTUBE_API_KEY!;
  const searchParams = new URLSearchParams({
    key,
    part: "snippet",
    q: `${dish} 레시피`,
    type: "video",
    order: "viewCount",
    maxResults: "3",
    relevanceLanguage: "ko",
    regionCode: "KR",
  });
  const searchRes = await fetch(`${SEARCH_URL}?${searchParams}`, { cache: "no-store" });
  if (!searchRes.ok) throw new Error(`youtube search ${searchRes.status}`);
  const searchBody = (await searchRes.json()) as { items: SearchItem[] };
  const items = searchBody.items ?? [];
  if (items.length === 0) return [];

  const ids = items.map((i) => i.id.videoId).join(",");
  const detailParams = new URLSearchParams({ key, part: "contentDetails,statistics", id: ids });
  const detailRes = await fetch(`${VIDEOS_URL}?${detailParams}`, { cache: "no-store" });
  const details = detailRes.ok
    ? ((await detailRes.json()) as { items: VideoDetail[] }).items
    : [];
  const detailById = new Map(details.map((d) => [d.id, d]));

  return items.map((item) => {
    const id = item.id.videoId;
    const detail = detailById.get(id);
    return {
      videoId: id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      views: detail ? formatViews(detail.statistics.viewCount) : "",
      duration: detail ? formatDuration(detail.contentDetails.duration) : "",
      thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.medium?.url ?? "",
    };
  });
}

/**
 * Get recipe videos for a dish, cache-first (keyed on the normalized name so it
 * agrees with the /dish/[name] route). Falls back to curated videos when there
 * is no YouTube key or the call fails.
 */
export async function getVideos(dishRaw: string): Promise<VideosResponse> {
  const dish = normalizeDishName(dishRaw);
  const cacheKey = `videos:${dish}`;

  const cached = await cacheGet<Video[]>(cacheKey);
  if (cached && cached.length > 0) return { dish, videos: cached, source: "cache" };

  if (!process.env.YOUTUBE_API_KEY) {
    return { dish, videos: fallbackVideos(dish), source: "fallback" };
  }

  try {
    const videos = await searchYouTube(dish);
    if (videos.length === 0) return { dish, videos: fallbackVideos(dish), source: "fallback" };
    await cacheSet(cacheKey, videos, CACHE_TTL);
    return { dish, videos, source: "youtube" };
  } catch {
    return { dish, videos: fallbackVideos(dish), source: "fallback" };
  }
}
