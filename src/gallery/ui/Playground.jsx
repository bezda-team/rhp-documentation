// A live example: the chart, the controls every example takes (orientation, animation version, new data), and its two
// files beside it. The CSS in styles.js can be edited, and the chart restyles as you type: each export's CSS goes to
// rhp's restyle() for the slat types the chart module exports with that CSS.
import { createSignal, onMount, onCleanup, Show, For } from "solid-js";
import { Theme, restyle } from "@bezda/rhp";
import { editStyles, showCode, resetStyles, cssParts } from "./code.js";
import { dark, DOCS_LIGHT, DOCS_DARK, V1_LIGHT, V1_DARK } from "./themes.js";

function Seg(p) {
  return (
    <div class="pg-seg" role="radiogroup" aria-label={p.label}>
      <For each={p.options}>
        {([value, text]) => (
          <button type="button" role="radio" aria-checked={p.value() === value} onClick={() => p.set(value)}>{text}</button>
        )}
      </For>
    </div>
  );
}

export function Playground(props) {
  const ex = props.example, Example = ex.chart.default;
  const [o, setO] = createSignal(props.orientation ?? "horizontal");
  const [motion, setMotion] = createSignal("css");
  const [seed, setSeed] = createSignal(0);
  const js = () => motion() === "js";
  const [tab, setTab] = createSignal("styles");
  const [edited, setEdited] = createSignal(false);
  const [copied, setCopied] = createSignal(false);

  // The slat types each CSS export styles: the chart module's exported slat types made with that very string.
  const types = {};
  for (const [name, css] of Object.entries(ex.styles)) {
    if (typeof css === "string") types[name] = Object.values(ex.chart).filter((v) => typeof v === "function" && v.scope && v.css === css);
  }
  const original = Object.fromEntries(cssParts(ex.stylesSource).map((p) => [p.name, p.css]));

  let stylesEl, chartEl, stylesView, chartView;
  onMount(() => {
    stylesView = editStyles(stylesEl, ex.stylesSource, (name, css) => {
      for (const type of types[name] ?? []) restyle(type, css);
      setEdited(cssParts(stylesView.state.doc.toString()).some((p) => p.css !== original[p.name]));
    });
    chartView = showCode(chartEl, ex.chartSource);
  });
  onCleanup(() => {
    for (const [name, list] of Object.entries(types)) for (const type of list) restyle(type, original[name] ?? type.css);
    stylesView?.destroy();
    chartView?.destroy();
  });

  const files = [["styles", "styles.js"], ["chart", "chart.jsx"]];
  const show = (k) => { setTab(k); (k === "styles" ? stylesView : chartView)?.requestMeasure(); };
  const onTabKey = (e) => {
    const i = files.findIndex(([k]) => k === tab()), step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const [k] = files[(i + step + files.length) % files.length];
    show(k);
    e.currentTarget.querySelector(`[data-file="${k}"]`)?.focus();
  };
  const copy = async () => {
    const view = tab() === "styles" ? stylesView : chartView;
    try { await navigator.clipboard.writeText(view.state.doc.toString()); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  const theme = () => (dark() ? DOCS_DARK : DOCS_LIGHT);
  const v1 = () => (dark() ? V1_DARK : V1_LIGHT);
  return (
    <section class="playground not-content" data-version={props.version}>
      <div class="pg-bar">
        <Seg label="Orientation" value={o} set={setO} options={[["horizontal", "Horizontal"], ["vertical", "Vertical"]]} />
        <Seg label="Animation" value={motion} set={setMotion} options={[["css", "CSS"], ["js", "JS"]]} />
        <button type="button" class="pg-button" onClick={() => setSeed(seed() + 1)}>New data</button>
      </div>
      <div class="pg-body">
        <div class="pg-preview">
          <Theme value={theme()}>
            <Show when={props.theme === "v1"} fallback={<Example o={o} js={js} seed={seed} />}>
              <Theme value={v1()}><Example o={o} js={js} seed={seed} /></Theme>
            </Show>
          </Theme>
        </div>
        <div class="pg-code">
          <div class="pg-tabs">
            <div role="tablist" aria-label="Files" onKeyDown={onTabKey}>
              <For each={files}>
                {([k, file]) => (
                  <button type="button" role="tab" data-file={k} aria-selected={tab() === k} tabindex={tab() === k ? 0 : -1} onClick={() => show(k)}>
                    {file}<Show when={k === "styles"}><span class="pg-dot" classList={{ on: edited() }} title="Edited" /></Show>
                  </button>
                )}
              </For>
            </div>
            <div class="pg-actions">
              <Show when={tab() === "styles"}>
                <button type="button" disabled={!edited()} onClick={() => resetStyles(stylesView, ex.stylesSource)}>Reset</button>
              </Show>
              <button type="button" onClick={copy}>{copied() ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <div class="pg-file" ref={stylesEl} hidden={tab() !== "styles"} role="tabpanel" aria-label="styles.js" />
          <div class="pg-file" ref={chartEl} hidden={tab() !== "chart"} role="tabpanel" aria-label="chart.jsx" />
          <p class="pg-hint">
            <Show when={tab() === "styles"} fallback={<>The structure: data, slats and the chart. <code>p.o()</code>, <code>p.js()</code> and <code>p.seed()</code> are the controls above.</>}>
              The highlighted CSS is live: edit it and the chart restyles as you type.
            </Show>
          </p>
        </div>
      </div>
    </section>
  );
}
