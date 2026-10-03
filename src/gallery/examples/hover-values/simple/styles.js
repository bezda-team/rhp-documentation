// A day: a faint band and the value, shown while you hover it. The value fades inside the Label, which keeps rhp's
// own transition.
export const slat = `
.slat:hover { background: color-mix(in srgb, var(--rhp-ink) 6%, transparent); border-radius: 6px; }
.bar { --rhp-radius: 99px; }
.value { font-weight: 700; }
.value > span { opacity: 0; transition: opacity .15s; }
.slat:hover .value > span { opacity: 1; }
`;
