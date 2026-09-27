// A bin: a bar with a hairline gap from its neighbors, lighter under the pointer.
export const bin = `
.bar { --rhp-start-radius: 0px; --rhp-end-radius: 3px; }
.bin:hover .bar { filter: brightness(1.15); }
.edge { font-size: 11px; color: var(--rhp-muted); }
`;
