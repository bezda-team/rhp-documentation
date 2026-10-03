export const theme = { font: "'Bricolage Grotesque Variable', system-ui, sans-serif", ink: "#eef1f8", muted: "#8b93ab", grid: "#242a3e", surface: "#0f1220" };

// A part of the day: its wedge round, rhp's own bar flat.
export const part = `
.slat { container-type: size; }

/* --- round --- */

/* The Bar gives up its box, so every wedge is drawn in the whole plot. */
.slat:vertical .slice { inset: 0; left: 0; top: 0; width: 100%; height: 100%; translate: none; background: none; }
.slat:vertical .slice svg { display: block; width: 100%; height: 100%; }
/* Only the wedge and the label take the pointer. */
.slat:vertical { pointer-events: none; }
.slat:vertical :is(.slice path, .tag) { pointer-events: auto; }

/* The stroke in the fill's color rounds the corners. */
.slice path { fill: var(--rhp-color); stroke: var(--rhp-color); stroke-width: 3.8; stroke-linejoin: round; }

/* The label goes out to the middle of its wedge and turns back upright. --turn is that middle as the wedge is drawn. */
.slat:vertical .tag { left: 50%; top: 50%; bottom: auto; translate: -50% -50%; padding: 0;
  transform: rotate(calc(var(--turn) * 1turn)) translateY(-31cqmin) rotate(calc(var(--turn) * -1turn)); }

/* Pointed at, a wedge slides out along its middle. The svg and a box inside the label move, because rhp turns off
   transitions on its own blocks in the JS version. */
.slat:vertical .slice { --mid: calc((var(--rhp-lo) + var(--rhp-hi)) / 2); }
.slat:vertical :is(.slice svg, .tag .move) { transition: translate .25s ease-out; }
.slat:vertical:is(:hover, :focus-within) .slice svg { translate: calc(sin(var(--mid) * 1turn) * 13px) calc(cos(var(--mid) * 1turn) * -13px); }
.slat:vertical:is(:hover, :focus-within) .tag .move { translate: calc(sin(var(--rhp-p) * 1turn) * 13px) calc(cos(var(--rhp-p) * 1turn) * -13px); }

/* --- flat: rhp places the bar and the label itself --- */

.slat:horizontal .slice svg { display: none; }
.slat:horizontal .slice { --rhp-gap: 5px; --rhp-radius: 10px; }
.slat:horizontal .tag { translate: -50% -50%; padding: 0; }
.slat:horizontal:is(:hover, :focus-within) .slice { filter: brightness(1.08); }

/* --- either way --- */

.tag { z-index: 2; color: var(--rhp-surface); text-align: center; }
.move { display: block; }
.tag b { display: block; font: 800 clamp(20px, 6cqmin, 32px)/1 var(--rhp-font); letter-spacing: -.03em; }
.said { display: grid; font-size: clamp(9px, 2.2cqmin, 12px); }
.said i { grid-area: 1 / 1; font-style: normal; transition: opacity .2s; }
.said i + i { opacity: 0; }
.slat:is(:hover, :focus-within) .said i { opacity: 0; }
.slat:is(:hover, :focus-within) .said i + i { opacity: 1; }
.slat:focus-visible { outline: none; }
.slat:focus-visible .tag b { text-decoration: underline; text-underline-offset: 4px; }
`;
