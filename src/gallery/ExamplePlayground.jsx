// The island an example page shows: loads one example's chart and styles (and their source text), then its Playground.
// Each example is src/gallery/examples/<id>/<version>/chart.jsx + styles.js, where version is "poster" (the gallery's)
// or "simple". Vite splits every example into its own chunk, so a page loads only its own.
import { createResource, Show } from "solid-js";
import { Playground } from "./ui/Playground.jsx";

const charts = import.meta.glob("./examples/*/*/chart.jsx");
const styles = import.meta.glob("./examples/*/*/styles.js");
const chartSources = import.meta.glob("./examples/*/*/chart.jsx", { as: "raw" });
const styleSources = import.meta.glob("./examples/*/*/styles.js", { as: "raw" });

export default function ExamplePlayground(props) {
  const dir = `./examples/${props.id}/${props.version}/`;
  const [example] = createResource(async () => {
    const [chart, style, chartSource, stylesSource] = await Promise.all([
      charts[dir + "chart.jsx"](), styles[dir + "styles.js"](), chartSources[dir + "chart.jsx"](), styleSources[dir + "styles.js"](),
    ]);
    return { chart, styles: style, chartSource, stylesSource };
  });
  return <Show when={example()} fallback={<div class="pg-loading" aria-busy="true" />}>{(ex) => <Playground example={ex()} {...props} />}</Show>;
}
