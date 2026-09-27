---
title: CSS
description: The selectors and variables rhp adds to a row's CSS, and the theme colors.
---

## Selectors

| | |
|---|---|
| `:horizontal`, `:vertical` | a row or block drawn in that direction: `.bar:vertical { … }` |

## Variables you set

Named along the scale, so they work in both directions.
Set them on a block, or on the row to reach all its blocks.

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
| `--rhp-slide-time`, `--rhp-slide-ease` | `.3s`, `ease-in-out` | how rows slide to new places |

## Variables you read

| Variable | |
|---|---|
| `--rhp-toward-end` | the direction from a Bar's start to its end: `linear-gradient(var(--rhp-toward-end), …)` |
| `--rhp-color` | the block's `color` |
| `--rhp-ink`, `--rhp-muted`, `--rhp-grid`, `--rhp-surface` | theme colors |
| `--rhp-series-1` … `--rhp-series-6` | the theme's series colors |
| `--rhp-positive`, `--rhp-negative`, `--rhp-low`, `--rhp-high` | the other theme colors |
| `--rhp-font` | the theme's font |
