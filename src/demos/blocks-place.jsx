import { Chart, Plot, Bar, Label, Place, slat } from "@bezda/rhp";

// A Place draws nothing. The badge inside it is an element of your own, and
// it sits at the value without any CSS to work out where that is.
const Climb = slat(
  {
    thickness: 44,
    room: { start: 70, end: 30 },
    css: `
      .badge {
        position: absolute;
        translate: -50% -50%;
        padding: 2px 7px;
        border-radius: 99px;
        background: var(--rhp-ink);
        color: var(--rhp-surface);
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
      }
    `,
  },
  (d) => (
    <div>
      <Label edge="start">{d.peak}</Label>
      <Bar to={d.metres} />
      <Place at={d.metres}>
        <span class="badge">{d.metres} m</span>
      </Place>
    </div>
  ),
);

export default function Peaks() {
  return (
    <Chart scale={[0, 9000]} ticks={[0, 3000, 6000, 9000]}>
      <Plot
        peak={["Everest", "K2", "Denali", "Mont Blanc"]}
        metres={[8849, 8611, 6190, 4808]}
      >
        {Climb}
      </Plot>
    </Chart>
  );
}
