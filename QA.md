# Verification — 2026-10-20

- Installed dependencies and generated `package-lock.json` for reproducible installation; npm audit reported zero vulnerabilities at installation.
- Passed TypeScript validation, ESLint, and the production build using Node 24.
- Passed all 9 Playwright tests across desktop (1440px), tablet (820px), and mobile (390px).
- Automated axe WCAG A/AA checks reported zero violations in the tested page states.
- Verified keyboard skip link, focus transfer to sections, mobile menu opening/closing, Escape dismissal, anchor refreshes, reduced motion, and absence of browser runtime errors.
- Visually inspected desktop, tablet, and mobile screenshots, including the natural portrait crops, the DDD feature, and mobile expertise readability.
- Checked 320, 390, 820, 1440, and 1920px widths: no horizontal overflow.
- Confirmed the featured article returns HTTP 200 as a PDF. The supplied source and published copy are unchanged.
- Built and exercised a `/Aboutme/` project-site variant: portrait and PDF URLs include the correct base and load successfully.
- Verified pre-rendered HTML, structured data, canonical metadata, sitemap.xml, and robots.txt. Root deployment is configured for `https://mahdikazemi96.github.io/`.
- Verified GitHub identity/repository links through their public pages. LinkedIn URL is sourced from that GitHub profile; LinkedIn itself returned an automated-access block, so live profile availability could not be independently checked.

The original photograph is 3840×5760 and approximately 8.8 MB. Generated AVIF portraits are approximately 7 KB (480px) and 19 KB (960px); WebP and JPEG fallbacks are included. The original files are preserved and are not copied into the published site root.

Local tests do not measure real-user Core Web Vitals or certify complete accessibility. No GitHub Actions run or live deployment has been performed. Publication date, reading time, and email have not been fabricated.

Run instructions and deployment steps are in `README.md`. Current preview: `http://127.0.0.1:4173/` while the preview process is running. QA screenshots are generated into the ignored `qa/` directory.
