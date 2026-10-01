import { createMemo, createSignal, onCleanup, Show } from "solid-js";
import { Plot, Chart, Bar, Label, slat, shares, stackUp, animated } from "@bezda/rhp";
import { Poster } from "@gallery/ui/Poster.jsx";
import { rand } from "@gallery/random.js";
import * as styles from "./styles.js";

// People, by generation: how many use AI to help write their emails and messages, and how often.
const GENS = ["Gen Z", "Millennials", "Gen X", "Boomers"];
const USING = [58, 49, 36, 21];               // of each generation, how many use AI to write
const DAILY = [31, 24, 14, 6];                // and how many of them do on most days
const PEOPLE = [20, 30, 27, 23];              // of all adults, how many are in each generation
const TINTS = ["#7fd6b1", "#c5b4fb", "#cabc6a", "#f3aad3"];   // a hue each, pale, kept apart from their neighbours'

const PARTS = ["Most days", "Now and then", "Not currently using AI"];
const COLORS = ["#7ec5ec", "#b4ddf3", "#eeac4c"];

// The pie says more than the tubes do. A tube is how many of a generation use AI at all; the pie splits those by how
// often, and keeps the rest.
const split = (using, daily) => [daily, using - daily, 100 - using];

// With no generation picked, the pie is everyone: each generation's split, weighed by how many people are in it.
const whole = (rows) => PARTS.map((_, k) => rows.reduce((sum, row, g) => sum + row[k] * PEOPLE[g], 0) / 100);

// The wedge, as in the gallery's pie. Angles are turns from twelve o'clock, clockwise, in a 100 x 100 box around the
// middle. Each straight edge is pushed aside rather than turned, so a gap is one width all the way in, and a stroke in
// the wedge's own color rounds its corners and grows it back out to the circle.
const TAU = Math.PI * 2;
const CORNER = 2.2;             // how round a corner is, and half the stroke that rounds it
const GAP = 2.2;                // the paper left between two wedges, the shadow's soft edge included
const HOLE = 5.5;               // where a wedge starts, so the tips do not pile up in the middle
const OFF = CORNER + GAP / 2;   // how far a wedge's edge is pushed off the true one
const R = 50 - CORNER;          // the stroke grows the wedge back to 50

// How far round pushing an edge aside moves the end of an arc: wider at the hole, where the circle is smaller.
const RIM = Math.asin(OFF / R) / TAU;
const INNER = Math.asin(Math.min(1, OFF / HOLE)) / TAU;

const xy = (t, r) => `${r * Math.sin(t * TAU)},${-r * Math.cos(t * TAU)}`;
const big = (turns) => (turns > 0.5 ? 1 : 0);

export const wedge = (from, to) => {
  const a = from / 100, b = to / 100, mid = (a + b) / 2;
  const u = Math.min(a + RIM, mid), v = Math.max(b - RIM, mid);
  const rim = `L${xy(u, R)}A${R},${R} 0 ${big(v - u)} 1 ${xy(v, R)}`;

  // Too narrow for its edges to reach the hole: they cross first, and the crossing is the tip. Ending them at the hole
  // anyway would bend them in toward the gap and squeeze it. Narrower still, the gap takes the whole wedge.
  if (b - a <= 2 * INNER) {
    return `M${xy(mid, Math.min(OFF / Math.sin((b - a) * Math.PI), R))}${rim}Z`;
  }
  const s = a + INNER, e = b - INNER;
  return `M${xy(s, HOLE)}${rim}L${xy(e, HOLE)}A${HOLE},${HOLE} 0 ${big(e - s)} 0 ${xy(s, HOLE)}Z`;
};

// The pie is drawn in a square, at .86 of its side, so the square's corners have room for a label. Positions below are in the
// wedge's own units, where the middle is 0,0, the rim is at 50 and the square's edges are at Q.
const K = 0.86;
const Q = 50 / K;

// Where each part's label goes, worked out for all of them at once from the shares they are moving to. Inside, a
// label sits out along the middle of its wedge. Under a sixth of the pie there is no room for it, so it goes to a
// corner of the square, each to a different one, and the corners are shared out so the labels are as near their
// wedges as they can all be: the least turning, in total, from the middle of each wedge to its corner. fx and fy are
// the spot as a share of the square, ax and ay the share of its own size the label hangs back from it by (its middle
// inside, its corner in a corner).
const ROOM = 16;      // the smallest part whose label fits inside, out of 100
const CORNERS = [[1, -1], [1, 1], [-1, 1], [-1, -1]];   // [sx, sy]: top right, bottom right, bottom left, top left

