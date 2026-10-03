export const theme = { font: "system-ui, sans-serif", ink: "#13293d", muted: "#5d7285", grid: "#cad8e4", surface: "#e6eef5" };

// A climb: the peak's name and country, the route from the tent to the summit, and its height (or its climb).
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
.gain { padding: 0; }
.gain > span { display: block; font-size: 11px; font-weight: 800; font-variant-numeric: tabular-nums; }
.gain:horizontal { translate: -50% 9px; }
.gain:vertical { translate: -50% 50%; rotate: -90deg; }
.gain:vertical > span { padding: 2px 8px; border-radius: 99px; background: #fff; box-shadow: 0 0 0 1.5px #d9772b; font-size: 12px; }
.height > span, .gain > span { transition: opacity .3s, visibility .3s; }
.gain > span, .by-climb .height > span { opacity: 0; visibility: hidden; }
.by-climb .gain > span { opacity: 1; visibility: visible; }
`;
