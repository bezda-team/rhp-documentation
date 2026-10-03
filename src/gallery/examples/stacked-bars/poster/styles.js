export const theme = { font: "system-ui, sans-serif", ink: "#2b1b12", muted: "#8a7260", grid: "#e4d8c8", surface: "#f3ebe0" };

// A layer of a drink: espresso, steamed milk or foam, the last one rounded like the cup.
export const layer = `
.layer { --rhp-radius: 0px; }
.espresso { background: linear-gradient(var(--rhp-toward-end), #24150c, #3f2415 65%, #8d5b33); --rhp-start-radius: 12px; }
.milk { background: linear-gradient(var(--rhp-toward-end), #e6d4bb, #f5ecdf); --rhp-gap: 2px; }
.foam { background: radial-gradient(circle, #fff 1.4px, transparent 2px) 0 0 / 7px 7px, #fcf8f1; --rhp-gap: 2px; }
.end { --rhp-end-radius: 12px; }
.empty { display: none; }
.layer:hover { z-index: 1; box-shadow: 0 0 0 2px var(--rhp-surface), 0 12px 18px -8px rgb(43 27 18 / .7); }
.pour { position: absolute; left: 50%; bottom: calc(100% + 10px); display: grid; justify-items: center; gap: 3px;
  padding: 7px 11px 6px; border-radius: 9px; background: #2b1b12; color: #f3ebe0; box-shadow: 0 6px 14px -6px rgb(43 27 18 / .6);
  font: 600 10.5px/1 var(--rhp-font); letter-spacing: .05em; white-space: nowrap; pointer-events: none;
  opacity: 0; translate: -50% 5px; }
.pour b { font: italic 700 16px/1 "Fraunces Variable", Georgia, serif; letter-spacing: 0; }
.pour::after { content: ""; position: absolute; top: 100%; left: 50%; translate: -50% 0; border: 5px solid transparent; border-top-color: #2b1b12; }
/* The tag fades in but goes at once, so it never sinks behind the other layers. */
.layer:hover > .pour { opacity: 1; translate: -50% 0; transition: opacity .15s, translate .15s; }
`;

// A drink: its name in italics, the cup's shadow, and its total.
export const drink = `
.drink { font: italic 600 18px/1 "Fraunces Variable", Georgia, serif; }
.drink:horizontal { --rhp-label-gap: 16px; }
.drink:vertical { font-size: 13px; line-height: 1.1; white-space: normal; hyphens: auto; }
.ml { font-size: 11px; font-weight: 600; letter-spacing: .08em; color: var(--rhp-muted); }
.ml:horizontal { --rhp-label-gap: 10px; }
.cup { background: none; box-shadow: 0 10px 18px -12px rgb(43 27 18 / .55); --rhp-radius: 12px; }
.serving:hover { z-index: 1; } /* slats paint in data order: the drink under the pointer comes over the others */
`;
