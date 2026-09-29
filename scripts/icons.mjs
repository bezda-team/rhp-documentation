// Builds rhp's icons from its logo, the dots of src/assets/rhp-splash.svg: the logo centered on a rounded square in the
// landing page's color (#2e2f43), with room around it. The favicons, drawn at 16 to 48px, show the logo's r alone,
// since the whole word is too small to read there, and have a white outline, so the dark square stands out on a dark
// tab bar.
//   src/assets/rhp-icon.svg    the official icon
//   src/assets/rhp-logo.svg    the logo alone, with no square behind it (the header's)
//   src/assets/rhp-hero.svg    the splash without its shadow filter (the landing page's; its CSS draws the shadow)
//   src/assets/rhp-logo-light.svg, src/assets/rhp-hero-light.svg  the same two in the darker gold of light mode
//   public/favicon-rhp.svg     the r, for the browser tab (a new name, so no cache still holds Starlight's default)
//   public/favicon.svg         the same, for pages a browser cached when they still linked this name
//   public/favicon-rhp-16.png, public/favicon-rhp-32.png  the r as PNGs, which Safari reads when it skips an SVG
//   public/favicon.ico         the r at 16, 32 and 48px, for browsers that ask for /favicon.ico
//   public/apple-touch-icon.png  180px on a full square (iOS rounds the corners itself)
//   public/icon-192.png, public/icon-512.png  for public/site.webmanifest
// npm run icons
import fs from "node:fs";
import { chromium } from "playwright";

const BG = "#2e2f43";
// The dots' gold, and the same gold darkened for light mode, where it sits on white instead of the dark page
// (1.52:1 against white, against 2.60:1 for the darker one). The site's accent follows it: --sl-color-text-accent
// and --gallery-accent in src/customizations/styles.
const GOLD = "#f2cc8f";
const GOLD_LIGHT = "#db9119";
const inLight = (svg) => svg.split(GOLD).join(GOLD_LIGHT);
const SIZE = 512;
const RADIUS = 115; // the square's corners
const OUTLINE = 16; // the favicons' white outline, along the square's very edge: half a pixel at 16px

