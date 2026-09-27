// The banking app's month. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#1c2433", muted: "#6b7385", grid: "#edf0f4", surface: "#ffffff" };

// A step: its name (a button for an expense), its bar, the hairline to the next step, and its amount. A cut expense is struck through, with a dashed outline where it was.
export const step = `
.item { font-size: 14px; font-weight: 600; }
[data-rhp-o="h"].item { padding-right: 14px; }
[data-rhp-o="v"].item { font-size: 11px; white-space: normal; line-height: 1.1; hyphens: auto; }
.item button { all: unset; cursor: pointer; border-radius: 3px; text-decoration: underline 1.5px dotted #b5bcc8; text-underline-offset: 3px; }
.item button:focus-visible { outline: 2px solid #0b8a63; outline-offset: 2px; }
.out:hover .item button { text-decoration-color: #d2423f; }
.cut .item button { color: #8a93a3; text-decoration: line-through 1.5px #d2423f; }
.step { --rhp-radius: 6px; }
.out .step, .ghost { cursor: pointer; }
.out:hover .step { box-shadow: 0 6px 12px -6px rgb(210 66 63 / .8); }
.ghost { background: none; border: 1.5px dashed #f25f5c; opacity: 0; }
.cut .ghost { opacity: .75; }
.amount { font-size: 12px; font-weight: 800; font-variant-numeric: tabular-nums; }
.in .amount { color: #0b8a63; }
.out .amount { color: #d2423f; }
.cut .amount { color: #8a93a3; text-decoration: line-through; }
[data-rhp-o="h"].amount { padding-left: 8px; }
[data-rhp-o="v"].amount { font-size: 10.5px; }
.link { background: #b5bcc8; }
[data-rhp-o="h"].link { width: 1px; top: calc(50% + 12px); height: 22px; translate: -50% 0; }
[data-rhp-o="v"].link { height: 1px; left: calc(50% + 12px); width: calc(100% - 24px); translate: 0 50%; }
`;
