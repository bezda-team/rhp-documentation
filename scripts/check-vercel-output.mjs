// Check static routes and exercise the actual packaged Node function over HTTP.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { packageSite } from "./vercel-output.mjs";
import { redirects } from "../src/redirects.js";

const out = await fs.mkdtemp(path.join(tmpdir(), "rhp-vercel-"));
const listen = async (server) => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${server.address().port}`;
};
const oldUrl = process.env.UPSTASH_REDIS_REST_URL;
const oldToken = process.env.UPSTASH_REDIS_REST_TOKEN;
let redis;
let api;
try {
  await packageSite(out);
  const config = JSON.parse(await fs.readFile(path.join(out, "config.json"), "utf8"));
  assert.equal(config.version, 3);
  for (const [url, destination] of Object.entries(redirects)) {
    const route = config.routes.find((r) => r.src && new RegExp(r.src).test(url));
    assert.equal(route.status, 301);
    assert.equal(route.headers.Location, destination);
  }
  for (const url of ["/", "/gallery/", "/start/install/", "/reference/chart/", "/gallery/articles/every-word/"]) {
    const route = config.routes.find((r) => r.dest && r.src && new RegExp(r.src).test(url));
    assert(route, `No route for ${url}`);
    await fs.access(path.join(out, "static", route.dest));
  }
  const func = path.join(out, "functions/api/article-stats.func");
  const options = JSON.parse(await fs.readFile(path.join(func, ".vc-config.json"), "utf8"));
  assert.equal(options.runtime, "nodejs22.x");
  assert.deepEqual(options.regions, ["iad1"]);
  const { default: handler } = await import(pathToFileURL(path.join(func, options.handler)).href);
  const commands = [];
  redis = createServer(async (request, response) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    commands.push(JSON.parse(Buffer.concat(chunks).toString()));
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ result: [1, 1, 1] }));
  });
  process.env.UPSTASH_REDIS_REST_URL = await listen(redis);
  process.env.UPSTASH_REDIS_REST_TOKEN = "local-test-only";
  api = createServer(handler);
  const base = await listen(api);
  const visitor = randomUUID();
  const response = await fetch(base + "/api/article-stats", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: base, "x-forwarded-proto": "http" },
    body: JSON.stringify({ visitor, action: "like", liked: true }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { visitors: 1, likes: 1, liked: true });
  assert.equal(commands[0][0], "EVAL");
  assert.deepEqual(commands[0].slice(-3), [visitor, "like", "1"]);
  assert.equal((await fetch(base + "/api/article-stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })).status, 400);
  assert.equal((await fetch(base + "/api/article-stats", { method: "DELETE" })).status, 405);
  console.log("Passed: static pages, legacy redirects, packaged API, HTTP request body, Redis command, and error responses.");
} finally {
  for (const server of [api, redis]) if (server) await new Promise((resolve) => server.close(resolve));
  if (oldUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL; else process.env.UPSTASH_REDIS_REST_URL = oldUrl;
  if (oldToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN; else process.env.UPSTASH_REDIS_REST_TOKEN = oldToken;
  await fs.rm(out, { recursive: true, force: true });
}
