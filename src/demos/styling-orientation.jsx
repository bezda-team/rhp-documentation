import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

const Planet = slat(
  {
    css: `
      .bar { --rhp-start-radius: 0px; --rhp-end-radius: 8px; }
      .value { font-weight: 700; }
      .name:vertical { font-size: 11px; }
    `,
  },
  (d) => (
    <div>
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
  const [orientation, setOrientation] = createSignal("vertical");
  const turn = () =>
    setOrientation(
      orientation() === "vertical" ? "horizontal" : "vertical",
    );
  return (
    <>
      <div class="demo-controls">
        <button onClick={turn}>Turn the chart</button>
      </div>
      <Chart scale={[0, 150]} orientation={orientation()}>
        <Plot
          planet={["Jupiter", "Saturn", "Uranus", "Neptune"]}
          moons={[95, 146, 28, 16]}
        >
          {Planet}
        </Plot>
      </Chart>
    </>
  );
}
