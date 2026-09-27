import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Dot, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// A sample: a Bar from 0 to its value, and a Dot at the value.
export const StemSlat = slat({ css: styles.stem, band: { horizontal: 14 }, room: { start: 8, end: 8 } }, (d) => (
  <div>
    <Bar to={d.y} thick="2px" class="stem" />
    <Dot at={d.y} size="8px" class="tip" />
  </div>
));

export default function StemPlot(p) {
  // a wave that fades: a new one, of another frequency, with New data
  const y = createMemo(() => { const w = p.seed() ? rand(0.3, 0.9) : 0.55; return Array.from({ length: 28 }, (_, k) => Math.cos(k * w) * Math.exp(-k / 14)); });
  return (
    <Chart orientation={p.o()} scale={[-1, 1]} ticks={[-1, 0, 1]} animate={p.js()}>
      <Plot y={y()}>{StemSlat}</Plot>
    </Chart>
  );
}
