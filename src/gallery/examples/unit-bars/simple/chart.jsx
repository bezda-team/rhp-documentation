import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const CUPS = [3, 5, 2, 6, 4]; // cups of coffee

// A cup: a Bar one unit long, at its place in the slat.
export const UnitSlat = slat({ css: styles.unit }, (u) => <Bar from={u.index} to={u.index + 1} class="unit" />);

// A day: its name, as many units as its count (an overlap Plot with that many slats), and the count.
export const DaySlat = slat({ css: styles.day }, (d) => (
  <div>
    <Label edge="start">{d.day}</Label>
    <Plot overlap slats={Math.round(d.cups)}>{UnitSlat}</Plot>
    <Label at={d.cups} class="count">{Math.round(d.cups)}</Label>
  </div>
));

export default function UnitBars(p) {
  const cups = createMemo(() => (p.seed ? DAYS.map(() => Math.round(rand(1, 8))) : CUPS));
  return (
    <Chart orientation={p.o} scale={[0, 8]} animate={p.js}>
      <Plot day={DAYS} cups={cups()}>{DaySlat}</Plot>
    </Chart>
  );
}
