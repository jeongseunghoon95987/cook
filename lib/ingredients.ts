/** Category tabs and the frequently-used ingredients under each. */

export const CATEGORIES = ["채소", "육류", "양념", "기타"] as const;
export type Category = (typeof CATEGORIES)[number];

export const INGREDIENTS: Record<Category, string[]> = {
  채소: ["대파", "양파", "마늘", "감자", "당근", "애호박", "버섯", "시금치", "콩나물", "청양고추"],
  육류: ["돼지고기", "소고기", "닭가슴살", "베이컨", "햄", "소시지", "참치캔", "새우"],
  양념: ["고추장", "된장", "간장", "고춧가루", "설탕", "참기름", "마요네즈"],
  기타: ["계란", "두부", "김치", "밥", "라면사리", "치즈", "우유", "어묵", "김"],
};

/** Seasonings considered "always available" when the basics toggle is on. */
export const BASIC_SEASONINGS = ["소금", "후추", "식용유", "간장", "설탕", "참기름"];
