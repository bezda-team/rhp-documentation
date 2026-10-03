import { Chart, Plot, Line, Label } from "@bezda/rhp";

// Visits to three pages: a sparkline per slat, with one peak for all so they compare.
export default function Visits() {
  return (
    <Chart
      scale={[1, 7]}
      ticks={[1, 2, 3, 4, 5, 6, 7]}
      format={(day) => "MTWTFSS"[day - 1]}
    >
      <Plot
        page={["Home", "Pricing", "Docs"]}
        visits={[
          [320, 280, 350, 300, 390, 180, 150],
          [90, 120, 110, 160, 150, 60, 40],
          [210, 240, 260, 230, 250, 120, 140],
        ]}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.page}</Label>
            <Line points={d.visits.map((v, i) => [i + 1, v])} peak={400} fill />
          </div>
        )}
      </Plot>
    </Chart>
  );
}
