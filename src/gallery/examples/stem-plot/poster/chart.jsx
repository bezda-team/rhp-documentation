import { createSignal, createMemo } from "solid-js";
import { Plot, Scale, Chart, Bar, Dot, Tick, Poster, slat } from "@bezda/rhp";
import { random } from "@gallery/random.js";
import * as styles from "./styles.js";

// One sample: a stem from rest, glowing at its tip, fading as the ring dies away (--fade).
// A new strike reaches the samples one after another (--k, 8 ms apart), so it runs down the wave like the sound does.
// A delay adds to the transition rhp gives a block without replacing it. (The JS version moves every sample at once.)
export const SampleSlat = slat({
  thickness: { horizontal: 12 },
  room: { start: 12, end: 12 },
  css: styles.sample,
}, (d) => (
  <div style={{ "--fade": 1 - d.index / 46, "--k": d.index }}>
    <Bar to={d.y} thick="4px" class="swing" />
    <Dot at={d.y} size="7px" class="tip" />
  </div>
));

// The resting line, the only scale a waveform needs.
export const RestSlat = slat({ css: styles.rest }, () => <div><Tick at={0} thick={1} class="rest" /></div>);

export default function Stem(p) {
  const [strikes, setStrikes] = createSignal(0); // each strike rings with a new pitch and decay
  const y = createMemo(() => {
    const { rand } = random(p.seed() + strikes());
    const w = rand(0.45, 0.8), decay = rand(9, 18);
    return Array.from({ length: 36 }, (_, k) => Math.cos(k * w) * Math.exp(-k / decay));
  });
  const strike = () => setStrikes(strikes() + 1);
  return (
    <Poster look="sound" kicker="One strike · 36 samples" title="The sound of a bell" dek="Each swing is smaller than the last, until the note dies away. Click the wave to strike the bell again.">
      <div class="strike" role="button" tabindex="0" aria-label="Strike the bell again" onClick={strike}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), strike())}>
        <Chart orientation={p.o()} scale={[-1.05, 1.05]} height={280} animate={p.js()} theme={styles.theme}>
          <Scale ticks={[0]}>{RestSlat}</Scale>
          <Plot y={y()}>{SampleSlat}</Plot>
        </Chart>
      </div>
    </Poster>
  );
}
