// The skyline feature. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#2b3a55", muted: "#8b8371", grid: "#ded6c7", surface: "#ece5d8" };

// A tower: the building as a flat silhouette, its spire above it, the height at the top, and its name below.
export const tower = `
.slat { --sky-ink: #2b3a55; --sky-spire: #e2703a; }
.roof { background: var(--sky-ink); --rhp-radius: 0px; }
.spire { background: var(--sky-spire); --rhp-radius: 0px; }
.name { font: 600 9.5px/1.15 "Barlow Condensed", "Arial Narrow", sans-serif; letter-spacing: .05em; text-transform: uppercase; color: var(--rhp-muted); }
.name:vertical { white-space: normal; text-align: center; --rhp-label-gap: 8px; }
.metres { font-size: 11px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--sky-ink); }
.metres:vertical { --rhp-label-gap: 6px; }
.vain { font-size: 10px; font-weight: 700; white-space: nowrap; color: var(--sky-spire); opacity: 0; transition: opacity .15s; }
.vain:vertical { position: absolute; left: 8px; bottom: -6px; }
.slat:hover .vain { opacity: 1; }
.slat:hover .roof { background: #3a4d70; }
`;