// How far round from angle m to the middle of corner k.
const turn = (m, k) => Math.abs((((m - (k + 0.5) * (TAU / 4)) % TAU) + TAU * 1.5) % TAU - TAU / 2);
// Every way of giving n labels a corner each.
const orders = (n, free) => (n ? free.flatMap((k) => orders(n - 1, free.filter((j) => j !== k)).map((rest) => [k, ...rest])) : [[]]);

const place = (from, to) => {
  const spots = from.map((f, k) => {
    const m = ((f + to[k]) / 200) * TAU;
    return to[k] - f >= ROOM
      ? { fx: (30 * Math.sin(m)) / (2 * Q), fy: (-30 * Math.cos(m)) / (2 * Q), ax: -0.5, ay: -0.5, out: 0 }
      : { m, out: 1 };
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

// The dotted line from a label in a corner to its wedge. It goes to the nearest part of the wedge's rim it can reach
// straight across or straight down from the label, and stops just short of the label. If there is none, it goes
// straight out from the rim to the edge of the square and along the edge to the label, so it never crosses the pie.
// [w, h] is the label's own size in these units, measured, since a label is as wide as its words.
const SPARE = 1.5, EDGE = Q - 1.5;

export const leader = (from, to, sx, sy, [w, h]) => {
  const off = Math.asin(OFF / R) + CORNER / 50;                    // where the rim's own curve starts, past the corner
  let a = (from / 100) * TAU + off, b = (to / 100) * TAU - off;
  if (b < a) a = b = (a + b) / 2;
  const nx = Q - w - SPARE, ny = Q - h - SPARE;                   // the label's inner sides, less a little air
  const lx = sx * (Q - w / 2), ly = sy * (Q - h / 2);             // its middle
  let best = null;
  for (let i = 0; i <= 48; i++) {
    const t = a + ((b - a) * i) / 48, x = 51 * Math.sin(t), y = -51 * Math.cos(t);
    const ways = [];
    if (Math.sign(x) === sx && Math.abs(y - ly) <= h / 2 - 2 && Math.abs(x) < nx) ways.push([nx - Math.abs(x), [[x, y], [sx * nx, y]]]);
    if (Math.sign(y) === sy && Math.abs(x - lx) <= w / 2 - 2 && Math.abs(y) < ny) ways.push([ny - Math.abs(y), [[x, y], [x, sy * ny]]]);
    if (Math.sign(x) === sx && sy * y < ny) ways.push([20 + EDGE - Math.abs(x) + ny - sy * y, [[x, y], [sx * EDGE, y], [sx * EDGE, sy * ny]]]);
    if (Math.sign(y) === sy && sx * x < nx) ways.push([20 + EDGE - Math.abs(y) + nx - sx * x, [[x, y], [x, sy * EDGE], [sx * nx, sy * EDGE]]]);
    for (const way of ways) if (!best || way[0] < best[0]) best = way;
  }
  return best && best[1].map((p) => p.join(",")).join(" ");
};

// A path cannot be transitioned without flattening its rim, so `animated` moves the span's two ends and the wedge is
// drawn again from them each frame. The label's spot moves on the same clock, so a label going to a corner travels
// there, and its line follows the wedge as it moves.
const SWEEP = () => ({ duration: 600 });

// Round, the tubes take a share of the chart's width and the pie's square the rest, so they keep their proportions at
// any size. On a narrow poster the tubes go under the pie instead, at the whole width (the poster's CSS changes
// --pitch, and the slats' CSS moves the two apart). Flat, the parts are one stacked bar at the top and the tubes lie
// under it.
const ROW = 40;        // flat, the height one tube gets
const STRIP = 54;      // flat, the height of the stacked bar

// A part of the pie. Its Plot shares the Chart's box with the tubes, and its CSS draws in the room they leave.
export const PartSlat = slat({
  css: styles.part,
  room: { vertical: { start: 0, end: 0 }, horizontal: { start: 0, end: 0 } },
  thickness: { horizontal: GENS.length * ROW + STRIP },   // flat, as tall as both together, so the Chart has room
}, (d) => {
  const span = animated(() => [d.from, d.to], SWEEP);
  const at = animated(() => [d.spot.fx, d.spot.fy, d.spot.ax, d.spot.ay, d.spot.out], SWEEP);
  const size = () => span()[1] - span()[0];

  // The label's size in the wedge's units, for its line to stop at its edge: its px over the px of one unit.
  let svg;
  const [box, setBox] = createSignal([16, 14]);
  const measure = (label) => {
    const watch = new ResizeObserver(() => {
      const unit = svg.clientWidth / (2 * Q);
      if (unit) setBox([label.offsetWidth / unit, label.offsetHeight / unit]);
    });
    watch.observe(label);
    watch.observe(svg);
    onCleanup(() => watch.disconnect());
  };
  // The line is drawn once the label has got to its corner, and then follows the wedge.
  const arrived = () => Math.abs(at()[0] - d.spot.fx) < 1e-4 && Math.abs(at()[1] - d.spot.fy) < 1e-4;
  const line = () => (d.spot.out && arrived() ? leader(...span(), d.spot.sx, d.spot.sy, box()) : null);
  const view = `${-Q} ${-Q} ${2 * Q} ${2 * Q}`;

  // Two layers: the wedge, which casts a short shadow, and over it the line, which doesn't.
  return (
    <div class="slat">
      <Bar from={d.from} to={d.to} color={d.color} class="slice">
        <svg ref={svg} class="wedge" viewBox={view} aria-hidden="true"><path d={wedge(...span())} /></svg>
        <svg class="leads" viewBox={view} aria-hidden="true">
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

// A generation: a tube filled to how many of it use AI. The fill and the outline are drawn by plain elements inside
// the Bars, because rhp turns transitions off on its own blocks in the JS version, and picking is not a change of data.
export const GenSlat = slat({
  css: styles.gen,
  thickness: { vertical: "var(--pitch)", horizontal: ROW },   // the width one tube gets, set on the Chart
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

// A Chart draws its Plots over each other, so the two share one box. Round, the tubes are as wide as their slats and
// sit at the end of it. Flat, the stacked bar is at the top and the tubes at the bottom.
const SIDE = (o, which) => (o === "vertical"
  ? (which === "gens" ? { "justify-self": "end" } : undefined)
  : { "align-self": which === "gens" ? "end" : "start" });

export default function LinkedViews(p) {
  const [picked, setPicked] = createSignal(-1);
  const using = createMemo(() => (!p.seed() ? USING : GENS.map(() => Math.round(rand(24, 66)))));
  const daily = createMemo(() => (!p.seed() ? DAILY : using().map((u) => Math.round(u * rand(0.3, 0.65)))));
  const rows = createMemo(() => using().map((u, g) => split(u, daily()[g])));
  const pie = createMemo(() => stackUp(shares(picked() < 0 ? whole(rows()) : rows()[picked()])));
  const spots = createMemo(() => place(pie().from, pie().to));

  // A tube is picked by clicking it, or with Enter or Space once Tab and the arrow keys have reached it. The slat marks
  // itself with data-gen and the poster listens, because a Plot's props are its data and a handler can't be one.
  // Picking the generation that is already picked, clicking anywhere else on the poster, or Escape goes back to
  // everyone.
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

  // The paragraph over the tubes wraps to more lines on a narrow poster, so the tubes take whatever height it leaves:
  // its height goes to the Chart as --side.
  const [side, setSide] = createSignal(0);
  const measure = (el) => {
    const watch = new ResizeObserver(() => setSide(el.offsetHeight));
    watch.observe(el);
    onCleanup(() => watch.disconnect());
  };

  return (
    <Poster onClick={pick} onKeyDown={keys} look="ai" title="How many people use AI to write their emails and messages?"
      note="Illustrative figures.">
      <Chart orientation={p.o()} scale={[0, 100]} ticks={false} height={300} animate={p.js()} theme={styles.theme}
        style={{ "--pitch": "10.5cqw", "--bars": `calc(var(--pitch) * ${GENS.length})`, "--between": "3cqw", "--side": `${side()}px`, "--strip": `${STRIP}px` }}>
        <div class="side" ref={measure}>
          <p>Everyone, by how often AI helps them write. Pick a generation for only its people, and click anywhere else for everyone.</p>
          <b>The generations using AI:</b>
        </div>
        <Plot overlap class="pie" style={SIDE(p.o(), "pie")} key="name"
          name={PARTS} color={COLORS} from={pie().from} to={pie().to} spot={spots()}>
          {PartSlat}
        </Plot>
        <Plot keyboard class="gens" style={SIDE(p.o(), "gens")} key="name"
          name={GENS} value={using()} tint={TINTS} picked={picked()}>
          {GenSlat}
        </Plot>
      </Chart>
    </Poster>
  );
}
