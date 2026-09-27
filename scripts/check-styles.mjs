// Checks that editing the CSS in every gallery example restyles its chart, the way a reader would do it: in the editor.
// For each example's poster and simple version, and each CSS string in its styles.js, types a rule with its own color
// at the end of that string, then looks for an element in the chart that took it. The heatmaps also get their cell gap
// changed, and their cells measured.
//   npm run dev, then: node scripts/check-styles.mjs [http://localhost:4321] [slug,slug…]
import fs from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4321";
const slugs = process.argv[3]?.split(",") ?? fs.readdirSync(new URL("../src/gallery/examples", import.meta.url)); // or only some: stem-plot,heatmap
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
let failed = 0, checked = 0;

// The CSS strings of the styles editor: each export's name and the line (1-based) that closes its template (`), read
// from the editor's whole document (it renders only the lines in view).
const strings = (pg) => pg.locator(".pg-file").first().evaluate((file) => {
  const doc = file.editor.state.doc, out = [];
  let name = null;
  for (let n = 1; n <= doc.lines; n++) {
    const text = doc.line(n).text, open = text.match(/export const (\w+) = `/);
    if (open && !text.trimEnd().endsWith("`;")) name = open[1];
    else if (name && text.trimStart().startsWith("`")) { out.push({ name, line: n }); name = null; }
  }
  return out;
});

// Types `text` at the start of the editor's line `line`, as a reader would: the cursor goes there (scrolled into view),
// and the keys are typed once the editor has the focus. What landed is read back: a lost key is the harness's error,
// not a chart that didn't restyle (a rule missing a character changes nothing).
async function typeAt(pg, line, text) {
  const file = pg.locator(".pg-file").first();
  await file.evaluate((file, line) => {
    const v = file.editor;
    v.dispatch({ selection: { anchor: v.state.doc.line(line).from }, scrollIntoView: true });
    v.focus();
  }, line);
  await file.evaluate((file) => new Promise((done) => { const wait = () => (file.editor.hasFocus ? done() : requestAnimationFrame(wait)); wait(); }));
  // A key every 15 ms, like a fast typist: with no delay at all, a key that comes while the chart restyles from the one
  // before can be missed by the editor (it reads what was typed from the page), where a person's keys, some 100 ms
  // apart, never are.
  await page.keyboard.type(text, { delay: 15 });
  const typed = await file.evaluate((file, [line, n]) => { const d = file.editor.state.doc; return Array.from({ length: n }, (_, k) => d.line(line + k).text).join("\n"); },
    [line, text.split("\n").length - 1]);
  if (typed !== text.replace(/\n$/, "")) throw new Error(`check-styles: typed ${JSON.stringify(text)} but the editor has ${JSON.stringify(typed)}`);
}

for (const slug of slugs) {
  await page.goto(`${base}/gallery/${slug}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  for (const version of ["poster", "simple"]) {
    const pg = page.locator(`.playground[data-version="${version}"]`);
    const list = await strings(pg);
    for (let k = list.length - 1; k >= 0; k--) { // bottom first, so the line numbers above stay put
      const { name, line } = list[k], color = `rgb(1, ${k + 2}, ${version === "poster" ? 3 : 4})`;
      await typeAt(pg, line, `* { outline: 7px solid ${color} }\n`);
      // the color alone: a zoomed chart (the dots) reports its outline's width zoomed
      const took = () => pg.locator(".pg-preview").evaluate((prev, color) =>
        [...prev.querySelectorAll(".rhp-chart *")].some((e) => { const s = getComputedStyle(e); return s.outlineColor === color && s.outlineStyle === "solid"; }), color);
      // Up to a second for the chart to restyle: an animated poster (the bell) can keep the page busy for a moment.
      let hit = false;
      for (const t0 = Date.now(); !hit && Date.now() - t0 < 1000; ) hit = await took() || (await page.waitForTimeout(50), false);
      if (!hit) { // some slats are drawn only under the pointer (the candles' crosshair): point at the chart and look again
        const chart = await pg.locator(".rhp-chart").first().boundingBox();
        await page.mouse.move(chart.x + chart.width / 2, chart.y + chart.height / 2);
        await page.waitForTimeout(200);
        hit = await took();
        await page.mouse.move(0, 0);
      }
      checked++;
      if (!hit) { failed++; console.log(`FAIL ${slug} ${version}: editing \`${name}\` changed nothing in the chart`); }
    }
  }
  if (slug === "heatmap") { // the cell gap: from what styles.js says to 6px, and the cells shrink by the difference
    for (const version of ["poster", "simple"]) {
      await page.goto(`${base}/gallery/${slug}/`, { waitUntil: "networkidle" }); await page.waitForTimeout(600);
      const pg = page.locator(`.playground[data-version="${version}"]`);
      const size = () => pg.locator(".rhp-cell").first().evaluate((c) => Math.round(c.getBoundingClientRect().height * 10) / 10);
      const before = await size();
      const { line } = (await strings(pg)).find((s) => s.name === (version === "poster" ? "dayRow" : "cell"));
      await typeAt(pg, line, `.cell { --rhp-cell-gap: 6px; }\n`);
      await page.waitForTimeout(150);
      const after = await size();
      checked++;
      const gap = version === "poster" ? 1 : 2, want = Math.round((before - 2 * (6 - gap)) * 10) / 10;
      if (Math.abs(after - want) > 0.6) { failed++; console.log(`FAIL heatmap ${version}: gap to 6px made a cell ${before}px -> ${after}px tall, want ${want}px`); }
    }
  }
}
await browser.close();
if (errors.length) { failed += errors.length; console.log("page errors:", errors); }
console.log(`${checked - failed} of ${checked} checks passed`);
process.exit(failed ? 1 : 0);
