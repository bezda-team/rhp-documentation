export const theme = { font: "system-ui, sans-serif", ink: "#1f2a37", muted: "#6b7686", grid: "#e1e7ee", surface: "#f7f9fb" };

// A bin: its bar in its own temperature's color, a degree label every other bin, and its count of days on hover.
export const bin = `
.bin { --rhp-radius: 3px; }
.deg { font-size: 11px; font-weight: 700; color: var(--rhp-muted); }
.days { font-size: 11px; font-weight: 800; }
.days > span { opacity: 0; transition: opacity .15s; }
.days:horizontal { --rhp-label-gap: 6px; }
.slat:hover .days > span { opacity: 1; }
.slat:hover .bin { filter: brightness(1.08) saturate(1.1); }
`;
