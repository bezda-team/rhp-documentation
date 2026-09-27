// A watch face at night. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#f5f5f7", muted: "#8e8e93", grid: "#1f1f24", surface: "#0a0a0c" };

// A goal: its icon and name, the track, the glowing progress, the white goal line and the percentage. Hover it for a bubble with the amount.
export const goal = `
.habit { display: flex; align-items: center; gap: 10px; overflow: visible; font-size: 15px; font-weight: 700; }
.habit:horizontal { justify-content: flex-end; padding-right: 18px; }
.habit:vertical { flex-direction: column; gap: 4px; padding-top: 10px; font-size: 12px; text-align: center; }
.habit small { display: block; font-size: 11px; font-weight: 500; color: var(--rhp-muted); }
.icon { flex: none; width: 30px; height: 30px; padding: 6px; border-radius: 50%; fill: var(--rhp-color);
  background: color-mix(in srgb, var(--rhp-color) 18%, transparent); }
.track { background: #1c1c22; --rhp-radius: 99px; }
.done { --rhp-radius: 99px; box-shadow: 0 0 14px color-mix(in srgb, var(--rhp-color) 55%, transparent); }
.done { background: linear-gradient(var(--rhp-toward-end), color-mix(in srgb, var(--rhp-color) 25%, transparent), var(--rhp-color)); }
.goal { background: #fff; --rhp-tick-width: 2px; border-radius: 2px; }
.pct { font-size: 14px; font-weight: 800; font-variant-numeric: tabular-nums; }
.pct:horizontal { --rhp-label-gap: 14px; }
.row:hover .done { box-shadow: 0 0 24px 2px color-mix(in srgb, var(--rhp-color) 80%, transparent); filter: brightness(1.2); }
.row:hover .icon { background: color-mix(in srgb, var(--rhp-color) 34%, transparent); }
.tip { width: 0; height: 0; padding: 0; translate: none; } /* a point at the tip of the progress; the bubble hangs from it */
.tip > span { position: absolute; left: 0; bottom: 14px; padding: 5px 9px; border-radius: 99px; background: var(--rhp-color); color: #0a0a0c;
  font-size: 11.5px; font-weight: 800; box-shadow: 0 0 16px color-mix(in srgb, var(--rhp-color) 60%, transparent);
  opacity: 0; translate: -50% 4px; transition: opacity .15s, translate .15s; }
.row:hover .tip > span { opacity: 1; translate: -50% 0; }
.row:hover .pct { opacity: 0; } /* the bubble can reach the end gutter */
`;
