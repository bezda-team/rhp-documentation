import { Chart, Plot, Bar, Label } from "@bezda/rhp";

// Profit and loss: the number sits just past the bar's end.
export default function Profit() {
  return (
    <Chart scale={[-40, 40]} ticks={[-40, -20, 0, 20, 40]}>
      <Plot
        month={["Jan", "Feb", "Mar", "Apr"]}
        profit={[25, -12, 8, -30]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.month}</Label>
            <Bar
              to={d.profit}
              color={d.profit < 0 ? "negative" : "positive"}
            />
            <Label
              at={d.profit}
              side={d.profit < 0 ? "before" : undefined}
            >
              {d.profit}
            </Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
