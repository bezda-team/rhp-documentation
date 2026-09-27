import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Tick, Label, slat, summary } from "@bezda/rhp";
import { normalsIn } from "@gallery/random.js";
import * as styles from "./styles.js";

const GROUPS = ["A", "B", "C", "D", "E"];

// A group: whiskers from low to high, the box from the first quartile to the third, and a tick at the median.
export const BoxSlat = slat({ css: styles.box, band: { horizontal: 44 } }, (d) => {
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
  const samples = createMemo(() => (p.seed(), GROUPS.map((_, i) => normalsIn(40, 0, 70, 22 + i * 6, 4 + i))));
  return (
    <Chart orientation={p.o()} scale={[0, 70]} animate={p.js()}>
      <Plot name={GROUPS} samples={samples()}>{BoxSlat}</Plot>
    </Chart>
  );
}
