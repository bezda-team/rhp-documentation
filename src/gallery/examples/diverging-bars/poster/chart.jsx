import { createMemo, createSignal } from "solid-js";
import { Plot, Scale, Chart, Bar, Tick, Label, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const degrees = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(1) + "°";
// °C from normal on a diverging ramp: blue below, a neutral gray at 0, red above.
const HEAT = [[-2.5, [44, 123, 182]], [-1.2, [120, 177, 214]], [0, [140, 147, 160]], [1.2, [245, 128, 88]], [2.5, [200, 40, 50]]];
const heat = (t) => {
  const k = Math.max(1, HEAT.findIndex(([x]) => x >= t)), [x0, c0] = HEAT[Math.min(k, HEAT.length - 1) - 1], [x1, c1] = HEAT[Math.min(k, HEAT.length - 1)];
  const f = Math.min(1, Math.max(0, (t - x0) / (x1 - x0)));
  return `rgb(${c0.map((c, i) => Math.round(c + (c1[i] - c) * f)).join(" ")})`;
};

// The month's band is tinted with its own color, like a warming stripe. Its root carries data-month, so the poster knows
// which month is under the pointer; the others fade.
export const MonthSlat = slat({
  thickness: { horizontal: 32 }, // the Chart's height is for its vertical form; horizontal rows keep their size
  inset: 0.22,
  room: { horizontal: { start: 40, end: 44 }, vertical: { start: 26, end: 12, after: 14 } },
  css: styles.month,
}, (d) => (
  <div class={d.faded ? "month faded" : "month"} data-month={d.index} style={{ "--heat": heat(d.anomaly) }}>
    <Label edge="start" class="mon">{d.month}</Label>
    <Bar to={d.anomaly} color={heat(d.anomaly)} class="rise" />
    <Label at={d.anomaly} side={d.anomaly < 0 ? "before" : undefined} class="deg">{degrees(d.anomaly)}</Label>
  </div>
));

// The scale: hairlines each degree, and the 0 line, the normal, drawn brighter.
export const NormalSlat = slat({
  room: { horizontal: { after: 28 }, vertical: { before: 56 } },
  css: styles.normal,
}, (t) => (
  <div class={t.at === 0 ? "zero" : ""}>
    <Tick at={t.at} thick={1} class="line" />
    <Label at={t.at} class="num">{t.at === 0 ? "normal" : degrees(t.at)}</Label>
  </div>
));

export default function Diverging(p) {
  const anomaly = createMemo(() => (p.seed(), MONTHS.map(() => Math.round(rand(-1.4, 2.4) * 10) / 10)));
  // The month under the pointer, read out in the dek.
  const [month, setMonth] = createSignal(null);
  const point = (e) => { const i = e.target.closest("[data-month]")?.dataset.month; setMonth(i == null ? null : +i); };
  const dek = () => {
    const i = month();
    if (i == null) return "Each month against its 1991-2020 average, in °C.";
    const v = anomaly()[i];
    return v === 0 ? `${NAMES[i]} was right on normal.` : `${NAMES[i]} was ${Math.abs(v).toFixed(1)}° ${v > 0 ? "warmer" : "colder"} than normal.`;
  };
  return (
    <Poster look="climate" kicker="A year of monthly temperatures" title="Hotter than normal" dek={dek()} note="Illustrative figures."
      onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setMonth(null)}>
      <Chart orientation={p.o()} scale={[-3, 3]} height={300} animate={p.js()} theme={styles.theme}>
        <Scale ticks={[-2, -1, 0, 1, 2]}>{NormalSlat}</Scale>
        <Plot month={MONTHS} anomaly={anomaly()} faded={(d) => month() != null && d.index !== month()}>{MonthSlat}</Plot>
      </Chart>
    </Poster>
  );
}
