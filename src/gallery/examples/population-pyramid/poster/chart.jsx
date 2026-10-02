import { createMemo, createSignal, For } from "solid-js";
import { Plot, Chart, Bar, Label, Poster, slat } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const AGES = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"];
// % of the population in each band: a young country in 1990, an ageing one in 2024
const MEN = { 1990: [7.0, 7.6, 7.7, 7.3, 6.4, 5.1, 4.0, 2.6, 1.1], 2024: [3.6, 4.2, 4.9, 5.5, 6.7, 7.3, 6.8, 5.7, 4.1] };
const YEARS = [1990, 2024];
const SPINE = 1.7; // scale units kept clear each side of 0, for the age labels

// Men to the left of a spine of ages, women to the right: both Bars start SPINE away from 0 and run outward.
export const AgeSlat = slat({
  thickness: { horizontal: 30 },
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
  // Both years' men, then women; a year's button in the key picks the year the bars show, and they move to it.
  const [year, setYear] = createSignal(2024);
  const shares = createMemo(() => {
    const vary = p.seed ? () => rand(0.88, 1.12) : () => 1;
    return Object.fromEntries(Object.entries(MEN).map(([y, men]) => {
      const m = men.map((v) => v * vary());
      return [y, { men: m, women: m.map((v, i) => v * (0.97 + i * 0.045)) }];
    }));
  });
  const men = () => shares()[year()].men, women = () => shares()[year()].women;
  // one scale for both years, so the bands compare: it fits the widest band of either
  const widest = createMemo(() => Math.max(9, Math.ceil(Math.max(...Object.values(shares()).flatMap((s) => [...s.men, ...s.women])))));
  const oldestFirst = AGES.map((_, i) => AGES.length - 1 - i); // position of each row: order is data
  return (
    <Poster look="census" kicker={`Census ${year()} · share of the population`} title={year() === 2024 ? "An ageing country" : "A young country"}
      dek={<span class="keys">
        <span class="choice" role="group" aria-label="Census year">
          <For each={YEARS}>{(y) => <button type="button" aria-pressed={year() === y} onClick={() => setYear(y)}>{y}</button>}</For>
        </span>
        <span><i style={{ background: "#1d6fa5" }} />Men</span><span><i style={{ background: "#d9694c" }} />Women</span><span>% in each age band</span>
      </span>}
      note="Click 1990 or 2024 to see the country in that census. Illustrative figures.">
      <Chart orientation={p.o} scale={[-(widest() + SPINE), widest() + SPINE]} ticks={false} height={320} animate={p.js} theme={styles.theme}>
        <Plot age={AGES} men={men()} women={women()} order={p.o === "horizontal" ? oldestFirst : undefined}>{AgeSlat}</Plot>
      </Chart>
    </Poster>
  );
}
