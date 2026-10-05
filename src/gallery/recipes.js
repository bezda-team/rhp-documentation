// The site's recipe list, shared by the AI page and gallery, in the order the skill gives its recipes.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public/ai/rhp");
const listed = [...fs.readFileSync(path.join(dir, "SKILL.md"), "utf8").matchAll(/^\| `([\w-]+)` \| ([^|]+) \|$/gm)]
  .map((match) => ({ name: match[1], use: match[2].trim() }));
const files = fs.readdirSync(path.join(dir, "recipes")).filter((file) => file.endsWith(".html")).map((file) => file.slice(0, -5));
const names = new Set(listed.map((recipe) => recipe.name));
const unlisted = files.filter((name) => !names.has(name));
const missing = listed.filter((recipe) => !files.includes(recipe.name));

if (!listed.length || names.size !== listed.length || unlisted.length || missing.length) {
  throw new Error(`SKILL.md's table of recipes and public/ai/rhp/recipes/ differ: no row for ${unlisted.join(", ") || "none"}, no file for ${missing.map((recipe) => recipe.name).join(", ") || "none"}. Run npm run sync-skill.`);
}

const decode = (text) => text.replace(/&(?:amp|quot|apos|lt|gt|#39);/g, (entity) => ({
  "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
})[entity]);

export const recipes = listed.map((recipe) => {
  const html = fs.readFileSync(path.join(dir, "recipes", recipe.name + ".html"), "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) throw new Error(`${recipe.name}.html has no title for its gallery card.`);
  return { ...recipe, title: decode(title), url: `/ai/rhp/recipes/${recipe.name}.html` };
});
