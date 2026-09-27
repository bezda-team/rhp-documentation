// A day: the wick in the muted color, the body green when the price rose and red when it fell.
export const candle = `
.wick { background: var(--rhp-muted); }
.body { --rhp-radius: 1px; }
.up .body { background: var(--rhp-positive); }
.down .body { background: var(--rhp-negative); }
`;
