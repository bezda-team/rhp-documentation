import { createMemo, createSignal, Show } from "solid-js";
import { Plot, Chart, Label, Cell, Poster, slat, useOrientation } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// An hour. Its slat carries its day and hour, so the poster can tell which hour is under the pointer.
// The slat covers the gap around its Cell too, so the pointer is always over some hour.
// While an hour is pointed at, only its day and its hour keep their color.
const HourCell = (day) => (h) => {
  const o = useOrientation(); // the cells' own orientation: across the day's
  const lit = () => day.pickedDay < 0 || day.pickedDay === day.index || day.pickedHour === h.index;
  return (
    <div data-day={day.index} data-hour={h.index}>
      <Cell value={h.v} class={lit() ? "cell" : "cell faded"} />
      <Show when={day.index === 0 && h.index % 3 === 0}>
        <Label edge={o() === "vertical" ? "end" : "start"} class="hour">{h.index}</Label>
      </Show>
    </div>
  );
};

export const DayRow = slat({
  thickness: { horizontal: 26 },
  // day names at the start; hour numbers over the first slat (horizontal) or left of the first one (vertical)
  room: { horizontal: { start: 40, before: 18 }, vertical: { start: 24, before: 30 } },
  css: styles.dayRow,
}, (d) => (
  <div class="slat">
    <Label edge="start">{d.day}</Label>
    <Plot orientation="across" v={d.hours}>{HourCell(d)}</Plot>
  </div>
));

export default function Heatmap(p) {
  const hours = createMemo(() => {
    const next = numbers(p.seed), rand = (a, b) => a + next() * (b - a);
    return DAYS.map((_, day) => Array.from({ length: 24 }, (_, h) =>
      Math.max(0, 70 * Math.exp(-((h - 13 - (day > 4 ? 2 : 0)) ** 2) / 18) + rand(0, 30) - (day > 4 ? 15 : 0))));
  });
  // The hour under the pointer, read out in the dek on one line, so the chart never moves.
  const [picked, setPicked] = createSignal(null);
  const point = (e) => { const c = e.target.closest("[data-hour]"); setPicked(c ? [+c.dataset.day, +c.dataset.hour] : null); };
  const dek = () => {
    const at = picked();
    if (!at) return "Weekdays peak at 1 pm, weekends at 3 pm.";
    const [day, hour] = at;
    return `${DAYS[day]} ${String(hour).padStart(2, "0")}:00 · ${Math.round(hours()[day][hour])} visitors`;
  };
  return (
    <Poster look="heat" kicker="An online shop · visitors per hour" title="Lunch break is rush hour" dek={dek()}
      note="Point at an hour to read it. Illustrative data."
      onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setPicked(null)}>
      <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={320} animate={p.js} theme={styles.theme}>
        <Plot day={DAYS} hours={hours()} pickedDay={picked()?.[0] ?? -1} pickedHour={picked()?.[1] ?? -1}>{DayRow}</Plot>
      </Chart>
    </Poster>
  );
}
