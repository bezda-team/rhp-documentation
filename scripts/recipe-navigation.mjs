// Add the site's gallery link to served recipe pages, keeping the skill's standalone source pages unchanged.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function withRecipeNavigation(html) {
  const page = html
    .replace(/\n?<style id="recipe-navigation-styles">[\s\S]*?<\/style>\n?/g, "\n")
    .replace(/\n?<nav class="recipe-navigation"[\s\S]*?<\/nav>\n?/g, "\n");
  const poster = page.match(/\.poster\s*\{([^}]+)\}/)?.[1];
  const chart = page.match(/#chart\s*\{([^}]+)\}/)?.[1];
  const width = poster?.match(/max-width:\s*([^;]+)/)?.[1] ?? chart?.match(/max-width:\s*([^;]+)/)?.[1];
  const background = page.match(/body\s*\{[^}]*?background:\s*([^;]+)/)?.[1].match(/#([a-f\d]{6}|[a-f\d]{3})\b/i)?.[1];
  if (!width || !background || !page.includes('<div id="chart">')) {
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
  .recipe-navigation { max-width: ${width}; margin: 0 auto 18px; text-align: left; }
  .recipe-navigation a { display: inline-block; padding: 4px 0; font: 600 12.5px/1.4 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
    letter-spacing: .12em; text-transform: uppercase; text-decoration: none; color: ${ink}; }
  .recipe-navigation a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .recipe-navigation a:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; border-radius: 2px; }
</style>`;
  const navigation = '<nav class="recipe-navigation" aria-label="Recipe navigation"><a href="/gallery/#ai-recipes">← Gallery</a></nav>';
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
