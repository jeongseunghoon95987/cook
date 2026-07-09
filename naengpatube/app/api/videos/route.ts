import { getVideos } from "@/lib/youtube";
import { normalizeDishName } from "@/lib/normalize";
import type { VideosResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/videos?dish=김치볶음밥
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const dish = normalizeDishName(searchParams.get("dish") ?? "");

  if (!dish) {
    const empty: VideosResponse = { dish: "", videos: [], source: "fallback" };
    return Response.json(empty);
  }

  const data = await getVideos(dish);
  return Response.json(data);
}
