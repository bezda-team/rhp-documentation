import { createSignal } from "solid-js";
import {
  Chart,
  Scale,
  Plot,
  Bar,
  Tick,
  Label,
  slat,
  every,
} from "@bezda/rhp";

// The scale is a slat too: a dashed line and a number per tick.
const Mark = slat(
  {
    room: { after: 22 },
    css: `
      .line {
        --rhp-tick-width: 1px;
        background: none;
        border-left: 1px dashed var(--rhp-grid);
      }
      .number {
        top: calc(100% + 6px);
        translate: -50% 0;
        --rhp-label-gap: 0px;
        color: var(--rhp-muted);
        font-size: 11px;
      }
    `,
  },
  (t) => (
    <div>
      <Tick at={t.at} thick={1} class="line" />
      <Label at={t.at} class="number">
        {t.at}
      </Label>
    </div>
  ),
);

export default function Rainfall() {
  const [max, setMax] = createSignal(60);
  return (
    <>
      <label class="demo-controls">
        Scale up to {max()} mm
        <input
          type="range"
          min="40"
          max="120"
          step="5"
          value={max()}
          onInput={(e) => setMax(+e.target.value)}
        />
      </label>
      <Chart scale={[0, max()]}>
        <Scale ticks={every(10)}>{Mark}</Scale>
        <Plot month={["May", "June", "July"]} rain={[38, 24, 11]}>
          {(d) => (
            <div>
              <Label edge="start">{d.month}</Label>
              <Bar to={d.rain} />
            </div>
          )}
        </Plot>
      </Chart>
    </>
  );
}
