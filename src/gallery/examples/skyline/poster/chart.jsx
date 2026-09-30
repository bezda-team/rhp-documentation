import { createMemo, For, Show } from "solid-js";
import { Plot, Chart, Bar, Label, Place, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// Thirteen Manhattan towers, south to north.
//   mass   the main block, in metres
//   steps  the setbacks above it, each [share of the tower's width, metres]: the crown, drawn as narrower blocks
//   tip    the top of the spire or antenna, if it has one
//   wide   the footprint, as a share of its slat's band. Over 1 it spills into its neighbours, which is what keeps
//          the skyline one unbroken mass rather than a row of bars.
const TOWERS = [
  { name: "Woolworth", mass: 200, steps: [[0.62, 25], [0.36, 16]], tip: 241, wide: 1.1 },
  { name: "70 Pine", mass: 240, steps: [[0.55, 20], [0.3, 14]], tip: 290, wide: 1.05 },
  { name: "3 WTC", mass: 330, steps: [], tip: 330, wide: 1.2 },
  { name: "One WTC", mass: 415, steps: [], tip: 540, wide: 1.35 },
  { name: "Chrysler", mass: 240, steps: [[0.66, 24], [0.42, 16]], tip: 320, wide: 1.25 },
  { name: "Empire State", mass: 320, steps: [[0.6, 38], [0.34, 22]], tip: 443, wide: 1.5 },
  { name: "Met Life", mass: 210, steps: [[0.7, 18]], tip: 228, wide: 1.15 },
  { name: "Vanderbilt", mass: 340, steps: [[0.72, 30]], tip: 427, wide: 1.3 },
  { name: "432 Park", mass: 425, steps: [], tip: 425, wide: 1.08 },
  { name: "111 W 57th", mass: 435, steps: [], tip: 435, wide: 1.06 },
  { name: "Central Park", mass: 455, steps: [[0.78, 15]], tip: 470, wide: 1.2 },
  { name: "30 Hudson", mass: 370, steps: [[0.74, 15]], tip: 385, wide: 1.3 },
  { name: "Hudson Yards", mass: 305, steps: [[0.6, 20]], tip: 325, wide: 1.15 },
];

// Where each block of a tower starts and ends: the mass from 0, then each setback on top of the last.
const blocks = (d) => {
  const out = [{ from: 0, to: d.mass, wide: d.wide }];
  let top = d.mass;
  for (const [share, metres] of d.steps) {
    out.push({ from: top, to: top + metres, wide: d.wide * share });
    top += metres;
  }
  return { parts: out, roof: top };
};

// A tower: its mass, its setbacks, the spire above them, its height inside it, and its name below.
export const TowerSlat = slat({
  inset: 0, // no room on either side: the towers touch, which is what makes a skyline rather than a bar chart
  thickness: { horizontal: 30 },
  room: { horizontal: { start: 96, end: 54 }, vertical: { start: 66, end: 40 } },
  css: styles.tower,
}, (d) => {
  const b = createMemo(() => blocks(d));
  return (
    <div class="slat">
      <For each={b().parts}>{(part) => <Bar from={part.from} to={part.to} thick={part.wide} class="block" />}</For>
      <Show when={d.tip > b().roof}>
        <Bar from={b().roof} to={d.tip} thick="4px" class="spire" />
        <Place at={d.tip} across={0.5}><span class="vain">+{Math.round(d.tip - b().roof)} m of spire</span></Place>
      </Show>
      <Label edge="start" class="name">{d.name}</Label>
      <Label at={d.mass} side="before" class="metres">{Math.round(d.tip)}</Label>
    </div>
  );
});

export default function Skyline(p) {
  // New data rebuilds the city: every tower keeps its footprint, its setbacks and its spire, and only its height moves.
  const towers = createMemo(() => (!p.seed() ? TOWERS : TOWERS.map((t) => {
    const mass = Math.round((t.mass * rand(0.72, 1.16)) / 5) * 5;
    const crown = t.steps.reduce((n, [, m]) => n + m, 0);
    return { ...t, mass, tip: t.tip > t.mass + crown ? mass + crown + Math.round((t.tip - t.mass - crown) * rand(0.6, 1.4)) : mass + crown };
  })));
  return (
    <Poster look="skyline" kicker="New York · height in metres" title="Where the building stops"
      dek="Each tower is drawn to its own height. The solid part is building, setbacks and all. The orange above it is spire and antenna: height nobody stands in."
      note="Illustrative heights, rounded to 5 m. Hover a tower for its spire.">
      <Chart orientation={p.o()} scale={[0, 560]} ticks={false} height={340} animate={p.js()} theme={styles.theme}>
        <Plot rows={towers()} key="name">{TowerSlat}</Plot>
      </Chart>
    </Poster>
  );
}
