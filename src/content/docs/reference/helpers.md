---
title: Helpers
description: Small functions that turn raw data into what a chart needs, sort rows and set tick marks.
---

These are plain functions.
When their input changes, wrap the call in `createMemo` so it runs once per change.

## Sorting and colors

| | |
|---|---|
| `sortBy(key, "asc" \| "desc")` | an `order` that sorts rows by a data name or a function of `d`. Ties keep their places. |
| `series(n)` | a color per row from the theme's series, in order: `color={series()}` |
| `cycle(list)` | repeats a list over the rows without setting their number: `color={cycle(["red", "blue"])}` |

## Scales and ticks

| | |
|---|---|
| `every(step, { ends })` | ticks at each multiple of `step`, and with `ends: true` at the scale's two ends too. `step` must be above 0. |
| `nice(lo, hi, count)` | a round scale around `lo`..`hi`: `{ min, max, step, ticks }` |
| `extent(values)` | `[smallest, largest]` |

## Shaping data

| | |
|---|---|
| `stackUp(values)` | where each piece of a stacked bar starts and ends: `{ from, to }`. Negative values stack down from 0. |
| `shares(values, total)` | each value as a share of the total, scaled to 100 by default: 100% bars |
| `running(changes)` | running totals for a waterfall: `{ from, to }` |
| `summary(samples)` | box plot numbers: `{ min, q1, median, q3, max, low, high, mean, outliers }` |
| `bins(samples, { domain, count })` | a histogram: `{ x0, x1, tally }`. Samples that are all the same get a scale one unit wide around them, and no samples a scale from 0 to 1. |
| `density(samples, { domain, points, bandwidth })` | a smooth `[value, height]` shape for `Area`: violins and ridgelines |

## Motion

| | |
|---|---|
| `animated(read, settings)` | makes any changing number move smoothly, on rhp's clock: for your own elements next to a chart |
| `curve(name)` | a timing curve (`"ease-out"`, `[x1, y1, x2, y2]`) as a function |
| `drawing(fn)` | runs `fn` with its changes reaching the chart at once instead of in the next frame: for a change made inside your own `requestAnimationFrame`. See [motion](/guides/motion/#changing-data-in-your-own-animation-frame). |

## Shapes

| | |
|---|---|
| `shape(...commands)` | an outline for a block's `shape`, from SVG's path commands (`"M"`, `"L"`, `"Q"`, `"C"`, `"Z"`) in the block's own box. See [blocks](/guides/blocks/#what-every-block-takes). |
