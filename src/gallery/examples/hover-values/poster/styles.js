export const theme = { font: "system-ui, sans-serif", ink: "#0b2a3c", muted: "#55707f", grid: "#c3d9e3", surface: "#e3f0f5" };

// A quarter: its compass dial and needle, the gust, and the knots, which fade in when you hover the slat.
export const wind = `
.quarter { display: flex; align-items: center; gap: 10px; overflow: visible; font-size: 16px; font-weight: 700; }
.quarter:horizontal { justify-content: flex-end; padding-right: 16px; }
.quarter:vertical { flex-direction: column; gap: 6px; padding-top: 8px; font-size: 13px; }
.dial { position: relative; flex: none; width: 30px; height: 30px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgb(11 42 60 / .2); }
.needle { position: absolute; inset: 4px 11px; clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); background: linear-gradient(#ff6b4a 50%, #0b2a3c 50%); }
.gust { --rhp-radius: 99px; }
.gust { background: linear-gradient(var(--rhp-toward-end), rgb(11 42 60 / 0), #0b2a3c); }
.slat:hover .gust { background: linear-gradient(var(--rhp-toward-end), rgb(255 107 74 / 0), #ff6b4a); }
.knots { font-size: 14px; font-weight: 800; color: #ff6b4a; }
.knots > span { opacity: 0; transition: opacity .15s; }
.knots:horizontal { --rhp-label-gap: 10px; }
.slat:hover .knots > span { opacity: 1; }
`;
