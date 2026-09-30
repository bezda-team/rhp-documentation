import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, stackUp } from "@bezda/rhp";
import { rand, sum } from "@gallery/random.js";
import * as styles from "./styles.js";

const DRINKS = ["Latte", "Cappuccino", "Flat white", "Cortado"];
const PARTS = ["Espresso", "Milk", "Foam"];
const COLORS = ["#2a78d6", "#eb6834", "#1baf7a"];
const ML = [[60, 150, 20], [60, 60, 60], [60, 100, 10], [30, 30, 0]]; // per drink: espresso, milk, foam

// A layer: a Bar from where the layers below it end to where it ends.
export const LayerSlat = slat({ css: styles.layer }, (l) => <Bar from={l.from} to={l.to} color={l.color} part="mark" class="layer" />);

// A drink: its name, its layers in one band (an overlap Plot), and its total.
export const DrinkSlat = slat({ css: styles.drink }, (d) => {
  const stack = createMemo(() => stackUp(d.ml)); // { from: [...], to: [...] }, one of each per layer
  return (
    <div>
      <Label edge="start" part="name">{d.name}</Label>
      <Plot overlap from={stack().from} to={stack().to} color={COLORS}>{LayerSlat}</Plot>
      <Label at={stack().to.at(-1)} part="value" class="total">{Math.round(sum(d.ml))} ml</Label>
    </div>
  );
});

export default function StackedBars(p) {
  const ml = createMemo(() => (p.seed() ? ML.map((m) => m.map((v) => Math.round(v * rand(0.6, 1.4)))) : ML));
  return (
    <>
      <p class="legend">{PARTS.map((part, i) => <span><i style={{ background: COLORS[i] }} />{part}</span>)}</p>
      <Chart orientation={p.o()} scale={[0, 300]} animate={p.js()}>
        <Plot name={DRINKS} ml={ml()}>{DrinkSlat}</Plot>
      </Chart>
    </>
  );
}
