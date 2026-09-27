import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// thickness: each row's height. room: the space outside the plot for the
// names
// (start) and the numbers (end).
const Row = slat({ thickness: 30, room: { start: 150, end: 60 } }, (d) => (
  <div>
    <Label edge="start">{d.language}</Label>
    <Bar to={d.speakers} />
    <Label at={d.speakers}>{d.speakers} M</Label>
  </div>
));

export default function Languages() {
  return (
    <Chart scale={[0, 1600]} ticks={[0, 400, 800, 1200, 1600]}>
      <Plot
        language={["English", "Mandarin Chinese", "Hindi", "Spanish"]}
        speakers={[1500, 1140, 610, 560]}
      >
        {Row}
      </Plot>
    </Chart>
  );
}
