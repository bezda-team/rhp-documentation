import { test, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { webkit, chromium } from "playwright";
import { nodeHandler } from "../scripts/stats-handler.mjs";
import endpoint, { handle } from "./poster-views.js";

const exec = promisify(execFile);
const env = { UPSTASH_REDIS_REST_URL: "https://redis.test", UPSTASH_REDIS_REST_TOKEN: "test-only-token" };
let dir, server, socket;
const command = async (args) => JSON.parse((await exec(process.env.REDIS_CLI ?? "redis-cli", ["-s", socket, "--json", ...args.map(String)])).stdout);
const fetchRedis = async (_url, options) => Response.json({ result: await command(JSON.parse(options.body)) });
const visitor = randomUUID();
const post = (poster = "acid-rain", headers = {}, id = visitor) => new Request("https://gallery.test/api/poster-views", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://gallery.test", "x-vercel-forwarded-for": "192.0.2.1", ...headers },
  body: JSON.stringify({ poster, visitor: id }),
});
const read = (poster = "acid-rain") => handle(new Request(`https://gallery.test/api/poster-views?poster=${poster}`), env, fetchRedis);
const visit = async (poster, id = visitor) => {
  const response = await handle(post(poster, {}, id), env, fetchRedis);
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

test("refreshes and return visits count a browser once per poster", async () => {
  assert.deepEqual(await (await read()).json(), { views: 61 });
  assert.deepEqual(await visit(), { views: 62 });
  assert.deepEqual(await visit(), { views: 62 });
  assert.deepEqual(await visit("acid-rain", randomUUID()), { views: 63 });
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

test("simultaneous refreshes from one browser increment only once", async () => {
  const results = await Promise.all(Array.from({ length: 30 }, () => visit("destiny-players")));
  for (const result of results) assert.deepEqual(result, { views: 9 });
  assert.deepEqual(await visit("destiny-players", visitor.toUpperCase()), { views: 9 });
});

test("old pages without a persistent visitor ID only read the total", async () => {
  const legacy = () => new Request("https://gallery.test/api/poster-views", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ poster: "acid-rain" }),
  });
  assert.deepEqual(await (await handle(legacy(), env, fetchRedis)).json(), { views: 61 });
  assert.equal(await command(["DBSIZE"]), 0);
  assert.deepEqual(await visit("acid-rain"), { views: 62 });
  for (let i = 0; i < 3; i++) assert.deepEqual(await (await handle(legacy(), env, fetchRedis)).json(), { views: 62 });
});

test("simultaneous new browsers increment atomically", async () => {
  const results = await Promise.all(Array.from({ length: 30 }, () => visit("destiny-players", randomUUID())));
  assert.deepEqual(results.map((result) => result.views).sort((a, b) => a - b), Array.from({ length: 30 }, (_, i) => i + 9));
  assert.deepEqual(await (await read("destiny-players")).json(), { views: 38 });
  assert.deepEqual(await (await read("no-mans-sky")).json(), { views: 9 });
});

test("unknown posters, invalid bodies, and cross-site requests cannot write", async () => {
  for (const [request, status] of [
    [post("acid-rain", {}, "invalid"), 400], [post("acid-rain", {}, null), 400],
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
  assert.deepEqual(await (await read()).json(), { views: 62 });
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

test("the endpoint exposes the Web handler required by Vercel", async () => {
  assert.equal(typeof endpoint.fetch, "function");
  const response = await endpoint.fetch(new Request("https://gallery.test/api/poster-views?poster=histogram"));
  assert.equal(response.status, 400);
});


test("real page reloads, tabs, revisits, and storage failure preserve browser uniqueness", async () => {
  const root = fileURLToPath(new URL("../public/", import.meta.url));
  const httpHandler = nodeHandler((request) => handle(request, env, fetchRedis));
  const http = createServer(async (request, response) => {
    request.headers["x-forwarded-proto"] = "http";
    if (request.url.startsWith("/api/poster-views")) return httpHandler(request, response);
    const url = new URL(request.url, "http://localhost");
    let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { response.writeHead(404); response.end(); return; }
    if (url.pathname.endsWith("/")) file = path.join(file, "index.html");
    try {
      response.setHeader("Content-Type", file.endsWith(".js") ? "text/javascript" : "text/html");
      response.end(await readFile(file));
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((resolve) => http.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${http.address().port}`;
  const browser = await { webkit, chromium }[process.env.BROWSER ?? "webkit"].launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const show = async (page, poster, expected) => {
      await page.goto(`${base}/gallery/real-posters/${poster}/`);
      await page.getByRole("img", { name: `${expected} visitors`, exact: true }).waitFor();
    };
    await show(page, "acid-rain", 62);
    const id = await page.evaluate(() => localStorage.getItem("rhp:poster-visitor"));
    assert.match(id, /^[0-9a-f-]{36}$/);
    await page.reload();
    await page.getByRole("img", { name: "62 visitors", exact: true }).waitFor();
    await show(await context.newPage(), "acid-rain", 62);
    await show(page, "movie-bombs", 12);
    await show(page, "acid-rain", 62);
    assert.equal(await page.evaluate(() => localStorage.getItem("rhp:poster-visitor")), id);
    const other = await browser.newContext();
    await show(await other.newPage(), "acid-rain", 63);
    await other.close();
    await context.close();
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } }));
    const readOnly = await blocked.newPage();
    const methods = [];
    readOnly.on("request", (request) => { if (request.url().includes("/api/poster-views")) methods.push(request.method()); });
    await show(readOnly, "acid-rain", 63);
    await readOnly.reload();
    await readOnly.getByRole("img", { name: "63 visitors", exact: true }).waitFor();
    assert.deepEqual(methods, ["GET", "GET"]);
    assert.deepEqual(await (await read()).json(), { views: 63 });
    await blocked.close();
  } finally {
    await browser.close();
    await new Promise((resolve) => http.close(resolve));
  }
});
