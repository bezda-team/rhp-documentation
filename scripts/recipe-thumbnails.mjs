// Capture the served AI recipe posters at their desktop proportions, without the page background or navigation.
// Run `npm run recipe-thumbnails`, optionally followed by recipe slugs, then build the site.
// Uses the vendored standalone bundle so package CDN updates cannot change a capture.
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PUBLIC = path.join(ROOT, "public");
const RECIPES = path.join(PUBLIC, "ai/rhp/recipes");
const OUT = path.join(ROOT, "src/assets/recipes");
const STANDALONE = path.join(ROOT, "vendor/rhp/dist/standalone.js");
const only = process.argv.slice(2);
const available = (await fs.readdir(RECIPES)).filter((file) => file.endsWith(".html")).map((file) => file.slice(0, -5)).sort();
const unknown = only.filter((slug) => !available.includes(slug));
if (unknown.length) throw new Error(`Unknown recipes: ${unknown.join(", ")}`);
const slugs = available.filter((slug) => !only.length || only.includes(slug));
const standalone = await fs.readFile(STANDALONE);

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml" };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = path.resolve(PUBLIC, `.${pathname}`);
    if (!file.startsWith(`${PUBLIC}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    const body = await fs.readFile(file);
    response.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404).end();
  }
});

let browser;
const failures = [];
try {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  await fs.mkdir(OUT, { recursive: true });
  browser = await chromium.launch();
  for (const slug of slugs) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 2,
      colorScheme: "light", reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("requestfailed", (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(`${response.url()}: HTTP ${response.status()}`);
    });
    try {
      await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/]+\/dist\/standalone\.js$/, (route) => route.fulfill({
        contentType: "text/javascript", headers: { "Access-Control-Allow-Origin": "*" }, body: standalone,
      }));
      // A paused clock lets web fonts load without advancing animated recipes.
      // Advance exactly 1.2 seconds after rendering, including the live recipe's seeded feed.
      await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
      await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
      await page.goto(`${base}/ai/rhp/recipes/${slug}.html`, { waitUntil: "load" });
      const poster = page.locator(".poster");
      await poster.waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      // Google Fonts declares unused language subsets, so check only actual loading errors.
      const fontErrors = await page.evaluate(() => [...document.fonts].filter((font) => font.status === "error").map((font) => font.family));
      if (fontErrors.length) errors.push(`Web fonts failed: ${[...new Set(fontErrors)].join(", ")}`);
      if (await poster.count() !== 1) throw new Error("Expected one recipe poster");
      await page.addStyleTag({ content: "html, body { background: transparent !important; } .recipe-navigation { display: none !important; } #chart { filter: none !important; } .poster { box-shadow: none !important; }" });
      await page.mouse.move(0, 0);
      await page.clock.runFor(1200);
      await poster.evaluate((element) => element.scrollIntoView({ block: "start" }));
      // Round inward to whole device pixels to keep the page outside the image edges.
      const clip = await poster.evaluate((element) => {
        const bounds = element.getBoundingClientRect(), ratio = devicePixelRatio;
        const x = Math.ceil(bounds.left * ratio) / ratio, y = Math.ceil(bounds.top * ratio) / ratio;
        return { x, y, width: Math.floor(bounds.right * ratio) / ratio - x, height: Math.floor(bounds.bottom * ratio) / ratio - y };
      });
      if (errors.length) throw new Error("Browser errors during capture");
      const file = path.join(OUT, `${slug}.png`);
      const png = await page.screenshot({ clip, omitBackground: true });
      if (errors.length) throw new Error("Browser errors during capture");
      await fs.writeFile(file, png);
      console.log(path.relative(ROOT, file));
    } catch (error) {
      const message = `${slug}: ${error.message}${errors.length ? `\n${[...new Set(errors)].join("\n")}` : ""}`;
      failures.push(message);
      console.error(message);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) throw new Error(`${failures.length} recipe thumbnail capture(s) failed.`);
