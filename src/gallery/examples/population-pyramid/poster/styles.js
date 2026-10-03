export const theme = { font: "system-ui, sans-serif", ink: "#1f2933", muted: "#687482", grid: "#e2ddd3", surface: "#f4f1ea" };

// An age band: men and women rounded toward the outside, the age on the spine, and each share at its end.
export const age = `
.side { --rhp-start-radius: 3px; --rhp-end-radius: 99px; }
.age { padding: 0; font-size: 11px; font-weight: 800; letter-spacing: .02em; }
.age:horizontal { translate: -50% -50%; }
.age:vertical { translate: -50% 50%; }
.pct { font-size: 11px; color: var(--rhp-muted); font-variant-numeric: tabular-nums; }
`;
