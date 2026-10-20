import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

const site = JSON.parse(await readFile("site.config.json", "utf8"));
const url = new URL(process.env.SITE_URL || site.url);
if (!url.pathname.endsWith("/")) url.pathname += "/";
// Pre-render the exact React tree so text and links are useful without JavaScript.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const { profile, featuredArticle } =
    await server.ssrLoadModule("/src/content.ts");
  const content = renderToString(createElement(App));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: profile.name,
        jobTitle: profile.role,
        telephone: profile.phone,
        url: url.href,
        image: new URL("images/portrait-960.jpg", url).href,
        sameAs: [profile.socials.github, profile.socials.linkedin].filter(
          Boolean,
        ),
      },
      {
        "@type": "WebSite",
        url: url.href,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        author: { "@id": `${url}#person` },
      },
      ...(featuredArticle
        ? [
            {
              "@type": "Article",
              headline: featuredArticle.title,
              description: featuredArticle.summary,
              url: new URL(featuredArticle.href, url).href,
              author: { "@id": `${url}#person` },
              ...(featuredArticle.publishedAt
                ? { datePublished: featuredArticle.publishedAt }
                : {}),
            },
          ]
        : []),
    ],
  };
  const html = (await readFile("dist/index.html", "utf8"))
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(
      "<!-- structured-data -->",
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    );
  await writeFile("dist/index.html", html);
  const xmlUrl = url.href.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xmlUrl}</loc></url></urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${url}sitemap.xml\n`,
  );
  await writeFile("dist/.nojekyll", "");
  console.log(`Pre-rendered homepage and SEO files for ${url}`);
} finally {
  await server.close();
}
