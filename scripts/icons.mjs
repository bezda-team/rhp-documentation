// Builds rhp's icons from its logo, the dots of src/assets/rhp-splash.svg: the logo centered on a rounded square in the
// landing page's color (#2e2f43), with room around it.
//   src/assets/rhp-icon.svg    the official icon (and the header's logo)
//   public/favicon.svg         the same icon, for the browser tab
//   public/favicon.ico         16, 32 and 48px, for browsers without SVG favicons
//   public/apple-touch-icon.png  180px on a full square (iOS rounds the corners itself)
//   public/icon-192.png, public/icon-512.png  for public/site.webmanifest
// npm run icons
import fs from "node:fs";
import { chromium } from "playwright";

const BG = "#2e2f43";
const SIZE = 512;
const WIDE = 392; // the logo's width in the icon, so 60px of room on each side
const RADIUS = 115; // the square's corners

// The dots: their centers, with the splash's own offset applied, and their radius
const splash = fs.readFileSync("src/assets/rhp-splash.svg", "utf8");
const [, ox, oy] = splash.match(/<g transform="translate\((-?[\d.]+)(-?[\d.]+)\)"/).map(Number); // "(-50.4-251.3)"
const r = Number(splash.match(/rx="([\d.]+)"/)[1]);
const dots = [...splash.matchAll(/translate\(([\d.]+) ([\d.]+)\)" fill="([^"]+)"/g)].map(([, x, y, fill]) => ({ x: +x + ox, y: +y + oy, fill }));
const left = Math.min(...dots.map((d) => d.x)) - r;
const top = Math.min(...dots.map((d) => d.y)) - r;
const width = Math.max(...dots.map((d) => d.x)) + r - left;
const height = Math.max(...dots.map((d) => d.y)) + r - top;

// The icon at SIZE: the dots scaled to WIDE and centered, with the splash's soft shadow scaled with them
function icon(rounded) {

  const k = WIDE / width;
  const dx = (SIZE - width * k) / 2;
  const dy = (SIZE - height * k) / 2;
  const n = (v) => +v.toFixed(2);
  const circles = dots.map((d) => `<circle cx="${n(dx + (d.x - left) * k)}" cy="${n(dy + (d.y - top) * k)}" r="${n(r * k)}" fill="${d.fill}"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
<defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="${n(4 * k)}" stdDeviation="${n(2 * k)} ${n(4 * k)}" flood-color="#1b1d28"/></filter></defs>
<rect width="${SIZE}" height="${SIZE}"${rounded ? ` rx="${RADIUS}"` : ""} fill="${BG}"/>
<g filter="url(#shadow)">
${circles.join("\n")}
</g>
</svg>
`;
}

const rounded = icon(true);
fs.writeFileSync("src/assets/rhp-icon.svg", rounded);
fs.writeFileSync("public/favicon.svg", rounded);

// PNGs, drawn by Chromium with a transparent page, so the rounded corners stay clear
const browser = await chromium.launch();
const page = await browser.newPage();
const png = async (svg, size) => {

  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<body style="margin:0"><img width="${size}" height="${size}" src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}"></body>`);
  await page.locator("img").evaluate((img) => img.decode());

  return page.screenshot({ omitBackground: true });
};

fs.writeFileSync("public/apple-touch-icon.png", await png(icon(false), 180));
fs.writeFileSync("public/icon-192.png", await png(rounded, 192));
fs.writeFileSync("public/icon-512.png", await png(rounded, 512));

// An .ico is a directory of images; each one here is a PNG
const sizes = [16, 32, 48];
const images = [];
for (const size of sizes) {
  images.push(await png(rounded, size));
}
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2); // an icon
head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((size, i) => {
  const at = 6 + 16 * i;
  head.writeUInt8(size, at);
  head.writeUInt8(size, at + 1);
  head.writeUInt16LE(1, at + 4); // planes
  head.writeUInt16LE(32, at + 6); // bits per pixel
  head.writeUInt32LE(images[i].length, at + 8);
  head.writeUInt32LE(offset, at + 12);
  offset += images[i].length;
});
fs.writeFileSync("public/favicon.ico", Buffer.concat([head, ...images]));

await browser.close();
console.log(`icons: ${dots.length} dots, logo ${Math.round(width)} x ${Math.round(height)} scaled to ${WIDE}px on a ${SIZE}px square`);
