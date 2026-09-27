// A step: money in green, money out red, what is left in the ink color; a hairline links a step to the next.
export const step = `
.bar { --rhp-radius: 4px; }
.in .bar { background: var(--rhp-positive); }
.out .bar { background: var(--rhp-negative); }
.total .bar { background: var(--rhp-ink); }
.link { background: var(--rhp-muted); --rhp-tick-width: 1px; }
.amount { font-weight: 700; }
`;
