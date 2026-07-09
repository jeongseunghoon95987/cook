export type Difficulty = "쉬움" | "보통" | "어려움";

/** A single recommended dish. */
export interface Dish {
  name: string;
  difficulty: Difficulty;
  /** Estimated cooking time in minutes. */
  minutes: number;
  /** Ingredients the user already has that this dish uses. */
  usedIngredients: string[];
  /** Ingredients the user still needs to buy (0 = ready now, 1–2 = need more). */
  missingIngredients: string[];
}

export interface RecommendResponse {
  /** Dishes makeable right now (no missing ingredients). */
  ready: Dish[];
  /** Dishes needing 1–2 extra ingredients. */
  needMore: Dish[];
  /** Where the data came from — useful for debugging/telemetry. */
  source: "llm" | "fallback";
}

/** A YouTube recipe video for a dish. */
export interface Video {
  /** YouTube video id, or "" for curated fallbacks (no real embed). */
  videoId: string;
  title: string;
  channel: string;
  /** Human-formatted view count, e.g. "182만회". */
  views: string;
  /** Human-formatted length, e.g. "8:24". */
  duration: string;
  /** Thumbnail URL, or "" to render a styled placeholder. */
  thumbnail: string;
}

export interface VideosResponse {
  dish: string;
  videos: Video[];
  source: "youtube" | "cache" | "fallback";
}
