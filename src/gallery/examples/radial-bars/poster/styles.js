export const theme = { font: "'Bricolage Grotesque Variable', system-ui, sans-serif", ink: "#18203a", muted: "#6a7286", grid: "#e2e6ee", surface: "#eef1f9" };

// A stage. Upright, the CSS turns rhp's --rhp-hi (a bar's end) and --rhp-p (a point) into angles.
export const stage = `
@property --swept { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

.slat {
  --outer: clamp(120px, calc(50cqw - 60px), 244px);  /* the widest ring's radius */
  --step: calc(var(--outer) * .195);                 /* how much smaller each ring inside it is */
  --band: calc(var(--outer) * .135);                 /* how thick a ring is */
  --gap: calc(var(--step) - var(--band));            /* the space between two rings */
  --sweep: 270deg;                                   /* how far a full 100% turns, counterclockwise from nine o'clock */
  --r: calc(var(--outer) - var(--rhp-position) * var(--step));   /* this slat's own ring */
  --mid: calc((var(--rhp-n) / 2 - var(--rhp-position)) * 100%);  /* the circle's middle, from this slat's left edge */
  --tint: color-mix(in oklab, var(--from) 20%, #fff);
  --ease: .7s cubic-bezier(.32, 0, .2, 1);
}

.track, .lift { position: absolute; }

/* The shadow is on a box around the arc and its caps, since the arc's mask would cut it away. */
.lift { inset: 0; filter: drop-shadow(0 4px 6px rgb(21 27 48 / .2)); }

/* --- upright: the value is an angle --- */

.slat:vertical :is(.track, .arc, .cap, .name, .share) { left: var(--mid); top: 50%; bottom: auto; translate: -50% -50%; transition: transform var(--ease); }
.slat:vertical :is(.track, .arc) { width: calc(var(--r) * 2); height: calc(var(--r) * 2); border-radius: 50%; }

/* The plate under a ring: white in the middle, the track around its rim. One gradient does both. */
.slat:vertical .track { box-shadow: 0 2px 5px rgb(20 26 45 / .06), 0 14px 34px rgb(20 26 45 / .07);
  background: radial-gradient(farthest-side, #fff 0 calc(100% - var(--band) - .5px), var(--tint) calc(100% - var(--band) + .5px)); }

/* The conic gradient paints the share and stops. The mask cuts the middle out, leaving a ring.
   --swept has to be registered as an angle (above) or it jumps instead of moving. */
.slat:vertical .arc { --swept: calc(var(--rhp-hi) * var(--sweep)); transition: --swept var(--ease);
  background: conic-gradient(from calc(270deg - var(--swept)), var(--to) 0deg, var(--from) var(--swept), #0000 0deg);
  mask: radial-gradient(farthest-side, #0000 calc(100% - var(--band) - .5px), #000 calc(100% - var(--band) + .5px)); }

/* Turn by the value, then step out to the radius. The share turns back again so the number stays upright. */
.slat:vertical .cap { transform: rotate(calc(var(--rhp-p) * -1 * var(--sweep))) translateX(calc(var(--band) / 2 - var(--r))); }
.slat:vertical .share { padding: 3px 7px; border-radius: 99px; background: #fff; box-shadow: 0 1px 4px rgb(20 26 45 / .16);
  transform: rotate(calc(var(--rhp-p) * -1 * var(--sweep))) translateX(calc(0px - var(--r) - var(--gap) / 2)) rotate(calc(var(--rhp-p) * var(--sweep))); }
.slat:vertical .name { transform: translate(calc(var(--band) / 2 - var(--r)), calc(-1 * var(--band) - 16px)); font-size: clamp(10px, 2.4cqw, 12px); color: var(--from); }
.slat:vertical .name span { display: none; } /* only the number fits on a ring; the key gives the names */

/* --- flat: the value is a length, and rhp places it --- */

.slat:horizontal :is(.cap, .name b) { display: none; }
.slat:horizontal :is(.track, .arc) { height: 24px; border-radius: 99px; } /* flat, a ring's thickness means nothing */
.slat:horizontal .track { left: 0; right: 0; top: 50%; translate: 0 -50%; background: var(--tint); }
.slat:horizontal .arc { background: linear-gradient(var(--rhp-toward-end), var(--from), var(--to)); }
.slat:horizontal .name { padding-left: 13px; color: #fff; }

/* --- either way --- */

.cap { width: var(--band); height: var(--band); background: var(--from); z-index: 2; }
.cap.end { background: var(--to); }
.name { z-index: 3; padding: 0; font: 700 10px/1.1 var(--rhp-font); letter-spacing: .08em; text-transform: uppercase; }
.name b { font-size: 11px; letter-spacing: 0; }
.share { z-index: 3; font: 800 clamp(12px, 3cqw, 14px)/1 var(--rhp-font); letter-spacing: -.02em; color: var(--to); }

/* Upright, only a ring's pieces take the pointer. Each is a full disc under its mask, so the innermost ring wins. */
.slat:vertical { pointer-events: none; }
.slat:vertical :is(.track, .arc, .cap, .name, .share) { pointer-events: auto; }
.slat:is(:hover, :focus-within) .lift { filter: saturate(1.1) drop-shadow(0 9px 14px rgb(21 27 48 / .3)); }
.slat:is(:hover, :focus-within) .share { box-shadow: 0 2px 10px rgb(20 26 45 / .28); }
.slat:focus-visible { outline: none; }
.slat:focus-visible .share { box-shadow: 0 0 0 2px var(--to); }
`;
