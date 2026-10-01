import { createMemo, createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// People, by generation: how many use AI to help write their emails and messages, and how often.
const GENS = ["Gen Z", "Millennials", "Gen X", "Boomers"];
const USING = [58, 49, 36, 21];     // of each generation, how many use AI to write
const DAILY = [31, 24, 14, 6];      // and how many of them do on most days
const PEOPLE = [20, 30, 27, 23];    // of all adults, how many are in each generation
const PARTS = ["Most days", "Now and then", "Not using AI"];

// The bar is how many use AI; the pie splits those by how often and keeps the rest.
const split = (using, daily) => [daily, using - daily, 100 - using];
// No generation picked: everyone, each generation weighed by how many people are in it.
const whole = (rows) => PARTS.map((_, k) => rows.reduce((sum, row, g) => sum + row[k] * PEOPLE[g], 0) / 100);

// The simple pie's wedge: out to where the span starts, round the rim, close.
const TAU = Math.PI * 2, R = 50;
const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100;

  return `M0,0L${xy(a, R)}A${R},${R} 0 ${b - a > 0.5 ? 1 : 0} 1 ${xy(b, R)}Z`;
};

const PITCH = 13;    // the width one bar gets, in cqw of the chart
const ROW = 34;      // flat, the height one bar gets
const STRIP = 40;    // flat, the height of the stacked bar

// A part of the pie. Its Plot shares the Chart's box with the bars, and its CSS draws in the room they leave.
export const PartSlat = slat({
  css: styles.part,
  room: { vertical: { start: 0, end: 0 }, horizontal: { start: 0, end: 0 } },
  thickness: { horizontal: GENS.length * ROW + STRIP },
}, (d) => {
  const span = animated(() => [d.from, d.to], () => ({ duration: 600 }));

  return (
    <div class="slat">
      <Bar from={d.from} to={d.to} color={d.color} class="slice">
        <svg viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"><path d={wedge(...span())} /></svg>
      </Bar>
    </div>
  );
});

// A generation. The slat marks itself and the div around the chart listens: a Plot's props are its data, so a handler
// can't be passed in as one.
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

// The two Plots share the Chart's box: round, the bars sit at its end; flat, the stacked bar at the top.
const SIDE = (o, which) => (o === "vertical"
  ? (which === "gens" ? { "justify-self": "end" } : undefined)
  : { "align-self": which === "gens" ? "end" : "start" });

export default function LinkedViews(p) {
  const [picked, setPicked] = createSignal(-1);
  const using = createMemo(() => (!p.seed() ? USING : GENS.map(() => Math.round(rand(24, 66)))));
  const daily = createMemo(() => (!p.seed() ? DAILY : using().map((u) => Math.round(u * rand(0.3, 0.65)))));
  const rows = createMemo(() => using().map((u, g) => split(u, daily()[g])));
  const pie = createMemo(() => stackUp(shares(picked() < 0 ? whole(rows()) : rows()[picked()])));
  // A click on a bar picks it; on the same bar again, or anywhere else, it goes back to everyone. So does Escape.
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
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={280} animate={p.js()}
        style={{ "--bars": `${PITCH * GENS.length}cqw`, "--strip": `${STRIP}px` }}>
        <Plot overlap style={SIDE(p.o(), "pie")} key="name"
          name={PARTS} color={["series-1", "series-2", "series-3"]} from={pie().from} to={pie().to}>
          {PartSlat}
        </Plot>
        <Plot keyboard style={SIDE(p.o(), "gens")} key="name" name={GENS} value={using()} picked={picked()}>
          {GenSlat}
        </Plot>
      </Chart>
    </div>
  );
}
