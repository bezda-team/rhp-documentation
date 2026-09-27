// An age band: each side rounded at its outer end, and the ages small and muted.
export const band = `
[data-rhp-o="h"].men { border-radius: 4px 0 0 4px; }
[data-rhp-o="h"].women { border-radius: 0 4px 4px 0; }
[data-rhp-o="v"].men { border-radius: 0 0 4px 4px; }
[data-rhp-o="v"].women { border-radius: 4px 4px 0 0; }
.age { font-size: 12px; color: var(--rhp-muted); }
`;
