// The site's articles: whole pages built with rhp in the rhp repo, each copied to public/gallery/articles/<slug>/ by
// npm run sync-articles, and shown on the gallery page as a card below the plots and the AI recipes.
import fs from "node:fs";
import path from "node:path";

// Each article's page in the rhp repo (its own build) and on the site, and its card's picture (npm run
// article-thumbnails): the first `rows` slats of one of its charts and the next one fading into the paper, with `hide`
// (the chart's controls) left out
export const ARTICLES = [
  {
    slug: "every-word", source: "examples/vocabulary/dist/vocabulary.html", url: "/gallery/articles/every-word/",
    thumbnail: { chart: ".ranking .rhp-chart", slat: ".ranking .rhp-chart [data-name]", rows: 12, hide: ".ranking .controls" },
  },
];

const decode = (text) => text.replace(/&(?:amp|quot|apos|lt|gt|#39);/g, (entity) => ({
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
})[entity]);

// The articles with their title and description, read from the pages the site serves
export const articles = () => ARTICLES.map((article) => {
  const file = path.join(process.cwd(), "public", article.url, "index.html");
  if (!fs.existsSync(file)) throw new Error(`No ${file}: run npm run sync-articles.`);
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
  if (!title || !description) throw new Error(`${file} has no <title> or <meta name="description"> for its gallery card.`);
  return { ...article, title: decode(title), description: decode(description) };
});
