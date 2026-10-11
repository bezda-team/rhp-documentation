// Gives each of the recipes for lots of data (src/gallery/posters.js) a link back to their list in the gallery, above the
// poster, and loads the rhp the site is built with, as the served recipes do. It rewrites the pages in place and can run
// again: after a page is added or changed, and after npm run sync-rhp. npm run poster-pages
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { POSTERS } from "../src/gallery/posters.js";
import { withRecipeNavigation } from "./recipe-navigation.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

// Every page is checked before any is written
const pages = POSTERS.map(({ slug }) => {
  const file = path.join(root, "public/gallery/posters", slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`No ${file}: add the poster's page there first.`);
  const html = fs.readFileSync(file, "utf8");
  return { file, html: withRecipeNavigation(html, { href: "/gallery/#lots-of-data", label: "Recipe navigation" }) };
});

for (const { file, html } of pages) fs.writeFileSync(file, html);
console.log(`Linked ${pages.length} recipes for lots of data to the gallery.`);
