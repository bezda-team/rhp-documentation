import { Chart, Plot, Bar, Label } from "@bezda/rhp";

const cities = [
  { city: "Oslo", temp: 6 },
  { city: "Rome", temp: 16 },
  { city: "Cairo", temp: 27 },
];

export default function Weather() {
  return (
    <Chart scale={[0, 30]}>
      <Plot rows={cities}>
        {(d) => (
          <div>
            <Label edge="start">{d.city}</Label>
            <Bar to={d.temp} />
            <Label at={d.temp}>{d.temp} °C</Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
