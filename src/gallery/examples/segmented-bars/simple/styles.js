// A share: square ends, and a thin gap from the share before it.
export const share = `
.share { --rhp-radius: 0px; }
.share:not(:first-child) { --rhp-gap: 2px; }
`;

// A person: the whole bar rounded at both ends.
export const person = `
.shares { border-radius: 6px; overflow: hidden; }
`;
