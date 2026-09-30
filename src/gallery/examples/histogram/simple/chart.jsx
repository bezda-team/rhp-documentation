import { createMemo, Show } from "solid-js";
import { Chart, Plot, Bar, Label, slat, bins, nice } from "@bezda/rhp";
import { normal } from "@gallery/random.js";
import * as styles from "./styles.js";

// 500 samples around 50, counted in bins 5 wide from 0 to 100.
const samples = () => Array.from({ length: 500 }, () => normal(50, 14));

// A bin: a Bar as tall as its count, and every other bin's lower edge at the start.
export const BinSlat = slat({ css: styles.bin, inset: "1px" }, (d) => (
  <div class="bin">
    <Bar to={d.tally} part="mark" class="bar" />
    <Show when={d.index % 2 === 0}><Label edge="start" part="name" class="edge">{d.x0}</Label></Show>
  </div>
));

export default function Histogram(p) {
  const b = createMemo(() => (p.seed(), bins(samples(), { domain: [0, 100], count: 20 }))); // { x0, x1, tally }
  return (
    <Chart orientation={p.o()} scale={[0, nice(0, Math.max(...b().tally)).max]} animate={p.js()}>
      <Plot x0={b().x0} x1={b().x1} tally={b().tally}>{BinSlat}</Plot>
    </Chart>
  );
}
