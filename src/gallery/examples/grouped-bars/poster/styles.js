// The medal table. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#111214", muted: "#6d6a63", grid: "#e4ddd0", surface: "#f7f3ec" };

// A count: a ribbon fading up to its medal. The medal's face lifts on hover, with a springy ease.
export const medal = `
.ribbon { --rhp-radius: 2px; }
[data-rhp-o="h"].ribbon { background: linear-gradient(90deg, transparent, var(--metal)); }
[data-rhp-o="v"].ribbon { background: linear-gradient(0deg, transparent, var(--metal)); }
.medal { background: none; }
.face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 50%;
  font: 800 11px/1 var(--rhp-font); font-variant-numeric: tabular-nums; color: var(--stamp);
  background: radial-gradient(circle at 30% 26%, var(--shine), var(--metal) 46%, var(--edge));
  box-shadow: 0 1px 2px rgb(0 0 0 / .28), inset 0 0 0 2px rgb(255 255 255 / .28);
  transition: scale .3s cubic-bezier(.3, 1.6, .5, 1), translate .3s cubic-bezier(.3, 1.6, .5, 1), box-shadow .3s; }
.count:hover { z-index: 1; }
.count:hover .face { scale: 1.45; translate: 0 -4px; box-shadow: 0 10px 14px -5px rgb(0 0 0 / .45), inset 0 0 0 2px rgb(255 255 255 / .45); }
.count:hover .ribbon { filter: saturate(1.5); }
.gold { --metal: #e0b43f; --shine: #fff4c4; --edge: #a87a14; --stamp: #3f2c02; }
.silver { --metal: #bfc5cb; --shine: #ffffff; --edge: #858d95; --stamp: #22272c; }
.bronze { --metal: #cf8a55; --shine: #ffe2c9; --edge: #8a4b23; --stamp: #2e1405; }
`;

// A team: its name in condensed capitals, and its medal count below.
export const team = `
.team { font: 700 22px/1 "Barlow Condensed", "Arial Narrow", sans-serif; letter-spacing: .03em; text-transform: uppercase; }
.team small { display: block; margin-top: 3px; font: 500 11px/1 var(--rhp-font); letter-spacing: .06em; text-transform: none; color: var(--rhp-muted); }
[data-rhp-o="h"].team { padding-right: 14px; }
[data-rhp-o="v"].team { font-size: 18px; }
`;
