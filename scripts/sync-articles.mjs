// Copies the articles built in the rhp repo into public/gallery/articles/<slug>/index.html, where the site serves them.
// Each is the article's own build, the page its preview is made from, with three lines added to its head: a link back to
// the gallery, which the article shows in place of its kicker; the site's theme, which the article's colors follow the
// way they follow the system's (the docs' theme menu saves "light" or "dark" in localStorage, and nothing for the
// system's); and the site's icons.
// Run it after an article changes and is built (node site.mjs build in its folder): npm run sync-articles
// (RHP_DIR=<the rhp repo>, ../rhp by default).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "../src/gallery/articles.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const rhp = path.resolve(root, process.env.RHP_DIR ?? "../rhp");
const BACK = { href: "/gallery/#articles", label: "Gallery" };

const head = `<meta name="back-link" content="${BACK.href}" data-label="${BACK.label}">
<link rel="icon" href="/favicon.ico">
<link rel="icon" type="image/svg+xml" href="/favicon-rhp.svg?v=2">
<script>
  // The site's theme menu: "light" or "dark", or nothing for the system's, here as in every tab of the site
  {
    const theme = () => {
      let t = null;
      try { t = localStorage.getItem("starlight-theme"); } catch {}
      if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
      else delete document.documentElement.dataset.theme;
    };
    theme();
    addEventListener("storage", (e) => e.key === "starlight-theme" && theme());
  }
</script>`;

// Every page is checked before any is written
const pages = ARTICLES.map((article) => {
  const source = path.join(rhp, article.source);
  if (!fs.existsSync(source)) throw new Error(`No ${source}: build the article first (node site.mjs build in its folder), or set RHP_DIR to the rhp repo.`);
  const html = fs.readFileSync(source, "utf8");
  const viewport = html.match(/<meta name="viewport"[^>]*>\n/);
  if (!html.startsWith("<!doctype html>") || !viewport || !/<title>[^<]+<\/title>/.test(html) || !/<meta name="description" content="[^"]+">/.test(html)) {
    throw new Error(`${source} is not a whole page with a viewport, a <title> and a <meta name="description">.`);
  }
  if (html.includes('<meta name="back-link"')) throw new Error(`${source} already has a back link: it is the site's copy, not the article's build.`);
  return { article, html: html.replace(viewport[0], viewport[0] + head + "\n") };
});

for (const { article, html } of pages) {
  const out = path.join(root, "public", article.url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`${article.url} ← ${article.source} (${Math.round(html.length / 1024)} kB)`);
}
