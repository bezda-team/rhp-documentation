import { createMemo, createSignal, onCleanup, Show } from "solid-js";
import { Plot, Chart, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// People by generation: how many use AI to write their emails and messages, and how often.
const GENS = ["Gen Z", "Millennials", "Gen X", "Boomers"];
const USING = [58, 49, 36, 21];     // of each generation, how many use AI to write
const DAILY = [31, 24, 14, 6];      // and how many of those do on most days
const PEOPLE = [20, 30, 27, 23];    // how many of all adults are in each generation
const TINTS = ["#7fd6b1", "#c5b4fb", "#cabc6a", "#f3aad3"];

const PARTS = ["Most days", "Now and then", "Not currently using AI"];
const COLORS = ["#7ec5ec", "#b4ddf3", "#eeac4c"];

// A tube is how many of a generation use AI; the pie splits those by how often, and keeps the rest.
const split = (using, daily) => [daily, using - daily, 100 - using];
// With no generation picked, the pie is everyone: each generation's split, weighed by its size.
const whole = (rows) => PARTS.map((_, k) => rows.reduce((sum, row, g) => sum + row[k] * PEOPLE[g], 0) / 100);

// The wedge, as in the gallery's pie: turns from twelve o'clock, in units where the rim is at 50. Each edge is pushed
// aside so a gap is one width all the way in, and a stroke in the wedge's own color rounds its corners.
const TAU = Math.PI * 2;
const CORNER = 2.2;             // how round a corner is, and half the stroke that rounds it
const GAP = 2.2;                // the paper between two wedges, the shadow's soft edge included
const HOLE = 5.5;               // where a wedge starts, so the tips don't pile up in the middle
const OFF = CORNER + GAP / 2;   // how far a wedge's edge is pushed off the true one
const R = 50 - CORNER;          // the stroke grows the wedge back to 50
const RIM = Math.asin(OFF / R) / TAU;                     // how far round the push moves an end at the rim
const INNER = Math.asin(Math.min(1, OFF / HOLE)) / TAU;   // and at the hole

const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;
const big = (turns) => (turns > 0.5 ? 1 : 0);

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100, mid = (a + b) / 2;
  const u = Math.min(a + RIM, mid), v = Math.max(b - RIM, mid);
  const rim = `L${xy(u, R)}A${R},${R} 0 ${big(v - u)} 1 ${xy(v, R)}`;

  // Too narrow to reach the hole, the edges end where they cross, so the gap isn't squeezed.
  if (b - a <= 2 * INNER) return `M${xy(mid, Math.min(OFF / Math.sin((b - a) * Math.PI), R))}${rim}Z`;
  const s = a + INNER, e = b - INNER;
  return `M${xy(s, HOLE)}${rim}L${xy(e, HOLE)}A${HOLE},${HOLE} 0 ${big(e - s)} 0 ${xy(s, HOLE)}Z`;
};

// The pie is .86 of a square, whose corners take the labels of parts too small for theirs. Q is half the square.
const Q = 50 / 0.86;
const VIEW = `${-Q} ${-Q} ${2 * Q} ${2 * Q}`;

// Where each label goes, worked out for all of them from the shares the parts are moving to. A part of a sixth or
// more keeps its label inside, out along its middle. A smaller one sends it to a corner, one each, shared out for the
// least total turn from wedge to corner. fx, fy is the spot as a share of the square, and ax, ay how much of its own
// size the label hangs back from it.
const ROOM = 16;
const CORNERS = [[1, -1], [1, 1], [-1, 1], [-1, -1]];   // [sx, sy], clockwise from the top right
const turn = (m, k) => Math.abs((((m - (k + 0.5) * (TAU / 4)) % TAU) + TAU * 1.5) % TAU - TAU / 2);
const orders = (n, free) => (n ? free.flatMap((k) => orders(n - 1, free.filter((j) => j !== k)).map((rest) => [k, ...rest])) : [[]]);

const place = (from, to) => {
  const spots = from.map((f, k) => {
    const m = ((f + to[k]) / 200) * TAU;
    return to[k] - f >= ROOM
      ? { fx: (30 * Math.sin(m)) / (2 * Q), fy: (-30 * Math.cos(m)) / (2 * Q), ax: -0.5, ay: -0.5, out: false }
      : { m, out: true };
  });
  const out = spots.filter((spot) => spot.out);
  const cost = (ks) => ks.reduce((sum, k, i) => sum + turn(out[i].m, k), 0);
  const best = orders(out.length, [0, 1, 2, 3]).reduce((a, b) => (cost(b) < cost(a) ? b : a));
  out.forEach((spot, i) => {
    const [sx, sy] = CORNERS[best[i]];
    Object.assign(spot, { sx, sy, fx: sx / 2, fy: sy / 2, ax: sx > 0 ? -1 : 0, ay: sy > 0 ? -1 : 0 });
  });
  return spots;
};

