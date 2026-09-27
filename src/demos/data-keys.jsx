import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label } from "@bezda/rhp";

const all = [
  { city: "Oslo", temp: 6 },
  { city: "Rome", temp: 16 },
  { city: "Cairo", temp: 27 },
  { city: "Lima", temp: 19 },
];

export default function Weather() {
  const [cities, setCities] = createSignal(all);
  const remove = (name) =>
    setCities(cities().filter((c) => c.city !== name));
  return (
    <>
      <div class="demo-controls">
        <span>Click a bar to remove its city.</span>
        <button onClick={() => setCities(all)}>Bring them back</button>
      </div>
      <Chart scale={[0, 30]}>
        <Plot rows={cities()} key="city">
          {(d) => (
            <div>
              <Label edge="start">{d.city}</Label>
              <Bar
                to={d.temp}
                onClick={() => remove(d.city)}
                style={{ cursor: "pointer" }}
              />
              <Label at={d.temp}>{d.temp} °C</Label>
            </div>
          )}
        </Plot>
      </Chart>
    </>
  );
}
