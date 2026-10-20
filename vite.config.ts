import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import site from "./site.config.json" with { type: "json" };

const url = new URL(process.env.SITE_URL || site.url);
if (!url.pathname.endsWith("/")) url.pathname += "/";
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default defineConfig({
  base: url.pathname,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-metadata",
      transformIndexHtml(html) {
        return html
          .replaceAll("__SITE_URL__", escapeHtml(url.href))
          .replaceAll("__SITE_TITLE__", escapeHtml(site.title))
          .replaceAll("__SITE_DESCRIPTION__", escapeHtml(site.description));
      },
    },
  ],
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
});
