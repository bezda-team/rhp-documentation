// Checks the pie's geometry: that a wedge's rim sits on one circle whatever the slices are, and that a wedge takes its
// own share of the 360 degrees. It calls the example's own wedge(), served by the dev server, so it tests the code the
// page runs rather than a copy of it. Paths are measured in the browser, which is what can walk one.
//   npm run dev, then: node scripts/check-pie.mjs [http://localhost:4321]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4321";
const here = new URL("../src/gallery/examples/pie-chart/", import.meta.url).pathname;

// The slices to try: 2 to 10 even ones, then uneven splits that push a wedge to either extreme.
const splits = [];
for (let n = 2; n <= 10; n++) splits.push({ name: `${n} even`, shares: Array.from({ length: n }, () => 100 / n) });
splits.push({ name: "2 lopsided", shares: [97, 3] });
splits.push({ name: "3 lopsided", shares: [90, 7, 3] });
splits.push({ name: "5 uneven", shares: [45, 25, 15, 10, 5] });
splits.push({ name: "10 with slivers", shares: [55, 20, 9, 5, 3, 2, 2, 2, 1, 1] });

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(`${base}/gallery/pie-chart/`, { waitUntil: "networkidle" });

await page.addScriptTag({ content: `
// Walks a path and reports its rim: for each degree it reaches, the furthest it gets. The rim is the run of degrees
// sitting on the full radius; a degree that only holds a straight edge falls short and is not part of it. A degree
// inside that run which falls short is the thing worth failing on, because it means the rim is not a circle.
window.measure = (d, from) => {
  const svg = document.querySelector("svg");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  svg.appendChild(p);
  const len = p.getTotalLength();
  const far = new Map();
  let max = 0;
  for (let i = 0; i <= 6000; i++) {
    const q = p.getPointAtLength((i / 6000) * len);
    const r = Math.hypot(q.x, q.y);
    let deg = (Math.atan2(q.x, -q.y) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    const key = Math.round((deg - from * 3.6 + 360) % 360);
    if (r > (far.get(key) ?? 0)) far.set(key, r);
    if (r > max) max = r;
  }
  p.remove();
  const on = [...far.entries()].filter(([, r]) => r > max - 0.05).map(([k]) => k).sort((x, y) => x - y);
  if (!on.length) return { max, dip: 0, span: 0, gaps: 0 };
  const lo = on[0], hi = on[on.length - 1];
  let dip = 0, gaps = 0;
  for (const [k, r] of far) {
    if (k > lo && k < hi && r < max - 0.05) { dip = Math.max(dip, max - r); gaps++; }
  }
  return { max, dip, span: hi - lo, gaps };
};
` });

let failed = 0, checked = 0;
const fail = (msg) => { failed++; console.log("FAIL " + msg); };

for (const version of ["poster", "simple"]) {
  const mod = `/@fs${here}${version}/chart.jsx`;
  for (const { name, shares } of splits) {
    let at = 0;
    const spans = [];
    const wedges = shares.map((s) => { const w = [at, at + s]; at += s; return w; });
    const got = await page.evaluate(async ([mod, wedges]) => {
      const { wedge } = await import(mod);
      return wedges.map(([from, to]) => {
        const d = wedge(from, to);
        if (!/^[-\d.,A-Za-z ]+$/.test(d) || /NaN|Infinity/.test(d)) return { d, bad: true };
        return { ...window.measure(d, from), bad: false };
      });
    }, [mod, wedges]);

    checked++;
    const bad = got.find((g) => g.bad);
    if (bad) { fail(`${version} ${name}: wedge path is not a number: ${String(bad.d).slice(0, 60)}`); continue; }

    // one circle: every wedge's rim at the same radius, and each wedge's own rim flat to that radius
    const radii = got.map((g) => g.max);
    const spread = Math.max(...radii) - Math.min(...radii);
    const worstDip = Math.max(...got.map((g) => g.dip));
    if (spread > 0.05) fail(`${version} ${name}: wedges sit on different circles, ${spread.toFixed(3)} apart`);
    else if (worstDip > 0.05) fail(`${version} ${name}: a rim dips ${worstDip.toFixed(3)} off its circle part way along`);

    // each wedge takes its own share of the 360: the gap is the same at every boundary, so it cancels in a difference
    const deg = shares.map((s) => (s / 100) * 360);
    const off = got.map((g, i) => deg[i] - g.span);
    const offSpread = Math.max(...off) - Math.min(...off);
    const measurable = got.filter((g, i) => g.span > 2).length;
    if (measurable === got.length && offSpread > 1.2) {
      fail(`${version} ${name}: a wedge is not its share of the circle, boundaries differ by ${offSpread.toFixed(2)} degrees`);
    }
  }
}

console.log(errors.length ? `page errors: ${errors.join(" | ")}` : "");
console.log(failed ? `${failed} of ${checked} failed` : `${checked} of ${checked} checks passed: the pie is one circle from 2 to 10 slices, and every wedge is its share of it`);
await browser.close();
process.exit(failed || errors.length ? 1 : 0);
