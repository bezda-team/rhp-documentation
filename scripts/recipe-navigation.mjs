// Add the site's gallery link to served recipe pages, keeping the skill's standalone source pages unchanged, and to the
// recipes for lots of data (scripts/poster-pages.mjs).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The rhp the site is built with (vendor/rhp): served recipes load exactly that version from jsDelivr, so a release is
// a new address that every browser fetches, where "@2" may be kept in a browser's cache for up to a week
const RHP = JSON.parse(fs.readFileSync(fileURLToPath(new URL("../vendor/rhp/package.json", import.meta.url)), "utf8")).version;

export function withRecipeNavigation(html, { href = "/gallery/#ai-recipes", label = "Recipe navigation" } = {}) {
  const page = html.replace(/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/"]+\//g, `cdn.jsdelivr.net/npm/@bezda/rhp@${RHP}/`)
    .replace(/\n?<style id="recipe-navigation-styles">[\s\S]*?<\/style>\n?/g, "\n")
    .replace(/\n?<nav class="recipe-navigation"[\s\S]*?<\/nav>\n?/g, "\n");
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
  if (!(width || changes.length) || !background || !page.includes('<div id="chart">')) {
    throw new Error("Recipe navigation needs the poster's width, page background and #chart mount.");
  }
  const hex = background.length === 3 ? [...background].map((digit) => digit + digit).join("") : background;
  const rgb = [0, 2, 4].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  const ink = luminance < 0.179 ? "#eef2f5" : "#1d1b17";
  const style = `<style id="recipe-navigation-styles">
  .recipe-navigation { ${width ? `max-width: ${width}; ` : ""}margin: 0 auto 18px; text-align: left; }${changes.map((w) => `
  @media ${w.media.replace(/^@media\s*/, "").replace(/ and @media\s*/g, " and ")} { .recipe-navigation { max-width: ${w.max}; } }`).join("")}
  .recipe-navigation a { display: inline-block; padding: 4px 0; font: 600 12.5px/1.4 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    letter-spacing: .12em; text-transform: uppercase; text-decoration: none; color: ${ink}; }
  .recipe-navigation a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .recipe-navigation a:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; border-radius: 2px; }
</style>`;
  const navigation = `<nav class="recipe-navigation" aria-label="${label}"><a href="${href}">← Gallery</a></nav>`;
  return page.replace("</head>", style + "\n</head>")
    .replace('<div id="chart">', navigation + '\n<div id="chart">');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = fileURLToPath(new URL("../public/ai/rhp/recipes/", import.meta.url));
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".html"));
  // Validate every page before writing any, and preserve local recipe changes.
  const pages = files.map((file) => ({ file, html: withRecipeNavigation(fs.readFileSync(path.join(dir, file), "utf8")) }));
  for (const { file, html } of pages) fs.writeFileSync(path.join(dir, file), html);
  console.log(`Added gallery navigation to ${pages.length} recipe pages.`);
}
