// Random data for the examples (not part of rhp).
export const rand = (a, b) => a + Math.random() * (b - a);
export const normal = (m, s) => m + s * Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
// n samples of a normal truncated to lo..hi, for points that must stay on the scale (rhp clips spans, not points)
export const normalsIn = (n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(m, s); if (v >= lo && v <= hi) return v; } });
export const sum = (a) => a.reduce((x, y) => x + y, 0);

// The same three, for an example whose data is random from the start: random(p.seed()).
// With seed 0, the data an example opens with, they give the same numbers on every load, so the example always opens
// as its picture in the gallery shows it. After New data they are random.
export function random(seed) {
  let s = 2026;
  const next = seed ? Math.random : () => { // mulberry32, a small generator that gives the same numbers from the same start
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rand = (a, b) => a + next() * (b - a);
  const normal = (m, s) => m + s * Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(2 * Math.PI * next());
  const normalsIn = (n, lo, hi, m, s) => Array.from({ length: n }, () => { for (;;) { const v = normal(m, s); if (v >= lo && v <= hi) return v; } });
  return { rand, normal, normalsIn };
}
