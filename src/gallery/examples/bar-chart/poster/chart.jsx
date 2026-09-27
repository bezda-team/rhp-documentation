import { createSignal, createMemo, createComputed, on } from "solid-js";
import { Plot, Scale, Chart, Bar, Tick, Label, slat, useOrientation, sortBy, every } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";
// v1's fruit art (FreeVector.com).
import grape from "./assets/grape.svg?url";
import watermelon from "./assets/watermelon.svg?url";
import pear from "./assets/pear.svg?url";
import banana from "./assets/banana.svg?url";
import orange from "./assets/orange.svg?url";
import peach from "./assets/peach.svg?url";
import strawberry from "./assets/strawberry.svg?url";

// v1's scale: a Scale in the Chart draws it, one slat per tick, a mark and its number.
// The marks start 16px above the first row, and the numbers sit over them, in the room this slat asks for.
// A mark is "zero" (solid, just before 0), "end" (solid, at the max), or between them `marks`:
// "line" (dashed, as long as the plot) or "tick" (13px long).
export const V1Scale = slat({
  room: { horizontal: { before: 40, after: 13 }, vertical: { before: 24, end: 30, after: 13 } },
  css: styles.scale,
}, (t) => {
  // A number just before the end would run into the end mark, so it's left out, and only then: horizontal, when its
  // text (8px past its mark, about 8px a digit) would come within 3px of the end mark; vertical, when its line
  // (19.5px tall, 8px above its mark) would. t.toEnd is the tick's distance to the end, in px.
  const o = useOrientation();
  const crowded = () => !t.first && !t.last && t.toEnd < (o() === "vertical" ? 31 : 11 + 8 * String(Math.round(t.at)).length);
  return (
    <div class={t.first ? "zero" : t.last ? "end" : t.marks}>
      <Tick at={t.at} thick={1} class="mark" />
      <Label at={t.at} class={crowded() ? "num crowded" : "num"}>{Math.round(t.at)}</Label>
    </div>
  );
});

const NAMES = ["Fruit A", "Fruit B", "Fruit C", "Fruit D", "Fruit E", "Fruit F", "Fruit G"];
const FRUITS = ["grape", "watermelon", "pear", "banana", "orange", "peach", "strawberry"];
const ART = [grape, watermelon, pear, banana, orange, peach, strawberry];
const COLORS = ["pink", "#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#ce4257"];

export const FruitSlat = slat({
  thickness: { horizontal: 79 }, // v1: seven rows in 552px; vertical: the rows share the width
  inset: "8px",
  room: { horizontal: { start: 112, end: 32 }, vertical: { start: 32, end: 30 } }, // for the names and values
  css: styles.fruit,
}, (d) => (
  <div class={d.dim ? "slat dim" : "slat"} style={{ "--rhp-color": d.color }}>
    <Label edge="start" class="name">{d.name}</Label>
    <Bar to={d.value} class="bar"><img src={d.art} alt={d.fruit} /></Bar>
    <Label at={d.value} class="value">{Math.round(d.value)}</Label>
  </div>
));

export default function Fruit(p) {
  const data = createMemo(() => (p.seed() ? FRUITS.map(() => Math.round(rand(1, 30))) : [1, 2, 18, 3, 25, 13, 20]));
  const [a, setA] = createSignal(); // Fruit A from the slider; new data resets it
  createComputed(on(data, () => setA(undefined)));
  const values = createMemo(() => (a() == null ? data() : [a(), ...data().slice(1)]));
  const max = createMemo(() => Math.max(...values())); // v1's "Fit": the scale ends at the largest value
  const [ranked, setRanked] = createSignal(true);
  const [dim, setDim] = createSignal(false);
  return (
    <>
      <div class="buttons">
        <button class="mini" onClick={() => setRanked(!ranked())}>{ranked() ? "Initial" : "Rank"}</button>
        <button class="mini" onClick={() => setDim(!dim())}>{dim() ? "Saturate" : "Desaturate"}</button>
        <label class="slider">Fruit A
          <input type="range" min="0" max="100" value={values()[0]} onInput={(e) => setA(+e.currentTarget.value)} />
          <output>{values()[0]}</output>
        </label>
      </div>
      <Chart orientation={p.o()} scale={[0, max()]} height={480} animate={p.js()}>
        <Scale ticks={every(5, { ends: true })} marks="line">{V1Scale}</Scale>
        <Plot name={NAMES} fruit={FRUITS} art={ART} value={values()} color={COLORS} dim={dim()}
          order={ranked() ? sortBy("value", "desc") : undefined}>{FruitSlat}</Plot>
      </Chart>
    </>
  );
}
