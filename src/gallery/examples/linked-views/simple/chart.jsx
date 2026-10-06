import { createMemo, createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

// People by generation: how many use AI to write their emails and messages, and how often.
const GENS = ["Gen Z", "Millennials", "Gen X", "Boomers"];
const USING = [58, 49, 36, 21];     // of each generation, how many use AI to write
const DAILY = [31, 24, 14, 6];      // and how many of those do on most days
const PEOPLE = [20, 30, 27, 23];    // how many of all adults are in each generation
const PARTS = ["Most days", "Now and then", "Not using AI"];

// A generation's pie: most days, now and then, and not using AI.
const split = (using, daily) => [daily, using - daily, 100 - using];
// Everyone: each generation's split, weighed by its size.
const whole = (rows) => PARTS.map((_, k) => rows.reduce((sum, row, g) => sum + row[k] * PEOPLE[g], 0) / 100);

// A wedge: out to where the span starts, round the rim, close.
const TAU = Math.PI * 2, R = 50;
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100;

  return `M0,0L${xy(a, R)}A${R},${R} 0 ${b - a > 0.5 ? 1 : 0} 1 ${xy(b, R)}Z`;
};

const PITCH = 13;    // round, the width of one bar, in cqw of the chart
const ROW = 34;      // flat, the height of one bar
const STRIP = 40;    // flat, the height of the stacked bar

// A part of the pie, drawn in the room the bars leave.
export const PartSlat = slat({
  css: styles.part,
  room: { vertical: { start: 0, end: 0 }, horizontal: { start: 0, end: 0 } },
  thickness: { horizontal: GENS.length * ROW + STRIP },
}, (d) => {
  const span = animated(() => [d.from, d.to], () => ({ duration: 600 }));

  return (
    <Bar from={d.from} to={d.to} color={d.color} class="slat slice">
      <svg viewBox="-50 -50 100 100"><path d={wedge(...span())} /></svg>
    </Bar>
  );
});

// A generation, marked with data-gen so the div around the chart can tell which was clicked.
export const GenSlat = slat({
  css: styles.gen,
  thickness: { vertical: `${PITCH}cqw`, horizontal: ROW },
  room: { vertical: { start: 22, end: 0 }, horizontal: { start: 84, end: 0 } },
}, (d) => (
  <div class="slat" classList={{ on: d.picked === d.index }} data-gen={d.index}>
    <Bar to={d.value} class="bar" />
    <Label edge="start" class="name">{d.name}</Label>
  </div>
));

// The two Plots share the Chart's box. Round, the bars sit at its end; flat, under the stacked bar.
const seat = (o, which) => (o === "vertical"
  ? (which === "gens" ? { "justify-self": "end" } : undefined)
  : { "align-self": which === "gens" ? "end" : "start" });

export default function Multiple(p) {
  const [picked, setPicked] = createSignal(-1);
  const using = createMemo(() => (!p.seed ? USING : GENS.map(() => Math.round(rand(24, 66)))));
  const daily = createMemo(() => (!p.seed ? DAILY : using().map((u) => Math.round(u * rand(0.3, 0.65)))));
  const rows = createMemo(() => using().map((u, g) => split(u, daily()[g])));
  const pie = createMemo(() => stackUp(shares(picked() < 0 ? whole(rows()) : rows()[picked()])));

  // A click on a bar picks it; another click or Escape goes back to everyone.
  const pick = (e) => {
    const gen = e.target.closest("[data-gen]");
    setPicked((was) => (gen && was !== +gen.dataset.gen ? +gen.dataset.gen : -1));
  };
  const keys = (e) => {
    if (e.key === "Escape") setPicked(-1);
    if ((e.key === "Enter" || e.key === " ") && e.target.closest("[data-gen]")) {
      e.preventDefault();
      pick(e);
    }
  };

  return (
    <div onClick={pick} onKeyDown={keys}>
      <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={280} animate={p.js}
        style={{ "--bars": `${PITCH * GENS.length}cqw`, "--strip": `${STRIP}px` }}>
        <Plot overlap style={seat(p.o, "pie")} key="name"
          name={PARTS} color={["series-1", "series-2", "series-3"]} from={pie().from} to={pie().to}>
          {PartSlat}
        </Plot>
        {/* In the JS version only the bars' values move; `picked` has to jump. */}
        <Plot keyboard style={seat(p.o, "gens")} key="name" animate={p.js && ["value"]} name={GENS} value={using()} picked={picked()}>
          {GenSlat}
        </Plot>
      </Chart>
    </div>
  );
}
