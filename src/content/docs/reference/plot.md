---
title: Plot
description: A stack of slats made from your data. Every prop that isn't a setting is data for the slats.
---

```jsx
<Plot name={names} value={values} order={sortBy("value", "desc")}>
  {Slat}
</Plot>
```

A Plot's child is the slat: a function of `d` that returns one element, often made with [`slat()`](/reference/slat/).

## Data

Every prop that isn't a setting below is data, read in the slat as `d.<prop>`:

- a list gives item `i` to slat `i`, and the longest list sets the number of slats,
- a single value is shared by every slat,
- a function of `d` is worked out per slat, and again when what it reads changes.

`d.index` is the row's place in the data (from 0), and `d.position` the slat's place on screen.

## Settings

| Prop | Default | What it does |
|---|---|---|
| `rows` | | a list of objects: each field becomes `d.<field>`. A prop with the same name wins. |
| `key` | | a field name or a function of `d` that names each row, so a slat follows its row when rows are added or removed |
| `order` | data order | a list of positions (`null` hides a row), or a function such as `sortBy("value")` |
| `reorder` | `"slide"` | how slats change places: `"slide"`, `"move"` (the slats move in the page) or `"refill"` (slats swap contents) |
| `overlap` | `false` | every slat shares one band instead of stacking: stacked bars, layers, strips of dots |
| `orientation` | the Chart's | `"horizontal"`, `"vertical"`, or `"across"` (the other way from the Plot around it) |
| `slats` | | a fixed number of slats, instead of the longest list |
| `animate` | the Chart's | `true`, a list of data names that move (`["value"]`), or `{ groups, duration, ease, slide }` |
| `thick` | `1` | inside a slat: the share of the slat's band the Plot uses, such as `0.5` |
| `static` | the Chart's | draw the slats once (see the Chart's `static`); lets one Plot be still while another one moves |
| `keyboard` | off | the slats take focus: Tab stops at one slat, and the arrow keys, Home and End go through them in the order shown. See [keyboard](/guides/interaction/#keyboard). |
| `class`, `style`, `ref` | | the Plot's element |

## In a slat

A Plot inside a slat draws in that slat's band, on the same scale: see [charts inside slats](/guides/nesting/).
