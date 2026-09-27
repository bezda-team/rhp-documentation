import { createSignal } from "solid-js";
import { Chart, Plot, Bar, Label, sortBy } from "@bezda/rhp";

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
          order={sortBy("sold", "desc")}
        >
          {(d) => (
            <div>
              <Label edge="start">{d.fruit}</Label>
              <Bar to={d.sold} />
              <Label at={d.sold}>{d.sold}</Label>
            </div>
          )}
        </Plot>
      </Chart>
    </>
  );
}
