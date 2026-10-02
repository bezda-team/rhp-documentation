import { createMemo } from "solid-js";
import { Chart, Plot, Dot, Tick, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const sum = (list) => list.reduce((a, b) => a + b, 0);
// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 12345; return seed ? Math.random : () => (s = (s * 48271) % 2147483647) / 2147483647; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
// n samples of a normal, kept between lo and hi
const normalsIn = (next, n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(next, m, s); if (v >= lo && v <= hi) return v; } });

const GROUPS = ["Control", "Treated"];

// A sample: a Dot at its value, at a fixed place across the band (from its index, so it stays put).
export const PointSlat = slat({ css: styles.point }, (s) => <Dot at={s.at} across={0.15 + ((s.index * 0.618) % 1) * 0.7} size="9px" class="point" />);

// A group: its name, its samples in one band (an overlap Plot), and a Tick at their mean.
export const GroupSlat = slat({ css: styles.group, thickness: { horizontal: 80 } }, (d) => (
  <div>
    <Label edge="start">{d.name}</Label>
    <Plot overlap at={d.values}>{PointSlat}</Plot>
    <Tick at={sum(d.values) / d.values.length} thick={0.9} class="mean" />
  </div>
));

export default function StripPlot(p) {
  const values = createMemo(() => { const next = numbers(p.seed); return [normalsIn(next, 30, 0, 20, 11, 3), normalsIn(next, 30, 0, 20, 7, 2.5)]; });
  return (
    <Chart orientation={p.o} scale={[0, 20]} format={(v) => v + " d"} animate={p.js}>
      <Plot name={GROUPS} values={values()}>{GroupSlat}</Plot>
    </Chart>
  );
}
