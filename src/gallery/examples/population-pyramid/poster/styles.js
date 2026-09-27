// The census poster. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#1f2933", muted: "#687482", grid: "#e2ddd3", surface: "#f4f1ea" };

// An age band: men and women rounded toward the outside, the age on the spine, and each share at its end.
export const age = `
[data-rhp-o="h"].men { border-radius: 99px 3px 3px 99px; }
[data-rhp-o="h"].women { border-radius: 3px 99px 99px 3px; }
[data-rhp-o="v"].men { border-radius: 3px 3px 99px 99px; }
[data-rhp-o="v"].women { border-radius: 99px 99px 3px 3px; }
.age { padding: 0; font-size: 11px; font-weight: 800; letter-spacing: .02em; }
[data-rhp-o="h"].age { translate: -50% -50%; }
[data-rhp-o="v"].age { translate: -50% 50%; }
.pct { font-size: 11px; color: var(--rhp-muted); font-variant-numeric: tabular-nums; }
`;
