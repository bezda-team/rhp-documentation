// Package Astro's static pages and the statistics APIs together using Vercel's Build Output API.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { redirects } from "../src/redirects.js";
import { ARTICLES } from "../src/gallery/articles.js";

export async function packageSite(out) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const dist = path.join(root, "dist");
  await fs.mkdir(out, { recursive: true });
  await fs.cp(dist, path.join(out, "static"), { recursive: true });
  const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const routes = Object.entries(redirects).map(([from, to]) => ({ src: `^${escape(from)}/?$`, status: 301, headers: { Location: to } }));
  routes.push({ src: "^/_astro/.*$", headers: { "Cache-Control": "public, max-age=31536000, immutable" }, continue: true });
  // Map every directory index explicitly, retaining the site's URLs with or without their final slash.
  const indices = async (dir, relative = "") => {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const name = path.posix.join(relative, entry.name);
      if (entry.isDirectory()) await indices(path.join(dir, entry.name), name);
      else if (entry.name === "index.html") {
        const url = relative ? `/${relative}` : "";
        routes.push({ src: `^${escape(url)}/?$`, dest: `/${name}` });
      }
    }
  };
  await indices(dist);
  routes.push({ handle: "filesystem" }, { src: "/.*", dest: "/404.html", status: 404 });
  await fs.writeFile(path.join(out, "config.json"), JSON.stringify({ version: 3, routes }, null, 2) + "\n");

  const endpoints = [...ARTICLES.filter((article) => article.stats).map((article) => article.stats.endpoint), "/api/poster-views"];
  for (const endpoint of endpoints) {
    const func = path.join(out, "functions", endpoint + ".func");
    await fs.mkdir(path.join(func, "api"), { recursive: true });
    await fs.copyFile(path.join(root, endpoint + ".js"), path.join(func, endpoint + ".js"));
    if (endpoint === "/api/poster-views") {
      await fs.mkdir(path.join(func, "src/gallery"), { recursive: true });
      await fs.copyFile(path.join(root, "src/gallery/real-posters.js"), path.join(func, "src/gallery/real-posters.js"));
    }
    await fs.copyFile(path.join(root, "scripts/stats-handler.mjs"), path.join(func, "node-handler.mjs"));
    await fs.writeFile(path.join(func, "package.json"), '{"type":"module"}\n');
    await fs.writeFile(path.join(func, "index.mjs"), `import { handle } from ".${endpoint}.js";\nimport { nodeHandler } from "./node-handler.mjs";\nexport default nodeHandler(handle);\n`);
    await fs.writeFile(path.join(func, ".vc-config.json"), JSON.stringify({
      runtime: "nodejs22.x", handler: "index.mjs", launcherType: "Nodejs", regions: ["iad1"], maxDuration: 10,
    }, null, 2) + "\n");
  }
}

if (process.env.VERCEL === "1" && process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const out = fileURLToPath(new URL("../.vercel/output", import.meta.url));
  await fs.rm(out, { recursive: true, force: true });
  await packageSite(out);
  console.log("Vercel output: static site and statistics functions");
}
