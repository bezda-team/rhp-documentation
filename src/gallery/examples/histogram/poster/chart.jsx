import { createMemo, Show } from "solid-js";
import { Plot, Chart, Bar, Label, Poster, slat, nice, bins } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());

// A bin's color for its temperature: cool blue through sand to hot red.
const WARMTH = [[4, [59, 130, 196]], [14, [120, 181, 196]], [20, [233, 196, 106]], [27, [238, 129, 72]], [34, [196, 52, 44]]];
const warmth = (t) => {
  const k = Math.min(WARMTH.length - 1, Math.max(1, WARMTH.findIndex(([x]) => x >= t))), [x0, c0] = WARMTH[k - 1], [x1, c1] = WARMTH[k];
  const f = Math.min(1, Math.max(0, (t - x0) / (x1 - x0)));
  return `rgb(${c0.map((c, i) => Math.round(c + (c1[i] - c) * f)).join(" ")})`;
};
// A mild coastal city: 365 daily highs around a seasonal swing.
const year = (next) => Array.from({ length: 365 }, (_, day) => 17.5 + 7 * Math.sin((2 * Math.PI * (day - 110)) / 365) + normal(next, 0, 2.2));

export const BinSlat = slat({
  thickness: { horizontal: 20 },
  inset: "1.5px",
  room: { horizontal: { start: 40, end: 40 }, vertical: { start: 26, end: 22 } },
  css: styles.bin,
}, (d) => (
  <div class="slat">
    <Bar to={d.tally} color={warmth((d.x0 + d.x1) / 2)} class="bin" />
    <Show when={d.x0 % 4 === 0}><Label edge="start" class="deg">{d.x0}°</Label></Show>
    <Label at={d.tally} class="days"><span>{d.tally}</span></Label>
  </div>
));

export default function Histogram(p) {
  const b = createMemo(() => bins(year(numbers(p.seed)), { domain: [4, 34], count: 15 })); // 2 °C bins: { x0, x1, tally }
  const hottestFirst = b().x0.map((_, i) => b().x0.length - 1 - i);
  return (
    <Poster look="weather" kicker="A year of daily highs · °C" title="365 afternoons"
      dek={<>How many days reached each temperature. <span class="heat-key">cool<i />hot</span></>} note="Illustrative data; hover a bar for its count of days.">
      <Chart orientation={p.o} scale={[0, nice(0, Math.max(...b().tally)).max]} format={(v) => v + " d"} height={300} animate={p.js} theme={styles.theme}>
        <Plot x0={b().x0} x1={b().x1} tally={b().tally} order={p.o === "horizontal" ? hottestFirst : undefined}>{BinSlat}</Plot>
      </Chart>
    </Poster>
  );
}
