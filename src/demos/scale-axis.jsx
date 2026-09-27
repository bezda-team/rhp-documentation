import { Chart, Plot, Bar, Label } from "@bezda/rhp";

export default function Battery() {
  return (
    <Chart
      scale={[0, 100]}
      ticks={[0, 25, 50, 75, 100]}
      format={(v) => v + "%"}
    >
      <Plot device={["Phone", "Laptop", "Watch"]} charge={[64, 38, 91]}>
        {(d) => (
          <div>
            <Label edge="start">{d.device}</Label>
            <Bar to={d.charge} />
            <Label at={d.charge}>{d.charge}%</Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
