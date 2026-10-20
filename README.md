# Mahdi Kazemi — personal website

A responsive, static React + TypeScript website with Vite, Tailwind CSS, Lucide icons, local fonts, an optimized portrait, and a signature Domain-Driven Design feature. No backend, runtime secrets, analytics, or external font requests.

## Run locally

Use **Node.js 24 LTS** (see `.nvmrc`) and npm. The older Node 18 installed on this computer cannot run the current toolchain.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/mahdikazemi.github.io/`. For the actual production output:

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/mahdikazemi.github.io/`. The build pre-renders the React page into HTML, then hydrates it in the browser. Content, links, and SEO are present even before JavaScript loads. Navigation uses fragment identifiers, so section links and refreshes need no server rewrite rules.

## Project structure

```text
src/content.ts             Personal information, article, projects, expertise
src/App.tsx                Homepage sections, in narrative order
src/components.tsx         Navigation, social links, article metadata, DDD diagram
src/styles.css             Responsive visual system and reduced-motion rules
site.config.json           Canonical URL, page title, description
public/images/             Optimized portrait derivatives and sharing card
public/articles/           Original DDD PDF, served as a static file
scripts/optimize-photo.mjs  Reproducible photo derivatives and sharing card
scripts/prerender.mjs       Static HTML, structured data, sitemap, robots.txt
tests/site.spec.ts          Browser, accessibility, navigation, and SEO checks
.github/workflows/deploy.yml  Official GitHub Pages deployment
```

The supplied `7B6A0751.JPG` and `1.DDD-Article.pdf` are preserved at the repository root. Only assets under `public/` are published. Temporary inspection files and QA screenshots are ignored by Git.

## Publish to GitHub Pages

1. Use the repository **`mahdikazemi96/mahdikazemi.github.io`** and push this project to its `main` branch. Commit `package-lock.json` and all assets under `public/`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Push to `main`, or run **Build and deploy GitHub Pages** from Actions. The workflow installs locked dependencies, checks TypeScript and ESLint, builds, uploads the official Pages artifact, and deploys it.
4. Wait for the deployment job to succeed. The expected URL is **https://mahdikazemi96.github.io/mahdikazemi.github.io/**.

The initially requested `https://mahdikazemi.github.io/` belongs to the username `mahdikazemi`, not `mahdikazemi96`. The selected repository is a project site, so its name is included in the URL path. It has been prepared locally; a successful local build is not a live deployment.

The build job has read-only repository access. Only the deploy job has `pages: write` and `id-token: write`. GitHub supplies its standard workflow token; no custom secrets are needed.

### A different repository or custom domain

Set `url` in `site.config.json` to the complete public URL, including the repository path and trailing slash, e.g. `https://mahdikazemi96.github.io/Aboutme/`. Alternatively set the repository **Actions variable** `SITE_URL` to that URL. Vite derives its base path from the URL, and the build generates matching canonical metadata, sharing links, robots.txt, and sitemap.xml. All local image/article URLs use this base.

For a custom domain also configure GitHub Pages DNS/domain settings. Do not use `SITE_URL` to claim an unconfigured domain.

## Replace the photograph

Keep the original outside `public/` and run:

```sh
npm run photo -- "path/to/original.jpg"
```

The script preserves the source, corrects EXIF orientation, makes 480px and 960px portrait crops in AVIF/WebP/JPEG, strips output metadata, applies a slight brightness lift, and creates the 1200×630 social image. No facial retouching is performed. The current source is 3840×5760; the 4:5 crops preserve the face and shoulders.

Inspect desktop and mobile crops after changing the image. Change `position: 'north'` in the script if a different crop is needed, then adjust `profile.portrait.objectPosition` and `alt` in `src/content.ts`. `enabled: false` renders an explicitly labeled missing-photo state. Portraits load eagerly with high priority; there are no below-the-fold photos requiring lazy loading.

## Update writing

Edit `featuredArticle` in `src/content.ts`. It drives both the signature section immediately after the hero and its smaller writing card. The current title **Understanding Domain-Driven Design** comes from the supplied PDF cover. The English summary describes its strategic and tactical DDD topics; the link opens the unchanged Persian, 50-page PDF. Its creation timestamp is not used as a publication date. Reading time is omitted because the illustrated technical document does not support a dependable estimate.

An article has `id`, `title`, `summary`, `category`, `tags`, and `href`. Optional fields: `publishedAt` (verified ISO date), `readingMinutes` (supported estimate), and `format` (e.g. `Persian PDF · 50 pages`). Set `featuredArticle` to `null` for a clearly labeled unavailable state.

Add other articles to the `articles` array. Use a verified `https://` link for an external publication. To host an article here, put an accessible standalone HTML document or PDF in `public/articles/`, then use `articles/filename.html` or `articles/filename.pdf` as its relative `href`. Include metadata and add its URL to `scripts/prerender.mjs`'s sitemap for a new HTML page. The website intentionally has no router or CMS.

## Update projects and social links

Edit `projects` in `src/content.ts` to add a title, description, technical details, technologies, concepts, and a verified repository URL. Keep the showcase selective. Personal AI Assistant content is based on its public README: a .NET learning project using RAG, Qdrant, LM Studio, and pluggable tools in a monolithic design. Its diagram is a conceptual overview, not a claim about deployment topology.

Edit `profile.socials` for GitHub, LinkedIn, or email, and `profile.phone` for the clickable phone number in Contact. Empty email/LinkedIn strings hide those links. No email address was supplied. LinkedIn was verified as a link on the supplied GitHub profile, although LinkedIn blocks automated page retrieval. Professional experience and learning interests are distinguished in the expertise content.

## Browser QA

The tests use installed **Google Chrome** through Playwright:

```sh
npm run build
npm test
```

They run at desktop, tablet, and mobile sizes, check image loading, the PDF response, section order, mobile-menu dismissal, anchor refreshes, console errors, keyboard focus, reduced motion, and axe WCAG A/AA rules. To use Playwright's bundled Chromium instead, remove `channel: 'chrome'` from `playwright.config.ts` and run `npx playwright install chromium` first.

Use `node scripts/capture-qa.mjs` while the production preview is running to save desktop/tablet/mobile screenshots in ignored `qa/`. Automated accessibility checks complement manual inspection; they do not certify every accessibility requirement or real-world Core Web Vitals.

## Sources

- Identity and LinkedIn: https://github.com/mahdikazemi96
- Project details: https://github.com/mahdikazemi96/PersonalAiAssistant
- Article: supplied `1.DDD-Article.pdf`, cover and contents (50 pages)
- Hosting: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Base paths: https://vite.dev/guide/static-deploy.html#github-pages
