// A live demo on a docs page: src/demos/<name>.jsx, drawn in the browser in the docs' colors.
// Demo.astro shows the same file's code below it, so the code on the page is the code that runs.
import { createResource, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Theme } from "@bezda/rhp";
import { dark, DOCS_DARK, DOCS_LIGHT } from "../gallery/ui/themes.js";

const demos = import.meta.glob(["./*.jsx", "!./Island.jsx"]);

export default function Island(p) {
  const [demo] = createResource(() => p.name, (name) => demos[`./${name}.jsx`]().then((m) => m.default));
  return (
    <Theme value={dark() ? DOCS_DARK : DOCS_LIGHT}>
      <Show when={demo()}>{(Demo) => <Dynamic component={Demo()} />}</Show>
    </Theme>
  );
}
