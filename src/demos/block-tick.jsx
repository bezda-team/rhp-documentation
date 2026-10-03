import { Chart, Plot, Bar, Tick, Label } from "@bezda/rhp";

// Steps against a daily goal: the bar is the steps, the tick the goal.
export default function Steps() {
  return (
    <Chart scale={[0, 12]} format={(k) => k + "k"}>
      <Plot
        day={["Mon", "Tue", "Wed"]}
        steps={[8.2, 11.5, 5.1]}
        goal={[10, 10, 8]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.day}</Label>
            <Bar to={d.steps} />
            <Tick at={d.goal} color="ink" />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
