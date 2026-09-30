import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, shares, stackUp } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const PARTS = ["Sleep", "Chores and errands", "Work and study", "Free time"];
const HOURS = [8.8, 5.8, 5.0, 4.4];

// A wedge, in a 100 x 100 box around the middle. Angles are turns from twelve o'clock, clockwise.
// Each straight edge is pushed OFF aside rather than turned, so the gap between two wedges is one width all the way
// in, and the two pushed edges of a wedge cross at a point near the middle: that point is the tip.
const TAU = Math.PI * 2, OFF = 1.6, R = 50, SEG = 6;

const xy = (t, r, k = 0) => {
  const a = t * TAU;
  return `${(r * Math.sin(a) + k * Math.cos(a)).toFixed(2)},${(-r * Math.cos(a) + k * Math.sin(a)).toFixed(2)}`;
};

// Where a pushed edge meets the rim.
const cross = (t, r, off) => t + Math.asin(Math.max(-1, Math.min(1, off / r))) / TAU;

// The rim, always as SEG cubics rather than one A command, so one wedge's path can move into the next.
const arc = (a, b) => {
  const step = (b - a) / SEG;
  const k = (4 / 3) * Math.tan((step * TAU) / 4) * R;
  let d = "";

  for (let i = 0; i < SEG; i++) {
    d += `C${xy(a + i * step, R, k)} ${xy(a + (i + 1) * step, R, -k)} ${xy(a + (i + 1) * step, R)}`;
  }

  return d;
};

const wedge = (from, to) => {
  const a = from / 100, b = to / 100;
  const tip = OFF / Math.sin((b - a) * Math.PI); // where the two pushed edges cross

  return `M${xy((a + b) / 2, tip)}L${xy(cross(a, R, OFF), R)}${arc(cross(a, R, OFF), cross(b, R, -OFF))}Z`;
};

// A part: its wedge round, and rhp's own bar flat.
export const PartSlat = slat({ css: styles.part, thickness: { horizontal: 56 } }, (d) => (
  <div class="slat">
    <Bar from={d.from} to={d.to} color={d.color} class="slice">
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"><path d={wedge(d.from, d.to)} /></svg>
    </Bar>
    <Label at={(d.from + d.to) / 2} class="tag">{Math.round(d.to - d.from)}%</Label>
  </div>
));

export default function PieChart(p) {
  const hours = createMemo(() => (p.seed() ? PARTS.map(() => rand(3.4, 9)) : HOURS));
  const stack = createMemo(() => stackUp(shares(hours())));
  return (
    <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={330} animate={p.js()}>
      <Plot overlap name={PARTS} color={["series-1", "series-2", "series-3", "series-4"]} from={stack().from} to={stack().to}>
        {PartSlat}
      </Plot>
    </Chart>
  );
}