// The dotted line from a corner label to the nearest part of its wedge's rim straight across or straight down from
// it. Failing that, it goes out to the square's edge and along it, so it never crosses the pie; a line that turns
// counts TURNED longer, so a straight one wins. [w, h] is the label's measured size, in the same units.
const AIR = 1.5, EDGE = Q - 1.5, TURNED = 20;

export const leader = (from, to, sx, sy, [w, h]) => {
  const off = RIM * TAU + CORNER / 50;                  // past the rounded corner, where the rim is round
  let a = (from / 100) * TAU + off, b = (to / 100) * TAU - off;
  if (b < a) a = b = (a + b) / 2;
  const nx = Q - w - AIR, ny = Q - h - AIR;              // the label's inner sides, less a little air
  const lx = sx * (Q - w / 2), ly = sy * (Q - h / 2);    // its middle
  let best = null;
  const offer = (length, points) => { if (!best || length < best[0]) best = [length, points]; };
  for (let i = 0; i <= 48; i++) {
    const t = a + ((b - a) * i) / 48, x = 51 * Math.sin(t), y = -51 * Math.cos(t);
    const across = Math.sign(x) === sx, down = Math.sign(y) === sy;
    if (across && Math.abs(y - ly) <= h / 2 - 2 && Math.abs(x) < nx) offer(nx - Math.abs(x), [[x, y], [sx * nx, y]]);
    if (down && Math.abs(x - lx) <= w / 2 - 2 && Math.abs(y) < ny) offer(ny - Math.abs(y), [[x, y], [x, sy * ny]]);
    if (across && sy * y < ny) offer(TURNED + EDGE - Math.abs(x) + ny - sy * y, [[x, y], [sx * EDGE, y], [sx * EDGE, sy * ny]]);
    if (down && sx * x < nx) offer(TURNED + EDGE - Math.abs(y) + nx - sx * x, [[x, y], [x, sy * EDGE], [sx * nx, sy * EDGE]]);
  }
  return best && best[1].map((p) => p.join(",")).join(" ");
};

// A path can't be transitioned without flattening its rim, so `animated` moves the numbers and the wedge is drawn
// again each frame. A label's spot moves on the same clock.
const SWEEP = () => ({ duration: 600 });

// Calls fn whenever one of els changes size.
const onResize = (els, fn) => {
  const watch = new ResizeObserver(fn);
  for (const el of els) watch.observe(el);
  onCleanup(() => watch.disconnect());
};

const ROW = 40;     // flat, the height of one tube
const STRIP = 54;   // flat, the height of the stacked bar

// A part of the pie. Its Plot shares the Chart's box with the tubes, and its CSS draws in the square they leave.
export const PartSlat = slat({
  css: styles.part,
  room: { vertical: { start: 0, end: 0 }, horizontal: { start: 0, end: 0 } },
  thickness: { horizontal: GENS.length * ROW + STRIP },   // flat, as tall as both, so the Chart has room for both
}, (d) => {
  const span = animated(() => [d.from, d.to], SWEEP);
  const at = animated(() => [d.spot.fx, d.spot.fy, d.spot.ax, d.spot.ay], SWEEP);
  const size = () => span()[1] - span()[0];

  // The label's size in the wedge's units, so its line stops at its edge.
  let svg;
  const [box, setBox] = createSignal([16, 14]);
  const measure = (label) => onResize([label, svg], () => {
    const unit = svg.clientWidth / (2 * Q);
    if (unit) setBox([label.offsetWidth / unit, label.offsetHeight / unit]);
  });
  // The line is drawn once the label is in its corner, and then follows the wedge.
  const arrived = () => Math.abs(at()[0] - d.spot.fx) < 1e-4 && Math.abs(at()[1] - d.spot.fy) < 1e-4;
  const line = () => (d.spot.out && arrived() ? leader(...span(), d.spot.sx, d.spot.sy, box()) : null);

  // The wedge casts a short shadow; the line, in a layer of its own, doesn't.
  return (
    <div class="slat">
      <Bar from={d.from} to={d.to} color={d.color} class="slice">
        <svg ref={svg} class="wedge" viewBox={VIEW} aria-hidden="true"><path d={wedge(...span())} /></svg>
        <svg class="leads" viewBox={VIEW} aria-hidden="true">
          <Show when={line()}>{(points) => <polyline class="lead" points={points()} />}</Show>
        </svg>
      </Bar>
      <Label ref={measure} at={(d.from + d.to) / 2} class={d.spot.out ? "tag out" : "tag"}
        style={{ "--fx": at()[0], "--fy": at()[1], "--ax": at()[2], "--ay": at()[3], "--share": size() / 100 }}>
        <b>{Math.round(size())}<sup>%</sup></b>
        <span>{d.name}</span>
      </Label>
    </div>
  );
});

