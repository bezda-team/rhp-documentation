import { createSignal, createMemo, createComputed, on, Show } from "solid-js";
import { Plot, Chart, Bar, Tick, Label, slat, running } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const LINES = ["Salary", "Rent", "Groceries", "Transport", "Bills", "Going out", "Saved"];
const MONTH = [4200, -1450, -520, -180, -230, -300]; // £ in, then out; what is left is saved
const STEP = { in: "#12b886", out: "#f25f5c", total: "#1c2433" }; // money in, money out, what is left
const pounds = (v) => (v < 0 ? "−" : "") + "£" + Math.abs(Math.round(v)).toLocaleString("en-GB");

// A step from the running total before it to the one after; a hairline links it to the next step.
// An expense is a button: click it (its name or its bar) to cut it from the month. A cut step has no length, and a
// dashed outline keeps its place, so the steps after it and the savings move up by what it cost.
export const StepSlat = slat({
  thickness: { horizontal: 46 },
  room: { horizontal: { start: 100, end: 66 }, vertical: { start: 40, end: 26, after: 18 } },
  css: styles.step,
}, (d) => {
  const kind = () => (d.total ? "total" : d.amount > 0 ? "in" : "out");
  return (
    <div class={kind() + (d.cut ? " cut" : "")}>
      <Label edge="start" class="item">
        <Show when={kind() === "out"} fallback={d.item}><button type="button" data-line={d.index} aria-pressed={d.cut}>{d.item}</button></Show>
      </Label>
      <Show when={kind() === "out"}><Bar from={d.from} to={d.from + d.amount} thick="24px" data-line={d.index} class="ghost" /></Show>
      <Bar from={d.from} to={d.to} thick="24px" color={STEP[kind()]} data-line={kind() === "out" ? d.index : undefined} class="step" />
      <Show when={!d.total}><Tick at={d.to} class="link" /></Show>
      <Label at={Math.max(d.from, d.to)} class="amount">{d.total ? pounds(d.to) : pounds(d.amount)}</Label>
    </div>
  );
});

export default function Waterfall(p) {
  const month = createMemo(() => (p.seed() ? [rand(3800, 4600), -rand(1300, 1600), -rand(400, 650), -rand(100, 260), -rand(180, 300), -rand(150, 500)] : MONTH));
  const [cut, setCut] = createSignal([]); // the rows of the expenses cut; new data brings them all back
  createComputed(on(month, () => setCut([])));
  const toggle = (e) => {
    const i = e.target.closest("[data-line]")?.dataset.line;
    if (i != null) setCut((c) => (c.includes(+i) ? c.filter((k) => k !== +i) : [...c, +i]));
  };
  const steps = createMemo(() => {
    const r = running(month().map((v, i) => (cut().includes(i) ? 0 : v))); // step k goes from the total before it to the total after it
    return { from: [...r.from, 0], to: [...r.to, r.to.at(-1)] };
  });
  return (
    <Poster look="budget" kicker="Monthly budget" title="Where the salary goes" onClick={toggle}
      dek={<><b>{pounds(steps().to.at(-1))}</b> left to save this month.</>} note="Click an expense to cut it from the month; click it again to bring it back.">
      <Chart orientation={p.o()} scale={[0, 5000]} ticks={[0, 1000, 2000, 3000, 4000, 5000]} format={(v) => (v ? "£" + v / 1000 + "k" : "0")} height={320} animate={p.js()} theme={styles.theme}>
        <Plot item={LINES} from={steps().from} to={steps().to} amount={[...month(), null]} cut={LINES.map((_, i) => cut().includes(i))}
          total={LINES.map((_, i) => i === LINES.length - 1)}>{StepSlat}</Plot>
      </Chart>
    </Poster>
  );
}
