import { createSignal, createMemo, Show } from "solid-js";
import { Plot, Scale, Chart, Bar, Dot, Label, Area, Poster, slat, every, summary, density } from "@bezda/rhp";
import { normalsIn } from "@gallery/random.js";
import * as styles from "./styles.js";

const STRINGS = ["Violin", "Viola", "Cello", "Double bass"];
const TESSITURA = [[55, 100, 76, 6.5], [48, 88, 66, 6], [36, 81, 54, 6.5], [28, 67, 42, 5.5]]; // lowest, highest (MIDI note), centre, spread
const VARNISH = ["#d08a3c", "#b0652a", "#8a4719", "#6a3312"]; // darker wood for the bigger instruments
const black = (m) => [1, 3, 6, 8, 10].includes(((m % 12) + 12) % 12);
const noteName = (m) => ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"][((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);

// The pitch scale is a keyboard: a Scale with a key per semitone, each drawn from d.at to d.next, and every C named.
// d.low, d.high and d.tint come from the instrument under the pointer: the keys it reaches light up in its varnish,
// and the names mark its lowest and highest notes instead.
export const KeySlat = slat({
  room: { horizontal: { after: 50 }, vertical: { before: 60 } },
  css: styles.key,
}, (k) => {
  const lit = () => k.low != null && k.at >= k.low && k.at <= k.high;
  const named = () => (k.low == null ? k.at % 12 === 0 : k.at === k.low || k.at === k.high);
  return (
    <div class={(black(k.at) ? "black" : "white") + (lit() ? " lit" : "")} style={{ "--tint": k.tint }}>
      <Bar from={k.at} to={k.next} class="key" />
      <Show when={named()}><Label at={k.at} class="c">{noteName(k.at)}</Label></Show>
    </div>
  );
});

export const InstrumentSlat = slat({
  thickness: { horizontal: 74 },
  inset: 0.05,
  room: { horizontal: { start: 140, end: 16 }, vertical: { start: 30, end: 12 } },
  css: styles.instrument,
}, (d) => {
  const shape = createMemo(() => density(d.notes, { points: 48 })); // [[note, density], ...]
  const box = createMemo(() => summary(d.notes));
  return (
    <div data-instrument={d.index} class={d.pick == null ? "" : d.pick === d.index ? "on" : "off"}>
      <Label edge="start" class="name">{d.name}</Label>
      <Area points={shape()} mirror peak={d.peak} color={d.varnish} class="body" />
      <Bar from={box().q1} to={box().q3} thick="3px" class="string" />
      <Dot at={box().median} size="8px" class="median" />
    </div>
  );
});

export default function Violin(p) {
  const notes = createMemo(() => (p.seed(), TESSITURA.map(([lo, hi, mid, sd]) => normalsIn(80, lo, hi, mid, sd))));
  // One peak for every instrument, so their widths compare: a value shared by all slats, not a list.
  const peak = createMemo(() => Math.max(...notes().flatMap((s) => density(s, { points: 48 }).map((q) => q[1]))));
  // The instrument under the pointer (when it moves), and the keys it reaches (a note is on the key it falls in).
  const [pick, setPick] = createSignal(null);
  const point = (e) => { const i = e.target.closest("[data-instrument]")?.dataset.instrument; setPick(i == null ? null : +i); };
  const reach = createMemo(() => (pick() == null ? {} : {
    low: Math.floor(Math.min(...notes()[pick()])), high: Math.floor(Math.max(...notes()[pick()])), tint: VARNISH[pick()],
  }));
  return (
    <Poster look="strings" kicker="Where the strings play" title="The string section" dek="Every note each instrument plays in one movement, by pitch, over a piano keyboard."
      note="Illustrative data. Point at an instrument to find its range on the keyboard."
      onPointerMove={point} onPointerDown={point} onPointerLeave={(e) => e.pointerType !== "touch" && setPick(null)}>
      <Chart orientation={p.o()} scale={[26, 102]} height={360} animate={p.js()} theme={styles.theme}>
        <Scale ticks={every(1)} low={reach().low} high={reach().high} tint={reach().tint}>{KeySlat}</Scale>
        <Plot name={STRINGS} notes={notes()} peak={peak()} varnish={VARNISH} pick={pick()}>{InstrumentSlat}</Plot>
      </Chart>
    </Poster>
  );
}
