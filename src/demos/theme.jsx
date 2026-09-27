import { Chart, Plot, Bar, Label, series } from "@bezda/rhp";

const sunset = {
  series: ["#ff6b4a", "#ffa94d", "#ffd43b", "#b197fc"],
  ink: "#3b2f2f",
  muted: "#8c7b75",
  grid: "#f1e3dc",
  font: "Georgia, serif",
};

export default function Sunset() {
  return (
    <Chart
      scale={[0, 12]}
      theme={sunset}
      style={{ background: "#fff8f3", "border-radius": "8px" }}
    >
      <Plot
        city={["Lisbon", "Athens", "Seville", "Malta"]}
        hours={[8.2, 9.1, 9.4, 8.8]}
        color={series()}
      >
        {(d) => (
          <div>
            <Label edge="start">{d.city}</Label>
            <Bar to={d.hours} color={d.color} />
            <Label at={d.hours}>{d.hours} h</Label>
          </div>
        )}
      </Plot>
    </Chart>
  );
}
