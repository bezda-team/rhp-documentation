import { createSignal, createMemo, onMount, onCleanup } from "solid-js";
import { Plot, Chart, Bar, Tick, Label, Poster, slat, stackUp, shares } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const PEOPLE = ["Student", "Commuter", "Gamer", "Traveller"];
const APPS = ["Video", "Social", "Games", "Music", "Maps"];
const APP_COLORS = ["#e5484d", "#5b5bd6", "#d98a00", "#c2418f", "#2f9e63"]; // neighbours stay apart for colorblind readers
const USE = [[26, 34, 8, 20, 12], [18, 22, 4, 26, 30], [20, 12, 48, 12, 8], [10, 14, 4, 14, 58]]; // % of a day's battery

// One app's share of the charge, its number shown where it fits. d.focus is the app in focus, from the poster.
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
  thickness: { horizontal: 52 },
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
  const use = createMemo(() => (p.seed ? PEOPLE.map(() => APPS.map(() => rand(4, 40))) : USE));
  // The app in focus: the one pointed at (key buttons and segments carry data-app), else the one clicked. A click
  // elsewhere or Escape lets it go. The pointer counts only when it moves.
  const [hovered, setHovered] = createSignal(null), [pinned, setPinned] = createSignal(null);
  const app = () => hovered() ?? pinned();
  const under = (e) => e.target.closest?.("[data-app]")?.dataset.app ?? null;
  onMount(() => {
    const click = (e) => {
      setPinned(under(e));
      setHovered(null); // the click is the latest word, until the pointer moves again
    };
    document.addEventListener("click", click);
    onCleanup(() => document.removeEventListener("click", click));
  });
  return (
    <Poster look="battery" kicker="A day on one charge" title="Where the battery goes"
      onPointerMove={(e) => setHovered(under(e))} onPointerLeave={() => setHovered(null)} onKeyDown={(e) => e.key === "Escape" && setPinned(null)}
      dek={<span class="keys">{APPS.map((a, i) => (
        <button type="button" data-app={a} aria-pressed={pinned() === a} classList={{ off: app() != null && app() !== a }}>
          <i style={{ background: APP_COLORS[i] }} />{a}
        </button>
      ))}</span>}
      note="Point at an app, in the key or in a battery, to follow it through everyone's day. Click it to keep it; click anywhere else to let it go.">
      <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={300} animate={p.js} theme={styles.theme}>
        <Plot name={PEOPLE} use={use()} focus={app()}>{BatterySlat}</Plot>
      </Chart>
    </Poster>
  );
}
