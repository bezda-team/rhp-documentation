import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Tick, Label, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const HABITS = ["Move", "Sleep", "Steps", "Water", "Mindful"];
const GOALS = ["600 kcal", "8 hours", "10,000", "2 litres", "10 minutes"];
const NEON = ["#f43f5e", "#8b5cf6", "#d97706", "#0b9cc9", "#65a30d"]; // in this order, neighbouring rows stay apart for colorblind eyes
const GLYPH = { // 24 × 24 icons
  Move: "M13 2 4 14h7l-1 8 9-12h-7z",
  Sleep: "M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z",
  Steps: "M8 3c1.8 0 3 2.2 3 5s-1.2 5-3 5-3-2.2-3-5 1.2-5 3-5zm8 7c1.8 0 3 2.2 3 5s-1.2 5-3 5-3-2.2-3-5 1.2-5 3-5z",
  Water: "M12 2.5s-6.5 7.5-6.5 12a6.5 6.5 0 0 0 13 0c0-4.5-6.5-12-6.5-12z",
  Mindful: "M5 19C5 10 11 4 20 4c0 9-6 15-15 15z",
};
// What a share of each goal comes to, in the goal's own unit.
const AMOUNT = {
  Move: (f) => Math.round(600 * f) + " kcal",
  Sleep: (f) => { const m = Math.round(480 * f); return `${Math.floor(m / 60)}h ${m % 60}m`; },
  Steps: (f) => Math.round(10000 * f).toLocaleString("en-GB") + " steps",
  Water: (f) => (2 * f).toFixed(1) + " litres",
  Mindful: (f) => Math.round(10 * f) + " min",
};

// A goal: the track to 120%, the day's progress glowing along it, and a white line at the goal (100%).
// Hover a goal and its progress burns brighter, with a bubble at its tip saying what it comes to.
export const GoalSlat = slat({
  thickness: { horizontal: 62 },
  room: { horizontal: { start: 134, end: 58 }, vertical: { start: 70, end: 30 } },
  css: styles.goal,
}, (d) => (
  <div class="row" style={{ "--rhp-color": d.color }}>
    <Label edge="start" class="habit">
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={GLYPH[d.habit]} /></svg>
      <span>{d.habit}<small>{d.goal}</small></span>
    </Label>
    <Bar to={120} thick="12px" class="track" />
    <Bar to={Math.min(120, d.pct)} thick="12px" class="done" />
    <Tick at={100} thick="24px" class="goal" />
    <Label edge="end" class="pct">{Math.round(d.pct)}%</Label>
    <Label at={Math.min(120, d.pct)} class="tip"><span>{AMOUNT[d.habit](d.pct / 100)}</span></Label>
  </div>
));

export default function Bullet(p) {
  const pct = createMemo(() => (p.seed() ? HABITS.map(() => rand(45, 125)) : [86, 104, 71, 58, 115]));
  return (
    <Poster look="watch" kicker="Health · today" title="Today's goals" dek="How far each daily goal got. The white line is the goal.">
      <Chart orientation={p.o()} scale={[0, 120]} ticks={false} height={300} animate={p.js()} theme={styles.theme}>
        <Plot habit={HABITS} goal={GOALS} color={NEON} pct={pct()}>{GoalSlat}</Plot>
      </Chart>
    </Poster>
  );
}
