import { createSignal, onCleanup } from "solid-js";
import { Plot, Chart, Dot, slat } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// v1's logo: 9 rows of 30 dots; # is lit. The scale shows dots 10 to 20 of each row.
const LOGO = [
  "..............................",
  "..............#...............",
  "..............#...............",
  "...........##.##..##..........",
  "..........#...#.#.#.#.........",
  "..........#...#.#.##..........",
  "..................#...........",
  "..................#...........",
  "..............................",
];

export const DotRow = slat({
  band: 60, // 52px dots, 8px apart: the page makes the value axis 11 × 60px long
  room: { horizontal: { start: 2, end: 2, before: 2, after: 4 }, vertical: { start: 4, end: 2, before: 2, after: 2 } },
  css: styles.dotRow,
}, (d) => (
  <div class="row">
    <Plot overlap lit={[...d.art]} x={(c) => d.shift + c.index + 0.5}>
      {(c) => <Dot at={c.x} size="52px" color={c.lit === "#" ? "#f2cc8f" : "#3d405b"} class="dot" />}
    </Plot>
  </div>
));

export default function Dots(p) {
  const still = LOGO.map(() => 0);
  const [shift, setShift] = createSignal(still);
  // Every 5 s the middle rows jump up to 4 dots left or 5 right, and the next time they come back.
  // A row reaches 10 dots past the start of the scale and 9 past its end, so no shift leaves a gap.
  const step = () => setShift((s) => (s.some((v) => v) ? still : LOGO.map((_, r) => (r === 0 || r === 8 ? 0 : Math.floor(rand(0, 10)) - 4))));
  let timer = setInterval(step, 5000);
  onCleanup(() => clearInterval(timer));
  const hold = () => (clearInterval(timer), setShift(still));
  const resume = () => (clearInterval(timer), (timer = setInterval(step, 5000)));
  return (
    <div class="dots-fit">
      <div class="dots-window" onMouseEnter={hold} onMouseLeave={resume}>
        <Chart orientation={p.o()} scale={[10, 21]} ticks={false} height={660} animate={p.js()} class="dots">
          <Plot art={LOGO} shift={shift()}>{DotRow}</Plot>
        </Chart>
      </div>
    </div>
  );
}
