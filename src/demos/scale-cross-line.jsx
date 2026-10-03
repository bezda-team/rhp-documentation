import { Chart, Plot, Dot, Line } from "@bezda/rhp";

// Lisbon's average high by month: a Line on the second axis, and a dot each month.
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const high = [15, 16, 19, 20, 23, 26, 28, 29, 27, 23, 18, 15];

export default function Lisbon() {
  return (
    <Chart
      scale={[0.5, 12.5]}
      ticks={month}
      format={(m) => "JFMAMJJASOND"[m - 1]}
      cross={[10, 30]}
      crossTicks={[10, 20, 30]}
      crossFormat={(t) => t + "°"}
      height={200}
    >
      <Plot overlap points={[month.map((m, i) => [m, high[i]])]}>
        {(d) => (
          <div>
            <Line points={d.points} fill base={10} />
          </div>
        )}
      </Plot>
      <Plot overlap month={month} high={high}>
        {(d) => (
          <div>
            <Dot at={d.month} cross={d.high} size="8px" />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
