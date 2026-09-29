import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// room: "auto": the start is as wide as the widest name, and the end as
// wide as the widest share. Change the names, and the room follows.
const Team = slat({ room: "auto" }, (d) => (
  <div>
    <Label edge="start">{d.team}</Label>
    <Bar to={d.share} />
    <Label edge="end">{d.share}%</Label>
  </div>
));

const SHORT = ["Ops", "Web", "Data"];
const LONG = ["Operations", "Web platform", "Data engineering"];

export default function Teams() {
  const [long, setLong] = createSignal(false);
  return (
    <>
      <div class="demo-controls">
        <button onClick={() => setLong(!long())}>
          {long() ? "Short names" : "Long names"}
        </button>
      </div>
      <Chart scale={[0, 100]}>
        <Plot team={long() ? LONG : SHORT} share={[42, 35, 23]}>
          {Team}
        </Plot>
      </Chart>
    </>
  );
}
