import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, slat, sortBy } from "@bezda/rhp";

// One slat of the chart: a name, a bar and a number.
const Fruit = slat(
  {
    css: `
      .bar { --rhp-end-radius: 6px; }
      .value { font-weight: 700; }
    `,
  },
  (d) => (
    <div>
      <Label edge="start">{d.fruit}</Label>
      <Bar to={d.sold} class="bar" />
      <Label at={d.sold} class="value">
        {d.sold}
      </Label>
    </div>
  ),
);

export default function FruitSold() {
  const [apples, setApples] = createSignal(12);
  return (
    <>
      <label class="demo-controls">
        Apples sold
        <input
          type="range"
          min="0"
          max="30"
          value={apples()}
          onInput={(e) => setApples(+e.target.value)}
        />
      </label>
      <Chart scale={[0, 30]}>
        <Plot
          fruit={["Apples", "Bananas", "Cherries", "Kiwis"]}
          sold={[apples(), 18, 7, 22]}
          order={sortBy("sold", "desc")}
        >
          {Fruit}
        </Plot>
      </Chart>
    </>
  );
}
