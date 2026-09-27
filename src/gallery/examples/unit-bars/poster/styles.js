// The bookshop's shelf card. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// The chart's theme: its text and line colors, its surface and its font.
export const theme = { font: "system-ui, sans-serif", ink: "#2a2118", muted: "#7d6b58", grid: "#e8dcc8", surface: "#f7f1e6" };

// A book: a spine with two bands, standing (horizontal) or lying (vertical). Hover it and it slides half out.
export const spine = `
.spine { background: none; }
[data-rhp-o="h"].spine { top: auto; bottom: 0; translate: none; }
.book { position: absolute; border-radius: 2px; background-color: var(--rhp-color);
  transition: translate .25s cubic-bezier(.2, .9, .3, 1.15), box-shadow .25s; }
[data-rhp-o="h"] > .book { inset: 0 1px;
  background-image: linear-gradient(transparent 9%, rgb(255 255 255 / .4) 9% 11%, transparent 11% 89%, rgb(255 255 255 / .4) 89% 91%, transparent 91%); }
[data-rhp-o="v"] > .book { inset: 1px 0;
  background-image: linear-gradient(90deg, transparent 9%, rgb(255 255 255 / .4) 9% 11%, transparent 11% 89%, rgb(255 255 255 / .4) 89% 91%, transparent 91%); }
.spine:hover { z-index: 1; }
[data-rhp-o="h"].spine:hover > .book { translate: 0 -12px; box-shadow: 0 8px 10px -6px rgb(42 33 24 / .45); }
[data-rhp-o="v"].spine:hover > .book { translate: 14px 0; box-shadow: -6px 4px 10px -6px rgb(42 33 24 / .45); }
`;

// A shelf: its wooden edge, the genre, and the count of books.
export const shelf = `
.shelf { border-bottom: 5px solid #c79f72; }
.genre { font: 600 17px/1 "Fraunces Variable", Georgia, serif; }
[data-rhp-o="h"].genre { padding-right: 16px; }
.count { font: 800 18px/1 "Fraunces Variable", Georgia, serif; }
.count small { display: block; margin-top: 1px; font: 500 11px/1 var(--rhp-font); color: var(--rhp-muted); }
[data-rhp-o="h"].count { padding-left: 10px; }
`;
