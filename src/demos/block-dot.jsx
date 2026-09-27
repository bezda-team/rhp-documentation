import { Chart, Plot, Dot, Label } from "@bezda/rhp";

// Race times: a dot for each runner's best lap.
export default function Laps() {
  return (
    <Chart scale={[60, 80]} format={(s) => s + " s"}>
      <Plot
        runner={["Ana", "Ben", "Chloe", "Dev"]}
        best={[71.2, 66.8, 64.5, 69.9]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.runner}</Label>
            <Dot at={d.best} size="14px" />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
