// Capture the recipes for lots of data (src/gallery/posters.js) for their cards, as recipe-thumbnails.mjs does the others:
// the poster at a 1280px window, without the page around it or the link back to the gallery. A poster more than 200px
// taller than the gallery's tallest cards (1.35 times its width) is cut at their shape and fades out over its last 200px.
// Run `npm run poster-thumbnails`, optionally followed by poster slugs, then build the site.
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { POSTERS } from "../src/gallery/posters.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src/assets/posters");
const STANDALONE = path.join(ROOT, "vendor/rhp/dist/standalone.js");
const TALLEST = 1.35;
const FADE = 200;
const only = process.argv.slice(2);
const unknown = only.filter((slug) => !POSTERS.some((poster) => poster.slug === slug));
if (unknown.length) throw new Error(`Unknown posters: ${unknown.join(", ")}`);
const slugs = POSTERS.map((poster) => poster.slug).filter((slug) => !only.length || only.includes(slug));
const standalone = await fs.readFile(STANDALONE);

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml" };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = path.resolve(PUBLIC, `.${pathname}${pathname.endsWith("/") ? "index.html" : ""}`);
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
      // The vendored rhp, so a package CDN update cannot change a capture
      await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/]+\/dist\/standalone\.js$/, (route) => route.fulfill({
        contentType: "text/javascript", headers: { "Access-Control-Allow-Origin": "*" }, body: standalone,
      }));
      await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
      await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
      await page.goto(`${base}/gallery/posters/${slug}/`, { waitUntil: "load" });
      const poster = page.locator(".poster");
      await poster.first().waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      const fontErrors = await page.evaluate(() => [...document.fonts].filter((font) => font.status === "error").map((font) => font.family));
      if (fontErrors.length) errors.push(`Web fonts failed: ${[...new Set(fontErrors)].join(", ")}`);
      if (await poster.count() !== 1) throw new Error("Expected one poster");
      await page.addStyleTag({ content: "html, body { background: transparent !important; } .recipe-navigation { display: none !important; } .poster { box-shadow: none !important; }" });
      await page.mouse.move(0, 0);
      await page.clock.runFor(1200);
      await poster.evaluate((element) => element.scrollIntoView({ block: "start" }));
      // A tall poster: cut at the tallest cards' shape, fading out above the cut
      const { width, height } = await poster.evaluate((element) => element.getBoundingClientRect());
      const cut = Math.round(width * TALLEST);
      const tall = height > cut + FADE;
      if (tall) {
        await page.addStyleTag({ content: `.poster { -webkit-mask-image: linear-gradient(#000 ${cut - FADE}px, transparent ${cut}px); mask-image: linear-gradient(#000 ${cut - FADE}px, transparent ${cut}px); }` });
      }
      // Round inward to whole device pixels to keep the page outside the image edges
      const clip = await poster.evaluate((element, cut) => {
        const bounds = element.getBoundingClientRect(), ratio = devicePixelRatio;
        const x = Math.ceil(bounds.left * ratio) / ratio, y = Math.ceil(bounds.top * ratio) / ratio;
        const bottom = Math.min(bounds.bottom, bounds.top + cut);
        return { x, y, width: Math.floor(bounds.right * ratio) / ratio - x, height: Math.floor(bottom * ratio) / ratio - y };
      }, tall ? cut : Infinity);
      if (errors.length) throw new Error("Browser errors during capture");
      const file = path.join(OUT, `${slug}.png`);
      const png = await page.screenshot({ clip, omitBackground: true });
      if (errors.length) throw new Error("Browser errors during capture");
      await fs.writeFile(file, png);
      console.log(`${path.relative(ROOT, file)}${tall ? ` (cut at ${cut} of ${Math.round(height)}px)` : ""}`);
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
if (failures.length) throw new Error(`${failures.length} poster thumbnail capture(s) failed.`);
