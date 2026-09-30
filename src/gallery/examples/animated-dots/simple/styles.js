// A slat of dots, clipped to the window, so the dots it shifts past the ends are hidden.
export const row = `
.slat:horizontal { overflow-x: clip; }
.slat:vertical { overflow-y: clip; }
.dot { box-shadow: 0 2px 5px rgb(0 0 0 / .2); }
`;
