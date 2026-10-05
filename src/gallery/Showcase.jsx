// The home page's showcase: live gallery posters and AI recipes, picked at random on each visit.
// Gallery examples use their chart components; recipes embed their standalone interactive pages.
import "./ui/setup.js";
import { createResource, createSignal, For, onMount, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Theme } from "@bezda/rhp";
import { dark, DOCS_DARK, DOCS_LIGHT, V1_DARK, V1_LIGHT } from "./ui/themes.js";
import RecipePoster from "./RecipePoster.jsx";

const charts = import.meta.glob("./examples/*/poster/chart.jsx");
const JS = new Set(["bar-chart", "box-plot"]);

// `count` entries from `list`, in random order.
const pick = (list, count) => {
  const rest = [...list], out = [];
  while (out.length < count && rest.length) out.push(rest.splice(Math.floor(Math.random() * rest.length), 1)[0]);
  return out;
};

function GalleryPoster(props) {
  const e = props.entry;
  const [chart] = createResource(() => charts[`./examples/${e.id}/poster/chart.jsx`]().then((m) => m.default));
  // The v1 replicas (fruit bars, clouds) move with the JS version, as v1 did; the rest with CSS transitions.
  const js = JS.has(e.id);
  return (
      <div class="playground not-content" data-version="poster">
        <div class="pg-preview">
          <Show when={chart()} fallback={<div class="showcase-loading" aria-busy="true" />}>
            <Theme value={dark() ? DOCS_DARK : DOCS_LIGHT}>
              <Show when={e.theme === "v1"} fallback={<Dynamic component={chart()} o={e.orientation} js={js} seed={0} />}>
                <Theme value={dark() ? V1_DARK : V1_LIGHT}><Dynamic component={chart()} o={e.orientation} js={js} seed={0} /></Theme>
              </Show>
            </Theme>
          </Show>
        </div>
      </div>
  );
}

function Poster(props) {
  const e = props.entry;
  return (
    <figure class={props.extra ? "showcase-item showcase-extra" : "showcase-item"} data-trial={props.trial || undefined} data-entry={e.id}>
      <Show when={e.kind === "recipe"} fallback={<GalleryPoster entry={e} />}>
        <RecipePoster entry={e} />
      </Show>
      <figcaption>
        <a href={e.url}><span class="showcase-title">{e.title}</span> <span class="showcase-open">{e.kind === "recipe" ? "Open recipe →" : "Open with its code →"}</span></a>
      </figcaption>
    </figure>
  );
}

const GAP = 32; // between plots, down and across (Showcase.astro)
const SLACK = 40; // how far past the taller column a fifth plot may reach and still count as fitting
const frame = () => new Promise(requestAnimationFrame);

export default function Showcase(props) {
  const count = props.count ?? 4;
  const [shown, setShown] = createSignal(pick(props.entries, count));
  // A fifth plot for the shorter column, when it has room: tried first hidden and out of the page's flow (nothing
  // moves), since a plot's height is known only once it's drawn.
  const [extra, setExtra] = createSignal(null); // { entry, col }
  const [trial, setTrial] = createSignal(false);
  let grid, runs = 0;
  const cols = [];

  // Resolves once every plot shown is drawn, in its fonts; false if a newer shuffle has taken over.
  const settled = async (run) => {
    await document.fonts.ready;
    for (let i = 0; i < 600 && run === runs && grid.querySelector(".showcase-loading"); i++) await frame();
    await frame(); await frame();
    return run === runs && !grid.querySelector(".showcase-loading");
  };
  const heights = () => cols.map((c) => c.getBoundingClientRect().height);

  async function fill() {
    const run = ++runs;
    setExtra(null);
    if (!(await settled(run)) || matchMedia("(max-width: 50rem)").matches) return;
    const [a, b] = heights(), col = a <= b ? 0 : 1, room = Math.abs(a - b) - GAP;
    const taken = new Set(shown().map((e) => e.id));
    // The thumbnails' heights are a guess. Those that would fill most of the room go first, in random order.
    const estimate = (e) => e.aspect ? cols[col].clientWidth * e.aspect + 32 : e.height;
    const fits = pick(props.entries.filter((e) => !taken.has(e.id) && estimate(e) <= room + SLACK), Infinity);
    const tries = [...fits.filter((e) => estimate(e) >= room / 2), ...fits.filter((e) => estimate(e) < room / 2)].slice(0, 4);
    for (const entry of tries) {
      setTrial(true);
      setExtra({ entry, col });
      if (!(await settled(run))) return;
      const h = grid.querySelector(".showcase-extra").getBoundingClientRect().height;
      if (h <= room + SLACK) return setTrial(false);
    }
    setExtra(null);
  }
  onMount(fill);
  const shuffle = () => { setShown(pick(props.entries, count)); fill(); };

  return (
    <>
      <div class="showcase-head">
        <p class="showcase-kicker"><a href="/gallery/">Live from the gallery</a></p>
        <button type="button" class="showcase-shuffle" onClick={shuffle}>Show others</button>
      </div>
      {/* two columns, each a stack: a short plot leaves no hole under it, the next one follows */}
      <div class="showcase-grid" ref={grid}>
        <For each={[0, 1]}>{(col) => (
          <div class="showcase-column" ref={(el) => (cols[col] = el)}>
            <For each={shown().filter((_, i) => i % 2 === col)}>{(e) => <Poster entry={e} />}</For>
            <Show when={extra()?.col === col && extra()} keyed>{(x) => <Poster entry={x.entry} extra trial={trial()} />}</Show>
          </div>
        )}</For>
      </div>
    </>
  );
}
