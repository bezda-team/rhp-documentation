import { createSignal, createMemo } from "solid-js";
import { Plot, Chart, Bar, Tick, Label, slat, stackUp, shares } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const PEOPLE = ["Student", "Commuter", "Gamer", "Traveller"];
const APPS = ["Video", "Social", "Games", "Music", "Maps"];
const APP_COLORS = ["#e5484d", "#5b5bd6", "#d98a00", "#c2418f", "#2f9e63"]; // an order whose neighbors stay apart for colorblind readers
const USE = [[26, 34, 8, 20, 12], [18, 22, 4, 26, 30], [20, 12, 48, 12, 8], [10, 14, 4, 14, 58]]; // % of a day's battery

// One app's share of the charge. Its number shows only where it fits: 9% and up, 16% on a narrow battery.
// d.focus is the app under the pointer, from the poster: it stays lit in every battery and the others fade, so one
// app reads across people. Its number then shows on every segment, as a badge over one too thin to hold it.
export const ChargeSlat = slat({ css: styles.charge }, (c) => {
  const share = () => c.to - c.from;
  const fits = () => (share() < 9 ? " small" : share() < 16 ? " mid" : "");
  const lit = () => (c.focus == null ? "" : c.focus === c.app ? " on" : " off");
  return (
    <Bar from={c.from} to={c.to} color={c.color} data-app={c.app} class={"charge " + c.app.toLowerCase() + fits() + lit()}>
      <span>{Math.round(share())}%</span>
    </Bar>
  );
});

// A battery: the shell a little larger than the track, the nub past its end, the charge inside.
export const BatterySlat = slat({
  band: { horizontal: 52 },
  room: { horizontal: { start: 92, end: 18 }, vertical: { start: 30, end: 18 } },
  css: styles.battery,
}, (d) => {
  const cell = createMemo(() => stackUp(shares(d.use))); // each app as a share of 100, stacked
  return (
    <div>
      <Label edge="start" class="who">{d.name}</Label>
      <Bar to={100} class="shell" />
      <Tick at={100} class="nub" />
      <Plot overlap from={cell().from} to={cell().to} color={APP_COLORS} app={APPS} focus={d.focus}>{ChargeSlat}</Plot>
    </div>
  );
});

export default function Segmented(p) {
  const use = createMemo(() => (p.seed() ? PEOPLE.map(() => APPS.map(() => rand(4, 40))) : USE));
  // The app in focus: the one the pointer is on, in the key or in a battery, else the one clicked. The key buttons and
  // the segments carry data-app, and the poster listens for both. A click, or Enter on a key, pins an app or unpins it.
  // The pointer counts when it moves: a still pointer over a badge that comes or goes isn't a new choice.
  const [hovered, setHovered] = createSignal(null), [pinned, setPinned] = createSignal(null);
  const app = () => hovered() ?? pinned();
  const under = (e) => e.target.closest("[data-app]")?.dataset.app ?? null;
  const pin = (e) => {
    const a = under(e);
    if (!a) return;
    setPinned(pinned() === a ? null : a);
    setHovered(null); // the click is the latest word, until the pointer moves again
  };
  return (
    <Poster look="battery" kicker="A day on one charge" title="Where the battery goes"
      onPointerMove={(e) => setHovered(under(e))} onPointerLeave={() => setHovered(null)} onClick={pin}
      dek={<span class="keys">{APPS.map((a, i) => (
        <button type="button" data-app={a} aria-pressed={pinned() === a} classList={{ off: app() != null && app() !== a }}>
          <i style={{ background: APP_COLORS[i] }} />{a}
        </button>
      ))}</span>}
      note="Point at an app, in the key or in a battery, to follow it through everyone's day; click to keep it.">
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={300} animate={p.js()} theme={styles.theme}>
        <Plot name={PEOPLE} use={use()} focus={app()}>{BatterySlat}</Plot>
      </Chart>
    </Poster>
  );
}
