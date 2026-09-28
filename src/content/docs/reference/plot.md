---
title: Plot
description: A stack of rows made from your data. Every prop that isn't a setting is data for the rows.
---

```jsx
<Plot name={names} value={values} order={sortBy("value", "desc")}>
  {Row}
</Plot>
```

A Plot's child is the row: a function of `d` that returns one element, often made with [`slat()`](/reference/slat/).

## Data

Every prop that isn't a setting below is data, read in the row as `d.<prop>`:

- a list gives item i to row i, and the longest list sets the number of rows,
- a single value is shared by every row,
- a function of `d` is worked out per row, and again when what it reads changes.

`d.index` is the row's place in the data (from 0), and `d.position` its place on screen.

## Settings

| Prop | Default | What it does |
|---|---|---|
| `rows` | | a list of objects: each field becomes `d.<field>`. A prop with the same name wins. |
| `key` | | a field name or a function of `d` that names each row, so a row follows its item when items are added or removed |
| `order` | data order | a list of positions (`null` hides a row), or a function such as `sortBy("value")` |
| `reorder` | `"slide"` | how rows change places: `"slide"`, `"move"` (elements move in the page) or `"refill"` (rows swap contents) |
| `overlap` | `false` | every row shares one band instead of stacking: stacked bars, layers, strips of dots |
| `orientation` | the Chart's | `"horizontal"`, `"vertical"`, or `"across"` (the other way from the Plot around it) |
| `slats` | | a fixed number of rows, instead of the longest list |
| `animate` | the Chart's | `true`, a list of data names that move (`["value"]`), or `{ groups, duration, ease, slide }` |
| `thick` | `1` | inside a row: the share of the row's band the Plot uses, such as `0.5` |
| `static` | the Chart's | draw the rows once (see the Chart's `static`); lets one Plot be still while another one moves |
| `keyboard` | off | the rows take focus: Tab stops at one row, and the arrow keys, Home and End go through them in the order shown. See [keyboard](/guides/interaction/#keyboard). |
| `class`, `style`, `ref` | | the Plot's element |

## In a row

A Plot inside a row draws in that row's band, on the same scale: see [charts inside rows](/guides/nesting/).
