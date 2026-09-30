import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// Each tower's roof, and the spire or antenna above it.
const TOWERS = ["Central Park", "111 W 57th", "432 Park", "Empire State", "Chrysler", "One WTC"];
const ROOF = [470, 435, 425, 380, 280, 415];
const TIP = [470, 435, 425, 445, 320, 540];

// A tower: a Bar to its roof, a thin Bar from the roof up to its tip, and the tip's height.
export const TowerSlat = slat({ css: styles.tower, inset: "2px" }, (d) => (
  <div>
    <Label edge="start">{d.name}</Label>
    <Bar to={d.roof} class="roof" />
    <Bar from={d.roof} to={d.tip} thick="5px" color="series-2" class="spire" />
    <Label at={d.tip} class="metres">{Math.round(d.tip)} m</Label>
  </div>
));

export default function Skyline(p) {
  const roof = createMemo(() => (p.seed() ? ROOF.map((h) => Math.round(rand(0.7, 1.2) * h)) : ROOF));
  const tip = createMemo(() => roof().map((h, i) => (TIP[i] > ROOF[i] ? h + Math.round(TIP[i] - ROOF[i]) : h)));
  return (
    <Chart orientation={p.o()} scale={[0, 560]} ticks={[0, 200, 400]} format={(v) => v + " m"} animate={p.js()}>
      <Plot name={TOWERS} roof={roof()} tip={tip()}>{TowerSlat}</Plot>
    </Chart>
  );
}
