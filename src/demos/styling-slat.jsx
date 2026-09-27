import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

const Row = slat(
  {
    thickness: 44,
    css: `
      .row:hover {
        background: color-mix(in srgb, var(--rhp-ink) 8%, transparent);
        border-radius: 10px;
      }
      .name { font-size: 14px; font-weight: 600; }
      .bar {
        --rhp-start-radius: 0px;
        --rhp-end-radius: 12px;
        background: linear-gradient(
          var(--rhp-toward-end),
          var(--rhp-series-1),
          var(--rhp-series-5)
        );
      }
      .value {
        font-size: 16px;
        font-weight: 800;
        --rhp-label-gap: 10px;
      }
    `,
  },
  (d) => (
    <div class="row">
      <Label edge="start" class="name">
        {d.planet}
      </Label>
      <Bar to={d.moons} class="bar" />
      <Label at={d.moons} class="value">
        {d.moons}
      </Label>
    </div>
  ),
);

export default function Moons() {
  return (
    <Chart scale={[0, 150]}>
      <Plot
        planet={["Jupiter", "Saturn", "Uranus", "Neptune"]}
        moons={[95, 146, 28, 16]}
      >
        {Row}
      </Plot>
    </Chart>
  );
}
