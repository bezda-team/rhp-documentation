// A magazine-style panel around a chart: kicker, headline, dek, the chart, a note. It is the page's, not rhp's:
// src/styles/gallery.css styles .poster and each look (.medals, .coffee, …). The chart inside takes its colors and
// font from the theme its example passes. Any other prop goes on the panel: an example that follows the pointer
// listens there, over its key and its chart.
import { Show, splitProps } from "solid-js";

export function Poster(p) {
  const [own, rest] = splitProps(p, ["look", "kicker", "title", "dek", "note", "children"]);
  return (
    <figure class={"poster " + own.look} {...rest}>
      <figcaption>
        <span class="kicker">{own.kicker}</span>
        <span class="headline">{own.title}</span>
        <span class="dek">{own.dek}</span>
      </figcaption>
      {own.children}
      <Show when={own.note}><span class="note">{own.note}</span></Show>
    </figure>
  );
}
