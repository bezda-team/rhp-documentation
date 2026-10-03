import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const PARTS = ["Sleep", "Chores and errands", "Work and study", "Free time"];
const HOURS = [8.8, 5.8, 5.0, 4.4];

// rhp has no wedge block, so a wedge is an SVG path, in a 100 x 100 box around the middle.
// Angles are turns from twelve o'clock, clockwise.
const TAU = Math.PI * 2, R = 50;
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100;

  return `M0,0L${xy(a, R)}A${R},${R} 0 ${b - a > 0.5 ? 1 : 0} 1 ${xy(b, R)}Z`;
};

// A part: its wedge round, and rhp's own bar flat. A path can't be transitioned without flattening its rim, so
// `animated` moves the two numbers and the wedge is drawn again each frame. The label's --turn is their middle.
export const PartSlat = slat({ css: styles.part, thickness: { horizontal: 56 } }, (d) => {
  const span = animated(() => [d.from, d.to], () => ({ duration: 600 }));

  return (
    <div class="slat">
      <Bar from={d.from} to={d.to} color={d.color} class="slice">
        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"><path d={wedge(...span())} /></svg>
      </Bar>
      <Label at={(d.from + d.to) / 2} class="tag" style={{ "--turn": (span()[0] + span()[1]) / 200 }}>{Math.round(d.to - d.from)}%</Label>
    </div>
  );
});

export default function PieChart(p) {
  const hours = createMemo(() => (p.seed ? PARTS.map(() => rand(3.4, 9)) : HOURS));
  const stack = createMemo(() => stackUp(shares(hours())));
  return (
    <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={330} animate={p.js}>
      <Plot overlap name={PARTS} color={["series-1", "series-2", "series-3", "series-4"]} from={stack().from} to={stack().to}>
        {PartSlat}
      </Plot>
    </Chart>
  );
}
