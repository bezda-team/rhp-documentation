// A Cell mixes `low` and `high` by its value: quiet hours dark, busy ones amber.
export const theme = { font: "system-ui, sans-serif", ink: "#f3f1ed", muted: "#9b9893", grid: "#2b2a28", surface: "#151515", low: "#332214", high: "#ffb94c" };

// A day: its cells, 1px apart with slightly rounded corners, and the hour numbers, which let the pointer through.
export const dayRow = `
.cell { --rhp-cell-gap: 1px; --rhp-radius: 2px; }
.hour { --rhp-label-size: 10px; color: var(--rhp-muted); pointer-events: none; }
.hour:horizontal { width: auto; }
.faded { opacity: .25; }
`;
