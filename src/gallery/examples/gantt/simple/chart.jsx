import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, slat, sortBy } from "@bezda/rhp";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

const TASKS = ["Design", "Build", "Test", "Launch"];
const START = [0, 3, 7, 10]; // weeks
const END = [4, 9, 11, 12];

// A task: a Bar from the week it starts to the week it ends.
export const TaskSlat = slat({ css: styles.task, thickness: { horizontal: 40 } }, (d) => (
  <div>
    <Label edge="start" part="name" class="name">{d.task}</Label>
    <Bar from={d.start} to={d.end} thick="12px" part="mark" class="bar" />
  </div>
));

export default function Gantt(p) {
  const plan = createMemo(() => {
    if (!p.seed()) return { start: START, end: END };
    const start = START.map((s) => Math.max(0, s + Math.round(rand(-2, 2))));
    return { start, end: start.map((s, i) => Math.min(12, Math.max(s + 1, END[i] + Math.round(rand(-2, 2))))) };
  });
  return (
    <Chart orientation={p.o()} scale={[0, 12]} ticks={[0, 4, 8, 12]} format={(v) => "wk " + v} animate={p.js()}>
      <Plot task={TASKS} start={plan().start} end={plan().end} key="task" order={sortBy("start")}>{TaskSlat}</Plot>
    </Chart>
  );
}
