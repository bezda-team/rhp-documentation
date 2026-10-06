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
| `css` | | CSS for the slat: see [styling](/guides/styling/). It reaches only slats of this type. A list of CSS is joined in order: see [using someone else's look](/guides/styling/#using-someone-elses-look). |
| `thickness` | the chart's space, or `32` | how thick a slat is along the stack, in px or as a CSS length (`"var(--pitch)"`): its height in a horizontal chart, its width in a vertical one. Without one, the slats share what the chart has: a vertical chart's width, a horizontal chart's `height`. A horizontal chart with no `height` has none to share, so its slats are 32px each and it grows with them. |
| `inset` | `0.18` | the empty share of the band on each side of a Bar, Tick or Area, or a size such as `"8px"` |
| `room` | names and numbers | px outside the chart for the slat's labels: `start`, `end`, `before`, `after`. `"auto"` for `start` or `end` (or `room: "auto"` for both) fits that side to its widest label: see [layout](/guides/layout/#room-that-fits-the-names). |

Any setting can differ by direction: `thickness: { horizontal: 40, vertical: 60 }`.

## A slat's element

A slat returns one DOM element, which becomes the row's root.
A Plot uses that root directly and adds no row wrapper of its own.

In a stacking Plot, rhp positions and sizes the root as the full band, so use a wrapper around blocks that need their own placing.
The slat's CSS can style the root (background, border, hover) but cannot move it off its band.

A Plot with `overlap` lets a block be the root itself, so a single Dot, Bar, Tick, Place, Area or Line needs no extra wrapper:

```jsx
<Plot overlap x={xs} y={ys}>
  {(d) => <Dot at={d.x} cross={d.y} />}
</Plot>
```

A [Scale](/reference/scale/) also uses overlap, so its slat can return a Tick directly.
Positioned children of a direct block root use that block's box, rather than the full band.
Keep a common full-band wrapper when the slat holds several independently positioned blocks.
Keep a wrapper when a single mark needs a full-band hover or pointer target.
When removing a wrapper, update selectors that depended on it: `.slat .dot` becomes `.slat.dot` if both classes are now on the Dot.

## restyle()

```js
restyle(Slat, newCss);
```

Gives a slat type new CSS, and every slat of that type restyles at once, without being redrawn.
It's meant for live style editors like the one in the [gallery](/gallery/).
The slat type must have been made with `css` (an empty string will do).
