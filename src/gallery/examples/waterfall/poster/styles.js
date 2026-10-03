export const theme = { font: "system-ui, sans-serif", ink: "#1c2433", muted: "#6b7385", grid: "#edf0f4", surface: "#ffffff" };

// A step: its name (a button for an expense), its bar, the hairline to the next step, and its amount.
export const step = `
.item { font-size: 14px; font-weight: 600; }
.item:horizontal { --rhp-label-gap: 14px; }
.item:vertical { font-size: 11px; white-space: normal; line-height: 1.1; hyphens: auto; }
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
.amount:horizontal { --rhp-label-gap: 8px; }
.amount:vertical { font-size: 10.5px; }
.link { background: #b5bcc8; }
.link:horizontal { width: 1px; top: calc(50% + 12px); height: 22px; translate: -50% 0; }
.link:vertical { height: 1px; left: calc(50% + 12px); width: calc(100% - 24px); translate: 0 50%; }
`;
