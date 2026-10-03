import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, Poster, slat } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);
const KNOTS = [12, 4, 8, 10];

const QUARTERS = ["North", "East", "South", "West"];
const BEARING = { North: 0, East: 90, South: 180, West: 270 };

// v1's tutorial: the value shows when you hover its slat. The fade is on the text inside the Label, since a transition
// on the Label itself would replace rhp's and it would jump instead of moving with its bar.
export const WindSlat = slat({
  thickness: { horizontal: 60 },
  room: { horizontal: { start: 128, end: 64 }, vertical: { start: 64, end: 30 } },
  css: styles.wind,
}, (d) => (
  <div class="slat">
    <Label edge="start" class="quarter"><span class="dial"><i class="needle" style={{ rotate: BEARING[d.quarter] + "deg" }} /></span>{d.quarter}</Label>
    <Bar to={d.knots} thick="10px" class="gust" />
    <Label at={d.knots} class="knots"><span>{Math.round(d.knots)} kn</span></Label>
  </div>
));

export default function Tutorial(p) {
  const knots = createMemo(() => (p.seed ? KNOTS.map((v) => Math.max(2, Math.round(v + rand(-3, 3)))) : KNOTS));
  return (
    <Poster look="wind" kicker="Harbour log · this week" title="Where the wind blows from" dek="Average wind speed from each quarter. Hover a row to read it in knots.">
      <Chart orientation={p.o} scale={[0, 15]} ticks={[0, 5, 10, 15]} format={(v) => v + " kn"} height={300} animate={p.js} theme={styles.theme}>
        <Plot quarter={QUARTERS} knots={knots()}>{WindSlat}</Plot>
      </Chart>
    </Poster>
  );
}
