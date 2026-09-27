// A bin: a bar with a hairline gap from its neighbors, lighter under the pointer.
export const bin = `
.bar { --rhp-radius: 3px 3px 0 0; }
[data-rhp-o="h"].bar { --rhp-radius: 0 3px 3px 0; }
.bin:hover .bar { filter: brightness(1.15); }
.edge { font-size: 11px; color: var(--rhp-muted); }
`;
