// A part of the pie: a wedge round, a segment of one stacked bar flat.
export const part = `
.slat { pointer-events: none; }

/* Round: the wedge is drawn in what the bars leave of the Chart's width. */
.slice:vertical { inset: 0; width: calc(100cqw - var(--bars) - 4cqw); height: 100%; translate: none; background: none; }
.slice:vertical svg { display: block; width: 100%; height: 100%; }
.slice path { fill: var(--rhp-color); }

/* Flat: rhp draws the stacked bar, in the band at the top. */
.slice:horizontal svg { display: none; }
.slice:horizontal { top: 0; bottom: auto; height: var(--strip); translate: none; }
`;

// A generation. Only the bar and its name take the pointer.
export const gen = `
.slat { pointer-events: none; }
:is(.bar, .name) { pointer-events: auto; cursor: pointer; }
.bar { background: var(--rhp-ink); opacity: .25; }
.slat:hover .bar { opacity: .4; }
.slat.on .bar { opacity: 1; }
.name { font-size: 11px; color: var(--rhp-muted); }
`;
