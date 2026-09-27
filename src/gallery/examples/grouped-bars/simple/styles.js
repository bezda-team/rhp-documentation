// A count's bar, rounded at its end.
export const count = `
.bar { --rhp-start-radius: 0px; --rhp-end-radius: 4px; }
`;

// A team's name, and a faint band behind its counts on hover.
export const team = `
.name { font-size: 14px; font-weight: 600; }
.team:hover { background: color-mix(in srgb, var(--rhp-ink) 6%, transparent); border-radius: 8px; }
`;
