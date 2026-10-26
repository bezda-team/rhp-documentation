import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Lima has no reading: its bar is not drawn, and its slat says so.
const cities = [
  { city: "Oslo", temp: 6 },
  { city: "Lima", temp: null },
  { city: "Rome", temp: 16 },
  { city: "Cairo", temp: 27 },
];
const shown = (t) => (Number.isFinite(t) ? `${t} °C` : "no data");

const City = slat({ room: { start: 60, end: 64 } }, (d) => (
  <div>
    <Label edge="start">{d.city}</Label>
    <Bar to={d.temp} />
    <Label edge="end">{shown(d.temp)}</Label>
  </div>
));

export default function Weather() {
  return (
    <Chart scale={[0, 30]}>
      <Plot rows={cities}>{City}</Plot>
    </Chart>
  );
}
