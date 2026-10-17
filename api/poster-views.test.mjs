import { test, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { handle } from "./poster-views.js";

const exec = promisify(execFile);
const env = { UPSTASH_REDIS_REST_URL: "https://redis.test", UPSTASH_REDIS_REST_TOKEN: "test-only-token" };
let dir, server, socket;
const command = async (args) => JSON.parse((await exec(process.env.REDIS_CLI ?? "redis-cli", ["-s", socket, "--json", ...args.map(String)])).stdout);
const fetchRedis = async (_url, options) => Response.json({ result: await command(JSON.parse(options.body)) });
const post = (poster = "acid-rain", headers = {}) => new Request("https://gallery.test/api/poster-views", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://gallery.test", "x-vercel-forwarded-for": "192.0.2.1", ...headers },
  body: JSON.stringify({ poster }),
});
const read = (poster = "acid-rain") => handle(new Request(`https://gallery.test/api/poster-views?poster=${poster}`), env, fetchRedis);
const visit = async (poster) => {
  const response = await handle(post(poster), env, fetchRedis);
  assert.equal(response.status, 200);
  return response.json();
};
before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "poster-views-"));
  socket = path.join(dir, "redis.sock");
  server = spawn(process.env.REDIS_SERVER ?? "redis-server", ["--port", "0", "--unixsocket", socket, "--save", "", "--appendonly", "no", "--dir", dir]);
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Redis did not become ready")), 10000);
    const finish = (error) => { clearTimeout(timeout); error ? reject(error) : resolve(); };
    server.once("error", finish);
    server.once("exit", (code) => finish(new Error(`Redis exited before readiness (${code})`)));
    server.stdout.on("data", (chunk) => { if (String(chunk).includes("Ready to accept connections")) finish(); });
  });
});
beforeEach(() => command(["FLUSHDB"]));
after(async () => {
  if (server?.pid && server.exitCode == null) await new Promise((resolve) => { server.once("exit", resolve); server.kill("SIGTERM"); });
  if (dir) await rm(dir, { recursive: true, force: true });
});

test("each visit counts, while reads and other posters leave its total unchanged", async () => {
  assert.deepEqual(await (await read()).json(), { views: 61 });
  assert.deepEqual(await visit(), { views: 62 });
  assert.deepEqual(await visit(), { views: 63 });
  assert.deepEqual(await visit("movie-bombs"), { views: 12 });
  assert.deepEqual(await (await read()).json(), { views: 63 });
  assert.deepEqual(await (await read()).json(), { views: 63 });
  assert.equal(await command(["GET", "poster:acid-rain:views"]), "63");
  assert.equal(await command(["TTL", "poster:acid-rain:views"]), -1);
});

test("an existing total is preserved instead of being seeded again", async () => {
  await command(["SET", "poster:acid-rain:views", 200]);
  assert.deepEqual(await visit(), { views: 201 });
  assert.deepEqual(await (await read()).json(), { views: 201 });
});

test("simultaneous visits increment atomically", async () => {
  const results = await Promise.all(Array.from({ length: 30 }, () => visit("destiny-players")));
  assert.deepEqual(results.map((result) => result.views).sort((a, b) => a - b), Array.from({ length: 30 }, (_, i) => i + 9));
  assert.deepEqual(await (await read("destiny-players")).json(), { views: 38 });
  assert.deepEqual(await (await read("no-mans-sky")).json(), { views: 9 });
});

test("unknown posters, invalid bodies, and cross-site requests cannot write", async () => {
  for (const [request, status] of [
    [post("histogram"), 400], [post("__proto__"), 400], [post({}), 400],
    [post("acid-rain", { Origin: "https://other.test" }), 403],
    [post("acid-rain", { "sec-fetch-site": "cross-site" }), 403],
    [post("acid-rain", { "Content-Type": "text/plain" }), 415],
    [post("acid-rain", { "Content-Length": "1024" }), 413],
    [new Request("https://gallery.test/api/poster-views", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }), 400],
    [new Request("https://gallery.test/api/poster-views", { method: "POST", headers: { "Content-Type": "application/json" }, body: "null" }), 400],
    [new Request("https://gallery.test/api/poster-views", { method: "DELETE" }), 405],
  ]) assert.equal((await handle(request, env, fetchRedis)).status, status);
  assert.equal(await command(["DBSIZE"]), 0);
});

test("rate limiting spans posters, expires, and stores no raw IP", async () => {
  await Promise.all(Array.from({ length: 120 }, () => visit()));
  const response = await handle(post("movie-bombs"), env, fetchRedis);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
  assert.deepEqual(await (await read()).json(), { views: 181 });
  assert.deepEqual(await (await read("movie-bombs")).json(), { views: 11 });
  const [key] = await command(["KEYS", "poster:views:rate:*"]);
  assert(!key.includes("192.0.2.1"));
  assert((await command(["TTL", key])) > 0);
});

test("storage failures and malformed results never display a false zero", async () => {
  assert.equal((await handle(post(), {})).status, 503);
  assert.equal((await handle(post(), env, async () => { throw new Error("Offline"); })).status, 503);
  for (const result of [null, "", "abc", -2, 1.5, {}, false, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal((await handle(post(), env, async () => Response.json({ result }))).status, 503);
  }
  const response = await handle(post(), env, async () => Response.json({ result: 1234 }));
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { views: 1234 });
});
