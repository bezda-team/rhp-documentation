import { createSignal, createMemo, createComputed, on } from "solid-js";
import { Plot, Scale, Chart, Bar, Tick, Label, slat, useOrientation, sortBy, every } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";
// v1's cloud photos, re-encoded at the size they are shown.
import stratocumulus from "./assets/stratocumulus.jpg?url";
import cumulonimbus from "./assets/cumulonimbus.jpg?url";
import altocumulus from "./assets/altocumulus.jpg?url";
import cirrus from "./assets/cirrus.jpg?url";
import nimbostratus from "./assets/nimbostratus.jpg?url";
import cumulus from "./assets/cumulus.jpg?url";
import cirrocumulus from "./assets/cirrocumulus.jpg?url";

// v1's scale: a Scale in the Chart draws it, one slat per tick, a mark and its number.
// The marks start 16px above the first row, and the numbers sit over them, in the room this slat asks for.
// A mark is "zero" (solid, just before 0), "end" (solid, at the max), or between them `marks`:
// "line" (dashed, as long as the plot) or "tick" (13px long).
export const V1Scale = slat({
  room: { horizontal: { before: 40, after: 13 }, vertical: { before: 24, end: 30, after: 13 } },
  css: styles.scale,
}, (t) => {
  // A number just before the end would run into the end mark, so it's left out, and only then: horizontal, when its
  // text (8px past its mark, about 8px a digit) would come within 3px of the end mark; vertical, when its line
  // (19.5px tall, 8px above its mark) would. t.toEnd is the tick's distance to the end, in px.
  const o = useOrientation();
  const crowded = () => !t.first && !t.last && t.toEnd < (o() === "vertical" ? 31 : 11 + 8 * String(Math.round(t.at)).length);
  return (
    <div class={t.first ? "zero" : t.last ? "end" : t.marks}>
      <Tick at={t.at} thick={1} class="mark" />
      <Label at={t.at} class={crowded() ? "num crowded" : "num"}>{Math.round(t.at)}</Label>
    </div>
  );
});

const CLOUDS = ["stratocumulus", "cumulonimbus", "altocumulus", "cirrus", "nimbostratus", "cumulus", "cirrocumulus"];
const PHOTOS = [stratocumulus, cumulonimbus, altocumulus, cirrus, nimbostratus, cumulus, cirrocumulus];
const GREYS = ["#9fa2a4", "#cbdddf", "#a5aeb5", "#dbe7eb", "#dae6ec", "#c2d6e0", "#c9ced3"];
// v1's data: [low whisker, box start, box end, high whisker] per cloud
const WHISKERS = [[1, 3, 9, 10], [2, 3, 15, 20], [5, 9, 16, 18], [3, 4, 7, 9], [10, 18, 22, 25], [13, 15, 18, 22], [15, 20, 26, 27]];

export const BoxSlat = slat({
  thickness: { horizontal: 79 },
  inset: "8px",
  room: { horizontal: { start: 96, end: 37 }, vertical: { start: 80, end: 30 } }, // for the photos and values
  css: styles.box,
}, (d) => (
  <div class={d.dim ? "slat dim" : "slat"} style={{ "--rhp-color": d.color }}>
    <Label edge="start" class="photo"><div class="circle"><img src={d.photo} alt={d.name} /></div></Label>
    <Bar from={d.box[0]} to={d.box[1]} thick="6px" class="whisker" />
    <Bar from={d.box[2]} to={d.box[3]} thick="6px" class="whisker" />
    <Tick at={d.box[0]} thick="19px" class="cap" />
    <Tick at={d.box[3]} thick="19px" class="cap" />
    <Bar from={d.box[1]} to={d.box[2]} class="box"><span>{d.name}</span></Bar>
    <Label at={d.box[3]} class="value">{Math.round(d.box[3])}</Label>
  </div>
));

const whiskers = () => {
  const low = Math.round(rand(0, 14)), q1 = low + Math.round(rand(1, 6)), q3 = q1 + Math.round(rand(2, 8));
  return [low, q1, q3, q3 + Math.round(rand(1, 6))];
};

export default function Clouds(p) {
  const data = createMemo(() => (p.seed() ? CLOUDS.map(whiskers) : WHISKERS));
  // The slider moves stratocumulus' box end (its 3rd value); the high whisker is pushed along past it, and
  // comes back when the box shrinks again. New data resets it.
  const [end, setEnd] = createSignal();
  createComputed(on(data, () => setEnd(undefined)));
  const boxes = createMemo(() => data().map((b, i) => (i === 0 && end() != null ? [b[0], b[1], Math.max(b[1], end()), Math.max(b[3], end())] : b)));
  const max = createMemo(() => Math.max(...boxes().map((b) => b[3]))); // "Fit"
  const [ranked, setRanked] = createSignal(true);
  const [dim, setDim] = createSignal(false);
  return (
    <>
      <div class="buttons">
        <button class="mini" onClick={() => setRanked(!ranked())}>{ranked() ? "Initial" : "Rank"}</button>
        <button class="mini" onClick={() => setDim(!dim())}>{dim() ? "Saturate" : "Desaturate"}</button>
        <label class="slider">stratocumulus box end
          <input type="range" min={boxes()[0][1]} max="40" value={boxes()[0][2]} onInput={(e) => setEnd(+e.currentTarget.value)} />
          <output>{boxes()[0][2]}</output>
        </label>
      </div>
      <div class="v1-card">{/* v1's white card, from the page's CSS */}
        <Chart orientation={p.o()} scale={[0, max()]} height={480} animate={p.js()}>
          <Scale ticks={every(5, { ends: true })} marks="tick">{V1Scale}</Scale>
          <Plot name={CLOUDS} photo={PHOTOS} color={GREYS} box={boxes()} dim={dim()}
            order={ranked() ? sortBy((d) => d.box[2], "desc") : undefined}>{BoxSlat}</Plot>
        </Chart>
      </div>
    </>
  );
}
