import { createMemo, Show } from "solid-js";
import { Plot, Chart, Bar, Label, Place, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// Thirteen Manhattan towers, south to north.
//   roof   the top of the building, in metres
//   tip    the top of the spire or antenna above it
//   wide   the footprint, as a share of the slat's band. Over 1 it spills into its neighbours', which is what keeps
//          the skyline one unbroken mass rather than a row of bars.
//   shape  which roofline is cut out of the top of the bar (see the CSS)
const TOWERS = [
  { name: "Woolworth", roof: 241, tip: 241, wide: 1.1, shape: "gothic" },
  { name: "70 Pine", roof: 290, tip: 290, wide: 1.05, shape: "deco" },
  { name: "3 WTC", roof: 330, tip: 330, wide: 1.2, shape: "chamfer" },
  { name: "One WTC", roof: 415, tip: 540, wide: 1.35, shape: "lean" },
  { name: "Chrysler", roof: 282, tip: 320, wide: 1.25, shape: "tiered" },
  { name: "Empire State", roof: 381, tip: 443, wide: 1.5, shape: "deco" },
  { name: "Met Life", roof: 228, tip: 228, wide: 1.15, shape: "dome" },
  { name: "Vanderbilt", roof: 370, tip: 427, wide: 1.3, shape: "taper" },
  { name: "432 Park", roof: 426, tip: 426, wide: 1.08, shape: null },
  { name: "111 W 57th", roof: 435, tip: 435, wide: 1.06, shape: "lean" },
  { name: "Central Park", roof: 472, tip: 472, wide: 1.2, shape: "chamfer" },
  { name: "30 Hudson", roof: 387, tip: 387, wide: 1.3, shape: "dome" },
  { name: "Hudson Yards", roof: 325, tip: 325, wide: 1.15, shape: "gable" },
];

// A tower: one bar to its roof with its roofline cut out of the top, the spire above it, its height inside it,
// and its name turned on its side underneath.
export const TowerSlat = slat({
  inset: 0, // no room on either side: the towers touch, which is what makes a skyline rather than a row of bars
  thickness: { horizontal: 30 },
  room: { horizontal: { start: 96, end: 54 }, vertical: { start: 70, end: 44 } },
  css: styles.tower,
}, (d) => (
  <div class="slat">
    <Bar to={d.roof} thick={d.wide} class={d.shape ? "block " + d.shape : "block"} />
    <Show when={d.tip > d.roof}>
      <Bar from={d.roof} to={d.tip} thick="4px" class="spire" />
      <Place at={d.tip} across={0.5}><span class="vain">+{Math.round(d.tip - d.roof)} m of spire</span></Place>
    </Show>
    <Label edge="start" class="name">{d.name}</Label>
    <Label at={d.roof} side="before" class="metres">{Math.round(d.tip)}</Label>
  </div>
));

export default function Skyline(p) {
  // New data rebuilds the city: every tower keeps its footprint and its roofline, and only its height moves.
  const towers = createMemo(() => (!p.seed() ? TOWERS : TOWERS.map((t) => {
    const roof = Math.round((t.roof * rand(0.74, 1.16)) / 5) * 5;
    return { ...t, roof, tip: t.tip > t.roof ? roof + Math.round((t.tip - t.roof) * rand(0.6, 1.4)) : roof };
  })));
  return (
    <Poster look="skyline" kicker="New York · height in metres" title="Where the building stops"
      dek="Every tower is drawn to its own height, roofline and all. The orange above it is spire and antenna: height nobody stands in."
      note="Illustrative heights, rounded to 5 m. Hover a tower for its spire.">
      <Chart orientation={p.o()} scale={[0, 560]} ticks={false} height={370} animate={p.js()} theme={styles.theme}>
        <Plot rows={towers()} key="name">{TowerSlat}</Plot>
      </Chart>
    </Poster>
  );
}
