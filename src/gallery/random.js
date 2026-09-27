// Random data for the examples (not part of rhp).
export const rand = (a, b) => a + Math.random() * (b - a);
export const normal = (m, s) => m + s * Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
// n samples of a normal truncated to lo..hi, for points that must stay on the scale (rhp clips spans, not points)
export const normalsIn = (n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(m, s); if (v >= lo && v <= hi) return v; } });
export const sum = (a) => a.reduce((x, y) => x + y, 0);
