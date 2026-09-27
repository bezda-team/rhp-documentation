// A row of dots, clipped to the window, so the dots it shifts past the ends are hidden.
export const row = `
.row:horizontal { overflow-x: clip; }
.row:vertical { overflow-y: clip; }
.dot { box-shadow: 0 2px 5px rgb(0 0 0 / .2); }
`;