// A generation: a tube filled to how many of it use AI. The fill and the outline are an <i> in each Bar, because rhp
// turns transitions off on its own blocks in the JS version and picking isn't a change of data.
export const GenSlat = slat({
  css: styles.gen,
  thickness: { vertical: "var(--pitch)", horizontal: ROW },   // round, the width one tube gets, set on the Chart
  inset: { vertical: 0.15, horizontal: 0.16 },
  room: { vertical: { start: 0, end: 0 }, horizontal: { start: 116, end: 8 } },
}, (d) => (
  <div class="slat" classList={{ on: d.picked === d.index, off: d.picked >= 0 && d.picked !== d.index }}
    data-gen={d.index} aria-pressed={d.picked === d.index}>
    <Bar to={d.value} color={d.tint} class="fill"><i /></Bar>
    <Bar to={100} class="tube"><i /></Bar>
    <Label at={0} side="before" class="name"><b>{Math.round(d.value)}%</b><span>{d.name}</span></Label>
  </div>
));

// The two Plots share the Chart's box. Round, the tubes sit at its end; flat, under the stacked bar.
const seat = (o, which) => (o === "vertical"
  ? (which === "gens" ? { "justify-self": "end" } : undefined)
  : { "align-self": which === "gens" ? "end" : "start" });

export default function Multiple(p) {
  const [picked, setPicked] = createSignal(-1);
  const using = createMemo(() => (!p.seed() ? USING : GENS.map(() => Math.round(rand(24, 66)))));
  const daily = createMemo(() => (!p.seed() ? DAILY : using().map((u) => Math.round(u * rand(0.3, 0.65)))));
  const rows = createMemo(() => using().map((u, g) => split(u, daily()[g])));
  const pie = createMemo(() => stackUp(shares(picked() < 0 ? whole(rows()) : rows()[picked()])));
  const spots = createMemo(() => place(pie().from, pie().to));

  // A click on a tube picks it. A click on it again or anywhere else, or Escape, goes back to everyone. The slat marks
  // itself with data-gen and the poster listens, since a Plot's props are its data and a handler can't be one.
  const pick = (e) => {
    const gen = e.target.closest("[data-gen]");
    setPicked((was) => (gen && was !== +gen.dataset.gen ? +gen.dataset.gen : -1));
  };
  const keys = (e) => {
    if (e.key === "Escape") setPicked(-1);
    if ((e.key === "Enter" || e.key === " ") && e.target.closest("[data-gen]")) {
      e.preventDefault();
      pick(e);
    }
  };

  // The paragraph over the tubes wraps to more lines on a narrow poster, so the tubes take the height it leaves.
  const [side, setSide] = createSignal(0);
  const measure = (el) => onResize([el], () => setSide(el.offsetHeight));

  return (
    <Poster onClick={pick} onKeyDown={keys} look="ai" title="How many people use AI to write their emails and messages?"
      note="Illustrative figures.">
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={300} animate={p.js()} theme={styles.theme}
        style={{
          "--pitch": "10.5cqw", "--bars": `calc(var(--pitch) * ${GENS.length})`, "--between": "3cqw",
          "--side": `${side()}px`, "--strip": `${STRIP}px`,
        }}>
        <div class="side" ref={measure}>
          <p>Everyone, by how often AI helps them write. Pick a generation for only its people, and click anywhere else for everyone.</p>
          <b>The generations using AI:</b>
        </div>
        {/* In the JS version rhp moves only the numbers it draws: the slats move the pie and its labels on their
            own clock, and `picked` has to jump. */}
        <Plot overlap class="pie" style={seat(p.o(), "pie")} key="name" animate={p.js() && ["from", "to"]}
          name={PARTS} color={COLORS} from={pie().from} to={pie().to} spot={spots()}>
          {PartSlat}
        </Plot>
        <Plot keyboard class="gens" style={seat(p.o(), "gens")} key="name" animate={p.js() && ["value"]}
          name={GENS} value={using()} tint={TINTS} picked={picked()}>
          {GenSlat}
        </Plot>
      </Chart>
    </Poster>
  );
}