// The dots: their centers, with the splash's own offset applied, and their radius
const splash = fs.readFileSync("src/assets/rhp-splash.svg", "utf8");
const [, ox, oy] = splash.match(/<g transform="translate\((-?[\d.]+)(-?[\d.]+)\)"/).map(Number); // "(-50.4-251.3)"
const r = Number(splash.match(/rx="([\d.]+)"/)[1]);
const dots = [...splash.matchAll(/translate\(([\d.]+) ([\d.]+)\)" fill="([^"]+)"/g)].map(([, x, y, fill]) => ({ x: +x + ox, y: +y + oy, fill }));

// A mark: some of the dots, and the box around them
function mark(list) {

  const left = Math.min(...list.map((d) => d.x)) - r;
  const top = Math.min(...list.map((d) => d.y)) - r;

  return { dots: list, left, top, width: Math.max(...list.map((d) => d.x)) + r - left, height: Math.max(...list.map((d) => d.y)) + r - top };
}

const LOGO = mark(dots);
const R = mark(dots.filter((d) => d.x < LOGO.left + 300)); // the r: the first three columns of dots

// The icon at SIZE: the mark scaled to fit inside `room` px of space on every side and centered, on a square with
// rounded corners or not, with the splash's soft shadow scaled with it or not (the favicons are too small for it), and
// with a white outline inside the square's edge or not
function icon(m, room, { rounded = true, shadow = true, outline = false } = {}) {

  const k = Math.min((SIZE - 2 * room) / m.width, (SIZE - 2 * room) / m.height);
  const dx = (SIZE - m.width * k) / 2;
  const dy = (SIZE - m.height * k) / 2;
  const n = (v) => +v.toFixed(2);
  const circles = m.dots.map((d) => `<circle cx="${n(dx + (d.x - m.left) * k)}" cy="${n(dy + (d.y - m.top) * k)}" r="${n(r * k)}" fill="${d.fill}"/>`);

  const filter = `<defs><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="${n(4 * k)}" stdDeviation="${n(2 * k)} ${n(4 * k)}" flood-color="#1b1d28"/></filter></defs>`;

  const lines = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">`,
    shadow && filter,
    `<rect width="${SIZE}" height="${SIZE}"${rounded ? ` rx="${RADIUS}"` : ""} fill="${BG}"/>`,
    outline && `<rect x="${OUTLINE / 2}" y="${OUTLINE / 2}" width="${SIZE - OUTLINE}" height="${SIZE - OUTLINE}"${rounded ? ` rx="${RADIUS - OUTLINE / 2}"` : ""} fill="none" stroke="#fff" stroke-width="${OUTLINE}"/>`,
    `<g${shadow ? ' filter="url(#shadow)"' : ""}>`,
    ...circles,
    "</g>",
    "</svg>",
  ];

  return lines.filter(Boolean).join("\n") + "\n";
}

// The logo alone: the splash's dots as they are, cropped to them. It has no shadow: in the header it is 38px tall, where
// the shadow is less than a pixel, and a browser draws an image's SVG filter at low resolution, which blurs the dots.
const n = (v) => +v.toFixed(2);
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n(LOGO.left - 2)} ${n(LOGO.top - 2)} ${n(LOGO.width + 4)} ${n(LOGO.height + 4)}">
${LOGO.dots.map((d) => `<circle cx="${n(d.x)}" cy="${n(d.y)}" r="${r}" fill="${d.fill}"/>`).join("\n")}
</svg>
`;
fs.writeFileSync("src/assets/rhp-logo.svg", logo);
fs.writeFileSync("src/assets/rhp-logo-light.svg", inLight(logo));

// The splash as it is, less its drop shadow filter, for the landing page's hero: Safari draws that filter at low
// resolution there too. The hero's CSS draws the same shadow instead (custom1.css), which Safari keeps sharp.
const hero = splash.replace(/<defs>[\s\S]*?<\/defs>/, "").replace(/ filter="url\(#[^)]*\)"/, "");
if (hero.includes("filter")) throw new Error("icons: the splash's filter is not where rhp-hero.svg expects it");
fs.writeFileSync("src/assets/rhp-hero.svg", hero);
fs.writeFileSync("src/assets/rhp-hero-light.svg", inLight(hero));

const rounded = icon(LOGO, 60); // the word 392px wide on the 512px square
const small = icon(R, 96, { shadow: false, outline: true }); // the r 320px tall
fs.writeFileSync("src/assets/rhp-icon.svg", rounded);
fs.writeFileSync("public/favicon-rhp.svg", small);
fs.writeFileSync("public/favicon.svg", small);

// PNGs, drawn by Chromium with a transparent page, so the rounded corners stay clear
const browser = await chromium.launch();
const page = await browser.newPage();
const png = async (svg, size) => {

  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<body style="margin:0"><img width="${size}" height="${size}" src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}"></body>`);
  await page.locator("img").evaluate((img) => img.decode());

  return page.screenshot({ omitBackground: true });
};

fs.writeFileSync("public/apple-touch-icon.png", await png(icon(LOGO, 60, { rounded: false }), 180));
fs.writeFileSync("public/icon-192.png", await png(rounded, 192));
fs.writeFileSync("public/icon-512.png", await png(rounded, 512));
fs.writeFileSync("public/favicon-rhp-16.png", await png(small, 16));
fs.writeFileSync("public/favicon-rhp-32.png", await png(small, 32));

// An .ico is a directory of images; each one here is a PNG
const sizes = [16, 32, 48];
const images = [];
for (const size of sizes) {
  images.push(await png(small, size));
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
console.log(`icons: the logo's ${LOGO.dots.length} dots on the icons, the r's ${R.dots.length} on the favicons`);
