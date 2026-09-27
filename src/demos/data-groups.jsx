import { Chart, Plot, Bar, Label } from "@bezda/rhp";

export default function Weather() {
  return (
    <Chart scale={[0, 30]}>
      <Plot
        // a list: each row gets its own entry
        city={["Oslo", "Rome", "Cairo"]}
        temp={[6, 16, 27]}
        // one value: shared by every row
        unit="°C"
        // a function of the row: worked out per row
        warm={(d) => d.temp > 15}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.city}</Label>
            <Bar to={d.temp} color={d.warm ? "negative" : "series-1"} />
            <Label at={d.temp}>
              {d.temp} {d.unit}
            </Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
