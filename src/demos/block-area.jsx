import { Chart, Plot, Area, Label } from "@bezda/rhp";

// When people arrive at a café: one smooth shape per day.
export default function Arrivals() {
  return (
    <Chart scale={[7, 19]} format={(h) => h + ":00"}>
      <Plot
        day={["Weekday", "Weekend"]}
        shape={[
          [
            [7, 1],
            [8, 6],
            [9, 4],
            [12, 7],
            [13, 5],
            [17, 3],
            [19, 1],
          ],
          [
            [7, 0],
            [9, 2],
            [11, 6],
            [13, 8],
            [15, 5],
            [17, 2],
            [19, 1],
          ],
        ]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.day}</Label>
            <Area points={d.shape} />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
