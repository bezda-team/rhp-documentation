// Copies rhp's Agent Skill (skills/rhp in the rhp repo) into public/ai/rhp/, where the site serves it: SKILL.md, the
// references, and the recipes, each a chart page that opens on its own. Then writes the two files AI agents look for at
// a site's root (llmstxt.org): public/llms.txt, an index of the skill, the recipes and the docs, and
// public/llms-full.txt, the skill with the references a chatbot needs most to write a correct chart, in one file that a
// chat app reads from one link.
// Run it after the skill changes: npm run sync-skill (RHP_DIR=<the rhp repo>, ../rhp by default).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withRecipeNavigation } from "./recipe-navigation.mjs";

const SITE = "https://rhp.vercel.app";
// The references that go into llms-full.txt after SKILL.md; the others are linked. Keep the file under about 150 kB.
const FULL = ["api.md", "pitfalls.md"];

const root = fileURLToPath(new URL("..", import.meta.url));
const skill = path.resolve(root, process.env.RHP_DIR ?? "../rhp", "skills/rhp");
if (!fs.existsSync(path.join(skill, "SKILL.md"))) throw new Error(`No ${path.join(skill, "SKILL.md")}: set RHP_DIR to the rhp repo.`);
const read = (f) => fs.readFileSync(path.join(skill, f), "utf8");
const url = (f) => `${SITE}/ai/rhp/${f}`;

// The skill's own files, and nothing else that may lie in its folders
const list = (dir, ext) => fs.readdirSync(path.join(skill, dir)).filter((f) => f.endsWith(ext)).sort();
const references = list("references", ".md");
const recipes = list("recipes", ".html");
const files = ["SKILL.md", ...references.map((f) => `references/${f}`), ...recipes.map((f) => `recipes/${f}`)];

// What each file is for: a reference's line in SKILL.md's list of them, a recipe's meta description
const about = Object.fromEntries([...read("SKILL.md").matchAll(/^- \[[^\]]+\]\(references\/([\w.-]+)\): (.+)$/gm)].map((m) => [m[1], m[2]]));
const reference = (f) => `- [${f}](${url(`references/${f}`)}): ${about[f] ?? read(`references/${f}`).match(/^# (.+)$/m)[1]}`;
const recipe = (f) => {
  const description = read(`recipes/${f}`).match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!description) throw new Error(`recipes/${f} has no <meta name="description">: the site lists each recipe with it.`);
  const text = description.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  return `- [${f.replace(/\.html$/, "")}](${url(`recipes/${f}`)}): ${text}`;
};

