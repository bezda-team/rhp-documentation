import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Tab to the chart, then use the arrow keys: the row with focus shows its
// number, like the row under the pointer.
const Row = slat(
  {
    css: `
      .row:is(:hover, :focus-visible) {
        background: color-mix(in srgb, var(--rhp-ink) 8%, transparent);
      }
      .tip { opacity: 0; transition: opacity .15s; }
      .row:is(:hover, :focus-visible) .tip { opacity: 1; }
    `,
  },
  (d) => (
    <div class="row">
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
    <Chart scale={[0, 200]} label="Rain in October">
      <Plot
        keyboard
        city={["Bergen", "Glasgow", "Dublin", "London"]}
        rain={[184, 124, 81, 56]}
      >
        {Row}
      </Plot>
    </Chart>
  );
}
