import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const AGES = ["80+", "60-79", "40-59", "20-39", "0-19"];
const MEN = [2, 9, 13, 13, 12]; // % of the population
const WOMEN = [3, 10, 13, 13, 12];
const COLORS = ["#2a78d6", "#eb6834"];

// An age band: men as a Bar from 0 to the left (negative values), women to the right.
export const BandSlat = slat({ css: styles.band, thickness: { horizontal: 36 } }, (d) => (
  <div>
    <Label edge="start" class="age">{d.age}</Label>
    <Bar to={-d.men} color={COLORS[0]} class="side" />
    <Bar to={d.women} color={COLORS[1]} class="side" />
  </div>
));

export default function Pyramid(p) {
  const people = createMemo(() => (p.seed
    ? { men: MEN.map((v) => Math.round(v * rand(0.7, 1.3))), women: WOMEN.map((v) => Math.round(v * rand(0.7, 1.3))) }
    : { men: MEN, women: WOMEN }));
  return (
    <>
      <p class="legend"><span><i style={{ background: COLORS[0] }} />Men</span><span><i style={{ background: COLORS[1] }} />Women</span></p>
      <Chart orientation={p.o} scale={[-18, 18]} ticks={[-15, -10, -5, 0, 5, 10, 15]} format={(v) => Math.abs(v) + "%"} animate={p.js}>
        <Plot age={AGES} men={people().men} women={people().women}>{BandSlat}</Plot>
      </Chart>
    </>
  );
}
