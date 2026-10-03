export const theme = { font: "system-ui, sans-serif", ink: "#141414", muted: "#77736d", grid: "#e7e4de", surface: "#fbfaf7" };

// The months: every other one shaded, each named at its start (every other one on a narrow plot).
export const monthBand = `
.band { background: none; --rhp-radius: 0px; }
.odd .band { background: rgb(20 20 20 / .035); }
.band:horizontal { top: 0; height: 100%; translate: none; }
.band:vertical { left: 0; width: 100%; translate: none; }
.month { font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--rhp-muted); padding: 0; }
.month:horizontal { top: -20px; translate: 6px 0; }
.month:vertical { left: -34px; translate: 0 -4px; }
@container (max-width: 360px) { .odd > .month:horizontal { display: none; } } /* a narrow plot names every other month */
`;

// A trade: its name and weeks, the job in gray and the part done in orange.
export const trade = `
.trade { font-size: 14px; font-weight: 700; }
.trade small { display: block; font-size: 10.5px; font-weight: 500; color: var(--rhp-muted); }
.trade:horizontal { --rhp-label-gap: 14px; }
.trade:vertical { font-size: 10px; white-space: normal; line-height: 1.1; hyphens: auto; }
.trade:vertical small { display: none; }
.job { background: #d8d5cf; --rhp-radius: 99px; }
.done { background: #ff5a1f; --rhp-radius: 99px; }
.slat:hover .job { background: #c4c0b8; }
.slat:hover .trade { color: #ff5a1f; }
.dim, .weeks { visibility: hidden; }
.slat:hover :is(.dim, .weeks) { visibility: visible; }
.dim { background: var(--rhp-ink); --rhp-radius: 0px; }
.dim:horizontal { translate: 0 -13px; }
.dim:vertical { translate: 13px 0; }
.dim::before, .dim::after { content: ""; position: absolute; background: var(--rhp-ink); }
.dim:horizontal::before, .dim:horizontal::after { top: -4px; width: 1px; height: 9px; }
.dim:horizontal::before { left: 0; } .dim:horizontal::after { right: 0; }
.dim:vertical::before, .dim:vertical::after { left: -4px; height: 1px; width: 9px; }
.dim:vertical::before { bottom: 0; } .dim:vertical::after { top: 0; }
.weeks { padding: 0 4px; font-size: 10.5px; font-weight: 800; letter-spacing: .06em; background: var(--rhp-surface); }
.weeks:horizontal { translate: -50% calc(-50% - 13px); } /* on the line, breaking it, as on a drawing */
.weeks:vertical { left: calc(50% + 13px); translate: -50% 50%; }
`;

// Today: an orange line, named below the plot (horizontal) or at its end (vertical).
export const today = `
.now { background: #ff5a1f; --rhp-tick-width: 2px; } .now-label { font-size: 10.5px; font-weight: 800; letter-spacing: .08em; color: #ff5a1f; padding: 0; }
    .now-label:horizontal { top: calc(100% + 6px); translate: -50% 0; } .now-label:vertical { left: auto; right: 4px; translate: 0 -2px; }
`;
