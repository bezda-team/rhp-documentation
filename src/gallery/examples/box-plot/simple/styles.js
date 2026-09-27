// A group: a thin whisker, a tinted box with an outline, and the median as a bold tick.
export const box = `
.whisker { background: var(--rhp-muted); }
.box { background: color-mix(in srgb, var(--rhp-series-1) 22%, transparent); box-shadow: inset 0 0 0 2px var(--rhp-series-1); --rhp-radius: 4px; }
.median { background: var(--rhp-series-1); --rhp-tick-width: 3px; }
`;
