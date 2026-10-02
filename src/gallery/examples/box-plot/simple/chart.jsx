import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Tick, Label, slat, summary } from "@bezda/rhp";
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 12345; return seed ? Math.random : () => (s = (s * 48271) % 2147483647) / 2147483647; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
// n samples of a normal, kept between lo and hi
const normalsIn = (next, n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(next, m, s); if (v >= lo && v <= hi) return v; } });

const GROUPS = ["A", "B", "C", "D", "E"];

// A group: whiskers from low to high, the box from the first quartile to the third, and a tick at the median.
export const BoxSlat = slat({ css: styles.box, thickness: { horizontal: 44 } }, (d) => {
  const s = createMemo(() => summary(d.samples)); // { low, q1, median, q3, high, … }
  return (
    <div>
      <Label edge="start">{d.name}</Label>
      <Bar from={s().low} to={s().high} thick="2px" class="whisker" />
      <Bar from={s().q1} to={s().q3} class="box" />
      <Tick at={s().median} class="median" />
    </div>
  );
});

export default function BoxPlot(p) {
  const samples = createMemo(() => { const next = numbers(p.seed); return GROUPS.map((_, i) => normalsIn(next, 40, 0, 70, 22 + i * 6, 4 + i)); });
  return (
    <Chart orientation={p.o} scale={[0, 70]} animate={p.js}>
      <Plot name={GROUPS} samples={samples()}>{BoxSlat}</Plot>
    </Chart>
  );
}
