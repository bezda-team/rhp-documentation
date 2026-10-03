import { createMemo } from "solid-js";
import { Chart, Plot, Cell, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = 12; // 8:00 to 19:00

// An hour: a Cell colored on the Chart's scale, from the theme's low color to its high one, in the element that is the slat.
export const CellSlat = slat({ css: styles.cell }, (h) => <div><Cell value={h.v} title={`${h.v}`} class="cell" /></div>);

// A day: its name, and a Plot across the day's band, one cell per hour.
export const DaySlat = slat({ thickness: { horizontal: 28 } }, (d) => (
  <div>
    <Label edge="start">{d.day}</Label>
    <Plot orientation="across" v={d.hours}>{CellSlat}</Plot>
  </div>
));

export default function Heatmap(p) {
  const hours = createMemo(() => {
    const next = numbers(p.seed), rand = (a, b) => a + next() * (b - a);
    return DAYS.map((_, day) => Array.from({ length: HOURS }, (_, h) =>
      Math.round(Math.max(0, 80 * Math.exp(-((h - 5 - (day > 4 ? 1 : 0)) ** 2) / 8) + rand(0, 20) - (day > 4 ? 20 : 0)))));
  });
  return (
    <Chart orientation={p.o} scale={[0, 100]} ticks={false} animate={p.js}>
      <Plot day={DAYS} hours={hours()}>{DaySlat}</Plot>
    </Chart>
  );
}
