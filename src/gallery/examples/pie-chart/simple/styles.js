// A part of the day: a wedge round, rhp's own bar flat, and the share inside either way.
export const part = `
.slat { container-type: size; }

/* Round: the Bar gives up its box, so the wedge is drawn in the whole plot. */
.slat:vertical .slice { inset: 0; left: 0; top: 0; width: 100%; height: 100%; translate: none; background: none; }
.slat:vertical .slice svg { display: block; width: 100%; height: 100%; }

/* Only the wedge and the label take the pointer. */
.slat:vertical { pointer-events: none; }
.slat:vertical :is(.slice path, .tag) { pointer-events: auto; }

/* The label goes out to the middle of its wedge and turns back upright. --turn is that middle as the wedge is drawn. */
.slat:vertical .tag { left: 50%; top: 50%; bottom: auto; translate: -50% -50%; padding: 0;
  transform: rotate(calc(var(--turn) * 1turn)) translateY(-30cqmin) rotate(calc(var(--turn) * -1turn)); }

/* Flat: rhp places the bar and the label itself. */
.slat:horizontal .slice svg { display: none; }
.slat:horizontal .slice { --rhp-gap: 4px; --rhp-radius: 8px; }
.slat:horizontal .tag { translate: -50% -50%; padding: 0; }

/* Plain wedges. The poster version rounds their corners. */
.slice path { fill: var(--rhp-color); }
.tag { color: var(--rhp-surface); font-weight: 800; font-size: 15px; }
`;
