// A stage: a pale track, the arc in the first series color, and the share at its end.
export const stage = `
@property --swept { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

.slat {
  --outer: 140px;
  --step: 34px;
  --band: 20px;
  --r: calc(var(--outer) - var(--rhp-position) * var(--step));
  --mid: calc((var(--rhp-n) / 2 - var(--rhp-position)) * 100%);
  --ring: radial-gradient(farthest-side, #0000 calc(100% - var(--band)), #000 0);
}
.track { position: absolute; }

/* Upright: the arc sweeps 270 degrees counterclockwise from nine o'clock, and a mask turns the disc into a ring. */
.slat:vertical :is(.track, .arc) {
  left: var(--mid); top: 50%; bottom: auto;
  width: calc(var(--r) * 2); height: calc(var(--r) * 2);
  translate: -50% -50%; border-radius: 50%; mask: var(--ring);
}
/* --swept has to be registered as an angle (above) or the arc jumps instead of moving. */
.slat:vertical .arc { --swept: calc(var(--rhp-hi) * 270deg); transition: --swept .6s ease-out;
  background: conic-gradient(from calc(270deg - var(--swept)), var(--rhp-series-1) 0 var(--swept), #0000 0); }
.slat:vertical .share { left: var(--mid); top: 50%; bottom: auto; translate: -50% -50%; transition: transform .6s ease-out;
  transform: rotate(calc(var(--rhp-p) * -270deg)) translateX(calc(-7px - var(--r))) rotate(calc(var(--rhp-p) * 270deg)); padding: 0; }
.slat:vertical .name { left: var(--mid); top: 50%; bottom: auto; translate: -50% -50%;
  transform: translate(calc(var(--band) / 2 - var(--r)), calc(var(--rhp-position) * -15px - 16px)); padding: 0; font-size: 10px; }

/* Flat: rhp places the bar itself, so there is nothing to work out. */
.slat:horizontal :is(.track, .arc) { height: var(--band); border-radius: 99px; }
.slat:horizontal .track { left: 0; right: 0; top: 50%; translate: 0 -50%; }
.slat:horizontal .arc { background: var(--rhp-series-1); }
.slat:horizontal .name { padding-left: 12px; font-size: 11px; color: var(--rhp-surface); }

.track { background: var(--rhp-grid); }
.share { font-weight: 700; }
`;
