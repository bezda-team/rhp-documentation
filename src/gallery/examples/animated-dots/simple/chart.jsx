import { createSignal, createComputed, on, onCleanup } from "solid-js";
import { Chart, Plot, Dot, slat } from "@bezda/rhp";
import * as styles from "./styles.js";

const ROWS = 5, DOTS = 16;
const still = Array(ROWS).fill(0);

// A slat: an overlap Plot of dots, all in one band, moved along by its row's shift.
export const RowSlat = slat({ css: styles.row, thickness: 30, room: {} }, (d) => (
  <div class="slat">
    <Plot overlap slats={DOTS} x={(c) => d.shift + c.index + 0.5}>
      {(c) => <Dot at={c.x} size="22px" color={(c.index + d.index) % 4 ? "series-1" : "series-2"} class="dot" />}
    </Plot>
  </div>
));

export default function Dots(p) {
  // Every 3 s the slats scatter, up to 2 dots either way, or come back.
  const [shift, setShift] = createSignal(still);
  const step = () => setShift((s) => (s.some((v) => v) ? still : s.map(() => Math.floor(Math.random() * 5) - 2)));
  const timer = setInterval(step, 3000);
  onCleanup(() => clearInterval(timer));
  createComputed(on(p.seed, step, { defer: true })); // New data moves them now
  return (
    <Chart orientation={p.o()} scale={[2, 12]} ticks={false} height={300} animate={p.js()}>
      <Plot slats={ROWS} shift={shift()}>{RowSlat}</Plot>
    </Chart>
  );
}
