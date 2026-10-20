import { defineConfig, devices } from "@playwright/test";
import site from "./site.config.json" with { type: "json" };
const previewURL = `http://127.0.0.1:4175${new URL(process.env.SITE_URL || site.url).pathname}`;

export default defineConfig({
  testDir: "./tests",
  reporter: "list",
  use: {
    baseURL: previewURL,
    channel: "chrome",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "tablet",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 820, height: 1180 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run preview -- --port 4175",
    url: previewURL,
    reuseExistingServer: !process.env.CI,
  },
});
