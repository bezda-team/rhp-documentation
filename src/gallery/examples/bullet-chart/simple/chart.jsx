import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Tick, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const GOALS = ["Steps", "Sleep", "Water", "Reading"];
const DONE = [86, 104, 58, 115]; // % of each day's goal

// A goal: the track to 120%, the progress along it, the target at 100%, and the percentage at the end.
export const GoalSlat = slat({ css: styles.goal, thickness: { horizontal: 44 } }, (d) => (
  <div>
    <Label edge="start">{d.goal}</Label>
    <Bar to={120} thick="14px" class="track" />
    <Bar to={Math.min(120, d.done)} thick="14px" class="progress" />
    <Tick at={100} thick="26px" class="target" />
    <Label edge="end" class="pct">{Math.round(d.done)}%</Label>
  </div>
));

export default function BulletChart(p) {
  const done = createMemo(() => (p.seed ? GOALS.map(() => rand(40, 125)) : DONE));
  return (
    <Chart orientation={p.o} scale={[0, 120]} ticks={[0, 50, 100]} format={(v) => v + "%"} animate={p.js}>
      <Plot goal={GOALS} done={done()}>{GoalSlat}</Plot>
    </Chart>
  );
}
