// The shop's week as a heat camera would see it. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme. A Cell mixes `low` and `high` by its value: hours with few visitors are dark, busy ones amber.
export const theme = { font: "system-ui, sans-serif", ink: "#f3f1ed", muted: "#9b9893", grid: "#2b2a28", surface: "#151515", low: "#332214", high: "#ffb94c" };

// A day: its cells, with a gap of 1px around each and slightly rounded corners, and the hour numbers, small and muted.
// The hour numbers let the pointer through to what is under them. While an hour is pointed at, the cells outside its
// day and its hour fade.
export const dayRow = `
.cell { --rhp-cell-gap: 1px; --rhp-radius: 2px; }
.hour { --rhp-label-size: 10px; color: var(--rhp-muted); pointer-events: none; }
.hour:horizontal { width: auto; }
.faded { opacity: .25; }
`;
