// The gallery's posters: whole pages built with rhp, each served as it is from public/gallery/posters/<slug>/index.html
// and shown in the gallery's plots after the examples, in this order. npm run poster-pages adds each page's link back to
// the gallery and the rhp the site is built with; npm run poster-thumbnails takes the cards' pictures.
import fs from "node:fs";
import path from "node:path";

// Each poster's page and the kind of plot its card names
export const POSTERS = [
  { slug: "life-expectancy", type: "Beeswarm" },
  { slug: "daily-steps", type: "Calendar heatmap" },
  { slug: "subway-lamps", type: "Heatmap rows" },
  { slug: "subway-route-panel", type: "Heatmap panels" },
  { slug: "album-sales-vinyl", type: "Unit bars with a filter" },
  { slug: "album-sales-plaque", type: "Unit bars with a search" },
  { slug: "world-cities-sign", type: "Block bars, top 25 first" },
  { slug: "world-cities-ranked", type: "Ranked bars, top 25 first" },
  { slug: "power-mix-split", type: "Diverging stacked bars" },
  { slug: "cleanest-grids", type: "Stacked shares" },
];

const decode = (text) => text.replace(/&(?:amp|quot|apos|lt|gt|#39);/g, (entity) => ({
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
})[entity]);

// The posters with their address and their page's title
export const posters = () => POSTERS.map((poster) => {
  const url = `/gallery/posters/${poster.slug}/`;
  const file = path.join(process.cwd(), "public", url, "index.html");
  if (!fs.existsSync(file)) throw new Error(`No ${file} for the gallery poster ${poster.slug}.`);
  const title = fs.readFileSync(file, "utf8").match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) throw new Error(`${file} has no <title> for its gallery card.`);
  return { ...poster, url, title: decode(title) };
});
