import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const TEAMS = ["North", "East", "South", "West"];
const METALS = ["Gold", "Silver", "Bronze"];
const METAL_COLORS = ["#d4a72c", "#98a1ab", "#b8733b"];
const MEDALS = [[12, 9, 14], [8, 15, 6], [17, 11, 9], [5, 7, 13]]; // per team: gold, silver, bronze

// One count: a Bar in its metal's color.
export const CountSlat = slat({ css: styles.count }, (m) => <div><Bar to={m.value} color={m.color} class="bar" /></div>);

// A team: its name, and a Plot of its three counts, which share the team's band.
export const TeamSlat = slat({ css: styles.team, thickness: { horizontal: 72 } }, (d) => (
  <div class="team">
    <Label edge="start" class="name">{d.name}</Label>
    <Plot value={d.medals} color={METAL_COLORS}>{CountSlat}</Plot>
  </div>
));

export default function GroupedBars(p) {
  const medals = createMemo(() => (p.seed ? TEAMS.map(() => METALS.map(() => Math.round(rand(2, 20)))) : MEDALS));
  return (
    <>
      <p class="legend">{METALS.map((m, i) => <span><i style={{ background: METAL_COLORS[i] }} />{m}</span>)}</p>
      <Chart orientation={p.o} scale={[0, 20]} animate={p.js}>
        <Plot name={TEAMS} medals={medals()}>{TeamSlat}</Plot>
      </Chart>
    </>
  );
}
