/**
 * Canonical form of a dish name, used in exactly two places that must agree:
 *   1. the cache key in lib/youtube.ts
 *   2. the /dish/[name] route segment
 *
 * Keeping them on the same function guarantees the URL and the cache key are
 * derived identically, so a shared/SEO link resolves to the same cached data.
 *
 * - NFC normalizes Unicode (composed Hangul) so visually-identical strings match.
 * - trim + collapse whitespace removes accidental spacing differences.
 */
export function normalizeDishName(name: string): string {
  return name.normalize("NFC").trim().replace(/\s+/g, " ");
}
