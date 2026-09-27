// The docs' colors for rhp charts, dark and light, and v1's for the v1 replicas. A poster brings its own theme;
// these are for the plain charts and the replicas, which sit on the page.
import { createSignal } from "solid-js";

const font = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
// Series colors in a fixed order, checked for colorblind separation on each background (the docs' dark
// rgb(46, 47, 67), and white). Text and lines follow the docs' grays; a heatmap runs from the page to the rhp sand
// (dark) or to the page's ink (light).
export const DOCS_DARK = {
  series: ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"],
  positive: "#4fd18f", negative: "#ff8a7a", ink: "#c1c3c8", muted: "#8a8d96", grid: "#ffffff1a",
  surface: "#2e2f43", low: "#393b52", high: "#f2cc8f", font,
};
export const DOCS_LIGHT = {
  series: ["#2a78d6", "#eb6834", "#1baf7a", "#c2419a", "#7b5cd6", "#d39a12"],
  positive: "#13894f", negative: "#c62828", ink: "#353841", muted: "#555a63", grid: "#e3e4e8",
  surface: "#ffffff", low: "#f3f3f6", high: "#2e2f43", font,
};

// v1's demos ran on Chakra UI's defaults: its system font, #555 text and axis lines, black on hover, faint #00000011 lines.
const CHAKRA = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
export const V1_LIGHT = { font: CHAKRA, muted: "#555555", ink: "#000000", grid: "#00000011" };
export const V1_DARK = { font: CHAKRA, muted: "#b4b7c2", ink: "#ffffff", grid: "#ffffff1f" };

// Whether the docs are dark: Starlight's theme picker sets data-theme on <html> ("dark" or "light").
const root = typeof document === "undefined" ? null : document.documentElement;
const [dark, setDark] = createSignal(root?.dataset.theme !== "light");
if (root) new MutationObserver(() => setDark(root.dataset.theme !== "light")).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
export { dark };
