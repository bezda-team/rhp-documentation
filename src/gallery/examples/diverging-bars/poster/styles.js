// Climate stripes at night. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#e8ecf2", muted: "#8b93a1", grid: "#262d39", surface: "#0d1117" };

// A month: its band tinted with its own color, its name, its bar and its value. While another month is pointed at, it fades.
export const month = `
.month { background: color-mix(in srgb, var(--heat) 16%, transparent); }
.mon { font-size: 12px; font-weight: 700; color: var(--rhp-muted); text-transform: uppercase; letter-spacing: .06em; }
.rise { --rhp-radius: 3px; }
.deg { font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums; }
.faded { opacity: .3; }
`;

// The scale: a hairline each degree, the normal (0) brighter and named.
export const normal = `
.line { background: var(--rhp-grid); --rhp-tick-width: 1px; }
.zero .line { background: var(--rhp-muted); }
.num { font-size: 10.5px; color: var(--rhp-muted); padding: 0; }
.num:horizontal { top: calc(100% + 8px); translate: -50% 0; }
.num:vertical { left: auto; right: calc(100% + 8px); translate: 0 50%; }
.zero .num { color: var(--rhp-ink); font-weight: 700; }
`;
