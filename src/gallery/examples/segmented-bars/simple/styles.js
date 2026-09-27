// A share: square ends, and a thin gap from the share before it, in the page's color.
export const share = `
.share { --rhp-radius: 0px; }
[data-rhp-o="h"].share:not(:first-child) { box-shadow: inset 2px 0 0 var(--rhp-surface); }
[data-rhp-o="v"].share:not(:first-child) { box-shadow: inset 0 -2px 0 var(--rhp-surface); }
`;

// A person: the whole bar rounded at both ends.
export const person = `
.shares { border-radius: 6px; overflow: hidden; }
`;
