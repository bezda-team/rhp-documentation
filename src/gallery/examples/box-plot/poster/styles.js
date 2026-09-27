// v1's cloud box plot: its scale, and a row per cloud. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// v1's scale: a mark and a number per tick. The first and last marks are solid; the ones between are dashed lines (marks="line") or short ticks ("tick").
export const scale = `
.mark { --rhp-tick-width: 4px; background: var(--rhp-muted); translate: none; }
[data-rhp-o="h"].mark { top: -16px; bottom: -12.8px; height: auto; }
[data-rhp-o="v"].mark { left: -16px; right: -12.8px; width: auto; }
.zero > [data-rhp-o="h"].mark { translate: -100% 0; }
.zero > [data-rhp-o="v"].mark { translate: 0 100%; }
.line > .mark { background: none; }
.line > [data-rhp-o="h"].mark { border-left: 4px dashed var(--rhp-grid); }
.line > [data-rhp-o="v"].mark { border-top: 4px dashed var(--rhp-grid); }
.tick > .mark { background: var(--rhp-grid); }
.tick > [data-rhp-o="h"].mark { bottom: auto; height: 13px; }
.tick > [data-rhp-o="v"].mark { right: auto; width: 13px; }
.num { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-muted); translate: none; padding: 0; }
[data-rhp-o="h"].num { top: -20px; padding-left: 8px; }
.zero > [data-rhp-o="h"].num { padding-left: 4px; }
[data-rhp-o="v"].num { left: -20px; bottom: calc(var(--rhp-p) * 100% + 8px); }
.zero > [data-rhp-o="v"].num { bottom: calc(var(--rhp-p) * 100% + 4px); }
/* On a narrow plot a number close to the max would run into it, so it fades out below 30px from the end.
   tan(atan2(x, 1px)) is the length x as a plain number of px; 100cqw is the plot's length (horizontal). */
.line > [data-rhp-o="h"].num, .tick > [data-rhp-o="h"].num { opacity: clamp(0, tan(atan2((1 - var(--rhp-p)) * 100cqw - 30px, 1px)), 1); }
`;

// A cloud: its photo in a circle, the whiskers and their caps, the box with the name inside, and the top value. Hover a row to zoom the photo.
export const box = `
.photo { display: flex; align-items: center; justify-content: center; padding: 0; overflow: visible; }
[data-rhp-o="h"].photo { top: 8px; bottom: 8px; translate: none; }
[data-rhp-o="v"].photo { height: var(--rhp-room-start); }
.circle { flex: none; aspect-ratio: 1; border-radius: 50%; border: 4px solid var(--rhp-grid); overflow: hidden; }
[data-rhp-o="h"] > .circle { height: 100%; }
[data-rhp-o="v"] > .circle { width: min(63px, 100% - 16px); }
.circle > img { display: block; width: 100%; height: 100%; margin: 0; object-fit: cover; transform: scale(5); }
.whisker, .box { --rhp-radius: 0px; }
.cap { --rhp-tick-width: 4px; }
[data-rhp-o="h"].cap { translate: 0 -50%; }
[data-rhp-o="v"].cap { translate: -50% 0; }
.box { display: flex; align-items: center; justify-content: center; overflow: hidden; background: none;
  border: 4px solid var(--rhp-color); color: var(--rhp-color); font-size: 16px; line-height: 24px; white-space: nowrap; }
[data-rhp-o="v"].box > span { writing-mode: vertical-rl; rotate: 180deg; }
.value { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-color); }
[data-rhp-o="h"].value { padding-left: 8px; margin-top: -1px; } /* v1: 1px above the middle */
[data-rhp-o="v"].value { padding-bottom: 8px; }
.slat:hover .circle { border: 5px solid var(--rhp-muted); }
.slat:hover .circle > img { transform: scale(1.5); }
.slat:hover .box { border: 5px solid var(--rhp-muted); color: var(--rhp-muted); font-weight: 500; }
.slat:hover :is(.whisker, .cap) { background: var(--rhp-muted); }
.slat:hover .cap { --rhp-tick-width: 6px; }
.slat:hover .value { color: var(--rhp-ink); }
.dim { filter: saturate(10%); }
.dim:hover { filter: saturate(110%); }
`;
