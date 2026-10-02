import { createMemo, Show } from "solid-js";
import { Plot, Scale, Chart, Bar, Tick, Label, Poster, slat, sortBy, every } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const TRADES = ["Groundworks", "Frame", "Roof", "Services", "Interiors", "Garden"];
const PLAN = [[0, 6], [5, 13], [12, 17], [14, 23], [20, 30], [27, 32]]; // weeks from the start of March
const MONTH_NAMES = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const TODAY = 14;

// The months are a Scale of intervals: a slat per 4 weeks, from d.at to d.next, every other one shaded.
export const MonthBandSlat = slat({
  room: { horizontal: { before: 26 }, vertical: { before: 40 } },
  css: styles.monthBand,
}, (t) => (
  <div class={t.index % 2 ? "odd" : ""}>
    <Bar from={t.at} to={t.next} class="band" />
    <Show when={!t.last}><Label at={t.at} class="month">{MONTH_NAMES[t.index]}</Label></Show>
  </div>
));

// A trade on site: the whole job as a thin gray bar, the part done by today in site orange.
// Hover a trade and the drawing dimensions it: a line with end marks alongside the bar, and its length in weeks.
export const TradeSlat = slat({
  thickness: { horizontal: 44 },
  room: { horizontal: { start: 116, end: 16 }, vertical: { start: 40, end: 10 } },
  css: styles.trade,
}, (d) => (
  <div class="slat">
    <Label edge="start" class="trade">{d.trade}<small>wk {Math.round(d.start)}-{Math.round(d.end)}</small></Label>
    <Bar from={d.start} to={d.end} thick="10px" class="job" />
    <Show when={d.start < TODAY}><Bar from={d.start} to={Math.min(TODAY, d.end)} thick="10px" class="done" /></Show>
    <Bar from={d.start} to={d.end} thick="1px" class="dim" />
    <Label at={(d.start + d.end) / 2} class="weeks">{Math.round(d.end - d.start)} WK</Label>
  </div>
));

// Today: a line across the plot, named below it (horizontal; the months are above) or at its end (vertical).
export const TodaySlat = slat({
  room: { horizontal: { after: 24 } },
  css: styles.today,
}, () => <div><Tick at={TODAY} thick={1} class="now" /><Label at={TODAY} class="now-label">TODAY</Label></div>);

export default function Gantt(p) {
  const plan = createMemo(() => (p.seed ? PLAN.map(([a, b]) => { const s = Math.max(0, a + Math.round(rand(-2, 2))); return [s, Math.min(32, Math.max(s + 2, b + Math.round(rand(-2, 2))))]; }) : PLAN));
  return (
    <Poster look="drawing" kicker={`Building a house · week ${TODAY} of 32`} title="From plot to keys" dek="Each bar is a trade on site; the orange part is done. Point at one to measure it.">
      <Chart orientation={p.o} scale={[0, 32]} height={340} animate={p.js} theme={styles.theme}>
        <Scale ticks={every(4)}>{MonthBandSlat}</Scale>
        <Plot trade={TRADES} start={plan().map((w) => w[0])} end={plan().map((w) => w[1])} key="trade" order={sortBy("start")}>{TradeSlat}</Plot>
        {/* today, over the trades; the pointer passes through it to them */}
        <Plot overlap slats={1} style={{ "pointer-events": "none" }}>{TodaySlat}</Plot>
      </Chart>
    </Poster>
  );
}
