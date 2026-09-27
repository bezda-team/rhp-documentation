// The architect's drawing sheet. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#141414", muted: "#77736d", grid: "#e7e4de", surface: "#fbfaf7" };

// The months: every other one shaded, each named at its start (every other one on a narrow plot).
export const monthBand = `
.band { background: none; --rhp-radius: 0px; }
.odd .band { background: rgb(20 20 20 / .035); }
[data-rhp-o="h"].band { top: 0; height: 100%; translate: none; }
[data-rhp-o="v"].band { left: 0; width: 100%; translate: none; }
.month { font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--rhp-muted); padding: 0; }
[data-rhp-o="h"].month { top: -20px; translate: 6px 0; }
[data-rhp-o="v"].month { left: -34px; translate: 0 -4px; }
@container (max-width: 360px) { .odd > [data-rhp-o="h"].month { display: none; } } /* a narrow plot names every other month */
`;

// A trade: its name and weeks, the job in gray and the part done in site orange. Hover it for a dimension line with its length.
export const trade = `
.trade { font-size: 14px; font-weight: 700; }
.trade small { display: block; font-size: 10.5px; font-weight: 500; color: var(--rhp-muted); }
[data-rhp-o="h"].trade { padding-right: 14px; }
[data-rhp-o="v"].trade { font-size: 10px; white-space: normal; line-height: 1.1; hyphens: auto; }
[data-rhp-o="v"].trade small { display: none; }
.job { background: #d8d5cf; --rhp-radius: 99px; }
.done { background: #ff5a1f; --rhp-radius: 99px; }
.row:hover .job { background: #c4c0b8; }
.row:hover .trade { color: #ff5a1f; }
.dim, .weeks { visibility: hidden; }
.row:hover :is(.dim, .weeks) { visibility: visible; }
.dim { background: var(--rhp-ink); --rhp-radius: 0px; }
[data-rhp-o="h"].dim { translate: 0 -13px; }
[data-rhp-o="v"].dim { translate: 13px 0; }
.dim::before, .dim::after { content: ""; position: absolute; background: var(--rhp-ink); }
[data-rhp-o="h"].dim::before, [data-rhp-o="h"].dim::after { top: -4px; width: 1px; height: 9px; }
[data-rhp-o="h"].dim::before { left: 0; } [data-rhp-o="h"].dim::after { right: 0; }
[data-rhp-o="v"].dim::before, [data-rhp-o="v"].dim::after { left: -4px; height: 1px; width: 9px; }
[data-rhp-o="v"].dim::before { bottom: 0; } [data-rhp-o="v"].dim::after { top: 0; }
.weeks { padding: 0 4px; font-size: 10.5px; font-weight: 800; letter-spacing: .06em; background: var(--rhp-surface); }
[data-rhp-o="h"].weeks { translate: -50% calc(-50% - 13px); } /* on the line, breaking it, as on a drawing */
[data-rhp-o="v"].weeks { left: calc(50% + 13px); translate: -50% 50%; }
`;

// Today: an orange line, named below the plot (horizontal) or at its end (vertical).
export const today = `
.now { background: #ff5a1f; --rhp-tick-width: 2px; } .now-label { font-size: 10.5px; font-weight: 800; letter-spacing: .08em; color: #ff5a1f; padding: 0; }
    [data-rhp-o="h"].now-label { top: calc(100% + 6px); translate: -50% 0; } [data-rhp-o="v"].now-label { left: auto; right: 4px; translate: 0 -2px; }
`;
