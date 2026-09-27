---
title: slat()
description: Give a row its own CSS and layout, so it looks and fits the same in any app.
---

```jsx
const Row = slat({
  band: 40,
  room: { start: 120, end: 50 },
  css: `.bar { --rhp-end-radius: 8px; }`,
}, (d) => (
  <div>
    <Label edge="start">{d.name}</Label>
    <Bar to={d.value} class="bar" />
  </div>
));

<Plot name={names} value={values}>{Row}</Plot>
```

`slat(settings, row)` returns the row, with its settings attached.
A row without settings can be a plain function: `{(d) => <div>…</div>}`.

| Setting | Default | What it does |
|---|---|---|
| `css` | | CSS for the row: see [styling](/guides/styling/). It reaches only rows of this type. |
| `band` | `32` (horizontal) | each row's size along the stack, in px. Vertical rows share the width unless set. |
| `inset` | `0.18` | the empty share of the band on each side of a Bar, Tick or Area, or a size such as `"8px"` |
| `room` | names and numbers | px outside the chart for the row's labels: `start`, `end`, `before`, `after` |

Any setting can differ by direction: `band: { horizontal: 40, vertical: 60 }`.

## A row's element

A row returns one element.
rhp positions that element in its band, so the row's CSS can style it (background, border, hover) but not move it.

## restyle()

```js
restyle(Row, newCss);
```

Gives a row type new CSS, and every row of that type restyles at once, without being redrawn.
It's meant for live style editors like the one in the [gallery](/gallery/).
The row type must have been made with `css` (an empty string will do).
