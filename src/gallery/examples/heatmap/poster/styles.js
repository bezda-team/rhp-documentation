// The heatmap: plain, in the page's colors. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// A day: its cells, with a gap of 1px around each and slightly rounded corners, and the hour numbers, small and muted.
// While an hour is pointed at, the cells outside its day and its hour fade.
export const dayRow = `
.cell { --rhp-cell-gap: 1px; --rhp-radius: 2px; }
.hour { --rhp-label-size: 10px; color: var(--rhp-muted); }
.hour:horizontal { width: auto; }
.faded { opacity: .25; }
`;
