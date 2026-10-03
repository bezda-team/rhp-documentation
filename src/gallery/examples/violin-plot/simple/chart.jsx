import { createMemo } from "solid-js";
import { Chart, Plot, Dot, Label, Area, slat, density, summary } from "@bezda/rhp";
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
// n samples of a normal, kept between lo and hi
const normalsIn = (next, n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(next, m, s); if (v >= lo && v <= hi) return v; } });

const GROUPS = ["Morning", "Afternoon", "Evening"];

// A group: a mirrored Area from density() (a smooth count of its samples along the scale), and a Dot at its median.
export const ViolinSlat = slat({ css: styles.violin, thickness: { horizontal: 80 } }, (d) => {
  const shape = createMemo(() => density(d.samples)); // [[value, density], …]
  const median = createMemo(() => summary(d.samples).median);
  return (
    <div>
      <Label edge="start">{d.name}</Label>
      <Area points={shape()} mirror class="shape" />
      <Dot at={median()} size="9px" class="median" />
    </div>
  );
});

export default function ViolinPlot(p) {
  const samples = createMemo(() => { const next = numbers(p.seed); return [normalsIn(next, 80, 0, 60, 18, 6), normalsIn(next, 80, 0, 60, 34, 9), normalsIn(next, 80, 0, 60, 26, 5)]; });
  return (
    <Chart orientation={p.o} scale={[0, 60]} format={(v) => v + " min"} animate={p.js}>
      <Plot name={GROUPS} samples={samples()}>{ViolinSlat}</Plot>
    </Chart>
  );
}
