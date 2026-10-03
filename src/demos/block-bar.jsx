import { Chart, Plot, Bar, Label } from "@bezda/rhp";

// Opening hours: each bar runs from opening to closing time.
export default function Hours() {
  return (
    <Chart
      scale={[6, 24]}
      ticks={[6, 9, 12, 15, 18, 21, 24]}
      format={(h) => h + ":00"}
    >
      <Plot
        shop={["Bakery", "Library", "Gym"]}
        opens={[7, 10, 6]}
        closes={[14, 19, 23]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.shop}</Label>
            <Bar from={d.opens} to={d.closes} thick="10px" />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
