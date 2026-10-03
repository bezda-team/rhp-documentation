import { createSignal } from "solid-js";
import { Plot, Chart, Bar, Dot, Label, Poster, slat, sortBy } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const PEAKS = ["Everest", "K2", "Aconcagua", "Denali", "Kilimanjaro", "Elbrus", "Mont Blanc"];
const WHERE = ["Nepal · China", "Pakistan · China", "Argentina", "Alaska", "Tanzania", "Russia", "France · Italy"];
const CAMP = [5364, 5150, 4300, 2200, 1800, 2350, 1035]; // the usual base camp, m
const SUMMIT = [8849, 8611, 6961, 6190, 5895, 5642, 4806];
const metres = (v) => Math.round(v).toLocaleString("en-GB") + " m";

// A climb: the route from the tent at base camp to the snow-capped peak.
export const ClimbSlat = slat({
  thickness: { horizontal: 50 },
  room: { horizontal: { start: 124, end: 70 }, vertical: { start: 38, end: 34, after: 18 } },
  css: styles.climb,
}, (d) => (
  <div class={d.by === "climb" ? "by-climb" : ""}>
    <Label edge="start" class="peak-name">{d.peak}<small>{d.where}</small></Label>
    <Bar from={d.camp} to={d.summit} thick="3px" class="route" />
    <Dot at={d.camp} class="tent" />
    <Dot at={d.summit} class="summit" />
    <Label at={d.summit} class="height"><span>{metres(d.summit)}</span></Label>
    <Label at={(d.camp + d.summit) / 2} class="gain"><span>+{metres(d.summit - d.camp)}</span></Label>
  </div>
));

export default function Range(p) {
  const [by, setBy] = createSignal("summit"); // the order: "summit" (the highest first) or "climb" (the biggest first)
  return (
    <Poster look="alpine" kicker="Seven great climbs" title="Base camp to summit"
      dek={<>From the tent at the usual base camp to the top, in metres.
        <span class="choice" role="group" aria-label="Order the peaks by">
          <button type="button" aria-pressed={by() === "summit"} onClick={() => setBy("summit")}>Highest summit</button>
          <button type="button" aria-pressed={by() === "climb"} onClick={() => setBy("climb")}>Biggest climb</button>
        </span></>}
      note="Click Highest summit or Biggest climb to reorder the peaks. Base camps vary by route; summit heights from recent surveys.">
      <Chart orientation={p.o} scale={[0, 9000]} ticks={[0, 4000, 8000]} format={(v) => v / 1000 + " km"} height={340} animate={p.js} theme={styles.theme}>
        <Plot peak={PEAKS} where={WHERE} camp={CAMP} summit={SUMMIT} by={by()} key="peak"
          order={sortBy((d) => (by() === "summit" ? d.summit : d.summit - d.camp), "desc")}>{ClimbSlat}</Plot>
      </Chart>
    </Poster>
  );
}
