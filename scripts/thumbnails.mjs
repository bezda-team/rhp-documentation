// Screenshots each example's gallery version for the gallery page's cards: src/assets/gallery/<slug>.png, plus
// <slug>-dark.png for the examples that sit on the page (their look follows the docs' dark or light theme).
// Each is taken in the example's best orientation, the one its page opens in (its entry's `orientation`).
// Needs a built site: npm run build && npm run thumbnails, then build again so the gallery page picks them up.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const ENTRIES = "src/content/docs/gallery", OUT = "src/assets/gallery", PORT = 4390;
const DARK = new Set(["animated-dots", "bar-chart", "box-plot", "heatmap"]); // drawn on the page, not on a poster of their own
const only = process.argv.slice(2);
const slugs = fs.readdirSync(ENTRIES).filter((f) => f.endsWith(".mdx") && f !== "index.mdx").map((f) => f.slice(0, -4)).filter((s) => !only.length || only.includes(s));

const server = spawn("npx", ["astro", "preview", "--port", String(PORT), "--host", "127.0.0.1"], { stdio: "ignore" });
const base = `http://127.0.0.1:${PORT}`;
for (let i = 0; ; i++) { // wait for the server
  try { if ((await fetch(base)).ok) break; } catch {}
  if (i > 100) throw new Error("astro preview didn't start: build the site first (npm run build)");
  await new Promise((r) => setTimeout(r, 100));
}
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  for (const slug of slugs) {
    for (const scheme of DARK.has(slug) ? ["light", "dark"] : ["light"]) {
      // 640px wide: the playground stacks, so the chart is as wide as a tile's image is shown at 2x.
      const page = await browser.newPage({ viewport: { width: 640, height: 1400 }, deviceScaleFactor: 2, colorScheme: scheme });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`${base}/gallery/${slug}/`, { waitUntil: "networkidle" });
      const preview = page.locator('.playground[data-version="poster"] .pg-preview').first();
      await preview.waitFor();
      // Without a v1 replica's own buttons and slider, and with the page (and the box plot's card) transparent: a plot
      // drawn on the page shows on the gallery card's color, and a poster's corners take whatever is behind them.
      await page.addStyleTag({ content: `.pg-preview .buttons { display: none !important; }
        html, body, .page, .main-frame, main, .content-panel, .playground, .pg-body, .pg-preview { background: transparent !important; }
        .pg-preview .v1-card { background: transparent !important; box-shadow: none !important; }` });
      await page.evaluate(() => document.fonts.ready);
      await page.mouse.move(0, 0);
      await page.waitForTimeout(1200); // transitions settle; the animated dots move only after 5 s
      const file = path.join(OUT, `${slug}${scheme === "dark" ? "-dark" : ""}.png`);
      await preview.screenshot({ path: file, omitBackground: true });
      if (errors.length) throw new Error(`${slug}: ${errors.join("; ")}`);
      console.log(file);
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}
