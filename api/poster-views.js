import { createHmac } from "node:crypto";
import { REAL_POSTERS } from "../src/gallery/real-posters.js";

const posters = new Map(REAL_POSTERS.map((poster) => [poster.slug, poster.initialViews ?? 0]));
const increment = `
local requests = redis.call('INCR', KEYS[3])
if requests == 1 then redis.call('EXPIRE', KEYS[3], 60) end
if requests > 120 then return -1 end
redis.call('SET', KEYS[1], ARGV[1], 'NX')
if redis.call('SADD', KEYS[2], ARGV[2]) == 1 then redis.call('INCR', KEYS[1]) end
return tonumber(redis.call('GET', KEYS[1]))
`;

export async function handle(request, env = process.env, fetchRedis = fetch) {
  const origin = new URL(request.url).origin;
  const headers = { "Cache-Control": "no-store" };
  const respond = (body, status = 200) => Response.json(body, { status, headers });
  if ((request.headers.has("origin") && request.headers.get("origin") !== origin)
    || request.headers.get("sec-fetch-site") === "cross-site") return respond({ error: "Origin not allowed" }, 403);
  if (!["GET", "POST"].includes(request.method)) {
    headers.Allow = "GET, POST";
    return respond({ error: "Method not allowed" }, 405);
  }
  let slug = new URL(request.url).searchParams.get("poster");
  let visitor;
  if (request.method === "POST") {
    if (!/^application\/json(?:;|$)/i.test(request.headers.get("content-type") ?? "")) return respond({ error: "Expected JSON" }, 415);
    if (Number(request.headers.get("content-length")) > 256) return respond({ error: "Request too large" }, 413);
    try {
      const text = await request.text();
      if (text.length > 256) return respond({ error: "Request too large" }, 413);
      const body = JSON.parse(text);
      slug = body?.poster;
      visitor = body?.visitor;
    } catch {
      return respond({ error: "Invalid request" }, 400);
    }
  }
  if (visitor !== undefined && (typeof visitor !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitor))) {
    return respond({ error: "Invalid visitor" }, 400);
  }
  if (!posters.has(slug)) return respond({ error: "Unknown poster" }, 400);
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  if (!url || !token) return respond({ error: "Counts unavailable" }, 503);
  const key = `poster:${slug}:views`;
  const ip = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const hash = createHmac("sha256", token).update(ip).digest("hex");
  // Older cached pages without an ID can read the total but cannot add repeat views.
  const command = visitor
    ? ["EVAL", increment, 3, key, `poster:${slug}:visitors`, `poster:views:rate:${hash}`, String(posters.get(slug)), visitor.toLowerCase()]
    : ["GET", key];
  try {
    const response = await fetchRedis(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Redis unavailable");
    const { result, error } = await response.json();
    if (result === -1) {
      headers["Retry-After"] = "60";
      return respond({ error: "Please try again shortly" }, 429);
    }
    const valid = typeof result === "number" || (typeof result === "string" && /^(0|[1-9][0-9]*)$/.test(result))
      || (result === null && !visitor);
    const views = result === null ? posters.get(slug) : Number(result);
    if (error || !valid || !Number.isSafeInteger(views) || views < 0) {
      throw new Error("Invalid count");
    }
    return respond({ views });
  } catch {
    return respond({ error: "Counts unavailable" }, 503);
  }
}

export default { fetch: (request) => handle(request) };
