import { Chart, Plot, Bar, Dot, Label, slat } from "@bezda/rhp";

// One look, written against the parts a slat names rather than against class
// names. Both slats below use it as it comes, though one is a bar and the
// other is a bar with a dot at each end.
const NIGHT = {
  thickness: 38,
  room: { start: 76, end: 46 },
  css: `
    [part=name] { font-weight: 600; }
    [part=mark] { --rhp-radius: 99px; }
    [part=value] {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: var(--rhp-muted);
    }
  `,
};

const Warm = slat(NIGHT, (d) => (
  <div>
    <Label edge="start" part="name">{d.city}</Label>
    <Bar to={d.high} part="mark" />
    <Label at={d.high} part="value">{d.high}°</Label>
  </div>
));

const Range = slat(NIGHT, (d) => (
  <div>
    <Label edge="start" part="name">{d.city}</Label>
    <Bar from={d.low} to={d.high} thick="6px" part="mark" />
    <Dot at={d.low} size="13px" part="mark" />
    <Dot at={d.high} size="13px" part="mark" />
    <Label at={d.high} part="value">{d.high}°</Label>
  </div>
));

const CITIES = ["Oslo", "Madrid", "Cairo"];
const LOW = [-4, 3, 9];
const HIGH = [4, 12, 19];

export default function OneLook() {
  return (
    <>
      <Chart scale={[-10, 30]} ticks={[-10, 0, 10, 20, 30]} format={(v) => v + "°"}>
        <Plot city={CITIES} high={HIGH}>{Warm}</Plot>
      </Chart>
      <Chart scale={[-10, 30]} ticks={[-10, 0, 10, 20, 30]} format={(v) => v + "°"}>
        <Plot city={CITIES} low={LOW} high={HIGH}>{Range}</Plot>
      </Chart>
    </>
  );
}
