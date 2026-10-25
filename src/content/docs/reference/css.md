---
title: CSS
description: The selectors and variables rhp adds to a slat's CSS, and the theme colors.
---

## Selectors

| | |
|---|---|
| `:horizontal`, `:vertical` | a slat or block drawn in that direction: `.bar:vertical { … }` |

## Variables you set

Named along the scale, so they work in both directions.
Set them on a block, or on the slat to reach all its blocks.

| Variable | Default | |
|---|---|---|
| `--rhp-radius` | `2px` | a Bar's corners: one length (for different corners, use the next two or `border-radius`) |
| `--rhp-start-radius` | `--rhp-radius` | the corners where a Bar starts |
| `--rhp-end-radius` | `--rhp-radius` | the corners where a Bar ends (its value) |
| `--rhp-gap` | `0px` | empty space at the start of a Bar |
| `--rhp-label-gap` | 5px after a value, 8px before the chart | the space between a Label and what it labels |
| `--rhp-label-size` | `12px` | a Label's font size |
| `--rhp-tick-width` | `2px` | a Tick's width |
| `--rhp-cell-gap` | `1px` | the space around a Cell |
| `--rhp-length-time`, `--rhp-length-ease` | `.15s`, `ease-out` | how values move (CSS version) |
| `--rhp-slide-time`, `--rhp-slide-ease` | `.3s`, `ease-in-out` | how slats slide to new places |
| `--rhp-gutter-max` | `40cqw` | with `room: "auto"`, the widest a label (and so the room) can be |

## Variables you read

| Variable | |
|---|---|
| `--rhp-toward-end` | the direction from a Bar's start to its end: `linear-gradient(var(--rhp-toward-end), …)` |
| `--rhp-p` | where a Dot, Tick or Label sits along the scale, from 0 to 1. A Label's room to the scale's end is `calc((1 - var(--rhp-p)) * 100%)` in its `max-width` or `max-height`. |
| `--rhp-color` | the block's `color` |
| `--rhp-ink`, `--rhp-muted`, `--rhp-grid`, `--rhp-surface` | theme colors |
| `--rhp-series-1` … `--rhp-series-6` | the theme's series colors |
| `--rhp-positive`, `--rhp-negative`, `--rhp-low`, `--rhp-high` | the other theme colors |
| `--rhp-font` | the theme's font |
| `--rhp-position` | a slat's place in its Plot: 0 for the first, 1 for the next, and so on. See [a slat's place](#a-slats-place). |
| `--rhp-n` | how many places the slat's Plot has |

## A slat's place

rhp writes `--rhp-position` on each slat's root element.
The slat's CSS can read it on any element in the slat, as the [radial bars](/gallery/radial-bars/) do to give each ring its radius.
In a Plot inside a slat, it is the inner slat's place.

It isn't passed down to the elements inside a slat, so a `style` prop or your page's CSS on one of them doesn't see it.
That lets the browser reuse the styles it works out for one slat in the next one: a chart of 1,000 bars draws about 40% faster in Chrome and Edge, about 10% faster in Safari, and as fast as before in Firefox.
To read it there anyway, copy it on the slat's root and read the copy inside (those slats then draw as slowly as before):

```jsx
<div style={{ "--row": "var(--rhp-position)" }}>
  <Label at={d.v} style={{ opacity: "calc(1 - var(--row) * .1)" }}>{d.v}</Label>
</div>
```

`inheritPosition()`, called where your app starts, passes it down in every chart again, as rhp did before 2.1.
Charts then draw as slowly as before.

```js
import { inheritPosition } from "@bezda/rhp";
inheritPosition(); // before the first chart, on the server and in the browser
```
