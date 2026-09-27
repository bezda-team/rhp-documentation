---
title: Chart
description: The frame around one or more Plots. It sets the scale, the direction, the axis and the theme.
---

```jsx
<Chart scale={[0, 100]} orientation="horizontal">
  <Plot …>{Row}</Plot>
</Chart>
```

| Prop | Default | What it does |
|---|---|---|
| `scale` | `[0, 100]` | the range of values shown, `[min, max]` |
| `orientation` | `"horizontal"` | `"horizontal"`: bars run left to right. `"vertical"`: bars run bottom to top. |
| `ticks` | about 5 | the axis lines: a list of values, a rough count, a function of `[min, max]` (such as `every(10)`), or `false` for no axis |
| `format` | the number | a function that turns a tick's value into its text |
| `theme` | rhp's | colors and font, see [themes](/guides/themes/). A Chart's `theme` wins over a `<Theme>` around it, key by key. |
| `height` | `240` (vertical) | the plot's height, in px. A vertical chart always has one; a horizontal chart with a height fits rows that have no `thickness` into it, and one without grows with its rows. |
| `animate` | off | `true` for the [JS version](/guides/motion/); or `{ duration, ease, slide }` with timings in ms. Plots inside take it too. |
| `static` | off | for data that doesn't change: rows are drawn once and use much less memory. A change draws them again, without animation. See [data](/guides/data/#data-that-never-changes). |
| `class`, `style` | | the chart's own box: width, margin, background, border |
| `ref` | | the chart's element |

A Chart can hold several Plots (drawn over each other on the same scale), and a [Scale](/reference/scale/).
It also takes a `<Show>` or any Solid control flow around them.

## Theme

```jsx
<Theme value={{ series: ["#ff6b4a", "#ffd43b"], font: "Georgia, serif" }}>
  <Chart …>…</Chart>
</Theme>
```

`<Theme>` gives every Chart inside it a theme.
Themes nest: an inner Theme changes only the keys it names.
