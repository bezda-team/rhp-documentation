---
title: slat()
description: Give a slat its own CSS and layout, so it looks and fits the same in any app.
---

```jsx
const Slat = slat({
  thickness: 40,
  room: { start: 120, end: 50 },
  css: `.bar { --rhp-end-radius: 8px; }`,
}, (d) => (
  <div>
    <Label edge="start">{d.name}</Label>
    <Bar to={d.value} class="bar" />
  </div>
));

<Plot name={names} value={values}>{Slat}</Plot>
```

`slat(settings, fn)` returns the slat, with its settings attached.
A slat without settings can be a plain function: `{(d) => <div>…</div>}`.

| Setting | Default | What it does |
|---|---|---|
| `css` | | CSS for the slat: see [styling](/guides/styling/). It reaches only slats of this type. |
| `thickness` | the chart's space, or `32` | how thick a slat is along the stack, in px: its height in a horizontal chart, its width in a vertical one. Without one, the slats share what the chart has: a vertical chart's width, a horizontal chart's `height`. A horizontal chart with no `height` has none to share, so its slats are 32px each and it grows with them. |
| `inset` | `0.18` | the empty share of the band on each side of a Bar, Tick or Area, or a size such as `"8px"` |
| `room` | names and numbers | px outside the chart for the slat's labels: `start`, `end`, `before`, `after`. `"auto"` for `start` or `end` (or `room: "auto"` for both) fits that side to its widest label: see [layout](/guides/layout/#room-that-fits-the-names). |

Any setting can differ by direction: `thickness: { horizontal: 40, vertical: 60 }`.

## A slat's element

A slat returns one element.
rhp positions that element in its band, so the slat's CSS can style it (background, border, hover) but not move it.

## restyle()

```js
restyle(Slat, newCss);
```

Gives a slat type new CSS, and every slat of that type restyles at once, without being redrawn.
It's meant for live style editors like the one in the [gallery](/gallery/).
The slat type must have been made with `css` (an empty string will do).
