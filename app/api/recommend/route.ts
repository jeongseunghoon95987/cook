import { recommendDishes } from "@/lib/claude";
import type { RecommendResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/recommend?i=계란,대파,김치&basics=1
 * Ingredients come entirely from the query string so results are reproducible
 * from the URL alone.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const ingredients = (searchParams.get("i") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const basics = searchParams.get("basics") === "1";

  if (ingredients.length === 0) {
    const empty: RecommendResponse = { ready: [], needMore: [], source: "fallback" };
    return Response.json(empty);
  }

  const data = await recommendDishes(ingredients, basics);
  return Response.json(data);
}
