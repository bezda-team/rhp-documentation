// The skyline feature. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#27354e", muted: "#8b8371", grid: "#ded6c7", surface: "#ece5d8" };

// A tower is one bar, and its length is the data. Its roof is cut out of the top of that bar with clip-path, in px
// from the top, so a crown keeps its size however tall the data makes the tower, and the diagonals stay true.
// The shapes only apply to a standing tower; laid on its side the chart goes back to plain bars.
export const tower = `
.slat { --sky-ink: #27354e; --sky-spire: #e2703a; }
.block { background: var(--sky-ink); --rhp-radius: 0px; }

/* Art deco: shoulders that step in on the diagonal to a narrow crown */
.deco:vertical { clip-path: polygon(0 100%, 0 46px, 12% 46px, 22% 30px, 34% 30px, 42% 12px, 50% 0, 58% 12px, 66% 30px, 78% 30px, 88% 46px, 100% 46px, 100% 100%); }
/* A tiered spire, each tier narrower and steeper than the last */
.tiered:vertical { clip-path: polygon(0 100%, 0 56px, 10% 56px, 15% 41px, 25% 31px, 35% 22px, 45% 11px, 50% 0, 55% 11px, 65% 22px, 75% 31px, 85% 41px, 90% 56px, 100% 56px, 100% 100%); }
/* A gothic pinnacle on a squat base */
.gothic:vertical { clip-path: polygon(0 100%, 0 42px, 18% 42px, 27% 25px, 39% 25px, 47% 6px, 50% 0, 53% 6px, 61% 25px, 73% 25px, 82% 42px, 100% 42px, 100% 100%); }
/* A pitched roof */
.gable:vertical { clip-path: polygon(0 100%, 0 26px, 50% 0, 100% 26px, 100% 100%); }
/* Corners cut off the roof slab */
.chamfer:vertical { clip-path: polygon(0 100%, 0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% 100%); }
/* Walls that lean in all the way up */
.lean:vertical { clip-path: polygon(8% 0, 92% 0, 100% 100%, 0 100%); }
/* A crown that pulls in sharply at the top */
.taper:vertical { clip-path: polygon(0 100%, 0 40px, 18% 8px, 30% 0, 70% 0, 82% 8px, 100% 40px, 100% 100%); }
/* A dome */
.dome:vertical { border-radius: 50% 50% 0 0 / 34px 34px 0 0; }

.spire { background: var(--sky-spire); --rhp-radius: 0px; }
.metres { font: 800 9.5px/1 ui-monospace, monospace; color: #ece5d8; letter-spacing: .04em; opacity: .9; }
.metres:vertical { --rhp-label-gap: 58px; } /* clear of the crown, where the tower is full width */
.metres:horizontal { color: var(--sky-ink); opacity: 1; }
.name { font: 600 10px/1.1 "Barlow Condensed", "Arial Narrow", sans-serif; letter-spacing: .09em; text-transform: uppercase; color: var(--rhp-muted); }
.name:vertical { writing-mode: vertical-rl; text-align: right; --rhp-label-gap: 12px; }
.vain { font: 700 10px/1 system-ui, sans-serif; white-space: nowrap; color: var(--sky-spire); opacity: 0; transition: opacity .15s; }
.vain:vertical { position: absolute; left: 11px; top: -4px; }
.slat:hover .vain { opacity: 1; }
.slat:hover .block { background: #3a4d70; }
`;