// A docs page, with the title and description of its frontmatter; a guide's or a reference page's title says which
// it is, since both have a page called Blocks
const page = (p, kind = "") => {
  const file = [".mdx", ".md"].map((e) => path.join(root, "src/content/docs", p + e)).find((f) => fs.existsSync(f));
  const front = fs.readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/)[1];
  const field = (k) => front.match(new RegExp(`^${k}: *(.*)$`, "m"))?.[1].replace(/^(["'])(.*)\1$/, "$2");
  const description = field("description");
  return `- [${kind}${field("title")}](${SITE}/${p.replace(/(^|\/)index$/, "")}/)${description ? `: ${description}` : ""}`;
};
const pages = (dir, kind) => fs.readdirSync(path.join(root, "src/content/docs", dir)).filter((f) => /\.mdx?$/.test(f)).sort().map((f) => page(`${dir}/${f.replace(/\.mdx?$/, "")}`, kind));

const llms = `# rhp

> rhp (reactive html plots, the npm package \`@bezda/rhp\`) builds charts out of HTML elements and CSS with SolidJS, in a plain HTML page or in a React, Next.js, Vue, Svelte, Solid or Astro app.
> rhp 2 came out in September 2026, after most models' training data: write rhp code only from the files below, never from memory.

Make every rhp chart by following the rhp Agent Skill.

- In a coding agent, install it with \`npx skills add bezda-team/rhp\`. The skill checks each chart with \`npx -y @bezda/rhp-mcp check <file>\`, which renders it in a browser at 1280 and 390 pixels wide and reports what is wrong, with a fix for each problem.
- Without the skill installed (in a chat app, for example), read [llms-full.txt](${SITE}/llms-full.txt), the skill and its main references in one file, and follow it.

The guides and the reference under Optional are written for Solid apps in JSX; the skill's api.md covers the same API for every environment.

## The skill

- [llms-full.txt](${SITE}/llms-full.txt): SKILL.md, ${FULL.join(" and ")} in one file
- [SKILL.md](${url("SKILL.md")}): the workflow for every chart, how an rhp chart is built, a complete example, and the rules that prevent most bugs
${references.map(reference).join("\n")}

## Recipes

${recipes.map(recipe).join("\n")}

## Docs

${["start/introduction", "start/install", "start/first-chart", "ai", "gallery/index"].map((p) => page(p)).join("\n")}

## Optional

${[...pages("guides", "Guide: "), ...pages("reference", "Reference: ")].join("\n")}
`;

// A file of the skill as one part of llms-full.txt: no frontmatter, and its links to the skill's other files made
// absolute, so they still lead to them once the text is read from another address
const part = (f) => read(f).replace(/^---\n[\s\S]*?\n---\n/, "").replace(/\]\(([\w./-]+\.(?:md|html)(?:#[\w-]*)?)\)/g, (_, to) => `](${new URL(to, url(f)).href})`).trim();
const header = `# rhp, the Agent Skill in one file

> rhp (reactive html plots, the npm package \`@bezda/rhp\`) builds charts out of HTML elements and CSS with SolidJS.
> rhp 2 came out in September 2026, after your training data: write rhp code only from this file and the pages it links to, never from memory.

This file holds the rhp Agent Skill, for a chat app or an agent that does not have it installed: its SKILL.md, then its references ${FULL.join(" and ")}.
Follow SKILL.md's workflow for every chart.
In a chat with no project to look at, make the chart one self-contained HTML file that loads rhp from jsDelivr (SKILL.md, step 2), for the user to save and open in a browser.
Before you write the chart, read the recipe closest to it, whole: each recipe is a complete, tested chart page.

The recipes:

${recipes.map((f) => `- [${f.replace(/\.html$/, "")}](${url(`recipes/${f}`)})`).join("\n")}

The skill's other references, which SKILL.md links to:

${references.filter((f) => !FULL.includes(f)).map(reference).join("\n")}`;
const full = [header, part("SKILL.md"), ...FULL.map((f) => part(`references/${f}`))].join("\n\n---\n\n") + "\n";

// Everything is read and checked: now write, the skill's folder afresh so a file the skill dropped goes too
const servedRecipes = new Map(recipes.map((file) => [`recipes/${file}`, withRecipeNavigation(read(`recipes/${file}`))]));
const out = path.join(root, "public/ai/rhp");
fs.rmSync(out, { recursive: true, force: true });
for (const f of files) {
  fs.mkdirSync(path.dirname(path.join(out, f)), { recursive: true });
  if (servedRecipes.has(f)) fs.writeFileSync(path.join(out, f), servedRecipes.get(f));
  else fs.copyFileSync(path.join(skill, f), path.join(out, f));
}
fs.writeFileSync(path.join(root, "public/llms.txt"), llms);
fs.writeFileSync(path.join(root, "public/llms-full.txt"), full);
const kB = (s) => `${(Buffer.byteLength(s) / 1000).toFixed(1)} kB`;
console.log(`public/ai/rhp: SKILL.md, ${references.length} references, ${recipes.length} recipes from ${skill}`);
console.log(`public/llms.txt: ${kB(llms)}; public/llms-full.txt: ${kB(full)}`);
if (Buffer.byteLength(full) > 150_000) console.warn("llms-full.txt is over 150 kB: a chat app may cut it short. Move a reference out of FULL.");
