import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// A day of 24 hours, in four parts.
const PARTS = ["Sleep", "Chores and errands", "Work and study", "Free time"];
const HOURS = [8.8, 5.8, 5.0, 4.4];
const COLORS = ["#8d93ff", "#9aa7c7", "#ffb547", "#ff5d73"];

// The one thing rhp cannot draw for a pie is the outline of a wedge. An outline with rounded corners is a path, which
// is why rhp's own Area and Line are paths too. Angles below are turns from twelve o'clock, clockwise, and the box is
// 100 x 100 around the middle.
const TAU = Math.PI * 2;
const CORNER = 1.9;             // how round a corner is, and half the stroke that rounds it
const GAP = 1.9;                // the paper left between two wedges
const HOLE = 9;                 // where a wedge starts, so the tips do not pile up in the middle
const OFF = CORNER + GAP / 2;   // how far a wedge's edge is pushed off the true one
const R = 50 - CORNER;          // the stroke grows the wedge back to 50

// How far round pushing an edge aside moves the end of an arc. It is wider at the hole than at the rim, because the
// same distance is a larger angle on a smaller circle.
const RIM = Math.asin(OFF / R) / TAU;
const INNER = Math.asin(Math.min(1, OFF / HOLE)) / TAU;

// Not rounded. An A command fits a circle of the given radius through the two ends, and near half a turn that fit
// is very sensitive to them: rounding an end a few thousandths off the circle moved the arc by a quarter unit.
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;
const big = (turns) => (turns > 0.5 ? 1 : 0);

// The wedge for a span of the scale. A span too narrow for the gap closes up at that radius instead of turning inside out.
export const wedge = (from, to) => {
  const a = from / 100, b = to / 100, mid = (a + b) / 2;
  const u = Math.min(a + RIM, mid), v = Math.max(b - RIM, mid);
  const s = Math.min(a + INNER, mid), e = Math.max(b - INNER, mid);

  return `M${xy(s, HOLE)}L${xy(u, R)}A${R},${R} 0 ${big(v - u)} 1 ${xy(v, R)}`
    + `L${xy(e, HOLE)}A${HOLE},${HOLE} 0 ${big(e - s)} 0 ${xy(s, HOLE)}Z`;
};

// How the wedge moves when the shares change. The path itself cannot be transitioned: CSS would carry every point of
// it along a straight line, and a point crossing a circle in a straight line cuts the corner, so the rim would flatten
// on the way. `animated` moves the two numbers instead, on rhp's own clock, and the wedge is drawn again from them
// each frame. Every frame is a whole wedge, so the pie stays round the whole way.
const SWEEP = () => ({ duration: 600 });

// A part of the day: its wedge, with the share and the name inside. `from` and `to` are where the part starts and ends
// out of 100, which is an angle round the pie and a length along the flat bar. rhp places the label either way.
export const PartSlat = slat({
  thickness: { horizontal: 82 },
  room: { horizontal: { start: 4, end: 4 }, vertical: { start: 4, end: 4 } },
  css: styles.part,
}, (d) => {
  const span = animated(() => [d.from, d.to], SWEEP);

  return (
  <div class="slat" data-row={d.index}>
    <Bar from={d.from} to={d.to} color={d.color} class="slice">
      <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d={wedge(...span())} />
      </svg>
    </Bar>
    <Label at={(d.from + d.to) / 2} class="tag">
      <span class="move">
        <b>{Math.round(d.to - d.from)}%</b>
        <span class="said"><i>{d.name}</i><i>{d.hours.toFixed(1)} hours</i></span>
      </span>
    </Label>
  </div>
  );
});

export default function PieChart(p) {
  const hours = createMemo(() => (!p.seed() ? HOURS : PARTS.map(() => rand(3.4, 9))));
  const stack = createMemo(() => stackUp(shares(hours())));

  return (
    <Poster look="day" kicker="A day · 25 to 34 year olds" title="Four hours to yourself"
      dek="Sleep takes the largest share of a day, and once work and the running of a life are counted, about four hours of it are yours."
      note="Illustrative, after the American Time Use Survey, averaged over every day of the week. Point at a slice, or tab into the chart, for the hours behind its share.">
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={470} animate={p.js()} theme={styles.theme}>
        <Plot keyboard overlap key="name" name={PARTS} color={COLORS} hours={hours()} from={stack().from} to={stack().to}>
          {PartSlat}
        </Plot>
      </Chart>
    </Poster>
  );
}
