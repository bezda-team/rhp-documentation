// A day: a faint band and the value, both shown only while you hover it. The value fades in (inside the
// Label: a transition on the Label itself would replace the one rhp gives it).
export const slat = `
.slat:hover { background: color-mix(in srgb, var(--rhp-ink) 6%, transparent); border-radius: 6px; }
.bar { --rhp-radius: 99px; }
.value { font-weight: 700; }
.value > span { opacity: 0; transition: opacity .15s; }
.slat:hover .value > span { opacity: 1; }
`;
