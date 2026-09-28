// Checks that the docs' live demos come from the server drawn: each demo on each page looks the same from the server's
// HTML and CSS alone (the site's scripts blocked, so no island is taken over; Starlight's inline script still sets
// its light or dark theme) as once the browser has taken it over, in dark and light, with no page errors, and still
// answers the reader afterwards (its first button or slider changes the chart).
//   npm run build && npx astro preview --port 4391, then: node scripts/check-ssr.mjs [http://localhost:4391]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4391";
const docs = "src/content/docs";
const pages = [];
for (const dir of fs.readdirSync(docs, { recursive: true })) {
  const f = path.join(docs, dir);
  if (f.endsWith(".mdx") && fs.readFileSync(f, "utf8").includes("<Demo")) pages.push("/" + dir.replace(/\.mdx$/, "").replace(/index$/, "") + "/");
}
const browser = await chromium.launch();
let failed = 0, checked = 0;
// Whether two screenshots show the same, but for their outermost pixels: the site's 1.2 scale gives a demo a fractional
// size, and its edge row blends with what's next to it by where the page is scrolled.
const cmp = await browser.newPage();
const same = (a, b) => cmp.evaluate(async ([a, b]) => {
  const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = "data:image/png;base64," + s; });
  const [ia, ib] = [await load(a), await load(b)];
  if (ia.width !== ib.width || ia.height !== ib.height) return false;
  const px = (i) => { const c = new OffscreenCanvas(i.width, i.height).getContext("2d"); c.drawImage(i, 0, 0); return c.getImageData(0, 0, i.width, i.height).data; };
  const [da, db] = [px(ia), px(ib)];
  for (let y = 1; y < ia.height - 1; y++) for (let x = 1; x < ia.width - 1; x++) {
    const k = (y * ia.width + x) * 4;
    if (da[k] !== db[k] || da[k + 1] !== db[k + 1] || da[k + 2] !== db[k + 2] || da[k + 3] !== db[k + 3]) return false;
  }
  return true;
}, [a.toString("base64"), b.toString("base64")]);
const fail = (m) => { failed++; console.log("FAIL " + m); };
const shots = async (p) => {
  const out = [];
  await p.mouse.move(1, 1);
  await p.evaluate(() => document.body.normalize()); // a server's "20%" is one text node where a browser makes two
  for (const el of await p.locator(".demo-stage").all()) { await el.scrollIntoViewIfNeeded(); out.push(await el.screenshot({ animations: "disabled" })); }
  return out;
};
for (const scheme of ["dark", "light"]) {
  for (const page of pages.sort()) {
    const opts = { viewport: { width: 1280, height: 900 }, colorScheme: scheme };
    const off = await browser.newContext(opts);
    const plain = await off.newPage();
    await plain.route(/\/_astro\/.*\.js$/, (r) => r.abort());
    await plain.goto(base + page, { waitUntil: "networkidle" });
    const want = await shots(plain);
    const on = await browser.newContext(opts);
    const live = await on.newPage(), errors = [];
    live.on("pageerror", (e) => errors.push(e.message));
    live.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await live.goto(base + page, { waitUntil: "networkidle" });
    // client:visible: each demo is taken over once it's in view
    for (const el of await live.locator(".demo-stage").all()) { await el.scrollIntoViewIfNeeded(); await live.waitForTimeout(150); }
    await live.waitForFunction(() => [...document.querySelectorAll("astro-island")].every((i) => !i.hasAttribute("ssr")), null, { timeout: 5000 }).catch(() => fail(`${page} ${scheme}: an island wasn't taken over`));
    await live.waitForTimeout(300);
    const got = await shots(live);
    checked++;
    if (want.length !== got.length || !want.length) fail(`${page} ${scheme}: ${want.length} demos without script, ${got.length} with`);
    for (let i = 0; i < want.length; i++) if (got[i] && !(await same(want[i], got[i]))) fail(`${page} ${scheme}: demo ${i + 1} looks different once the browser takes it over`);
    if (errors.length) fail(`${page} ${scheme}: ${errors.join(" | ")}`);
    // still live: a demo with controls changes its chart when one is used (tried in turn: a reset button may have
    // nothing to reset yet), or, for one whose bars are its controls, when a bar is clicked
    if (scheme === "dark") for (const stage of await live.locator(".demo-stage").all()) {
      const controls = await stage.locator("button, input[type=range]").all();
      if (!controls.length) continue;
      const chart = () => stage.locator(".rhp-chart").first().innerHTML();
      const before = await chart();
      for (const control of [...controls, stage.locator(".rhp-bar").first()]) {
        if ((await control.getAttribute("type")) === "range") await control.evaluate((i) => { i.value = String(+i.min + (+i.max - +i.min) * 0.9); i.dispatchEvent(new Event("input", { bubbles: true })); });
        else await control.click();
        await live.waitForTimeout(400);
        if ((await chart()) !== before) break;
      }
      if ((await chart()) === before) fail(`${page}: a demo's controls changed nothing after the browser took it over`);
    }
    await off.close(); await on.close();
  }
}
await browser.close();
console.log(`${pages.length} pages with demos, dark and light: ${checked - failed} of ${checked} checks passed`);
process.exit(failed ? 1 : 0);
