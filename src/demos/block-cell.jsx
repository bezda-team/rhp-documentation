import { Chart, Plot, Cell, Label } from "@bezda/rhp";

// Visitors per hour: a row per day, and a cell per hour colored by its
// count.
const visitors = [
  [2, 8, 21, 35, 30, 12],
  [4, 11, 26, 40, 34, 15],
  [9, 24, 38, 29, 18, 6],
];

export default function Visitors() {
  return (
    <Chart scale={[0, 40]} ticks={false}>
      <Plot day={["Fri", "Sat", "Sun"]} hours={visitors}>
        {(d) => (
          <div>
            <Label edge="start">{d.day}</Label>
            <Plot orientation="across" count={d.hours}>
              {(h) => (
                <Cell value={h.count} title={h.count + " visitors"} />
              )}
            </Plot>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
