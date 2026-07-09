import type { Dish, RecommendResponse, Video } from "./types";

/**
 * Eight fallback dishes — 4 ready + 4 need-more — mirroring the design mock.
 * Served when the LLM is unavailable so the app still works offline and looks
 * identical to the recommendation screen.
 */
export const FALLBACK_READY: Dish[] = [
  { name: "김치볶음밥", difficulty: "쉬움", minutes: 15, usedIngredients: ["김치", "계란", "대파", "밥"], missingIngredients: [] },
  { name: "파 계란말이", difficulty: "쉬움", minutes: 10, usedIngredients: ["계란", "대파"], missingIngredients: [] },
  { name: "김치전", difficulty: "쉬움", minutes: 20, usedIngredients: ["김치", "계란", "부침가루"], missingIngredients: [] },
  { name: "대파 계란국", difficulty: "쉬움", minutes: 10, usedIngredients: ["계란", "대파"], missingIngredients: [] },
];

export const FALLBACK_NEED_MORE: Dish[] = [
  { name: "김치찌개", difficulty: "보통", minutes: 30, usedIngredients: ["김치", "대파"], missingIngredients: ["돼지고기"] },
  { name: "순두부찌개", difficulty: "보통", minutes: 25, usedIngredients: ["계란", "대파"], missingIngredients: ["순두부"] },
  { name: "제육볶음", difficulty: "보통", minutes: 25, usedIngredients: ["대파"], missingIngredients: ["돼지고기", "고추장"] },
  { name: "부대찌개", difficulty: "보통", minutes: 35, usedIngredients: ["김치", "대파"], missingIngredients: ["햄", "라면사리"] },
];

export function fallbackRecommendation(): RecommendResponse {
  return { ready: FALLBACK_READY, needMore: FALLBACK_NEED_MORE, source: "fallback" };
}

/**
 * Three curated recipe videos for a dish. `videoId` is empty so the UI renders
 * a styled placeholder/player instead of a broken YouTube embed. Titles/channels
 * are templated off the dish name so any dish degrades gracefully.
 */
export function fallbackVideos(dish: string): Video[] {
  return [
    { videoId: "", title: `${dish}, 이 순서만 지키면 실패 없어요`, channel: "집밥연구소", views: "182만회", duration: "8:24", thumbnail: "" },
    { videoId: "", title: `자취생 ${dish}, 5분 완성 초간단 버전`, channel: "오늘뭐먹지", views: "74만회", duration: "4:57", thumbnail: "" },
    { videoId: "", title: `불맛 나는 ${dish}의 비법 3가지`, channel: "요리왕 부엌", views: "121만회", duration: "10:12", thumbnail: "" },
  ];
}
