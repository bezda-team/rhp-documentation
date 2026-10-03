import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, Poster, slat, shares, stackUp, animated } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

// A day of 24 hours, in four parts.
const PARTS = ["Sleep", "Chores and errands", "Work and study", "Free time"];
const HOURS = [8.8, 5.8, 5.0, 4.4];
const COLORS = ["#8d93ff", "#9aa7c7", "#ffb547", "#ff5d73"];

// rhp has no wedge block, so a wedge is an SVG path, in a 100 x 100 box around the middle.
// Angles are turns from twelve o'clock, clockwise.
const TAU = Math.PI * 2;
const CORNER = 1.9;             // how round a corner is, and half the stroke that rounds it
const GAP = 1.9;                // the paper between two wedges
const HOLE = 9;                 // where a wedge starts, so the tips don't pile up
const OFF = CORNER + GAP / 2;   // how far a wedge's edge is pushed off the true one
const R = 50 - CORNER;          // the stroke grows the wedge back to 50

// How far round pushing an edge aside moves the end of an arc, at the rim and at the hole.
const RIM = Math.asin(OFF / R) / TAU;
const INNER = Math.asin(Math.min(1, OFF / HOLE)) / TAU;

// Coordinates are left unrounded: near half a turn, an arc moves visibly when its ends are a few thousandths off.
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;
const big = (turns) => (turns > 0.5 ? 1 : 0);

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100, mid = (a + b) / 2;
  const u = Math.min(a + RIM, mid), v = Math.max(b - RIM, mid);
  const rim = `L${xy(u, R)}A${R},${R} 0 ${big(v - u)} 1 ${xy(v, R)}`;

  // Too narrow to reach the hole, the edges end where they cross.
  if (b - a <= 2 * INNER) {
    return `M${xy(mid, Math.min(OFF / Math.sin((b - a) * Math.PI), R))}${rim}Z`;
  }
  const s = a + INNER, e = b - INNER;
  return `M${xy(s, HOLE)}${rim}L${xy(e, HOLE)}A${HOLE},${HOLE} 0 ${big(e - s)} 0 ${xy(s, HOLE)}Z`;
};

// A path can't be transitioned without flattening its rim, so `animated` moves the two numbers and the wedge is drawn
// again each frame. The label's --turn is their middle, so it moves with its wedge.
const SWEEP = () => ({ duration: 600 });

// A part of the day: its wedge, with the share and the name inside.
export const PartSlat = slat({
  thickness: { horizontal: 82 },
  room: { horizontal: { start: 4, end: 4 }, vertical: { start: 24, end: 24 } },
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
    <Label at={(d.from + d.to) / 2} class="tag" style={{ "--turn": (span()[0] + span()[1]) / 200 }}>
      <span class="move">
        <b>{Math.round(d.to - d.from)}%</b>
        <span class="said"><i>{d.name}</i><i>{d.hours.toFixed(1)} hours</i></span>
      </span>
    </Label>
  </div>
  );
});

export default function PieChart(p) {
  const hours = createMemo(() => (!p.seed ? HOURS : PARTS.map(() => rand(3.4, 9))));
  const stack = createMemo(() => stackUp(shares(hours())));

  return (
    <Poster look="day" kicker="A day · 25 to 34 year olds" title="Four hours to yourself"
      dek="Sleep takes the largest share of a day, and once work and the running of a life are counted, about four hours of it are yours."
      note="Illustrative, after the American Time Use Survey, averaged over every day of the week. Point at a slice, or tab into the chart, for the hours behind its share.">
      <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={450} animate={p.js} theme={styles.theme}>
        <Plot keyboard overlap key="name" name={PARTS} color={COLORS} hours={hours()} from={stack().from} to={stack().to}>
          {PartSlat}
        </Plot>
      </Chart>
    </Poster>
  );
}
