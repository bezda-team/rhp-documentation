// The phone's battery screen. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#1d1d1f", muted: "#6e6e73", grid: "#dcdce1", surface: "#f5f5f7" };

// An app's share of the charge, with its number where it fits. In focus: lit, with a badge on a thin segment; out of focus: faded.
export const charge = `
.charge { display: grid; place-items: center; overflow: hidden; --rhp-radius: 4px; color: #fff; font-size: 11px; font-weight: 700; }
.charge:horizontal { height: 26px; clip-path: inset(0 1px); }
.charge:vertical { width: 62px; clip-path: inset(1px 0); }
.charge.games { color: #2a1b00; }
.charge.small > span { display: none; }
@container (max-width: 300px) { .charge.mid:horizontal > span { display: none; } } /* a narrow battery needs 16% for a number */
.charge.off { opacity: .14; }
.charge.on { overflow: visible; clip-path: none; } /* its badge may be bigger than it; the faded neighbors need no gap */
.charge.on.small > span { display: block; position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  padding: 3px 6px; border-radius: 5px; background: var(--rhp-color); box-shadow: 0 0 0 2px var(--rhp-surface); }
@container (max-width: 300px) {
  .charge.on.mid:horizontal > span { display: block; position: absolute; left: 50%; top: 50%; translate: -50% -50%;
    padding: 3px 6px; border-radius: 5px; background: var(--rhp-color); box-shadow: 0 0 0 2px var(--rhp-surface); } }
`;

// A battery: the person's name, the shell and its nub.
export const battery = `
.who { font-size: 15px; font-weight: 600; }
.who:horizontal { --rhp-label-gap: 16px; }
.shell { background: none; border: 2px solid rgb(29 29 31 / .32); --rhp-radius: 10px; }
.shell:horizontal { left: -5px; width: calc(100% + 10px); height: 36px; }
.shell:vertical { bottom: -5px; height: calc(100% + 10px); width: 72px; }
.nub { background: rgb(29 29 31 / .32); }
.nub:horizontal { width: 5px; height: 14px; translate: 7px -50%; border-radius: 0 3px 3px 0; }
.nub:vertical { height: 5px; width: 22px; translate: -50% -7px; border-radius: 3px 3px 0 0; }
`;
