import { createMemo } from "solid-js";
import { Plot, Chart, Dot, Tick, Label, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { normalsIn, sum } from "@gallery/random.js";
import * as styles from "./styles.js";

const ARMS = ["Placebo", "Dose A", "Dose B"];
const TRIAL = [[12, 3.2], [9, 2.6], [6.8, 2.2]]; // days to recover: mean and spread
const CAPSULE = ["#7b8794", "#0e9f8a", "#6d4bd8"]; // the placebo gray, so the doses stand out
const across = (i) => 0.16 + ((i * 0.618034) % 1) * 0.68; // a fixed place across the band per patient
const tilt = (i) => Math.round((((i * 0.381966) % 1) - 0.5) * 140); // and a fixed tilt, in degrees

// One patient: a two-tone capsule at their number of days.
export const PatientSlat = slat({ css: styles.patient }, (s) => <Dot at={s.at} across={across(s.index)} color={s.color} class="pill" style={{ rotate: tilt(s.index) + "deg" }} />);

export const ArmSlat = slat({
  thickness: { horizontal: 80 },
  room: { horizontal: { start: 84, end: 76 }, vertical: { start: 30, end: 30 } },
  css: styles.arm,
}, (d) => {
  const mean = createMemo(() => sum(d.days) / d.days.length);
  return (
    <div>
      <Label edge="start" class="arm">{d.arm}</Label>
      <Plot overlap at={d.days} color={d.color}>{PatientSlat}</Plot>
      <Tick at={mean()} thick={0.9} class="mean" />
      <Label edge="end" class="avg">{mean().toFixed(1)} days<small>average</small></Label>
    </div>
  );
});

export default function Strip(p) {
  const days = createMemo(() => (p.seed(), TRIAL.map(([m, s]) => normalsIn(30, 1, 23, m, s))));
  return (
    <Poster look="clinic" kicker="Trial results · days to recover" title="Back on your feet sooner" dek="Each capsule is one patient; the dark line is the group's average." note="Illustrative data.">
      <Chart orientation={p.o()} scale={[0, 24]} ticks={[0, 8, 16, 24]} format={(v) => v + " d"} height={320} animate={p.js()} theme={styles.theme}>
        <Plot arm={ARMS} days={days()} color={CAPSULE}>{ArmSlat}</Plot>
      </Chart>
    </Poster>
  );
}
