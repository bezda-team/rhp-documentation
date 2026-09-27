import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, slat, sortBy, nice, stackUp } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand, sum } from "@gallery/random.js";
import * as styles from "./styles.js";

const DRINKS = ["Espresso", "Macchiato", "Cortado", "Flat white", "Cappuccino", "Latte"];
const RECIPES = [[30, 0, 0], [30, 0, 15], [30, 30, 0], [60, 100, 10], [60, 60, 60], [60, 150, 20]]; // ml of espresso, milk, foam
const LAYERS = ["espresso", "milk", "foam"];
const POURS = { espresso: "espresso", milk: "steamed milk", foam: "foam" };

// One layer of a drink. `end` is the last layer with anything in it, which gets the cup's rounded end.
// Hover a layer and it lifts out of the cup, with a tag over it naming the pour. The tag is an element inside the
// Bar: rhp guards its blocks from the page's CSS, not what a slat puts in them, so its class is one a page won't use.
export const LayerSlat = slat({ css: styles.layer }, (l) => (
  <Bar from={l.from} to={l.to} class={"layer " + l.part + (l.index === l.end ? " end" : "") + (l.to - l.from < 0.5 ? " empty" : "")}>
    <span class="pour"><b>{Math.round(l.to - l.from)} ml</b>{POURS[l.part]}</span>
  </Bar>
));

export const DrinkSlat = slat({
  inset: "10px",
  thickness: { horizontal: 58 },
  room: { horizontal: { start: 132, end: 60 }, vertical: { start: 46, end: 30 } },
  css: styles.drink,
}, (d) => {
  const layer = createMemo(() => stackUp(d.ml)); // { from, to } per layer
  return (
    <div class="serving">
      <Label edge="start" class="drink">{d.name}</Label>
      <Bar to={layer().to.at(-1)} class="cup" />
      <Plot overlap from={layer().from} to={layer().to} part={LAYERS} end={d.ml.findLastIndex((v) => v > 0.5)}>{LayerSlat}</Plot>
      <Label at={layer().to.at(-1)} class="ml">{Math.round(layer().to.at(-1))} ML</Label>
    </div>
  );
});

export default function Stacked(p) {
  const ml = createMemo(() => (p.seed() ? RECIPES.map(([e, m, f]) => [e, Math.round(m * rand(0.75, 1.25)), Math.round(f * rand(0.75, 1.25))]) : RECIPES));
  return (
    <Poster look="coffee" kicker="The coffee bar, explained" title="Anatomy of a coffee"
      dek={<span class="keys"><span><i class="espresso" />Espresso</span><span><i class="milk" />Steamed milk</span><span><i class="foam" />Foam</span></span>}
      note="Typical pours in ml; every café pours its own.">
      <Chart orientation={p.o()} scale={[0, nice(0, Math.max(...ml().map(sum))).max]} ticks={3} height={320} animate={p.js()} theme={styles.theme}>
        <Plot name={DRINKS} ml={ml()} key="name" order={sortBy((d) => sum(d.ml), "desc")}>{DrinkSlat}</Plot>
      </Chart>
    </Poster>
  );
}
