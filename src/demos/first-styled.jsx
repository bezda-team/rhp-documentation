import { createSignal } from "solid-js";
import {
  Chart,
  Plot,
  Bar,
  Label,
  slat,
  sortBy,
  series,
} from "@bezda/rhp";

const Row = slat(
  {
    band: 40,
    css: `
      .row:hover {
        background: color-mix(in srgb, var(--rhp-ink) 8%, transparent);
        border-radius: 8px;
      }
      .bar { --rhp-end-radius: 8px; }
      .value { font-weight: 700; color: var(--rhp-color); }
    `,
  },
  (d) => (
    <div class="row">
      <Label edge="start">{d.fruit}</Label>
      <Bar to={d.sold} color={d.color} class="bar" />
      <Label at={d.sold} class="value">
        {d.sold}
      </Label>
    </div>
  ),
);

export default function FirstChart() {
  const [sold, setSold] = createSignal([12, 18, 7, 22]);
  const newNumbers = () =>
    setSold(sold().map(() => Math.round(Math.random() * 30)));
  return (
    <>
      <div class="demo-controls">
        <button onClick={newNumbers}>New numbers</button>
      </div>
      <Chart scale={[0, 30]}>
        <Plot
          fruit={["Apples", "Bananas", "Cherries", "Kiwis"]}
          sold={sold()}
          color={series()}
          order={sortBy("sold", "desc")}
        >
          {Row}
        </Plot>
      </Chart>
    </>
  );
}
