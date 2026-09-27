// v1's cloud box plot: its scale, and a row per cloud. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// v1's scale: a mark and a number per tick. The first and last marks are solid; the ones between are dashed lines (marks="line") or short ticks ("tick").
export const scale = `
.mark { --rhp-tick-width: 4px; background: var(--rhp-muted); translate: none; }
.mark:horizontal { top: -16px; bottom: -12.8px; height: auto; }
.mark:vertical { left: -16px; right: -12.8px; width: auto; }
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
.num:vertical { left: -20px; }
.num.crowded { visibility: hidden; }
`;

// A cloud: its photo in a circle, the whiskers and their caps, the box with the name inside, and the top value. Hover a row to zoom the photo.
export const box = `
.photo { display: flex; align-items: center; justify-content: center; padding: 0; overflow: visible; }
.photo:horizontal { top: 8px; bottom: 8px; translate: none; }
.photo:vertical { height: var(--rhp-room-start); }
.circle { flex: none; aspect-ratio: 1; border-radius: 50%; border: 4px solid var(--rhp-grid); overflow: hidden; }
.photo:horizontal > .circle { height: 100%; }
.photo:vertical > .circle { width: min(63px, 100% - 16px); }
.circle > img { display: block; width: 100%; height: 100%; margin: 0; object-fit: cover; transform: scale(5); }
.whisker, .box { --rhp-radius: 0px; }
.cap { --rhp-tick-width: 4px; }
.cap:horizontal { translate: 0 -50%; }
.cap:vertical { translate: -50% 0; }
.box { display: flex; align-items: center; justify-content: center; overflow: hidden; background: none;
  border: 4px solid var(--rhp-color); color: var(--rhp-color); font-size: 16px; line-height: 24px; white-space: nowrap; }
.box:vertical > span { writing-mode: vertical-rl; rotate: 180deg; }
.value { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-color); --rhp-label-gap: 8px; }
.value:horizontal { margin-top: -1px; } /* v1: 1px above the middle */
.slat:hover .circle { border: 5px solid var(--rhp-muted); }
.slat:hover .circle > img { transform: scale(1.5); }
.slat:hover .box { border: 5px solid var(--rhp-muted); color: var(--rhp-muted); font-weight: 500; }
.slat:hover :is(.whisker, .cap) { background: var(--rhp-muted); }
.slat:hover .cap { --rhp-tick-width: 6px; }
.slat:hover .value { color: var(--rhp-ink); }
.dim { filter: saturate(10%); }
.dim:hover { filter: saturate(110%); }
`;
