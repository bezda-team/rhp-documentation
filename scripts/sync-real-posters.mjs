// Copy completed, sourced posters and their thumbnails from the rhp repository.
// Run after rebuilding a poster and saving its full PNG: npm run sync-real-posters (RHP_DIR overrides ../rhp).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { realPosters } from "../src/gallery/real-posters.js";
import { withRecipeNavigation } from "./recipe-navigation.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const rhp = path.resolve(root, process.env.RHP_DIR ?? "../rhp");
const download = fs.readFileSync(path.join(rhp, "skills/rhp/references/download.md"), "utf8");

// Read and validate the complete set before changing served files.
const pages = realPosters().map((poster) => {
  const source = path.join(rhp, poster.source);
  const html = fs.readFileSync(path.join(source, poster.page), "utf8");
  if (!html.startsWith("<!doctype html>") || !/<title>[^<]+<\/title>/.test(html)) {
    throw new Error(`${poster.page} is not a complete HTML poster.`);
  }
  // Astro removes .mjs files from its static build when cleaning server modules.
  // Serve runnable source as plain text, with its original filename on the download link.
  const files = poster.files.map((name) => ({
    source: name,
    name: name.endsWith(".mjs") ? `${name}.txt` : name,
    body: fs.readFileSync(path.join(source, name)),
  }));
  let served = withRecipeNavigation(html, { href: "/gallery/#real-posters", label: "Gallery navigation", download, views: poster.slug });
  for (const file of files.filter((file) => file.source !== file.name)) {
    served = served.replaceAll(`href="${file.source}"`, `href="${file.name}" download="${path.basename(file.source)}"`);
  }
  if (poster.unlisted) {
    served = served.replace(/<meta charset="[^"]*">/, (charset) => `${charset}\n<meta name="robots" content="noindex">`);
    if (!served.includes('<meta name="robots" content="noindex">')) throw new Error(`${poster.page} has no charset meta to follow.`);
  }
  return { poster, html: served, image: poster.unlisted ? null : fs.readFileSync(path.join(source, poster.image)), files };
});

for (const { poster, html, image, files } of pages) {
  const out = path.join(root, "public", poster.url);
  fs.mkdirSync(out, { recursive: true });
  for (const name of ["post.txt", "research.txt"]) {
    if (!files.some((file) => file.name === name)) {
      fs.rmSync(path.join(out, name), { force: true });
    }
  }
  fs.writeFileSync(path.join(out, "index.html"), html);
  for (const { name, body } of files) {
    const target = path.join(out, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
  }
  const thumbnail = path.join(root, "src/assets/real-posters", `${poster.slug}.png`);
  if (image) {
    fs.mkdirSync(path.dirname(thumbnail), { recursive: true });
    fs.writeFileSync(thumbnail, image);
  } else {
    fs.rmSync(thumbnail, { force: true });
  }
  console.log(`${poster.url} from ${poster.source}${poster.unlisted ? " (unlisted)" : ""}`);
}
