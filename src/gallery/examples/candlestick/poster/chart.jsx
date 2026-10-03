import { createSignal, createMemo, Show } from "solid-js";
import { Plot, Chart, Bar, Tick, Label, Poster, slat, nice } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

const dollars = (v) => "$" + v.toFixed(v < 100 ? 2 : 0);

// A day: the wick over the day's range, the body from the open to the close; teal up, claret down.
// Its root carries data-day, so the poster knows which day is under the pointer; that day's band is shaded.
export const DaySlat = slat({
  thickness: { horizontal: 15 },
  room: { horizontal: { start: 24, end: 64 }, vertical: { start: 10, end: 30 } }, // the axis numbers read "$42.5"; vertical, the last price's badge can stand 28px above the top
  css: styles.day,
}, (d) => {
  const color = () => (d.close >= d.open ? "#0d7680" : "#990f3d");
  return (
    <div class="day" data-day={d.index}>
      <Bar from={d.low} to={d.high} thick="1.5px" class="wick" />
      <Bar from={d.open} to={d.close} thick={0.72} color={color()} class="body" />
      <Show when={d.latest}><Label at={d.close} class="last" style={{ "--rhp-color": color() }}>{dollars(d.close)}</Label></Show>
    </div>
  );
});

// The day under the pointer: a dashed line across the chart at its close, and its price over the axis numbers.
// It draws in the axis gutter, so it asks for no room of its own (a top-level Plot whose slat gives none gets the default gutters).
export const CrossSlat = slat({
  room: {},
  css: styles.cross,
}, (c) => (
  <div>
    <Tick at={c.close} thick={1} class="cross" />
    <Label at={c.close} class="price">{dollars(c.close)}</Label>
  </div>
));

export default function Candles(p) {
  const days = createMemo(() => {
    const next = numbers(p.seed), rand = (a, b) => a + next() * (b - a);
    let price = 48;
    return Array.from({ length: 22 }, (_, i) => {
      const open = price, close = Math.max(20, open + rand(-3.2, 3.6));
      price = close;
      return { open, close, low: Math.min(open, close) - rand(0.2, 2.2), high: Math.max(open, close) + rand(0.2, 2.2), latest: i === 21 };
    });
  });
  const range = createMemo(() => nice(Math.min(...days().map((d) => d.low)), Math.max(...days().map((d) => d.high)), 4)); // fitted to the month
  // The day under the pointer (when it moves: the readout's height may change under a still one); the readout shows it,
  // or the latest day.
  const [day, setDay] = createSignal(null);
  const point = (e) => { const i = e.target.closest("[data-day]")?.dataset.day; setDay(i == null ? null : +i); };
  const read = createMemo(() => {
    const i = day() ?? days().length - 1, d = days()[i], before = i ? days()[i - 1].close : d.open;
    return { ...d, day: i + 1, change: ((d.close - before) / before) * 100 };
  });
  return (
    <Poster look="market" kicker="Share price · daily" title="A month on the market" dek="Each candle is a day: its body runs from the open to the close, its wick covers the day's range."
      note="Illustrative data. Point at a day for its prices." onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setDay(null)}>
      <p class="ohlc">
        <b>Day {read().day}</b><span>Open {dollars(read().open)}</span><span>High {dollars(read().high)}</span><span>Low {dollars(read().low)}</span>
        <span>Close <b class={read().change >= 0 ? "up" : "down"}>{dollars(read().close)} {read().change >= 0 ? "▲" : "▼"} {Math.abs(read().change).toFixed(1)}%</b></span>
      </p>
      <Chart orientation={p.o} scale={[range().min, range().max]} ticks={range().ticks} format={(v) => "$" + v} height={300} animate={p.js} theme={styles.theme}>
        <Plot rows={days()}>{DaySlat}</Plot>
        <Plot overlap slats={day() == null ? 0 : 1} close={days()[day()]?.close} style={{ "pointer-events": "none" }}>{CrossSlat}</Plot>
      </Chart>
    </Poster>
  );
}
