import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
const site = JSON.parse(await readFile("site.config.json", "utf8"));
const previewURL = `http://127.0.0.1:4173${new URL(site.url).pathname}`;
import { mkdir } from "node:fs/promises";

await mkdir("qa", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 820, 1180],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    await page.goto(previewURL, { waitUntil: "networkidle" });
    await page.screenshot({ path: `qa/${name}.png`, fullPage: true });
    await page.screenshot({ path: `qa/${name}-hero.png` });
    console.log(
      `${name}: ${await page.title()}, width ${await page.evaluate(() => document.documentElement.scrollWidth)}`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
