import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, photograph, article and responsive navigation", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "MahdiKazemi.",
  );
  await expect(page.locator("main > section").nth(1)).toHaveAttribute(
    "id",
    "featured",
  );
  const photo = page.locator("img.portrait");
  await expect(photo).toBeVisible();
  expect(
    await photo.evaluate(
      (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
    ),
  ).toBeTruthy();
  const article = page.getByRole("link", { name: "Read the Article" });
  const response = await page.request.get(
    (await article.getAttribute("href")) || "",
  );
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", {
      name: /^(Open|Close) navigation$/,
    });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects")).toBeFocused();
  if (testInfo.project.name === "mobile")
    await expect(page.getByRole("navigation")).not.toBeVisible();
  await page.reload();
  await expect(page.locator("#projects")).toBeVisible();
  expect(errors).toEqual([]);
});

test("WCAG accessibility and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});

test("production HTML contains content and SEO without JavaScript", async ({
  request,
}) => {
  const html = await (await request.get("./")).text();
  expect(html).toContain("Understanding Domain-Driven Design");
  expect(html).toContain("application/ld+json");
  expect(html).toContain("https://mahdikazemi96.github.io/");
  expect(html).not.toContain("__SITE_");
  expect((await request.get("sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("robots.txt")).ok()).toBeTruthy();
});
