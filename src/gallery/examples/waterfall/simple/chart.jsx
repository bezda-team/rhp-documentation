import { createMemo, Show } from "solid-js";
import { Chart, Plot, Bar, Tick, Label, slat, running } from "@bezda/rhp";
import * as styles from "./styles.js";

const rand = (a, b) => a + Math.random() * (b - a);

const ITEMS = ["Sales", "Services", "Costs", "Tax", "Profit"];
const AMOUNTS = [60, 25, -40, -15]; // the last item is what is left

// A step: a Bar from the running total before it to the one after, a Tick linking it to the next step, and its amount.
export const StepSlat = slat({ css: styles.step }, (d) => (
  <div class={d.total ? "total" : d.to >= d.from ? "in" : "out"}>
    <Label edge="start">{d.item}</Label>
    <Bar from={d.from} to={d.to} thick="60%" class="bar" />
    <Show when={!d.total}><Tick at={d.to} class="link" /></Show>
    <Label at={Math.max(d.from, d.to)} class="amount">{Math.round(d.total ? d.to : d.to - d.from)}</Label>
  </div>
));

export default function Waterfall(p) {
  const amounts = createMemo(() => (p.seed ? [rand(40, 70), rand(10, 30), -rand(20, 45), -rand(5, 20)] : AMOUNTS));
  const steps = createMemo(() => {
    const r = running(amounts()); // { from, to } for each step
    return { from: [...r.from, 0], to: [...r.to, r.to.at(-1)] }; // and the total, from 0
  });
  return (
    <Chart orientation={p.o} scale={[0, 100]} animate={p.js}>
      <Plot item={ITEMS} from={steps().from} to={steps().to} total={ITEMS.map((_, i) => i === ITEMS.length - 1)}>{StepSlat}</Plot>
    </Chart>
  );
}
