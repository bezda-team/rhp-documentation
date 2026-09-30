// The skyline feature. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#2b3a55", muted: "#8b8371", grid: "#ded6c7", surface: "#ece5d8" };

// A tower: every block of it is one flat colour, so the whole row reads as one silhouette. The setbacks above the
// mass are narrower blocks, so the crown keeps the tower's proportions however tall the data makes it.
export const tower = `
.slat { --sky-ink: #2b3a55; --sky-spire: #e2703a; }
.block { background: var(--sky-ink); --rhp-radius: 0px; }
.spire { background: var(--sky-spire); --rhp-radius: 0px; }
.metres { font: 800 9.5px/1 ui-monospace, monospace; color: #ece5d8; letter-spacing: .02em; }
.metres:vertical { --rhp-label-gap: 9px; }
.metres:horizontal { color: var(--sky-ink); }
.name { font: 600 10px/1.1 "Barlow Condensed", "Arial Narrow", sans-serif; letter-spacing: .07em; text-transform: uppercase; color: var(--rhp-muted); }
.name:vertical { writing-mode: vertical-rl; text-align: right; --rhp-label-gap: 10px; }
.vain { font: 700 10px/1 system-ui, sans-serif; white-space: nowrap; color: var(--sky-spire); opacity: 0; transition: opacity .15s; }
.vain:vertical { position: absolute; left: 10px; top: -4px; }
.slat:hover .vain { opacity: 1; }
.slat:hover .block { background: #3d5279; }
`;
