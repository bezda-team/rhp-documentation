// The harbour's weather board. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#0b2a3c", muted: "#55707f", grid: "#c3d9e3", surface: "#e3f0f5" };

// A quarter: its compass dial and needle, the gust, and the knots, which fade in when you hover the row.
export const wind = `
.quarter { display: flex; align-items: center; gap: 10px; overflow: visible; font-size: 16px; font-weight: 700; }
[data-rhp-o="h"].quarter { justify-content: flex-end; padding-right: 16px; }
[data-rhp-o="v"].quarter { flex-direction: column; gap: 6px; padding-top: 8px; font-size: 13px; }
.dial { position: relative; flex: none; width: 30px; height: 30px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgb(11 42 60 / .2); }
.needle { position: absolute; inset: 4px 11px; clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); background: linear-gradient(#ff6b4a 50%, #0b2a3c 50%); }
.gust { --rhp-radius: 99px; }
[data-rhp-o="h"].gust { background: linear-gradient(90deg, rgb(11 42 60 / 0), #0b2a3c); }
[data-rhp-o="v"].gust { background: linear-gradient(0deg, rgb(11 42 60 / 0), #0b2a3c); }
[data-rhp-o="h"].slat:hover .gust, .slat:hover > [data-rhp-o="h"].gust { background: linear-gradient(90deg, rgb(255 107 74 / 0), #ff6b4a); }
.slat:hover > [data-rhp-o="v"].gust { background: linear-gradient(0deg, rgb(255 107 74 / 0), #ff6b4a); }
.knots { font-size: 14px; font-weight: 800; color: #ff6b4a; }
.knots > span { opacity: 0; transition: opacity .15s; }
[data-rhp-o="h"].knots { padding-left: 10px; }
.slat:hover .knots > span { opacity: 1; }
`;
