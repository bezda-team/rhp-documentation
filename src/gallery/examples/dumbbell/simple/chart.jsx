import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Dot, Label, slat, sortBy } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const CITIES = ["Oslo", "Madrid", "Cairo", "Tokyo", "Lima"];
const LOW = [-4, 3, 9, 2, 14]; // January's average low and high, °C
const HIGH = [0, 12, 19, 10, 26];

// A city: a Bar from its low to its high, and a Dot at each end.
export const CitySlat = slat({ css: styles.city }, (d) => (
  <div>
    <Label edge="start">{d.city}</Label>
    <Bar from={d.low} to={d.high} thick="4px" class="line" />
    <Dot at={d.low} size="12px" class="low" />
    <Dot at={d.high} size="12px" class="high" />
  </div>
));

export default function Dumbbell(p) {
  const temps = createMemo(() => {
    if (!p.seed()) return { low: LOW, high: HIGH };
    const low = CITIES.map(() => Math.round(rand(-8, 16)));
    return { low, high: low.map((v) => v + Math.round(rand(4, 12))) };
  });
  return (
    <>
      <p class="legend"><span><i style={{ background: "#2a78d6" }} />Low</span><span><i style={{ background: "#eb6834" }} />High</span></p>
      <Chart orientation={p.o()} scale={[-10, 30]} format={(v) => v + "°"} animate={p.js()}>
        <Plot city={CITIES} low={temps().low} high={temps().high} order={sortBy("high", "desc")}>{CitySlat}</Plot>
      </Chart>
    </>
  );
}
