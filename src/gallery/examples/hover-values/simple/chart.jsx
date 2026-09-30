import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const VISITS = [42, 38, 51, 47, 63, 88, 71];

// A day: its name, its bar, and its value, which shows when you hover the day.
export const RowSlat = slat({ css: styles.slat }, (d) => (
  <div class="slat">
    <Label edge="start" part="name">{d.day}</Label>
    <Bar to={d.visits} thick="12px" part="mark" class="bar" />
    <Label at={d.visits} part="value" class="value"><span>{Math.round(d.visits)}</span></Label>
  </div>
));

export default function HoverValues(p) {
  const visits = createMemo(() => (p.seed() ? DAYS.map(() => Math.round(rand(20, 95))) : VISITS));
  return (
    <Chart orientation={p.o()} scale={[0, 100]} animate={p.js()}>
      <Plot day={DAYS} visits={visits()}>{RowSlat}</Plot>
    </Chart>
  );
}
