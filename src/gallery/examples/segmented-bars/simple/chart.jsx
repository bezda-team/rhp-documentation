import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, stackUp, shares } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const PEOPLE = ["Ana", "Ben", "Cai", "Dee"];
const APPS = ["Video", "Social", "Games", "Maps"];
const COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#c2419a"];
const HOURS = [[3, 2, 0.5, 1], [1, 3, 0.5, 2], [1, 1, 4, 0.5], [0.5, 1, 0.5, 5]]; // per person: hours in each app

// A share: a Bar from where the shares before it end to where it ends, out of 100.
export const ShareSlat = slat({ css: styles.share }, (s) => <Bar from={s.from} to={s.to} color={s.color} class="share" />);

// A person: their name, and their shares of 100 stacked in one band.
export const PersonSlat = slat({ css: styles.person }, (d) => {
  const stack = createMemo(() => stackUp(shares(d.hours))); // each app as a share of 100, stacked
  return (
    <div>
      <Label edge="start">{d.name}</Label>
      <Plot overlap from={stack().from} to={stack().to} color={COLORS} class="shares">{ShareSlat}</Plot>
    </div>
  );
});

export default function SegmentedBars(p) {
  const hours = createMemo(() => (p.seed() ? PEOPLE.map(() => APPS.map(() => rand(0.3, 5))) : HOURS));
  return (
    <>
      <p class="legend">{APPS.map((app, i) => <span><i style={{ background: COLORS[i] }} />{app}</span>)}</p>
      <Chart orientation={p.o()} scale={[0, 100]} ticks={[0, 50, 100]} format={(v) => v + "%"} animate={p.js()}>
        <Plot name={PEOPLE} hours={hours()}>{PersonSlat}</Plot>
      </Chart>
    </>
  );
}
