/**
 * Minimal Upstash Redis (REST) client — no external dependency.
 *
 * Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. When either is
 * missing, every operation is a graceful no-op so the app runs without a cache.
 */

const URL_BASE = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const cacheEnabled = Boolean(URL_BASE && TOKEN);

async function command<T = unknown>(parts: (string | number)[]): Promise<T | null> {
  if (!cacheEnabled) return null;
  try {
    const res = await fetch(`${URL_BASE}/${parts.map((p) => encodeURIComponent(String(p))).join("/")}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      // Never cache the cache — always hit Upstash fresh at the edge.
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { result: T };
    return body.result ?? null;
  } catch {
    return null;
  }
}

/** Read a JSON value by key, or null on miss/error/disabled. */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const raw = await command<string>(["get", key]);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Store a JSON value with a TTL (seconds). Silently no-ops when disabled. */
export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  if (!cacheEnabled) return;
  await command(["set", key, JSON.stringify(value), "EX", ttlSeconds]);
}
