import { createMemo } from "solid-js";
import { Chart, Plot, Bar, Label, stackUp } from "@bezda/rhp";

// Where each day's hours go: one Bar per activity, stacked in one band.
const COLORS = ["#2a78d6", "#1baf7a", "#eb6834"];

export default function Hours() {
  return (
    <Chart scale={[0, 24]} ticks={[0, 6, 12, 18, 24]}>
      <Plot
        day={["Mon", "Tue", "Wed"]}
        hours={[
          [8, 8, 8],
          [7, 9, 8],
          [8, 6, 10],
        ]}
      >
        {(d) => {
          // { from: [0, 8, 16], to: [8, 16, 24] }
          const stack = createMemo(() => stackUp(d.hours));
          return (
            <div>
              <Label edge="start">{d.day}</Label>
              <Plot
                overlap
                from={stack().from}
                to={stack().to}
                color={COLORS}
              >
                {(part) => (
                  <Bar
                    from={part.from}
                    to={part.to}
                    color={part.color}
                  />
                )}
              </Plot>
            </div>
          );
        }}
      </Plot>
    </Chart>
  );
}
