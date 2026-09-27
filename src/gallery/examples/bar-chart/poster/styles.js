// v1's fruit bars: its scale, and a row per fruit. Each CSS string is one slat's look; edit one and its slats restyle as you type.

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
.num.crowded { visibility: hidden; }
`;

// A fruit: its name, its bar with the art cropped inside, and its value in the fruit's color. Hover a bar to outline it.
export const fruit = `
.name { font-size: 16px; font-weight: 600; line-height: 24px; color: var(--rhp-muted); }
[data-rhp-o="h"].name { text-align: center; padding: 0; }
.bar { display: flex; align-items: center; overflow: hidden; }
[data-rhp-o="h"].bar { border-radius: 0 16px 16px 0; }
[data-rhp-o="v"].bar { border-radius: 16px 16px 0 0; flex-direction: column-reverse; }
.bar:hover { border: 4px solid var(--rhp-ink); }
/* The art fills the bar's length up to 300px, is never under 50px, and the bar crops it. */
.bar > img { display: block; flex: 1 1 auto; width: auto; height: auto; margin: 0; min-width: 0; min-height: 0; max-width: none; max-height: none; }
[data-rhp-o="h"].bar > img { min-width: 50px; max-width: 300px; }
[data-rhp-o="v"].bar > img { min-height: 50px; max-height: 300px; }
.value { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-color); }
[data-rhp-o="h"].value { padding-left: 8px; }
[data-rhp-o="v"].value { padding-bottom: 8px; }
.bar:hover ~ .value { color: var(--rhp-ink); }
.dim { filter: saturate(40%); }
.dim:hover { filter: saturate(110%); }
`;
