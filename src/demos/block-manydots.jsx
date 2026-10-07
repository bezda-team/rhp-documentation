import { createSignal } from "solid-js";
import { Chart, ManyDots } from "@bezda/rhp";

// A fixed seed gives the server and browser the same initial points.
function samples(seed) {
  let value = seed + 1;
  const next = () => ((value = (Math.imul(value, 1664525) + 1013904223) >>> 0) / 4294967296);
  return Array.from({ length: 1200 }, (_, id) => ({
    id,
    x: 4 + next() * 92,
    y: 4 + next() * 92,
    group: id % 4,
    color: `hsl(${(id * 137.508) % 360} 65% 48%)`,
  }));
}

const coordinates = (row) => `Point ${row.id + 1}: ${row.x.toFixed(1)}, ${row.y.toFixed(1)}`;

const css = `
  .manydots-demo .mode-category .group-0 { background-color: var(--docs-chart-s1); }
  .manydots-demo .mode-category .group-1 { background-color: var(--docs-chart-s2); }
  .manydots-demo .mode-category .group-2 { background-color: var(--docs-chart-s3); }
  .manydots-demo .mode-category .group-3 { background-color: var(--docs-chart-s4); }
  .manydots-demo .rhp-manydot:hover,
  .manydots-demo .rhp-manydot.selected {
    outline: 2px solid var(--docs-chart-ink);
    outline-offset: 2px;
  }
  .manydots-demo select {
    font: inherit;
    color: var(--docs-chart-ink);
    background: var(--docs-chart-surface);
    border: 1px solid var(--docs-chart-grid);
    border-radius: .35rem;
    padding: .2rem .4rem;
  }
  .manydots-demo .manydots-readout { min-height: 1.5em; margin: .5rem 0; }
`;

export default function Scatter() {
  const [rows, setRows] = createSignal(samples(0));
  const [mode, setMode] = createSignal("category");
  const [hovered, setHovered] = createSignal(null);
  const [selected, setSelected] = createSignal(null);
  let seed = 0;

  // Native events bubble from each plain HTML point to the collection.
  const rowAt = (event) => {
    const point = event.target.closest?.(".rhp-manydot");
    return point && event.currentTarget.contains(point)
      ? rows()[Number(point.dataset.rhpIndex)]
      : null;
  };
  const hover = (event) => {
    if (event.pointerType !== "touch") setHovered(rowAt(event));
  };
  const choose = (event) => {
    setHovered(null);
    setSelected(rowAt(event)?.id ?? null);
  };
  const refresh = () => {
    setHovered(null);
    setSelected(null);
    setRows(samples(++seed));
  };
  const chosen = () => rows().find((row) => row.id === selected());

  return (
    <div class="manydots-demo">
      <style>{css}</style>
      <div class="demo-controls">
        <label>
          Coloring{" "}
          <select onChange={(event) => setMode(event.currentTarget.value)}>
            <option value="shared" selected={mode() === "shared"}>Shared color</option>
            <option value="category" selected={mode() === "category"}>Category classes</option>
            <option value="unique" selected={mode() === "unique"}>Unique colors</option>
          </select>
        </label>
        <button onClick={refresh}>New data</button>
        <button onClick={() => { setHovered(null); setSelected(null); }}>Clear selection</button>
      </div>
      <Chart
        scale={[0, 100]}
        cross={[0, 100]}
        ticks={[0, 25, 50, 75, 100]}
        crossTicks={[0, 25, 50, 75, 100]}
        height={290}
        label="1,200 sample measurements, each with two coordinates from 4 to 96"
      >
        <ManyDots
          rows={rows()}
          at={(row) => row.x}
          cross={(row) => row.y}
          key={(row) => row.id}
          size="5px"
          class={`mode-${mode()}`}
          color={mode() === "unique" ? (row) => row.color : "series-1"}
          pointClass={(row) => `group-${row.group}${row.id === selected() ? " selected" : ""}`}
          onPointerMove={hover}
          onPointerLeave={() => setHovered(null)}
          onClick={choose}
        />
      </Chart>
      <p class="manydots-readout">
        {hovered() ? coordinates(hovered()) : "Hover over a point, or tap/click one to select it."}
      </p>
      <p class="manydots-readout" role="status">
        {chosen() ? `Selected ${coordinates(chosen()).toLowerCase()}.` : "No point selected."}
      </p>
    </div>
  );
}
