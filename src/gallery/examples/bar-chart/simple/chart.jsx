import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, sortBy } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const FRUITS = ["Apple", "Banana", "Cherry", "Kiwi", "Lemon", "Mango"];
const SOLD = [12, 18, 7, 22, 15, 9];

// A fruit: its name at the start, its bar, and its value just past the bar's end.
export const RowSlat = slat({ css: styles.slat }, (d) => (
  <div class="slat">
    <Label edge="start">{d.name}</Label>
    <Bar to={d.sold} class="bar" />
    <Label at={d.sold} class="value">{Math.round(d.sold)}</Label>
  </div>
));

export default function BarChart(p) {
  const sold = createMemo(() => (p.seed() ? FRUITS.map(() => Math.round(rand(2, 30))) : SOLD));
  return (
    <Chart orientation={p.o()} scale={[0, 30]} animate={p.js()}>
      <Plot name={FRUITS} sold={sold()} order={sortBy("sold", "desc")}>{RowSlat}</Plot>
    </Chart>
  );
}
