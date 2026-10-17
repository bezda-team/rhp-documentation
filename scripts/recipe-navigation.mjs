// Add the site's gallery link to served recipe pages, keeping the skill's standalone source pages unchanged, and to the
// recipes for lots of data (scripts/poster-pages.mjs).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The rhp the site is built with (vendor/rhp): served recipes load exactly that version from jsDelivr, so a release is
// a new address that every browser fetches, where "@2" may be kept in a browser's cache for up to a week
const RHP = JSON.parse(fs.readFileSync(fileURLToPath(new URL("../vendor/rhp/package.json", import.meta.url)), "utf8")).version;

export function withRecipeNavigation(html, { href = "/gallery/#ai-recipes", label = "Recipe navigation", download = null, views = null } = {}) {
  const page = html.replace(/\n?<style id="poster-download-styles">[\s\S]*?<\/style>\n?/g, "\n")
    .replace(/\n?<script type="module" id="poster-download-script">[\s\S]*?<\/script>\n?/g, "\n")
    .replace(/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/"]+\//g, `cdn.jsdelivr.net/npm/@bezda/rhp@${RHP}/`)
    .replace(/\n?<script type="module" id="poster-views-script"[^>]*><\/script>\n?/g, "\n")
    .replace(/\n?<style id="recipe-navigation-styles">[\s\S]*?<\/style>\n?/g, "\n")
    .replace(/\n?<nav class="recipe-navigation(?: [^"]*)?"[\s\S]*?<\/nav>\n?/g, "\n");
  // The poster's width at every window size, so the link stays over its left edge: the max-width of the page's .poster
  // rule (or else of #chart's), and of each .poster rule inside an @media that changes it
  const widths = [];
  const media = [];
  const css = [...page.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((style) => style[1]).join("\n");
  for (const [, at, selector, body] of css.matchAll(/(@media[^{]+)\{|([^{}]+)\{([^{}]*)\}|\}/g)) {
    if (at) media.push(at.trim());
    else if (selector === undefined) media.pop();
    else {
      const name = selector.trim().split("\n").at(-1).trim(), max = body.match(/max-width:\s*([^;]+)/)?.[1];
      if (max && (name === ".poster" || (name === "#chart" && !media.length))) widths.push({ name, media: media.join(" and "), max });
    }
  }
  const width = (widths.find((w) => w.name === ".poster" && !w.media) ?? widths.find((w) => w.name === "#chart"))?.max;
  const changes = widths.filter((w) => w.name === ".poster" && w.media);
  // The page's background, as a color or as a variable set to one (background: var(--page))
  const declared = page.match(/body\s*\{[^}]*?background:\s*([^;]+)/)?.[1];
  const token = declared?.match(/^var\((--[\w-]+)\)$/)?.[1];
  const background = (token ? page.match(new RegExp(`${token}:\\s*([^;]+)`))?.[1] : declared)?.match(/#([a-f\d]{6}|[a-f\d]{3})\b/i)?.[1];
  const mount = page.match(/<(?:div|main)\s+id="chart">/)?.[0];
  if (!(width || changes.length) || !background || !mount) {
    throw new Error("Recipe navigation needs the poster's width, page background and #chart mount.");
  }
  const hex = background.length === 3 ? [...background].map((digit) => digit + digit).join("") : background;
  const rgb = [0, 2, 4].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  const ink = luminance < 0.179 ? "#eef2f5" : "#1d1b17";
  // Older poster pages get the same export block as the skill recipes.
  const downloadBlock = (download ?? fs.readFileSync(new URL("../public/ai/rhp/references/download.md", import.meta.url), "utf8")).match(/```html\n([\s\S]*?)\n```/)[1];
  const style = `<style id="recipe-navigation-styles">
  .recipe-navigation { ${width ? `max-width: ${width}; ` : ""}display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 0 auto 18px; text-align: left; color: ${ink}; }${changes.map((w) => `
  @media ${w.media.replace(/^@media\s*/, "").replace(/ and @media\s*/g, " and ")} { .recipe-navigation { max-width: ${w.max}; } }`).join("")}
  .recipe-navigation a { display: inline-block; padding: 4px 0; font: 600 12.5px/1.4 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    letter-spacing: .12em; text-transform: uppercase; text-decoration: none; color: inherit; }
  .recipe-navigation a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .recipe-navigation a:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; border-radius: 2px; }
${views ? `
  .recipe-navigation.poster-navigation { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 8px; }
  .poster-navigation > a { justify-self: start; }
  .poster-navigation > .poster-actions { justify-self: end; }
  .poster-views { display: inline-flex; align-items: center; gap: 6px; color: inherit; font: 500 12.5px/1.4 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .poster-views svg { width: 20px; height: 20px; flex: none; }
  .poster-views [data-view-count] { min-width: 3ch; }
  @media print { .poster-views { display: none; } }` : ""}
</style>`;
  const counter = views ? `<span class="poster-views" data-poster-views="${views}" role="img" aria-label="Loading visitors" title="Visitors, counted once per browser"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg><span data-view-count aria-hidden="true">...</span></span>` : "";
  const navigation = `<nav class="recipe-navigation${views ? " poster-navigation" : ""}" aria-label="${label}"><a href="${href}">← Gallery</a>${counter}</nav>`;
  const viewsScript = views ? '<script type="module" id="poster-views-script" src="/poster-views.js"></script>\n' : "";
  return page.replace("</head>", style + "\n</head>")
    .replace(mount, navigation + "\n" + mount)
    .replace(/\s*<\/body>/, '\n' + downloadBlock + '\n' + viewsScript + '</body>');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = fileURLToPath(new URL("../public/ai/rhp/recipes/", import.meta.url));
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".html"));
  // Validate every page before writing any, and preserve local recipe changes.
  const pages = files.map((file) => ({ file, html: withRecipeNavigation(fs.readFileSync(path.join(dir, file), "utf8")) }));
  for (const { file, html } of pages) fs.writeFileSync(path.join(dir, file), html);
  console.log(`Added gallery navigation to ${pages.length} recipe pages.`);
}
