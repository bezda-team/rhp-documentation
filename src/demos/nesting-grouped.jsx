import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Medals per team: a team's slat holds a Plot of three bars, one per
// medal.
const COLORS = ["#d4a72c", "#98a1ab", "#b8733b"];
const Team = slat({ thickness: 60 }, (d) => (
  <div>
    <Label edge="start">{d.team}</Label>
    <Plot count={d.medals} color={COLORS}>
      {(m) => (
        <div>
          <Bar to={m.count} color={m.color} />
        </div>
      )}
    </Plot>
  </div>
));

export default function Medals() {
  return (
    <Chart scale={[0, 20]}>
      <Plot
        team={["North", "East", "South"]}
        medals={[
          [12, 9, 14],
          [8, 15, 6],
          [17, 11, 9],
        ]}
      >
        {Team}
      </Plot>
    </Chart>
  );
}
