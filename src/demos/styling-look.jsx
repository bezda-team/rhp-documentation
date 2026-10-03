import { Chart, Plot, Bar, Dot, Label, slat } from "@bezda/rhp";

// One look for both slats, aimed at what rhp writes rather than at class names.
const NIGHT = {
  thickness: 38,
  room: { start: 76, end: 46 },
  css: `
    .rhp-label[data-rhp-edge="start"] { font-weight: 600; }
    .rhp-bar, .rhp-dot { --rhp-radius: 99px; }
    .rhp-label[data-rhp-at] {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: var(--rhp-muted);
    }
  `,
};

const Warm = slat(NIGHT, (d) => (
  <div>
    <Label edge="start">{d.city}</Label>
    <Bar to={d.high} />
    <Label at={d.high}>{d.high}°</Label>
  </div>
));

const Range = slat(NIGHT, (d) => (
  <div>
    <Label edge="start">{d.city}</Label>
    <Bar from={d.low} to={d.high} thick="6px" />
    <Dot at={d.low} size="13px" />
    <Dot at={d.high} size="13px" />
    <Label at={d.high}>{d.high}°</Label>
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
