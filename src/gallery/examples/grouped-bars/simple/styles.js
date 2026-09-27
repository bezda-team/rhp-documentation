// A count's bar, rounded at its end.
export const count = `
[data-rhp-o="h"].bar { border-radius: 0 4px 4px 0; }
[data-rhp-o="v"].bar { border-radius: 4px 4px 0 0; }
`;

// A team's name, and a faint band behind its counts on hover.
export const team = `
.name { font-size: 14px; font-weight: 600; }
.team:hover { background: color-mix(in srgb, var(--rhp-ink) 6%, transparent); border-radius: 8px; }
`;
