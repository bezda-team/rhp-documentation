// The recipes for lots of data: whole pages built with rhp, each served as it is from
// public/gallery/posters/<slug>/index.html and shown at the end of the gallery's AI Recipes, under "Lots of data", in
// this order. npm run poster-pages adds each page's link back to that list and the rhp the site is built with; npm run
// poster-thumbnails takes the cards' pictures.
import fs from "node:fs";
import path from "node:path";

// Each page, and the recipe name its card gives, in the skill's style
export const POSTERS = [
  { slug: "life-expectancy", name: "beeswarm" },
  { slug: "daily-steps", name: "calendar-heatmap" },
  { slug: "subway-lamps", name: "heatmap-rows" },
  { slug: "subway-route-panel", name: "heatmap-panels" },
  { slug: "album-sales-vinyl", name: "unit-bars-filter" },
  { slug: "album-sales-plaque", name: "unit-bars-search" },
  { slug: "world-cities-sign", name: "block-bars-top-25" },
  { slug: "world-cities-ranked", name: "ranked-bars-top-25" },
  { slug: "power-mix-split", name: "diverging-stack" },
  { slug: "cleanest-grids", name: "stacked-shares" },
];

const decode = (text) => text.replace(/&(?:amp|quot|apos|lt|gt|#39);/g, (entity) => ({
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
})[entity]);

// The recipes with their address and their page's title
export const posters = () => POSTERS.map((poster) => {
  const url = `/gallery/posters/${poster.slug}/`;
  const file = path.join(process.cwd(), "public", url, "index.html");
  if (!fs.existsSync(file)) throw new Error(`No ${file} for the recipe ${poster.name}.`);
  const title = fs.readFileSync(file, "utf8").match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) throw new Error(`${file} has no <title> for its gallery card.`);
  return { ...poster, url, title: decode(title) };
});
