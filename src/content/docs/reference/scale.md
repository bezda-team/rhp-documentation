---
title: Scale
description: Draw the chart's scale your own way, with a row per tick.
---

```jsx
<Chart scale={[0, max()]}>
  <Scale ticks={every(5, { ends: true })}>{Mark}</Scale>
  <Plot …>{Row}</Plot>
</Chart>
```

A Scale is a Plot of ticks from the Chart's scale.
Its row is drawn once per tick, and all its rows share one band that covers the chart.
A Chart with a Scale in it draws no axis of its own.

| Prop | Default | What it does |
|---|---|---|
| `ticks` | about 5 | a list of values, a rough count, or a function of `[min, max]` such as `every(5)` |
| other props | | data for the rows, as in a Plot |
| `class` | | the Scale's element |

## What a tick's row gets

| | |
|---|---|
| `d.at` | the tick's value |
| `d.next` | the next tick's value (the scale's end after the last tick): fill the space between two ticks |
| `d.first`, `d.last` | `true` for the first and last ticks |
| `d.toEnd` | the distance from the tick to the scale's end, in px: leave out a number that would crowd the end |

A tick keeps its row while the scale changes, so a tick at 20 stays the same element as the scale grows.
The ticks at the two ends of the scale are always the same two rows, so the end line never slides.
