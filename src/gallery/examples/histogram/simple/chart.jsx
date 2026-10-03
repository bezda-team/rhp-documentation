import { createMemo, Show } from "solid-js";
import { Chart, Plot, Bar, Label, slat, bins, nice } from "@bezda/rhp";
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());

// 500 samples around 50, counted in bins 5 wide from 0 to 100.
const samples = (next) => Array.from({ length: 500 }, () => normal(next, 50, 14));

// A bin: a Bar as tall as its count, and every other bin's lower edge at the start.
export const BinSlat = slat({ css: styles.bin, inset: "1px" }, (d) => (
  <div class="bin">
    <Bar to={d.tally} class="bar" />
    <Show when={d.index % 2 === 0}><Label edge="start" class="edge">{d.x0}</Label></Show>
  </div>
));

export default function Histogram(p) {
  const b = createMemo(() => bins(samples(numbers(p.seed)), { domain: [0, 100], count: 20 })); // { x0, x1, tally }
  return (
    <Chart orientation={p.o} scale={[0, nice(0, Math.max(...b().tally)).max]} animate={p.js}>
      <Plot x0={b().x0} x1={b().x1} tally={b().tally}>{BinSlat}</Plot>
    </Chart>
  );
}
