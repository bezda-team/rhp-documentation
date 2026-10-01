import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const PARTS = ["Sleep", "Chores and errands", "Work and study", "Free time"];
const HOURS = [8.8, 5.8, 5.0, 4.4];

// A wedge, in a 100 x 100 box around the middle. Angles are turns from twelve o'clock, clockwise.
// Each straight edge is pushed OFF aside rather than turned, so the gap between two wedges is one width all the way
// in, and the two pushed edges of a wedge cross at a point near the middle: that point is the tip.
const TAU = Math.PI * 2, OFF = 1.6, R = 50;
const PAD = Math.asin(OFF / R) / TAU; // how far round pushing an edge aside moves the end of the rim

// Not rounded. An A command fits a circle of the given radius through the two ends, and near half a turn that fit
// is very sensitive to them: rounding an end a few thousandths off the circle moved the arc by a quarter unit.
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100, mid = (a + b) / 2;
  const u = Math.min(a + PAD, mid), v = Math.max(b - PAD, mid); // a slice thinner than the gap closes up
  const tip = Math.min(OFF / Math.sin((b - a) * Math.PI), R);   // where the two pushed edges cross

  return `M${xy(mid, tip)}L${xy(u, R)}A${R},${R} 0 ${v - u > 0.5 ? 1 : 0} 1 ${xy(v, R)}Z`;
};

// A part: its wedge round, and rhp's own bar flat.
// The path cannot be transitioned, because CSS would carry every point of it along a straight line and the rim would
// flatten on the way. `animated` moves the two numbers instead and the wedge is drawn again from them each frame.
export const PartSlat = slat({ css: styles.part, thickness: { horizontal: 56 } }, (d) => {
  const span = animated(() => [d.from, d.to], () => ({ duration: 600 }));

  return (
    <div class="slat">
      <Bar from={d.from} to={d.to} color={d.color} class="slice">
        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"><path d={wedge(...span())} /></svg>
      </Bar>
      <Label at={(d.from + d.to) / 2} class="tag">{Math.round(d.to - d.from)}%</Label>
    </div>
  );
});

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
