// The concert programme. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#f3e9d2", muted: "#a89a80", grid: "#26221c", surface: "#121110" };

// The keyboard: a key per semitone, the C's named. Keys in the pointed-at instrument's range light up in its varnish.
export const key = `
.key { --rhp-radius: 0 0 3px 3px; background: #efe6d2; }
.black .key { background: #1b1916; box-shadow: inset 0 0 0 1px #3a342b; }
.key:horizontal { top: calc(100% + 6px); height: 24px; translate: none; clip-path: inset(0 .5px); }
.key:vertical { left: auto; right: calc(100% + 6px); width: 24px; translate: none; clip-path: inset(.5px 0); --rhp-radius: 3px 0 0 3px; }
.c { font-size: 10px; font-weight: 700; color: var(--rhp-muted); padding: 0; }
.c:horizontal { top: calc(100% + 34px); translate: -2px 0; }
.c:vertical { left: auto; right: calc(100% + 34px); translate: 0 50%; }
.lit.white .key { background: color-mix(in oklab, var(--tint), white 45%); }
.lit.black .key { background: var(--tint); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--tint), black 35%); }
.lit .c { color: color-mix(in oklab, var(--tint), white 55%); }
`;

// An instrument: its name, its body, the string between the quartiles and the median. The one pointed at glows; the others fade.
export const instrument = `
.name { font: italic 600 17px/1 "Fraunces Variable", Georgia, serif; }
.name:horizontal { --rhp-label-gap: 16px; }
.name:vertical { font-size: 14px; }
.body { fill: var(--rhp-color); stroke: rgb(0 0 0 / .5); stroke-width: 1px; }
.string { background: var(--rhp-ink); opacity: .85; }
.median { background: var(--rhp-ink); box-shadow: 0 0 0 2px var(--rhp-color); }
.on .body { filter: brightness(1.2) drop-shadow(0 0 10px color-mix(in srgb, var(--rhp-color) 60%, transparent)); }
.off { opacity: .3; }
`;
