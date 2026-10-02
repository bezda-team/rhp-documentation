import { createMemo } from "solid-js";
import { Chart, Plot, Dot, Tick, Label, slat } from "@bezda/rhp";
import { random, sum } from "@gallery/random.js";
import * as styles from "./styles.js";

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
  const values = createMemo(() => { const { normalsIn } = random(p.seed()); return [normalsIn(30, 0, 20, 11, 3), normalsIn(30, 0, 20, 7, 2.5)]; });
  return (
    <Chart orientation={p.o()} scale={[0, 20]} format={(v) => v + " d"} animate={p.js()}>
      <Plot name={GROUPS} values={values()}>{GroupSlat}</Plot>
    </Chart>
  );
}
