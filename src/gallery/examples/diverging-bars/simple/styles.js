// A month: its bar green when up, red when down, with the value in the same color.
export const month = `
.bar { --rhp-radius: 3px; }
.up .bar { background: var(--rhp-positive); }
.down .bar { background: var(--rhp-negative); }
.up .value { color: var(--rhp-positive); }
.down .value { color: var(--rhp-negative); }
.value { font-weight: 700; }
`;
