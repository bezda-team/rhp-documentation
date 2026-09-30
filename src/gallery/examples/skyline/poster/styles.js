// The skyline feature. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#27354e", muted: "#8b8371", grid: "#ded6c7", surface: "#ece5d8" };

// A tower is one bar, and its length is the data. Its roofline is a shape the Bar wears (see shapes.js), so there is
// no clip-path in here and nothing written twice for a chart that turns.
export const tower = `
.slat { --sky-ink: #27354e; --sky-spire: #e2703a; }
.block { background: var(--sky-ink); --rhp-radius: 0px; }

.spire { background: var(--sky-spire); --rhp-radius: 0px; }
.metres { font: 800 9.5px/1 ui-monospace, monospace; color: #ece5d8; letter-spacing: .04em; opacity: .9; }
.metres:vertical { --rhp-label-gap: 58px; } /* clear of the crown, where the tower is full width */
.name { font: 600 10px/1.1 "Barlow Condensed", "Arial Narrow", sans-serif; letter-spacing: .09em; text-transform: uppercase; color: var(--rhp-muted); }
.name:vertical { writing-mode: vertical-rl; text-align: right; --rhp-label-gap: 12px; }
.vain { font: 700 10px/1 system-ui, sans-serif; white-space: nowrap; color: var(--sky-spire); opacity: 0; transition: opacity .15s; }
.vain:vertical { position: absolute; left: 11px; top: -4px; }
.slat:hover .vain { opacity: 1; }
.slat:hover .block { background: #3a4d70; }
`;
