import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CHANGE = [4, -2, 6, 3, -5, 7, 2, -3, 5, 1, -4, 8]; // % change on the month before

// A month: a Bar from 0 to its change, up or down, and the change past its end (before it when negative).
export const MonthSlat = slat({ css: styles.month }, (d) => (
  <div class={d.change < 0 ? "down" : "up"}>
    <Label edge="start">{d.month}</Label>
    <Bar to={d.change} class="bar" />
    <Label at={d.change} side={d.change < 0 ? "before" : undefined} class="value">{Math.round(d.change)}</Label>
  </div>
));

export default function DivergingBars(p) {
  const change = createMemo(() => (p.seed ? MONTHS.map(() => Math.round(rand(-8, 9))) : CHANGE));
  return (
    <Chart orientation={p.o} scale={[-10, 10]} format={(v) => v + "%"} animate={p.js}>
      <Plot month={MONTHS} change={change()}>{MonthSlat}</Plot>
    </Chart>
  );
}
