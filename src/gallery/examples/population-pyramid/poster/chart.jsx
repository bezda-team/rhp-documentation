import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const AGES = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
const MEN = [3.6, 4.2, 4.9, 5.5, 6.7, 7.3, 6.8, 5.7, 4.1]; // % of the population in each band
const SPINE = 1.7; // scale units kept clear each side of 0, for the age labels

// Men to the left of a spine of ages, women to the right: both Bars start SPINE away from 0 and run outward.
export const AgeSlat = slat({
  band: { horizontal: 30 },
  inset: 0.13,
  room: { horizontal: { start: 38, end: 38 }, vertical: { start: 26, end: 26 } },
  css: styles.age,
}, (d) => (
  <div>
    <Bar from={-SPINE} to={-(d.men + SPINE)} color="#1d6fa5" class="side" />
    <Bar from={SPINE} to={d.women + SPINE} color="#d9694c" class="side" />
    <Label at={0} class="age">{d.age}</Label>
    <Label at={-(d.men + SPINE)} side="before" class="pct">{d.men.toFixed(1)}</Label>
    <Label at={d.women + SPINE} class="pct">{d.women.toFixed(1)}</Label>
  </div>
));

export default function Pyramid(p) {
  const men = createMemo(() => (p.seed() ? MEN.map((v) => v * rand(0.88, 1.12)) : MEN));
  const women = createMemo(() => men().map((v, i) => v * (0.97 + i * 0.045)));
  const widest = createMemo(() => Math.max(9, Math.ceil(Math.max(...men(), ...women())))); // the scale fits the widest band
  const oldestFirst = AGES.map((_, i) => AGES.length - 1 - i); // position of each row: order is data
  return (
    <Poster look="census" kicker="Census · share of the population" title="An ageing country"
      dek={<span class="keys"><span><i style={{ background: "#1d6fa5" }} />Men</span><span><i style={{ background: "#d9694c" }} />Women</span><span>% in each age band</span></span>}
      note="Illustrative figures.">
      <Chart orientation={p.o()} scale={[-(widest() + SPINE), widest() + SPINE]} ticks={false} height={320} animate={p.js()} theme={styles.theme}>
        <Plot age={AGES} men={men()} women={women()} order={p.o() === "horizontal" ? oldestFirst : undefined}>{AgeSlat}</Plot>
      </Chart>
    </Poster>
  );
}
