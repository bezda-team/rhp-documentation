import { createMemo } from "solid-js";
import { Chart, Plot, Dot, Label, Area, slat, density, summary } from "@bezda/rhp";
import { normalsIn } from "@gallery/random.js";
import * as styles from "./styles.js";

const GROUPS = ["Morning", "Afternoon", "Evening"];

// A group: a mirrored Area from density() (a smooth count of its samples along the scale), and a Dot at its median.
export const ViolinSlat = slat({ css: styles.violin, thickness: { horizontal: 80 } }, (d) => {
  const shape = createMemo(() => density(d.samples)); // [[value, density], …]
  const median = createMemo(() => summary(d.samples).median);
  return (
    <div>
      <Label edge="start" part="name">{d.name}</Label>
      <Area points={shape()} mirror part="mark" class="shape" />
      <Dot at={median()} size="9px" part="note" class="median" />
    </div>
  );
});

export default function ViolinPlot(p) {
  const samples = createMemo(() => (p.seed(), [normalsIn(80, 0, 60, 18, 6), normalsIn(80, 0, 60, 34, 9), normalsIn(80, 0, 60, 26, 5)]));
  return (
    <Chart orientation={p.o()} scale={[0, 60]} format={(v) => v + " min"} animate={p.js()}>
      <Plot name={GROUPS} samples={samples()}>{ViolinSlat}</Plot>
    </Chart>
  );
}
