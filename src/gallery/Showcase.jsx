// The home page's showcase: a few gallery posters, picked at random on each visit, live and in their best orientation.
// Each poster is drawn as its gallery page draws it (Playground.jsx), without the controls and the code.
import { createResource, createSignal, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Theme } from "@bezda/rhp";
import { dark, DOCS_DARK, DOCS_LIGHT, V1_DARK, V1_LIGHT } from "./ui/themes.js";

const charts = import.meta.glob("./examples/*/poster/chart.jsx");

// `count` entries from `list`, in random order.
const pick = (list, count) => {
  const rest = [...list], out = [];
  while (out.length < count && rest.length) out.push(rest.splice(Math.floor(Math.random() * rest.length), 1)[0]);
  return out;
};

function Poster(props) {
  const e = props.entry;
  const [chart] = createResource(() => charts[`./examples/${e.id}/poster/chart.jsx`]().then((m) => m.default));
  const o = () => e.orientation, js = () => false, seed = () => 0;
  return (
    <figure class="showcase-item">
      <div class="playground not-content" data-version="poster">
        <div class="pg-preview">
          <Show when={chart()} fallback={<div class="showcase-loading" aria-busy="true" />}>
            <Theme value={dark() ? DOCS_DARK : DOCS_LIGHT}>
              <Show when={e.theme === "v1"} fallback={<Dynamic component={chart()} o={o} js={js} seed={seed} />}>
                <Theme value={dark() ? V1_DARK : V1_LIGHT}><Dynamic component={chart()} o={o} js={js} seed={seed} /></Theme>
              </Show>
            </Theme>
          </Show>
        </div>
      </div>
      <figcaption>
        <a href={`/gallery/${e.id}/`}><span class="showcase-title">{e.title}</span> <span class="showcase-open">Open with its code →</span></a>
      </figcaption>
    </figure>
  );
}

export default function Showcase(props) {
  const [shown, setShown] = createSignal(pick(props.entries, props.count ?? 4));
  // Two columns: the first and third posters on the left, the second and fourth on the right, which starts lower.
  const column = (side) => shown().filter((_, i) => i % 2 === side);
  return (
    <>
      <div class="showcase-head">
        <p class="showcase-kicker">Live from the gallery</p>
        <button type="button" class="showcase-shuffle" onClick={() => setShown(pick(props.entries, props.count ?? 4))}>Show others</button>
      </div>
      <div class="showcase-grid">
        <For each={[0, 1]}>
          {(side) => <div class="showcase-col"><For each={column(side)}>{(e) => <Poster entry={e} />}</For></div>}
        </For>
      </div>
    </>
  );
}
