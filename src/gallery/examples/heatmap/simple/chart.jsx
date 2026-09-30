import { createMemo } from "solid-js";
import { Chart, Plot, Cell, Label, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = 12; // 8:00 to 19:00

// An hour: a Cell colored on the Chart's scale, from the theme's low color to its high one, in the element that is the slat.
export const CellSlat = slat({ css: styles.cell }, (h) => <div><Cell value={h.v} title={`${h.v}`} part="mark" class="cell" /></div>);

// A day: its name, and a Plot across the day's band, one cell per hour.
export const DaySlat = slat({ thickness: { horizontal: 28 } }, (d) => (
  <div>
    <Label edge="start" part="name">{d.day}</Label>
    <Plot orientation="across" v={d.hours}>{CellSlat}</Plot>
  </div>
));

export default function Heatmap(p) {
  const hours = createMemo(() => (p.seed(), DAYS.map((_, day) => Array.from({ length: HOURS }, (_, h) =>
    Math.round(Math.max(0, 80 * Math.exp(-((h - 5 - (day > 4 ? 1 : 0)) ** 2) / 8) + rand(0, 20) - (day > 4 ? 20 : 0)))))));
  return (
    <Chart orientation={p.o()} scale={[0, 100]} ticks={false} animate={p.js()}>
      <Plot day={DAYS} hours={hours()}>{DaySlat}</Plot>
    </Chart>
  );
}
