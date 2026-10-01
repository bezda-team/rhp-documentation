---
title: Poster
description: The panel the gallery's examples sit in, a kicker, a headline, a dek and a note around a chart. Its looks are an optional stylesheet.
---

```jsx
import { Poster, Chart } from "@bezda/rhp";
import "@bezda/rhp/posters.css"; // the gallery's looks, if you want them

<Poster look="day" kicker="A day" title="Four hours to yourself" dek="Sleep takes the largest share." note="Illustrative.">
  <Chart …>…</Chart>
</Poster>
```

| Prop | What it does |
|---|---|
| `look` | a class for its look, added to `poster`: one of the [looks below](#looks), or one of your own |
| `kicker` | the small line over the headline |
| `title` | the headline |
| `dek` | the line or two under the headline |
| `note` | the small print under the chart; left out when there is none |
| `class` | added to `poster` and the look |
| anything else | set on its `<figure>`, like an `id`, an `aria-*` attribute or a handler such as `onClick` |

Every gallery example that sits on a poster uses it, so the example's code works in an app as it is.

## Looks

A Poster is markup only.
Its looks are a stylesheet of their own, `@bezda/rhp/posters.css`, which a page imports once if it wants them, so a page that doesn't pays nothing for them.
On a page with no build step, link `dist/posters.css` instead.

They are the gallery's looks, one for each poster example:

| `look` | Example |
|---|---|
| `ai` | [Multiple](/gallery/linked-views/) |
| `alpine` | [Dumbbell](/gallery/dumbbell/) |
| `battery` | [100% segmented bars](/gallery/segmented-bars/) |
| `books` | [Unit bars](/gallery/unit-bars/) |
| `budget` | [Waterfall](/gallery/waterfall/) |
| `census` | [Population pyramid](/gallery/population-pyramid/) |
| `climate` | [Diverging bars](/gallery/diverging-bars/) |
| `clinic` | [Strip](/gallery/strip-plot/) |
| `coffee` | [Stacked bars](/gallery/stacked-bars/) |
| `day` | [Pie](/gallery/pie-chart/) |
| `drawing` | [Gantt](/gallery/gantt/) |
| `market` | [Candlestick](/gallery/candlestick/) |
| `medals` | [Grouped bars](/gallery/grouped-bars/) |
| `sound` | [Stem](/gallery/stem-plot/) |
| `strings` | [Violin](/gallery/violin-plot/) |
| `trials` | [Radial bars](/gallery/radial-bars/) |
| `watch` | [Bullet](/gallery/bullet-chart/) |
| `weather` | [Histogram](/gallery/histogram/) |
| `wind` | [Values on hover](/gallery/hover-values/) |

A look sets the panel's paper, type and spacing, and some reach into the example drawn on them too, a key or a paragraph beside the chart, so each fits its own example best.
They are plain page CSS, outside rhp's layers, so your own rules can change any of them, or you can copy the file and make your own from it.

In the gallery, an example's `styles.js` is its slats' CSS and the look is this file, so copying both gives you the example as it is in the gallery.

The looks name their fonts and fall back to the system's when a font isn't on the page: Bricolage Grotesque, Fraunces, Barlow Condensed and IBM Plex Mono.
