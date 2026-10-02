import { createMemo, createSignal, For } from "solid-js";
import { Plot, Chart, Bar, Dot, Label, Poster, slat } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the posters' looks
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

// The four stages a new drug has to clear. `mark` is the number a ring has room for, `from` and `to` the arc's
// colors at its two ends.
const STAGES = [
  { name: "Phase I", mark: "I", share: 63.2, from: "#2ec4b6", to: "#2a7fe4" },
  { name: "Phase II", mark: "II", share: 30.7, from: "#ef3d8f", to: "#8b3ff0" },
  { name: "Phase III", mark: "III", share: 58.1, from: "#fb923c", to: "#eab308" },
  { name: "Review", mark: "IV", share: 85.3, from: "#a3e635", to: "#16a34a" },
];

// `left`: how many of a hundred starters are still in after each stage. Every share so far, multiplied.
const withLeft = (stages) => {
  let left = 100;

  return stages.map((s) => {
    left = (left * s.share) / 100;
    return { ...s, left };
  });
};

// A stage: its ring, the arc sweeping its share, a cap at each end of the arc, the number at its start and the share
// at its end. The arc and caps share a box so one shadow falls under all three.
export const StageSlat = slat({
  thickness: { horizontal: 52 },
  room: { horizontal: { start: 4, end: 64 }, vertical: { start: 6, end: 6 } },
  css: styles.stage,
}, (d) => (
  <div class="slat" data-row={d.index} style={{ "--from": d.from, "--to": d.to }}>
    <div class="track" />
    <div class="lift">
      <Bar to={d.share} class="arc" />
      <Dot at={0} class="cap start" />
      <Dot at={d.share} class="cap end" />
    </div>
    <Label at={0} class="name"><span>{d.name}</span><b>{d.mark}</b></Label>
    <Label at={d.share} class="share">{d.share.toFixed(1)}%</Label>
  </div>
));

export default function RadialBars(p) {
  const stages = createMemo(() => withLeft(!p.seed ? STAGES : STAGES.map((s) => ({ ...s, share: Math.round(rand(24, 94) * 10) / 10 }))));

  // The stage the reader is on. One readout in the middle serves the whole chart, in that ring's color, so pointing
  // at a ring redraws one line of text, not a card per ring.
  const [on, setOn] = createSignal(null);
  const here = () => (on() == null ? null : stages()[on()]);
  const overall = () => stages()[stages().length - 1];
  const rowAt = (e) => {
    const el = e.target.closest("[data-row]");
    return el ? +el.dataset.row : null;
  };

  return (
    <Poster look="trials" kicker="Drug development · share that gets through" title="One in ten"
      dek="Of a hundred drugs that begin human trials, only a handful are ever prescribed. Each ring is one stage, and the arc around it is the share that gets through."
      note="Illustrative, after BIO, Biomedtracker and Amplion, Clinical Development Success Rates 2006–2015. Point at a ring, or tab into the chart, for what is left after that stage."
      onPointerMove={(e) => setOn(rowAt(e))}
      onPointerDown={(e) => setOn(rowAt(e))}
      onPointerLeave={(e) => e.pointerType !== "touch" && setOn(null)}
      onFocusIn={(e) => setOn(rowAt(e))}
      onFocusOut={(e) => !e.currentTarget.contains(e.relatedTarget) && setOn(null)}
    >
      <span class="keys">
        <For each={stages()}>{(s) => <span><i style={{ background: `linear-gradient(90deg, ${s.from}, ${s.to})` }} />{s.name}</span>}</For>
      </span>
      {/* 560 is the widest. The poster's CSS shrinks the box with the circle, so no empty band is left around it. */}
      <Chart orientation={p.o} scale={[0, 100]} ticks={false} height={560} animate={p.js} theme={styles.theme}>
        <div class="hub">
          <div style={{ "--on": here()?.to }}>
            <b>{(here() ?? overall()).left.toFixed(1)}%</b>
            <span>{here() ? "left after " + here().name : "reach a pharmacy"}</span>
          </div>
        </div>
        <Plot keyboard rows={stages()} key="name">{StageSlat}</Plot>
      </Chart>
    </Poster>
  );
}
