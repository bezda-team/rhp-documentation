import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Point at a slat: its band lights up and its number appears. Only CSS.
const City = slat(
  {
    css: `
      .slat:hover {
        background: color-mix(in srgb, var(--rhp-ink) 8%, transparent);
      }
      .tip { opacity: 0; transition: opacity .15s; }
      .slat:hover .tip { opacity: 1; }
    `,
  },
  (d) => (
    <div class="slat">
      <Label edge="start">{d.city}</Label>
      <Bar to={d.rain} />
      <Label at={d.rain}>
        <span class="tip">{d.rain} mm</span>
      </Label>
    </div>
  ),
);

export default function Rain() {
  return (
    <Chart scale={[0, 200]}>
      <Plot
        city={["Bergen", "Glasgow", "Dublin", "London"]}
        rain={[184, 124, 81, 56]}
      >
        {City}
      </Plot>
    </Chart>
  );
}
