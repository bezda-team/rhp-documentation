import { createMemo } from "solid-js";
import { Chart, Plot, Bar, slat, nice } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// A day: its wick from the low to the high, and its body from the open to the close.
export const CandleSlat = slat({ css: styles.candle, thickness: { horizontal: 16 }, room: { start: 8, end: 8 } }, (d) => (
  <div class={d.close >= d.open ? "up" : "down"}>
    <Bar from={d.low} to={d.high} thick="1.5px" class="wick" />
    <Bar from={d.open} to={d.close} thick={0.7} class="body" />
  </div>
));

export default function Candlestick(p) {
  const days = createMemo(() => {
    p.seed();
    let price = 50;
    return Array.from({ length: 16 }, () => {
      const open = price, close = open + rand(-3, 3.2);
      price = close;
      return { open, close, low: Math.min(open, close) - rand(0.2, 1.5), high: Math.max(open, close) + rand(0.2, 1.5) };
    });
  });
  const range = createMemo(() => nice(Math.min(...days().map((d) => d.low)), Math.max(...days().map((d) => d.high)), 4));
  return (
    <Chart orientation={p.o()} scale={[range().min, range().max]} ticks={range().ticks} format={(v) => "$" + v} animate={p.js()}>
      <Plot rows={days()}>{CandleSlat}</Plot>
    </Chart>
  );
}
