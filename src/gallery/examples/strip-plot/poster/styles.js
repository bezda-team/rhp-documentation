// The clinical trial's result card. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#0f3d3a", muted: "#5f7f7b", grid: "#d4e9e4", surface: "#f3faf8" };

// A patient: a two-tone capsule; the one pointed at, ringed in ink.
export const patient = `
.pill { width: 17px; height: 7px; border-radius: 99px;
    background: linear-gradient(90deg, var(--rhp-color) 50%, #fff 50%);
    box-shadow: 0 1px 2px rgb(15 61 58 / .25), inset 0 0 0 1px rgb(15 61 58 / .14); }
.picked { z-index: 1; box-shadow: 0 0 0 2px var(--rhp-surface), 0 0 0 4px var(--rhp-ink); }
`;

// An arm of the trial: its name, the average's line and its number. While another arm is pointed at, it fades.
export const arm = `
.arm { font-size: 15px; font-weight: 700; }
.arm:horizontal { --rhp-label-gap: 14px; }
.mean { background: var(--rhp-ink); --rhp-tick-width: 3px; border-radius: 2px; }
.avg { font-size: 12px; font-weight: 700; color: var(--rhp-ink); }
.avg small { display: block; font-size: 10.5px; font-weight: 500; color: var(--rhp-muted); }
.avg:horizontal { --rhp-label-gap: 12px; }
.faded { opacity: .3; }
`;
