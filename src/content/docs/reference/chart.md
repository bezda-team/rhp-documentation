---
title: Chart
description: The frame around one or more Plots. It sets the scale, the direction, the axis and the theme.
---

```jsx
<Chart scale={[0, 100]} orientation="horizontal">
  <Plot …>{Slat}</Plot>
</Chart>
```

| Prop | Default | What it does |
|---|---|---|
| `scale` | `[0, 100]` | the range of values shown, `[min, max]` |
| `orientation` | `"horizontal"` | `"horizontal"`: bars run left to right. `"vertical"`: bars run bottom to top. |
| `ticks` | about 5 | the axis lines: a list of values, a rough count, a function of `[min, max]` (such as `every(10)`), or `false` for no axis |
| `format` | the number | a function that turns a tick's value into its text |
| `theme` | rhp's | colors and font, see [themes](/guides/themes/). A Chart's `theme` wins over a `<Theme>` around it, key by key. |
| `height` | `240` (vertical) | the plot's height, in px. A vertical chart always has one; a horizontal chart with a height fits slats that have no `thickness` into it, and one without grows with its slats. |
| `aspect` | | the whole chart's width over its height, such as `16 / 9`, kept at any width. Its height then comes from its width, so `height` is ignored. See [a fixed shape](#a-fixed-shape). |
| `animate` | off | `true` for the [JS version](/guides/motion/); or `{ duration, ease, slide }` with timings in ms. Plots inside take it too. |
| `static` | off | for data that doesn't change: slats are drawn once and use much less memory. A change draws them again, without animation. See [data](/guides/data/#data-that-never-changes). |
| `cross` | | a second scale, `[min, max]`, across the slats: for scatter plots and lines. See [a second axis](/guides/scales/#a-second-axis). |
| `crossTicks` | about 5 | the second axis' lines, like `ticks` |
| `crossFormat` | the number | a function that turns a second axis tick's value into its text |
| `label` | | the chart's name for screen readers; with it, the chart is a figure. See [screen readers](/guides/accessibility/). |
| `aria-*`, `id` | | set on the chart's element, like any element's (`aria-labelledby` also makes it a figure) |
| `class`, `style` | | the chart's own box: width, margin, background, border |
| `ref` | | the chart's element |

A Chart can hold several Plots (drawn over each other on the same scale), and a [Scale](/reference/scale/).
It also takes a `<Show>` or any Solid control flow around them.

A Chart is the frame and a [Plot](/reference/plot/) is a stack of slats inside it, which is not the everyday sense of the two words: see [Chart and Plot are two different components](/start/first-chart/#1-bars).

## A fixed shape

```jsx
<Chart aspect={16 / 9} scale={[0, 100]} orientation="vertical">
  <Plot …>{Slat}</Plot>
</Chart>
```

With `aspect`, the whole chart is that many times as wide as it is tall, at any width, on a phone too.
The whole chart means its box with everything in it: the room for names and values, and the axis numbers.
The plot takes what is left.
A horizontal chart's slats without a `thickness` share that height, and slats with one keep theirs.

It is CSS's own `aspect-ratio`, so the shape is right from the first paint and on a server, and nothing is measured.
A chart without `aspect` lays out as it always has: its width from the page, and its height from `height` or its slats.

## Theme

```jsx
<Theme value={{ series: ["#ff6b4a", "#ffd43b"], font: "Georgia, serif" }}>
  <Chart …>…</Chart>
</Theme>
```

`<Theme>` gives every Chart inside it a theme.
Themes nest: an inner Theme changes only the keys it names.
