import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Dot, Label, Poster, slat, sortBy, nice } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);
const sum = (list) => list.reduce((a, b) => a + b, 0);

const TEAMS = ["North", "East", "South", "West"];
const METALS = ["gold", "silver", "bronze"];
const MEDALS = [[13, 9, 17], [16, 6, 8], [17, 20, 9], [4, 4, 16]];

// One count: a thin ribbon from 0, and the medal at its end with the count struck on it. Hover a count and its medal
// lifts off the table. The medal's face is an element inside the Dot: rhp moves the Dot, and the face can grow,
// rise and cast its shadow on its own time, in either animation version.
export const MedalSlat = slat({ css: styles.medal }, (m) => (
  <div class={"count " + m.metal}>
    <Bar to={m.value} thick="3px" class="ribbon" />
    <Dot at={m.value} size="24px" class="medal"><span class="face">{Math.round(m.value)}</span></Dot>
  </div>
));

export const TeamSlat = slat({
  thickness: { horizontal: 84 },
  room: { horizontal: { start: 96, end: 22 }, vertical: { start: 46, end: 18 } },
  css: styles.team,
}, (d) => (
  <div>
    <Label edge="start" class="team">{d.name}<small>{sum(d.medals.map(Math.round))} medals</small></Label>
    <Plot thick={0.86} metal={METALS} value={d.medals}>{MedalSlat}</Plot>
  </div>
));

export default function Grouped(p) {
  const medals = createMemo(() => (p.seed ? TEAMS.map(() => METALS.map(() => Math.round(rand(3, 24)))) : MEDALS));
  return (
    <Poster look="medals" kicker="Regional Games · final table" title="Gold rush"
      dek={<span class="keys"><span><i class="gold" />Gold</span><span><i class="silver" />Silver</span><span><i class="bronze" />Bronze</span></span>}>
      <Chart orientation={p.o} scale={[0, nice(0, Math.max(...medals().flat()), 4).max]} height={320} animate={p.js} theme={styles.theme}>
        {/* ranked like a medal table: golds first */}
        <Plot name={TEAMS} medals={medals()} key="name" order={sortBy((d) => d.medals[0] * 1e4 + d.medals[1] * 100 + d.medals[2], "desc")}>{TeamSlat}</Plot>
      </Chart>
    </Poster>
  );
}
