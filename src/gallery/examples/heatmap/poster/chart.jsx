import { createMemo, createSignal, Show } from "solid-js";
import { Plot, Chart, Label, Cell, slat, useOrientation } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// An hour: its Cell carries its day and hour, so the chart knows which one is under the pointer. While one is, only
// its day and its hour keep their color.
const HourCell = (day) => (h) => {
  const o = useOrientation(); // the cells' own orientation: across the day's
  const lit = () => day.pickedDay < 0 || day.pickedDay === day.index || day.pickedHour === h.index;
  return (
    <div>
      <Cell value={h.v} data-day={day.index} data-hour={h.index} class={lit() ? "cell" : "cell faded"} />
      <Show when={day.index === 0 && h.index % 3 === 0}>
        <Label edge={o() === "vertical" ? "end" : "start"} class="hour">{h.index}</Label>
      </Show>
    </div>
  );
};

export const DayRow = slat({
  thickness: { horizontal: 26 },
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
  // The hour under the pointer, read out above the chart.
  const [picked, setPicked] = createSignal(null);
  const point = (e) => { const c = e.target.closest("[data-hour]"); setPicked(c ? [+c.dataset.day, +c.dataset.hour] : null); };
  const readout = () => {
    const at = picked();
    if (!at) return "Point at an hour to read it.";
    const [day, hour] = at;
    return `${DAYS[day]} ${String(hour).padStart(2, "0")}:00 · ${Math.round(hours()[day][hour])} visitors`;
  };
  return (
    <div onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setPicked(null)}>
      <p class="heat-readout" aria-live="polite">{readout()}</p>
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={320} animate={p.js()}>
        <Plot day={DAYS} hours={hours()} pickedDay={picked()?.[0] ?? -1} pickedHour={picked()?.[1] ?? -1}>{DayRow}</Plot>
      </Chart>
    </div>
  );
}
