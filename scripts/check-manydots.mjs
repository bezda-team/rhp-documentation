// Checks the ManyDots documentation demo in three browsers, with server HTML and hydrated pixels,
// native events, light and dark themes, mobile taps, keyed refreshes, colors, and keyboard controls.
// Build and serve the docs first, then run: node scripts/check-manydots.mjs [http://localhost:4391]
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium, firefox, webkit } from "playwright";

const base = process.argv[2] ?? "http://localhost:4391";
const screenshots = path.join(os.tmpdir(), "rhp-manydots-docs-screenshots");
fs.mkdirSync(screenshots, { recursive: true });
let checks = 0;
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  try {
    const compare = await browser.newPage();
    const pixelsApart = (first, second) => compare.evaluate(async ([a, b]) => {
      const load = (value) => new Promise((resolve) => { const image = new Image(); image.onload = () => resolve(image); image.src = `data:image/png;base64,${value}`; });
      const [left, right] = await Promise.all([load(a), load(b)]);
      if (left.width !== right.width || left.height !== right.height) return 255;
      const pixels = (image) => { const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height; const context = canvas.getContext("2d"); context.drawImage(image, 0, 0); return context.getImageData(0, 0, canvas.width, canvas.height).data; };
      const [before, after] = [pixels(left), pixels(right)];
      let difference = 0;
      for (let y = 1; y < left.height - 1; y++) for (let x = 1; x < left.width - 1; x++) {
        const index = (y * left.width + x) * 4;
        for (let channel = 0; channel < 4; channel++) difference = Math.max(difference, Math.abs(before[index + channel] - after[index + channel]));
      }
      return difference;
    }, [first.toString("base64"), second.toString("base64")]);

    for (const scheme of ["light", "dark"]) for (const mobile of [false, true]) {
      const options = { viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 }, colorScheme: scheme, hasTouch: mobile };
      const plain = await browser.newContext(options);
      const server = await plain.newPage();
      await server.route(/\/_astro\/.*\.js$/, (route) => route.abort());
      await server.goto(`${base}/reference/manydots/`, { waitUntil: "networkidle" });
      await server.locator(".demo-stage").scrollIntoViewIfNeeded();
      await server.mouse.move(1, 1);
      await server.evaluate(() => document.body.normalize());
      const before = await server.locator(".demo-stage").screenshot({ animations: "disabled" });
      assert.equal(await server.locator(".rhp-manydot").count(), 1200);
      assert.equal(await server.getByLabel("Coloring").inputValue(), "category");

      const active = await browser.newContext(options);
      const page = await active.newPage();
      const errors = [];
      await page.addInitScript(() => {
        window.__manydotsServerNodes = null;
        const observer = new MutationObserver(() => {
          const points = [...document.querySelectorAll(".rhp-manydot")];
          if (points.length === 1200) {
            window.__manydotsServerNodes = points;
            observer.disconnect();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      });
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto(`${base}/reference/manydots/`, { waitUntil: "networkidle" });
      await page.locator(".demo-stage").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll("astro-island")].every((island) => !island.hasAttribute("ssr")));
      await page.mouse.move(1, 1);
      await page.evaluate(() => document.body.normalize());
      const after = await page.locator(".demo-stage").screenshot({ animations: "disabled" });
      fs.writeFileSync(`${screenshots}/${name}-${scheme}-${mobile ? "mobile" : "desktop"}-server.png`, before);
      fs.writeFileSync(`${screenshots}/${name}-${scheme}-${mobile ? "mobile" : "desktop"}-hydrated.png`, after);
      // A channel difference of one can come from text antialiasing in independent browser contexts.
      assert.ok(await pixelsApart(before, after) <= 1, `${name}/${scheme}/${mobile}: SSR screenshot differs`);
      assert.equal(await page.locator(".rhp-manydot").count(), 1200);
      assert.equal(await page.getByLabel("Coloring").inputValue(), "category");
      assert.ok(await page.evaluate(() => window.__manydotsServerNodes?.every((point, index) => point === document.querySelectorAll(".rhp-manydot")[index])), `${name}/${scheme}/${mobile}: hydration replaced a server point`);
      const colors = () => page.locator(".rhp-manydot").evaluateAll((points) => new Set(points.map((point) => getComputedStyle(point).backgroundColor)).size);
      assert.equal(await colors(), 4);
      await page.getByLabel("Coloring").selectOption("shared");
      assert.equal(await colors(), 1);
      await page.getByLabel("Coloring").selectOption("unique");
      assert.ok(await colors() > 300);
      await page.getByLabel("Coloring").selectOption("category");
      assert.equal(await colors(), 4);

      await page.evaluate(() => {
        window.__manydotsNodes = [...document.querySelectorAll(".rhp-manydot")];
        window.__manydotsStyles = window.__manydotsNodes.map((point) => point.style.cssText);
        window.__manydotsClicks = [];
        document.addEventListener("click", (event) => {
          if (event.target.matches?.(".rhp-manydot")) window.__manydotsClicks.push(event.target.dataset.rhpIndex);
        });
      });
      const chooseVisible = async () => {
        await page.locator(".rhp-manydots").scrollIntoViewIfNeeded();
        return page.locator(".rhp-manydot").evaluateAll((points) => {
          for (const point of points) {
            const rect = point.getBoundingClientRect();
            const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
            if (y > 0 && y < innerHeight && document.elementFromPoint(x, y) === point) return { x, y, index: Number(point.dataset.rhpIndex) };
          }
          throw new Error("No exposed point");
        });
      };
      const select = async () => {
        const point = await chooseVisible();
        if (mobile) await page.touchscreen.tap(point.x, point.y);
        else {
          await page.mouse.move(point.x, point.y);
          assert.ok((await page.locator(".manydots-readout").first().textContent()).includes(`Point ${point.index + 1}:`));
          assert.equal(await page.locator(`.rhp-manydot[data-rhp-index="${point.index}"]`).evaluate((leaf) => getComputedStyle(leaf).outlineStyle), "solid");
          await page.mouse.click(point.x, point.y);
        }
        assert.ok((await page.getByRole("status").textContent()).includes(`point ${point.index + 1}:`));
        assert.equal(await page.locator(".rhp-manydot.selected").count(), 1);
        return point;
      };
      await select();
      await page.getByRole("button", { name: "New data", exact: true }).click();
      assert.equal(await page.locator(".rhp-manydot").count(), 1200);
      assert.equal(await page.locator(".rhp-manydot.selected").count(), 0);
      assert.equal(await page.getByRole("status").textContent(), "No point selected.");
      assert.ok(await page.evaluate(() => [...document.querySelectorAll(".rhp-manydot")].every((point, index) => point === window.__manydotsNodes[index])));
      assert.ok(await page.evaluate(() => [...document.querySelectorAll(".rhp-manydot")].some((point, index) => point.style.cssText !== window.__manydotsStyles[index])));
      await select();
      assert.ok(await page.evaluate(() => window.__manydotsClicks.length >= 2));
      await page.getByRole("button", { name: "Clear selection", exact: true }).focus();
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(".rhp-manydot.selected").count(), 0);
      assert.deepEqual(errors, []);
      checks++;
      console.log(`PASS ${name}, ${scheme}, ${mobile ? "mobile" : "desktop"}: SSR pixels, colors, native interaction, keyed refresh, keyboard controls`);
      await plain.close(); await active.close();
    }
  } finally {
    await browser.close();
  }
}
console.log(`${checks} ManyDots documentation scenarios passed`);
