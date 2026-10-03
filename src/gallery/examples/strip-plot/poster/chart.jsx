import { createMemo, createSignal } from "solid-js";
import { Plot, Chart, Dot, Tick, Label, Poster, slat } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const sum = (list) => list.reduce((a, b) => a + b, 0);
// New random numbers after New data; before it, the same ones on every load.
const numbers = (seed) => { let s = 2026; return seed ? Math.random : () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const normal = (next, m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
// n samples of a normal, kept between lo and hi
const normalsIn = (next, n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(next, m, s); if (v >= lo && v <= hi) return v; } });

const ARMS = ["Placebo", "Dose A", "Dose B"];
const TRIAL = [[12, 3.2], [9, 2.6], [6.8, 2.2]]; // days to recover: mean and spread
const CAPSULE = ["#7b8794", "#0e9f8a", "#6d4bd8"]; // the placebo gray, so the doses stand out
const across = (i) => 0.16 + ((i * 0.618034) % 1) * 0.68; // a fixed place across the band per patient
const tilt = (i) => Math.round((((i * 0.381966) % 1) - 0.5) * 140); // and a fixed tilt, in degrees

// One patient: a two-tone capsule at their number of days. data-patient tells the poster which is pointed at.
export const PatientSlat = slat({ css: styles.patient }, (s) => (
  <Dot at={s.at} across={across(s.index)} color={s.color} data-patient={s.index}
    class={s.index === s.picked ? "pill picked" : "pill"} style={{ rotate: tilt(s.index) + "deg" }} />
));

export const ArmSlat = slat({
  thickness: { horizontal: 80 },
  room: { horizontal: { start: 84, end: 76 }, vertical: { start: 30, end: 30 } },
  css: styles.arm,
}, (d) => {
  // data-arm tells the poster which arm is pointed at.
  const mean = createMemo(() => sum(d.days) / d.days.length);
  return (
    <div class={d.pickedArm < 0 || d.pickedArm === d.index ? "" : "faded"} data-arm={d.index}>
      <Label edge="start" class="arm">{d.arm}</Label>
      <Plot overlap at={d.days} color={d.color} picked={d.pickedArm === d.index ? d.pickedPatient : -1}>{PatientSlat}</Plot>
      <Tick at={mean()} thick={0.9} class="mean" />
      <Label edge="end" class="avg">{mean().toFixed(1)} days<small>average</small></Label>
    </div>
  );
});

export default function Strip(p) {
  const days = createMemo(() => { const next = numbers(p.seed); return TRIAL.map(([m, s]) => normalsIn(next, 30, 1, 23, m, s)); });
  // The arm and patient under the pointer, [arm, patient] (-1 between capsules), read out in the dek.
  const [picked, setPicked] = createSignal(null);
  const point = (e) => {
    const arm = e.target.closest("[data-arm]"), patient = e.target.closest("[data-patient]");
    setPicked(arm ? [+arm.dataset.arm, patient ? +patient.dataset.patient : -1] : null);
  };
  const dek = () => {
    const at = picked();
    if (!at || at[1] < 0) return "Each capsule is a patient; the line is the average.";
    const [arm, i] = at, mine = days()[arm][i], mean = sum(days()[arm]) / days()[arm].length;
    return `${ARMS[arm]}: ${mine.toFixed(1)} days, ${Math.abs(mine - mean).toFixed(1)} ${mine < mean ? "sooner" : "later"} than its average`;
  };
  return (
    <Poster look="clinic" kicker="Trial results · days to recover" title="Back on your feet sooner" dek={dek()} note="Point at a capsule to read that patient's recovery. Illustrative data."
      onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setPicked(null)}>
      <Chart orientation={p.o} scale={[0, 24]} ticks={[0, 8, 16, 24]} format={(v) => v + " d"} height={320} animate={p.js} theme={styles.theme}>
        <Plot arm={ARMS} days={days()} color={CAPSULE} pickedArm={picked()?.[0] ?? -1} pickedPatient={picked()?.[1] ?? -1}>{ArmSlat}</Plot>
      </Chart>
    </Poster>
  );
}
