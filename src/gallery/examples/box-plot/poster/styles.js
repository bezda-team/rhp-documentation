// v1's cloud box plot: its scale, and a slat per cloud. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// v1's scale: a mark and a number per tick. The first and last marks are solid; the ones between are dashed lines (marks="line") or short ticks ("tick").
export const scale = `
.mark { --rhp-tick-width: 4px; background: var(--rhp-muted); translate: none; }
.mark:horizontal { top: -16px; bottom: -12.8px; height: auto; }
.mark:vertical { left: -28px; right: -12.8px; width: auto; }
.zero > .mark:horizontal { translate: -100% 0; }
.zero > .mark:vertical { translate: 0 100%; }
.line > .mark { background: none; }
.line > .mark:horizontal { border-left: 4px dashed var(--rhp-grid); }
.line > .mark:vertical { border-top: 4px dashed var(--rhp-grid); }
.tick > .mark { background: var(--rhp-grid); }
.tick > .mark:horizontal { bottom: auto; height: 13px; }
.tick > .mark:vertical { right: auto; width: 13px; }
.num { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-muted); translate: none; --rhp-label-gap: 8px; }
.zero > .num { --rhp-label-gap: 4px; }
.num:horizontal { top: -20px; }
.num:vertical { left: -32px; }
.num.crowded { visibility: hidden; }
`;

// A cloud: its name, the whiskers and their caps, the box filled with its photo, and the top value. Hover a slat to zoom the photo out.
export const box = `
.name { font-size: 15px; font-weight: 600; line-height: 1.2; color: var(--rhp-muted); --rhp-label-gap: 16px; }
/* Standing up, a column is too narrow for a name, so the name is turned 60 degrees and reads up to its own column.
   Its right end is pinned to the middle of the column and it swings down and to the left from there.
   Its text ends 10px before that point. */
.name:vertical { left: auto; right: 50%; width: max-content; padding-inline: 0 10px; font-size: 13px; white-space: nowrap;
  text-align: right; overflow: visible; transform-origin: 100% 0; transform: rotate(-60deg); }
.whisker, .box { --rhp-radius: 0px; }
.cap { --rhp-tick-width: 4px; }
.cap:horizontal { translate: 0 -50%; }
.cap:vertical { translate: -50% 0; }
/* The box is the cloud's photo, cropped to the box, in its color's frame. */
.box { overflow: hidden; background: none; border: 4px solid var(--rhp-color); }
.box > img { display: block; width: 100%; height: 100%; margin: 0; object-fit: cover; transform: scale(1.6); transition: transform .3s; }
.value { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-color); --rhp-label-gap: 8px; }
.value:horizontal { margin-top: -1px; } /* v1: 1px above the middle */
.slat:hover .name { color: var(--rhp-ink); }
.slat:hover :is(.whisker, .cap) { background: var(--rhp-ink); }
.slat:hover .box { border-color: var(--rhp-ink); border-width: 5px; } /* the box is a frame around a photo: its color is its border */
.slat:hover .box > img { transform: scale(1.1); }
.slat:hover .cap { --rhp-tick-width: 6px; }
.slat:hover .value { color: var(--rhp-ink); }
.dim { filter: saturate(10%); }
.dim:hover { filter: saturate(110%); }
`;
