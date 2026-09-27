import { createMemo } from "solid-js";
import { Plot, Chart, Bar, Label, slat } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const QUARTERS = ["North", "East", "South", "West"];
const BEARING = { North: 0, East: 90, South: 180, West: 270 };

// v1's tutorial: the value hides until you hover its row, with CSS the slat owns. The compass needle points
// to the quarter the wind comes from. The fade is on the text inside the Label: a transition set on a block
// would replace the one rhp gives it, and the Label would jump to a new value instead of moving with its bar.
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
  const knots = createMemo(() => (p.seed(), [12, 5, 7, 9].map((v) => Math.max(2, Math.round(v + rand(-3, 3))))));
  return (
    <Poster look="wind" kicker="Harbour log · this week" title="Where the wind blows from" dek="Average wind speed from each quarter. Hover a row to read it in knots.">
      <Chart orientation={p.o()} scale={[0, 15]} ticks={[0, 5, 10, 15]} format={(v) => v + " kn"} height={300} animate={p.js()} theme={styles.theme}>
        <Plot quarter={QUARTERS} knots={knots()}>{WindSlat}</Plot>
      </Chart>
    </Poster>
  );
}
