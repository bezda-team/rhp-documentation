import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const STAGES = ["Phase I", "Phase II", "Phase III", "Review"];
const SHARE = [63.2, 30.7, 58.1, 85.3]; // % of drugs that clear each stage

// A stage: the ring it runs in, the arc that sweeps its share, and the share at the end of the arc.
// Upright, the CSS reads rhp's --rhp-hi (0 to 1 along the scale) as an angle; flat, it stays a length.
export const StageSlat = slat({ css: styles.stage, thickness: { horizontal: 40 }, room: { horizontal: { start: 4, end: 52 }, vertical: { start: 6, end: 6 } } }, (d) => (
  <div class="slat">
    <div class="track" />
    <Bar to={d.share} class="arc" />
    <Label at={0} class="name">{d.stage}</Label>
    <Label at={d.share} class="share">{Math.round(d.share)}%</Label>
  </div>
));

export default function RadialBars(p) {
  const share = createMemo(() => (p.seed() ? STAGES.map(() => rand(20, 95)) : SHARE));
  return (
    <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={330} animate={p.js()}>
      <Plot stage={STAGES} share={share()}>{StageSlat}</Plot>
    </Chart>
  );
}
