import { createSelector, createSignal, Show } from "solid-js";
import { Chart, Plot, Bar, Label, slat } from "@bezda/rhp";

// Point at a slat, or Tab in and use the arrow keys: the card is drawn in
// that slat alone, so the page holds one card rather than one per slat.
const City = slat(
  {
    room: { start: 88, end: 124 },
    css: `
      .slat:is(:hover, :focus-visible) .bar {
        filter: brightness(1.15);
      }
      .card {
        display: flex;
        gap: 7px;
        align-items: baseline;
        padding: 3px 8px;
        border-radius: 4px;
        background: var(--rhp-ink);
        color: var(--rhp-surface);
      }
      .card b { font-weight: 700; }
      .card span { opacity: .75; }
    `,
  },
  (d) => (
    <div class="slat" data-row={d.index}>
      <Label edge="start">{d.city}</Label>
      <Bar to={d.rain} class="bar" />
      <Show when={d.on}>
        <Label at={d.rain} class="card">
          <b>{d.rain} mm</b>
          <span>{d.days} wet days</span>
        </Label>
      </Show>
    </div>
  ),
);

export default function Rain() {
  // The row the reader is on. The selector draws the two slats that change,
  // not every slat, however many there are.
  const [on, setOn] = createSignal(null);
  const isOn = createSelector(on);
  const rowAt = (e) => {
    const el = e.target.closest("[data-row]");
    return el ? +el.dataset.row : null;
  };
  return (
    <div
      onPointerMove={(e) => setOn(rowAt(e))}
      onPointerDown={(e) => setOn(rowAt(e))}
      onPointerLeave={(e) => e.pointerType !== "touch" && setOn(null)}
      onFocusIn={(e) => setOn(rowAt(e))}
      onFocusOut={(e) =>
        !e.currentTarget.contains(e.relatedTarget) && setOn(null)
      }
    >
      <Chart scale={[0, 200]}>
        <Plot
          keyboard
          city={["Bergen", "Glasgow", "Dublin", "London", "Madrid", "Cairo"]}
          rain={[184, 124, 81, 56, 37, 5]}
          days={[19, 17, 13, 11, 6, 1]}
          on={(d) => isOn(d.index)}
        >
          {City}
        </Plot>
      </Chart>
    </div>
  );
}
