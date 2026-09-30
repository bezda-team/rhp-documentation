// A part of the day: a wedge round, rhp's own bar flat, and the share inside either way.
export const part = `
.slat { container-type: size; }

/* Round: the Bar keeps the numbers and gives up its box, and the wedge is drawn in the whole plot. */
.slat:vertical .slice { inset: 0; left: 0; top: 0; width: 100%; height: 100%; translate: none; background: none; }
.slat:vertical .slice svg { display: block; width: 100%; height: 100%; }
/* Every wedge fills the plot, slat box and svg box alike, so whichever is last would catch the pointer everywhere.
   The slat is taken out of the pointer's way and only the painted wedge and its label are put back in it. */
.slat:vertical { pointer-events: none; }
.slat:vertical :is(.slice path, .tag) { pointer-events: auto; }
.slat:vertical .tag { left: 50%; top: 50%; bottom: auto; translate: -50% -50%; padding: 0;
  transform: rotate(calc(var(--rhp-p) * 1turn)) translateY(-30cqmin) rotate(calc(var(--rhp-p) * -1turn)); }

/* Flat: rhp places the bar and the label itself. */
.slat:horizontal .slice svg { display: none; }
.slat:horizontal .slice { --rhp-gap: 4px; --rhp-radius: 8px; }
.slat:horizontal .tag { translate: -50% -50%; padding: 0; }

/* Plain wedges: no stroke and no rounding. The gallery version is the one that rounds its corners.
   And no transition: interpolating one wedge's path into the next would flatten the rim while it moved. */
.slice path { fill: var(--rhp-color); }
.tag { color: var(--rhp-surface); font-weight: 800; font-size: 15px; }
`;
