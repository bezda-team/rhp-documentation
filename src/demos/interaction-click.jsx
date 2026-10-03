import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Click a bar to pick its city; the others fade.
const City = slat(
  {
    css: `
      .bar { cursor: pointer; }
      .faded .bar { opacity: .3; }
    `,
  },
  (d) => (
    <div class={d.faded ? "faded" : ""}>
      <Label edge="start">{d.city}</Label>
      <Bar to={d.rain} class="bar" data-city={d.city} />
      <Label at={d.rain}>{d.rain} mm</Label>
    </div>
  ),
);

export default function Rain() {
  const [picked, setPicked] = createSignal();
  const onClick = (e) => {
    const city = e.target.closest("[data-city]")?.dataset.city;
    if (city) setPicked(picked() === city ? undefined : city);
  };
  return (
    <div onClick={onClick}>
      <Chart scale={[0, 200]}>
        <Plot
          city={["Bergen", "Glasgow", "Dublin", "London"]}
          rain={[184, 124, 81, 56]}
          faded={(d) => picked() !== undefined && d.city !== picked()}
        >
          {City}
        </Plot>
      </Chart>
    </div>
  );
}
