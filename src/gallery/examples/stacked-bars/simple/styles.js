// A layer: square ends, and a thin gap from the one before it, in the page's color.
export const layer = `
.layer { --rhp-radius: 0px; }
[data-rhp-o="h"].layer:not(:first-child) { box-shadow: inset 2px 0 0 var(--rhp-surface); }
[data-rhp-o="v"].layer:not(:first-child) { box-shadow: inset 0 -2px 0 var(--rhp-surface); }
`;

// A drink: its total in bold past the stack.
export const drink = `
.total { font-weight: 700; }
`;
