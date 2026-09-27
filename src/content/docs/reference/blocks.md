---
title: Blocks
description: Bar, Dot, Tick, Label, Cell and Area, and the props each one takes.
---

Blocks are the pieces of a row.
Values are on the chart's scale.
Every block also takes `class`, `style` (an object), `ref`, `color`, children, event handlers (`onClick`…) and HTML attributes (`title`, `data-*`, `aria-*`).

`color` is a theme name (`"series-1"` to `"series-6"`, `"positive"`, `"negative"`, `"ink"`, `"muted"`, `"grid"`, `"surface"`, `"low"`, `"high"`) or any CSS color.

## Bar

```jsx
<Bar from={2} to={d.value} thick="10px" />
```

| Prop | Default | |
|---|---|---|
| `from` | `0` | where the bar starts |
| `to` | `0` | where it ends. Below `from`, the bar runs backward. |
| `thick` | the band less a margin | a size (`"10px"`) or a share of the band (`0.5`) |
| `color` | `series-1` | |

## Dot

```jsx
<Dot at={d.value} size="14px" />
```

| Prop | Default | |
|---|---|---|
| `at` | | its value |
| `size` | `"10px"` | its diameter |
| `across` | `0.5` | where it sits across the band, from 0 to 1 |
| `color` | `series-1` | |

## Tick

```jsx
<Tick at={d.goal} thick={0.8} />
```

| Prop | Default | |
|---|---|---|
| `at` | | its value |
| `thick` | the band less a margin | its length across the band |
| `color` | `ink` | |

## Label

```jsx
<Label at={d.value}>{d.value}</Label>
<Label edge="start">{d.name}</Label>
```

| Prop | | |
|---|---|---|
| `at` | a value | the text starts just past it |
| `side` | `"before"` | with `at`: the text ends just before the value instead |
| `edge` | `"start"` or `"end"` | outside the chart: before it (names) or after it |

## Cell

```jsx
<Cell value={h.count} />
```

| Prop | | |
|---|---|---|
| `value` | | colored from the theme's `low` (at the scale's min) to `high` (at its max) |
| `color` | | a fixed color instead |

## Area

```jsx
<Area points={[[7, 1], [9, 4], [12, 7], [19, 1]]} mirror />
```

| Prop | Default | |
|---|---|---|
| `points` | | `[value, height]` pairs, sorted by value |
| `peak` | the largest height | the height that fills the band |
| `mirror` | `false` | draw both ways from the band's middle (violins) |
| `color` | `series-1` | |
