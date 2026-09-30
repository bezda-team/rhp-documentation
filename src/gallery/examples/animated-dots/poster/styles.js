// The logo's look. The dots' colors are data: lit or not. Each CSS string is one slat's look; edit one and its slats restyle as you type.

// A slat of dots, clipped to the window, so dots shifted past its ends are hidden. Each dot's shadow, and a brighter dot on hover.
export const dotRow = `
.slat:horizontal { overflow-x: clip; } /* dots past the ends of the scale are hidden */
.slat:vertical { overflow-y: clip; }
.dot { box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; }
.dot:hover { box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; filter: brightness(1.2); }
`;
