import { createMemo, Show } from "solid-js";
import { Plot, Chart, Label, Cell, slat, useOrientation } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HourCell = (day) => (h) => {
  const o = useOrientation(); // the cells' own orientation: across the day's
  return (
    <div>
      <Cell value={h.v} title={`${day.day} ${h.index}:00, ${Math.round(h.v)}`} />
      <Show when={day.index === 0 && h.index % 3 === 0}>
        <Label edge={o() === "vertical" ? "end" : "start"} class="hour">{h.index}</Label>
      </Show>
    </div>
  );
};

export const DayRow = slat({
  band: { horizontal: 26 },
  // day names at the start; hour numbers over the first row (horizontal) or left of the first column (vertical)
  room: { horizontal: { start: 40, before: 18 }, vertical: { start: 24, before: 30 } },
  css: styles.dayRow,
}, (d) => (
  <div class="slat">
    <Label edge="start">{d.day}</Label>
    <Plot orientation="across" v={d.hours}>{HourCell(d)}</Plot>
  </div>
));

export default function Heatmap(p) {
  const hours = createMemo(() => (p.seed(), DAYS.map((_, day) => Array.from({ length: 24 }, (_, h) =>
    Math.max(0, 70 * Math.exp(-((h - 13 - (day > 4 ? 2 : 0)) ** 2) / 18) + rand(0, 30) - (day > 4 ? 15 : 0))))));
  return (
    <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={320} animate={p.js()}>
      <Plot day={DAYS} hours={hours()}>{DayRow}</Plot>
    </Chart>
  );
}
