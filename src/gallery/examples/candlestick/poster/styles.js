export const theme = { font: "system-ui, sans-serif", ink: "#33302e", muted: "#66605c", grid: "#eadbcc", surface: "#fff1e5" };

// A day: the wick, the body and, on the latest day, its closing price.
export const day = `
.day:hover { background: rgb(51 48 46 / .07); }
.wick { background: #807973; }
.body { --rhp-radius: 1px; }
.last { font-size: 11.5px; font-weight: 800; color: #fff; padding: 2px 6px; border-radius: 3px; background: var(--rhp-color); font-variant-numeric: tabular-nums; }
.last:horizontal { margin-left: 8px; }
.last:vertical { left: auto; right: 0; translate: 0 -8px; }
`;

// The day under the pointer: a dashed line at its close, and its price over the axis numbers.
export const cross = `
.cross { background: none; --rhp-tick-width: 0px; }
.cross:horizontal { border-left: 1px dashed var(--rhp-ink); }
.cross:vertical { border-top: 1px dashed var(--rhp-ink); }
.price { padding: 3px 6px; border-radius: 3px; background: var(--rhp-ink); color: var(--rhp-surface); font-size: 11px; font-weight: 800; }
.price:horizontal { top: calc(100% + 1px); translate: -50% 0; }
.price:vertical { left: auto; right: calc(100% + 3px); translate: 0 50%; }
`;
