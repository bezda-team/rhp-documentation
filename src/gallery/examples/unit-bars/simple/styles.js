// A unit: a rounded block with a gap before the next one.
export const unit = `
.unit { --rhp-radius: 4px; }
[data-rhp-o="h"].unit { clip-path: inset(0 2px round 4px); }
[data-rhp-o="v"].unit { clip-path: inset(2px 0 round 4px); }
`;

// A day: its count in bold past the last unit.
export const day = `
.count { font-weight: 700; }
`;
