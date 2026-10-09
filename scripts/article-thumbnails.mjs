// Captures each article's card picture for the gallery page: the top of one of its central charts, on the article's own
// paper, in its light and dark colors, as a desktop draws it (src/assets/articles/<slug>.png and <slug>-dark.png) and
// as a phone does (<slug>-narrow.png and <slug>-narrow-dark.png); the card shows the one of the site's theme and the
// screen's width. The chart's controls are left out and the slat after the last one shown fades into the paper.
// Run npm run sync-articles first, then npm run article-thumbnails (optionally with slugs), then build the site.
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { ARTICLES } from "../src/gallery/articles.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src/assets/articles");
// The two captures: the page's width, and the paper around the chart (px)
const WIDTHS = [{ suffix: "", width: 1280, pad: 32 }, { suffix: "-narrow", width: 390, pad: 16 }];
const only = process.argv.slice(2);
const unknown = only.filter((slug) => !ARTICLES.some((article) => article.slug === slug));
if (unknown.length) throw new Error(`Unknown articles: ${unknown.join(", ")}`);

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
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
  for (const { slug, url, thumbnail } of ARTICLES.filter((article) => !only.length || only.includes(article.slug))) {
    for (const { suffix, width, pad } of WIDTHS) for (const scheme of ["light", "dark"]) {
      // Reduced motion: the charts are drawn in their final state at once
      const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("requestfailed", (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
      page.on("response", (response) => {
        if (response.status() >= 400) errors.push(`${response.url()}: HTTP ${response.status()}`);
      });
      try {
        await page.goto(base + url, { waitUntil: "load" });
        const chart = page.locator(thumbnail.chart).first();
        await chart.waitFor({ timeout: 15000 });
        await page.evaluate(() => document.fonts.ready);
        const fontErrors = await page.evaluate(() => [...document.fonts].filter((font) => font.status === "error").map((font) => font.family));
        if (fontErrors.length) errors.push(`Web fonts failed: ${[...new Set(fontErrors)].join(", ")}`);
        // The first rows slats, and the next one fading out: measured from the chart's top to the end of that slat
        const { top, pitch } = await chart.evaluate((el, slat) => {
          // the highest slat on screen (slats keep their place in the page and are moved on screen; hidden ones have none)
          const shown = [...document.querySelectorAll(slat)].map((s) => s.getBoundingClientRect()).filter((r) => r.height > 0);
          const first = shown.reduce((a, b) => (b.top < a.top ? b : a));
          return { top: first.top - el.getBoundingClientRect().top, pitch: first.height };
        }, thumbnail.slat);
        const height = top + (thumbnail.rows + 1) * pitch;
        await page.addStyleTag({ content: `${thumbnail.hide} { visibility: hidden !important; }
          ${thumbnail.chart} { mask-image: linear-gradient(to bottom, #000 ${height - pitch}px, transparent ${height}px); }` });
        await chart.evaluate((el) => scrollTo({ top: el.getBoundingClientRect().top + scrollY - 200, behavior: "instant" }));
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800); // portraits decoded, the chart drawn
        // Rounded inward to whole device pixels, so nothing outside the paper reaches the picture's edges
        const clip = await chart.evaluate((el, [pad, height]) => {
          const r = el.getBoundingClientRect(), d = devicePixelRatio;
          const x = Math.ceil((r.left - pad) * d) / d, y = Math.ceil((r.top - pad) * d) / d;
          return { x, y, width: Math.floor((r.right + pad) * d) / d - x, height: Math.floor((r.top + height + pad * .75) * d) / d - y };
        }, [pad, height]);
        if (errors.length) throw new Error("Browser errors during capture");
        const file = path.join(OUT, `${slug}${suffix}${scheme === "dark" ? "-dark" : ""}.png`);
        await fs.writeFile(file, await page.screenshot({ clip }));
        console.log(path.relative(ROOT, file));
      } catch (error) {
        const message = `${slug}${suffix} (${scheme}): ${error.message}${errors.length ? `\n${[...new Set(errors)].join("\n")}` : ""}`;
        failures.push(message);
        console.error(message);
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
if (failures.length) throw new Error(`${failures.length} article thumbnail capture(s) failed.`);
