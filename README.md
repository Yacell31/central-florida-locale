# Central Florida Locale

An editorial real estate education and advisory website built with Next.js App Router, React, strict TypeScript and Tailwind. This is a working development first version, not an approved public brokerage advertisement.

## Run locally

Use Node 24 (tested with 24.19.0) and npm. From this checkout:

```sh
npm ci --cache /tmp/npm-cache
npm run dev
```

For production-mode verification:

```sh
npm run content:check
npm run lint
npm run typecheck
npm run build
npm run start
```

The server binds to port 3000. `npm test` expects it to be running. Browser tests use `/usr/bin/chromium` in this cloud image; change `playwright.config.ts` to use your installed browser or Playwright's managed Chromium on another machine.

## Content editing

Content lives in `content/*.json`, validated against Zod schemas in `src/lib/schemas.ts`. Edit these files, run `npm run content:check`, then build. No third-party CMS account is required. This deliberate file-based first version avoids shipping an unprotected or unconfigured CMS admin. A visual Keystatic editor is not implemented.

- `communities.json`: guide identity, classification, research prompts and illustrations.
- `articles.json`: title, category, sections, optional real publication/update dates and related content.
- `resources.json`: landing pages and download availability.
- `market-reports.json`: report metadata and nullable market data contract.
- `events.json`: confirmed upcoming/past events, explicit time zones and optional verified stream/archive URLs.

Copy an existing record, supply a unique kebab-case slug, and keep unknown facts null or explicitly unavailable. `draft` records are excluded from rendered content, local search and the sitemap. Schema-invalid content fails the build. Do not change a draft to published until its visible content is approved. `published` means eligible to render; it does not assert verification of statistics. `sources` and `verifiedAt` exist for sourced factual content; the introductory research guides do not supply detailed local statistics.

Community, article and resource pages are generated from the collections. Market reports use a shared content-driven template; supply sourced metrics, reporting geography and period before publishing numeric reports. Add real worksheet files under `public/downloads/<slug>.txt` before setting a resource's `available` field to true.

## Architecture

- `src/app/page.tsx`: homepage.
- `src/app/[...slug]/page.tsx`: route dispatch, route metadata and content hubs.
- `src/components/pages/`: buyer/seller, community, article, resource, about and intake templates.
- `src/components/ui.tsx`: shared editorial components and breadcrumb schema.
- `src/components/explore.tsx`: search, filters and URL-preserving community comparison.
- `src/components/forms.tsx`: reusable accessible lead forms.
- `src/app/api/leads/route.ts`: validation, same-origin checks and optional provider delivery.
- `src/proxy.ts`: recognized page paths and actual HTTP 404 responses for unknown slugs.
- `src/lib/content.ts`: typed collections and centralized initial business configuration.

Fonts are self-hosted with `next/font/local`. CSS defines the responsive editorial system; Tailwind is available for small utilities. No shadcn dependency was necessary for the native controls used here.

## Routes

`/`, `/buy`, `/sell`, `/neighborhoods`, `/neighborhoods/[slug]`, `/neighborhoods/compare`, `/insights`, `/insights/[slug]`, `/resources`, `/resources/[slug]`, `/market`, `/market/understanding-the-market`, `/about`, `/work-with-me`, `/contact`, `/live`, `/edit`, `/search`, `/privacy`, `/terms`, `/accessibility`, `/disclosures`.

Comparison selections use `?a=<community-slug>&b=<community-slug>`. Service paths use `/work-with-me?service=buying|selling|investing|relocating`. Inquiries preserve a non-sensitive source slug. Confirmed events automatically support calendar downloads through `/api/calendar/[slug]`.

## Delivery integration

Copy `.env.example` to `.env.local` and supply values securely. Never commit secrets.

`LEAD_WEBHOOK_URL` is an optional HTTPS endpoint controlled by your delivery/CRM automation. `LEAD_WEBHOOK_TOKEN` is an optional bearer token. It receives JSON containing `kind`, `email`, `name`, `details`, `phone`, `service`, `timeline`, `area`, `source`, `consent`, and `marketing`. Newsletter requests set `marketing: true`. Other forms set marketing consent only when the separate optional box is checked.

The endpoint must return a 2xx only when it has accepted responsibility for delivery/persistence. Configure provider-specific email/CRM automation behind this endpoint. No Resend, Notion, GoHighLevel or scheduling integration is connected by default. A provider rejection or timeout produces a recoverable error; missing configuration returns HTTP 503. Inquiries are not stored locally or logged, and unconfigured submissions never report success. A provider success confirms acceptance, not an appointment or guaranteed email delivery. Add durable provider idempotency and production abuse protection before launch.

Resources are intentionally available as direct printable text downloads while email delivery is unavailable. There is no fake gate. The investor analyzer is honestly marked forthcoming. The calendar feed contains no invented events.

## SEO and analytics

Metadata, canonicals, social image defaults, Article and BreadcrumbList schema, robots and sitemap are implemented. Business and Person schema are omitted until an approved identity and brokerage details exist.

Indexing is off by default. `SITE_INDEXABLE=true` only enables it in a production build outside Vercel preview deployments. Set this only after the launch checklist is complete; rebuild afterward. The sitemap is empty while indexing is disabled.

External analytics are inactive. `src/lib/analytics.ts` emits typed `locale:analytics` browser events. No personal form contents are included. Subscribe using a reviewed analytics adapter when appropriate. Form completion events require provider acceptance; download events follow a successful file response. Local testing does not establish field Core Web Vitals or WCAG certification.

## Deployment

Vercel: use the Next.js preset, npm install with the lockfile, `npm run build`, and supply environment values securely. Public deployment, DNS configuration and paid services have not been performed. No database or external CMS is required for this first version.

See `LAUNCH-CHECKLIST.md` for owner-supplied requirements and `ASSETS.md` for imagery/font provenance.
