// Copies rhp 2's package into vendor/rhp: its package.json and its builds (dist: the browser's, the server's, the source
// for a Solid app's own build, rhp.css and the standalone module). The site depends on it as a package
// ("@bezda/rhp": "file:vendor/rhp"), so its build resolves rhp by the package's exports, as an app would, until rhp 2
// is on npm: then install it from there.
// Build rhp first (npm run build in its repo), then: npm run sync-rhp [path to the rhp repo, ../rhp by default].
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repo = path.resolve(process.argv[2] ?? "../rhp");
const dist = path.join(repo, "dist");
for (const f of ["index.js", "server.js", "rhp.css", "standalone.js", "source/index.js"]) {
  if (!fs.existsSync(path.join(dist, f))) throw new Error(`No ${path.join(dist, f)}: run npm run build in ${repo} first.`);
}
const commit = execFileSync("git", ["-C", repo, "rev-parse", "--short", "HEAD"]).toString().trim();
const dirty = execFileSync("git", ["-C", repo, "status", "--porcelain", "src"]).toString().trim() ? " with local changes" : "";
const out = path.resolve("vendor/rhp");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync(dist, path.join(out, "dist"), { recursive: true });
// The package's own fields, and where it came from; not its scripts or dev dependencies.
const pkg = JSON.parse(fs.readFileSync(path.join(repo, "package.json"), "utf8"));
const keep = ["name", "version", "description", "license", "homepage", "type", "sideEffects", "exports", "module", "files", "peerDependencies"];
const vendored = Object.fromEntries(keep.filter((k) => k in pkg).map((k) => [k, pkg[k]]));
vendored.description = `${pkg.description}. Built from bezda-team/rhp at ${commit}${dirty} by npm run sync-rhp: don't edit.`;
fs.writeFileSync(path.join(out, "package.json"), JSON.stringify(vendored, null, 2) + "\n");
const size = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? size(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
console.log(`vendor/rhp: rhp ${commit}${dirty}, ${size(out)} B`);
