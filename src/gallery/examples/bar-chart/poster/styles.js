// v1's fruit bars: its scale, and a row per fruit. Each CSS string is one slat's look; edit one and its slats restyle as you type.

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

// A fruit: its name, its bar with the art cropped inside, and its value in the fruit's color. Hover a bar to outline it.
export const fruit = `
.name { font-size: 16px; font-weight: 600; line-height: 24px; color: var(--rhp-muted); }
.name:horizontal { text-align: start; --rhp-label-gap: 0px; }
.bar { display: flex; align-items: center; overflow: hidden; --rhp-start-radius: 0px; --rhp-end-radius: 16px; }
.bar:vertical { flex-direction: column-reverse; }
.bar:hover { border: 4px solid var(--rhp-ink); }
/* The art fills the bar's length up to 300px, is never under 50px, and the bar crops it. */
.bar > img { display: block; flex: 1 1 auto; width: auto; height: auto; margin: 0; min-width: 0; min-height: 0; max-width: none; max-height: none; }
.bar:horizontal > img { min-width: 50px; max-width: 300px; }
.bar:vertical > img { min-height: 50px; max-height: 300px; }
.value { font-size: 13px; font-weight: 700; line-height: 19.5px; font-variant-numeric: normal; color: var(--rhp-color); --rhp-label-gap: 8px; }
.bar:hover ~ .value { color: var(--rhp-ink); }
.dim { filter: saturate(40%); }
.dim:hover { filter: saturate(110%); }
`;
