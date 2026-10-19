# First-version handoff

## Delivered

- Editorial ivory/cypress design system, DM Serif Display / DM Sans, responsive navigation and footer, restrained motion and reduced-motion support.
- Homepage with hero, four quick paths, four communities, five-step Project Method, insights, resource library preview, approach introduction, newsletter and final planning CTA.
- Buyer and seller hubs with roadmaps, education, resources and FAQs.
- Four content-driven community guides, directory search/type filters and URL-preserving two-community comparison.
- Five educational articles with reusable article layouts, contents navigation, related resources/communities and appropriate structured data.
- Eight resource landing pages; seven real downloadable text planning worksheets. Investor analyzer is explicitly forthcoming.
- Market hub with honest unavailable metric states and a reusable content-driven market report template.
- About, four intake paths, contact, Locale Live, newsletter landing, site search and four legal/disclosure drafts.
- Event content schema, upcoming/past-session rendering and calendar download route; no invented sessions.
- Server-side form validation, consent separation, honeypot, origin checks, provider timeouts and honest missing-service errors.
- Metadata, canonicals, share image defaults, Article/BreadcrumbList schema, sitemap, robots and indexing safeguards.
- Typed, validated JSON content collections and a documented editing workflow. No visual CMS admin has been installed.
- Typed analytics browser event hooks; external analytics remain inactive.

## Verified in this cloud instance

- Fresh `npm ci --cache /tmp/npm-cache` succeeded.
- Content validation, ESLint, TypeScript and production build passed.
- All 11 Playwright tests passed against the production server.
- Tests visited all 36 current content/page routes and verified primary headings and loaded images.
- Tested actual HTTP 404 responses, search/filter/reset behavior, comparison selection/query restoration, direct worksheet files, server-side invalid requests and unconfigured delivery failures.
- Reviewed desktop/mobile homepage screenshots and tested representative layouts at 375, 430, 768, 1024, 1280 and 1440 pixels without unintended horizontal overflow.
- Tested mobile menu initial focus, Escape and focus restoration.
- Automated axe WCAG A/AA checks found no violations on five representative pages. This is not a full accessibility certification.
- A local desktop performance sample had FCP 216 ms and LCP 480 ms. It also reported CLS 0.342 during concurrent browser testing; subsequent isolated checks and delayed-font checks at desktop/mobile widths reported no layout shifts. Treat these as diagnostic lab observations; verify performance again on the deployed site. There is no field Core Web Vitals claim.

## Not represented as complete/live

- Public deployment, domain/DNS configuration and production integration verification.
- Approved brokerage, professional identity, license/contact details and legal content.
- Verified detailed neighborhood facts, market statistics, live listings or IDX.
- Email/CRM delivery, newsletter subscriptions, booking service or external analytics.
- Visual CMS editor, email-gated resource automation and the future investor calculator.
- Real event schedules, social profiles, approved portrait and verified local photography.

Resource downloads work independently of email services. Forms intentionally report an unavailable service until a real endpoint is configured; entered fields remain available after a failed request. The website remains noindex by default.

See README.md for routes, components, content editing, installation, provider contract and deployment instructions. See LAUNCH-CHECKLIST.md for required owner information and launch prerequisites. The reusable cloud install script and startup instructions were saved as a draft; publication of that environment configuration remains a separate user action in environment settings.
