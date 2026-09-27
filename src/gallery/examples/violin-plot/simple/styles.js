// A group: the shape filled with the first series color, and the median as a ringed dot.
export const violin = `
.shape { fill: color-mix(in srgb, var(--rhp-series-1) 35%, transparent); stroke: var(--rhp-series-1); }
.median { background: var(--rhp-surface); box-shadow: 0 0 0 2px var(--rhp-series-1); }
`;
