// A layer: square ends, and a thin gap from the one below it.
export const layer = `
.layer { --rhp-radius: 0px; }
.layer:not(:first-child) { --rhp-gap: 2px; }
`;

// A drink: its total in bold past the stack.
export const drink = `
.total { font-weight: 700; }
`;
