import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, Place, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// Ten New York towers, north to south along the island, so the skyline reads as a skyline.
// roof is the height of the top floor; tip adds the spire or antenna above it. Heights are rounded to 5 m.
const TOWERS = [
  { name: "Central Park", roof: 470, tip: 470, wide: 0.86 },
  { name: "111 W 57th", roof: 435, tip: 435, wide: 0.46 },
  { name: "Vanderbilt", roof: 370, tip: 425, wide: 0.96 },
  { name: "432 Park", roof: 425, tip: 425, wide: 0.62 },
  { name: "Chrysler", roof: 280, tip: 320, wide: 0.9 },
  { name: "Empire State", roof: 380, tip: 445, wide: 1 },
  { name: "30 Hudson", roof: 385, tip: 385, wide: 0.94 },
  { name: "BofA Tower", roof: 340, tip: 365, wide: 0.82 },
  { name: "3 WTC", roof: 330, tip: 330, wide: 0.88 },
  { name: "One WTC", roof: 415, tip: 540, wide: 1 },
];

// A tower: its building up to the roof, its spire above that, the height at the top, and its name below.
export const TowerSlat = slat({
  inset: 0, // the towers stand shoulder to shoulder, the way a skyline does
  thickness: { horizontal: 34 },
  room: { horizontal: { start: 104, end: 54 }, vertical: { start: 34, end: 34 } },
  css: styles.tower,
}, (d) => (
  <div class="slat">
    <Bar to={d.roof} thick={d.wide} class="roof" />
    <Bar from={d.roof} to={d.tip} thick={Math.min(0.1, d.wide * 0.12)} class="spire" />
    <Label edge="start" class="name">{d.name}</Label>
    <Label at={d.tip} class="metres">{Math.round(d.tip)}</Label>
    <Place at={d.roof} across={0.5}>
      <span class="vain">{d.tip > d.roof ? "+" + Math.round(d.tip - d.roof) + " m of spire" : "all building"}</span>
    </Place>
  </div>
));

export default function Skyline(p) {
  // New data shakes the city: every tower keeps its shape, and the ones with spires keep their spires.
  const towers = createMemo(() => (!p.seed() ? TOWERS : TOWERS.map((t) => {
    const roof = Math.round((t.roof * rand(0.75, 1.2)) / 5) * 5;
    return { ...t, roof, tip: t.tip > t.roof ? roof + Math.round((t.tip - t.roof) * rand(0.6, 1.4)) : roof };
  })));
  return (
    <Poster look="skyline" kicker="New York · height in metres" title="Where the building stops"
      dek="The solid part of each tower is its roof, where the top floor is. The orange above it is spire and antenna: height nobody stands in."
      note="Illustrative heights, rounded to 5 m. Hover a tower for its spire.">
      <Chart orientation={p.o()} scale={[0, 560]} ticks={[0, 200, 400]} format={(v) => v + " m"} height={330} animate={p.js()} theme={styles.theme}>
        <Plot rows={towers()} key="name">{TowerSlat}</Plot>
      </Chart>
    </Poster>
  );
}
