// A sample: a small dot with a ring in the page's color, so overlapping dots stay apart.
export const point = `
.point { background: var(--rhp-series-1); box-shadow: 0 0 0 1.5px var(--rhp-surface); opacity: .85; }
`;

// A group: its mean as a dark tick.
export const group = `
.mean { background: var(--rhp-ink); --rhp-tick-width: 3px; border-radius: 2px; }
`;
