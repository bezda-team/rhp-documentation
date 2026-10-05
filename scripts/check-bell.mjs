// Run with the documentation dev or preview server: npm run check-bell -- [http://localhost:4321]
// Exercise the bell through its controls, waiting for motion to finish before comparing each waveform.
import { chromium, webkit, devices } from "playwright";

const base = process.argv[2] ?? "http://localhost:4321";
let checked = 0, failed = 0;
const check = (name, ok) => {
  checked++;
  if (!ok) { failed++; console.log(`FAIL ${name}`); }
};

// The JS version writes intermediate values while it moves. Compare settled waves so ongoing motion cannot pass
// a check for a click that did nothing. A CSS transition already has its destination in these properties.
const wave = (strike) => strike.evaluate(async (element) => {
  const read = () => [...element.querySelectorAll(".swing")].map((bar) => bar.style.getPropertyValue("--rhp-to")).join(",");
  const start = performance.now();
  let previous = read(), since = start;
  while (performance.now() - start < 5000) {
    await new Promise(requestAnimationFrame);
    const current = read(), now = performance.now();
    if (current !== previous) { previous = current; since = now; }
    if (now - since > 150) return current;
  }
  throw new Error("The bell's waveform did not settle within five seconds");
});

for (const [engine, type] of Object.entries({ chromium, webkit })) {
  const browser = await type.launch();
  try {
    for (const touch of [false, true]) {
      for (const route of ["gallery", "examples"]) {
        const label = `${engine} ${touch ? "touch" : "mouse"} /${route}/stem-plot/`;
        const page = await browser.newPage(touch ? devices["iPhone 13"] : { viewport: { width: 1280, height: 900 } });
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        try {
          await page.goto(`${base}/${route}/stem-plot/`);
          const pg = page.locator('.playground[data-version="poster"]');
          const strike = pg.getByRole("button", { name: "Strike the bell again" });
          const press = (control) => touch ? control.tap() : control.click();
          const changesWave = async (name, action) => {
            const before = await wave(strike);
            await action();
            check(`${label} ${name}`, (await wave(strike)) !== before);
          };
          await strike.scrollIntoViewIfNeeded();
          check(`${label} draws all 36 samples`, await strike.locator(".swing").count() === 36);
          if (touch) {
            const highlights = await strike.evaluate((element) =>
              [element, element.querySelector(".swing"), element.querySelector(".tip")].map((e) => getComputedStyle(e).webkitTapHighlightColor));
            check(`${label} has no native tap flash on the plot or samples`, highlights.every((color) => color === "rgba(0, 0, 0, 0)"));
          }
          for (const motion of ["CSS", "JS"]) {
            await press(pg.getByRole("radio", { name: motion, exact: true }));
            await press(pg.getByRole("radio", { name: "Vertical", exact: true }));
            await changesWave(`${motion}: striking rings the bell`, () => press(strike));
            for (let n = 1; n <= 2; n++) {
              await changesWave(`${motion}: new data ${n} changes the wave`, () => press(pg.getByRole("button", { name: "New data", exact: true })));
              await changesWave(`${motion}: striking still works after new data ${n}`, () => press(strike));
            }
            await press(pg.getByRole("radio", { name: "Horizontal", exact: true }));
            await changesWave(`${motion}: striking works after turning the chart`, () => press(strike));
            if (!touch) {
              for (const key of ["Enter", "Space"]) {
                await changesWave(`${motion}: ${key} rings after new data`, () => strike.press(key));
              }
              check(`${label} ${motion}: keyboard focus remains visible`, await strike.evaluate((element) => {
                const style = getComputedStyle(element);
                return element.matches(":focus-visible") && style.outlineStyle === "solid" && parseFloat(style.outlineWidth) > 0;
              }));
            }
          }
          check(`${label} has no page errors: ${errors.join(" | ")}`, errors.length === 0);
          console.log(`Checked ${label} in CSS and JS, vertical and horizontal`);
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
}

console.log(`${checked - failed} of ${checked} bell checks passed`);
process.exitCode = failed ? 1 : 0;
