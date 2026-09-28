// A live demo on a docs page: src/demos/<name>.jsx, drawn on the server into the page, so it shows before any script
// runs, and taken over in the browser, in the docs' colors. Demo.astro shows the same file's code below it, so the code
// on the page is the code that runs.
import "../gallery/ui/setup.js";
import { Theme } from "@bezda/rhp";
import { DOCS_THEME } from "../gallery/ui/themes.js";

// Every demo, loaded with the island: a server draws the one asked for at once (it doesn't wait for a module to load).
const demos = import.meta.glob(["./*.jsx", "!./Island.jsx"], { eager: true });

export default function Island(p) {
  const Demo = demos[`./${p.name}.jsx`].default;
  return <Theme value={DOCS_THEME}><Demo /></Theme>;
}
