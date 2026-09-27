// The alpine poster. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#13293d", muted: "#5d7285", grid: "#cad8e4", surface: "#e6eef5" };

// A climb: the peak's name and country, the route from the tent to the snow-capped summit, and its height.
export const climb = `
.peak-name { font-size: 15px; font-weight: 800; letter-spacing: -0.01em; }
.peak-name small { display: block; margin-top: 2px; font-size: 11px; font-weight: 500; color: var(--rhp-muted); }
.peak-name:horizontal { --rhp-label-gap: 14px; }
.peak-name:vertical { font-size: 10px; white-space: normal; line-height: 1.1; hyphens: auto; }
.peak-name:vertical small { display: none; }
.route { --rhp-radius: 99px; }
.route { background: linear-gradient(var(--rhp-toward-end), #d9772b, #13293d); }
.tent { width: 16px; height: 13px; border-radius: 0; background: #d9772b; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.summit { width: 24px; height: 20px; border-radius: 0; clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: linear-gradient(#fff 34%, #13293d 34%); }
.summit:horizontal { translate: -50% -60%; }
.summit:vertical { translate: -50% 30%; }
.height { font-size: 13px; font-weight: 800; font-variant-numeric: tabular-nums; }
.height:horizontal { --rhp-label-gap: 16px; }
.height:vertical { padding-bottom: 14px; font-size: 11px; }
`;
