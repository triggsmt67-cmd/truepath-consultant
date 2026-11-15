# True Path Digital — Consulting Website

A high-performance marketing consultancy website for **True Path Digital**, built with Next.js (App Router) and a headless WordPress CMS backend. Designed for owner-operated service businesses — HVAC, plumbing, electrical — with an emphasis on AI search visibility and conversion.

**Live:** [truepath406.com](https://truepath406.com)

## SEO improvement checklist

Updated November 15, 2026. Work through these steps in order and update the
checkboxes as each item is completed. **Step 1 is complete: the technical fixes
are deployed and verified on the live site. Next action: Step 2, inspect the
WordPress frontend cleanup and prepare its exact changes for approval.** Trevor
approved the public release on November 15, 2026; live WordPress changes remain
pending separate approval.

Details: [SEO audit and page recommendations](docs/seo-audit-2026-11-15.md)
and [export data and HTTP evidence](docs/seo-evidence-2026-11-15.json).

### Preparation completed

- [x] Review the three Search Console exports, public pages, and WordPress integration.
- [x] Add `/checkup` to the local sitemap and footer, correct its social metadata,
  and preserve editorial article links while normalizing legacy destinations.
- [x] Pass the production build, lint, five SEO tests, and ten existing worksheet/email tests.

### Step 1 Deploy and verify the technical fixes

- [x] Get Trevor's approval to deploy the prepared public-site changes.
- [x] Review the diff, rerun the relevant checks if anything has changed, then
  deploy. A push to `main` triggers Vercel production deployment.
- [x] Verify the live sitemap includes `/checkup` and all current articles;
  check the footer link, metadata, preserved article links, redirects, and 404s.
  The tested November 15 sitemap contains 26 URLs; future counts depend on the CMS.
- [x] Record the deployment date and commit: **November 15, 2026**, technical
  release [`bfb5141`](https://github.com/triggsmt67-cmd/truepath-consultant/commit/bfb51413836decd4c325e289fdaafdb7e1ec6104),
  Vercel deployment `dpl_6EvMnsVvU3HT474zD6rjoemQif36` (**READY**, Next.js;
  build approximately 19 seconds).

Live verification passed: 26 sitemap pages and 26 distinct internal anchor
paths; canonical tags, metadata, crawl directives, preserved CMS links, nine
representative redirects, expected 404s, and disabled email previews. The new
footer link opens the worksheet correctly in the browser. The WordPress API
still returns all 19 published articles. Build, lint, five SEO tests, and ten
mocked worksheet/email tests passed; no real email was sent. The deployment's
available error/fatal log scan returned no entries. No external log drains are
configured, so this is a release check rather than continuous monitoring.

### Step 2 Clean up the WordPress frontend

- [ ] Inspect the redirect rule/plugin/server configuration and prepare the
  exact changes for approval before modifying live settings.
- [ ] After approval, keep the irrelevant admin homepage out of search and stop
  exposing unnecessary archive links and broken backend sitemap destinations.
  Send actual legacy articles directly to their matching public articles;
  let nonexistent archives return appropriate 404/410 responses.
- [ ] Verify GraphQL, REST endpoints needed by the site, images, admin login,
  previews, and publishing/revalidation still work. Keep APIs accessible.

### Step 3 Gather missing Search Console details and a content baseline

- [ ] Obtain the exact URLs for the two redirect errors, duplicate/canonical
  cases, discovered-but-not-indexed pages, and noindex exclusions. The supplied
  exports do not identify these cases.
- [ ] Inspect important final URLs in Search Console. Record Google's selected
  canonical and indexing reason rather than inferring them from public HTML.
- [ ] Save available impressions, clicks, qualified inquiries, and backlink
  information before content consolidation. Mark unavailable measures as unknown.

### Step 4 Correct the priority articles

- [ ] Prepare revisions for review: fix the booking-rate formula and unsupported
  response-time claims in **Home Service Booking**, and update the outdated
  posting advice and ranking claims in **Inactive Google Profile**.
- [ ] Remove the editing instruction from **Why Digital Marketing Fails Early**;
  verify source claims in **Estimate Follow-Up** and **Reviews Process**, and
  reconcile conflicting follow-up advice.
- [ ] Get approval before updating live WordPress content. Publish approved
  revisions and verify the public article text, metadata, links, and schema.

### Step 5 Consolidate the overlapping AI search articles

- [ ] Correct and strengthen **AI Search Visibility** as the proposed destination,
  using current guidance and a documented example. Review the baseline from Step 3.
- [ ] Get approval before retiring **Digital Inversion** and transferring its
  useful material into the revised destination.
- [ ] Add a relevant permanent redirect, update internal links and sitemap
  inclusion, and verify one final indexable article remains. Do not consolidate
  into a destination that still contains the same unsupported claims.

### Step 6 Improve supporting content and proof

- [ ] Substantiate portfolio/homepage percentage improvements with dates,
  baselines, metric definitions, and owner-approved evidence, or prepare narrower
  claims for approval. Keep visible claims and structured data consistent.
- [ ] Review the remaining article recommendations in the audit, starting with
  the Montana marketing-decisions, attention, and dated tactics articles.
- [ ] Resolve the actual privacy-notice/content need for the missing
  `/privacy-policy` page. Do not redirect it to unrelated content.
- [ ] Keep useful service pages and the worksheet; do not delete or noindex
  pages just to reduce Search Console exclusion counts.

### Step 7 Follow up in Search Console and measure results

- [ ] After Step 1, check the canonical public sitemap submission and inspect
  important final URLs; request indexing where appropriate. Do not wait for all
  editorial work to finish before checking the deployed technical fixes.
- [ ] After approved backend cleanup, remove the obsolete admin sitemap
  submission. The redundant `www` submission is optional cleanup.
- [ ] Validate confirmed errors once their specific fixes are live. Leave
  expected redirects, obsolete resources, and intentional 404s alone.
- [ ] Recheck after Google recrawls, then review visibility and qualified
  inquiries over roughly four to six weeks. Record results and the next priority here.

Deployment, live WordPress settings, domain/DNS changes, content removal, and
major architectural changes require approval under the audit brief. Checking
off preparation does not authorize these actions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Typography | Inter + Newsreader (next/font) |
| CMS | Headless WordPress via WPGraphQL |
| Deployment | Vercel |

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout, fonts, global schema
│   ├── insights/
│   │   ├── page.tsx          # Blog listing (Intelligence Feed)
│   │   └── [slug]/page.tsx   # Individual blog posts
│   ├── services/             # Service pages
│   ├── work/                 # Case studies
│   ├── sitemap.ts            # Dynamic XML sitemap
│   └── robots.ts             # Robots.txt generation
├── components/
│   ├── Header.tsx            # Navbar with pill navigation
│   ├── Footer.tsx            # Site footer
│   ├── Button.tsx            # Reusable CTA button
│   ├── DrawerButton.tsx      # Lead capture drawer trigger
│   ├── LeadDrawer.tsx        # Slide-out contact form
│   ├── LeadFlowAnimation.tsx # Animated lead flow visualization
│   └── ScrollImage.tsx       # Scroll-aware image component
├── context/                  # React context providers
└── lib/
    └── wordpress.ts          # WPGraphQL client, types, queries
```

## Headless WordPress Integration

Blog content is fetched at build time from the WordPress GraphQL endpoint at `admin.truepath406.com/graphql`.

### Data Flow

```
WordPress (ACF + Gutenberg) → WPGraphQL → Next.js SSG → Vercel CDN
```

### ACF "AI Overviews" Field Group

Each blog post can include an **AI Overviews** custom field group with three properties:

| ACF Field | Purpose | Rendering |
|---|---|---|
| `ai_quick_answer` | Prose TLDR summary | ⚡ Quick Answer card below hero image |
| `ai_takeaways` | Bullet-point key claims | ✎ Key Takeaways list below Quick Answer |
| `ai_faqs` | Q&A pairs (Q:/A: delimited) | FAQ cards at article bottom |

All three are conditionally rendered — posts without ACF data show no empty sections.

### Content Normalization

The `cleanHtmlContent` utility performs render-time transformations:
- Strips WordPress "more-link" artifacts
- Normalizes legacy `truepath406.com` and `truepathdigital.com` links to the
  canonical `https://truepath406.com` host
- Remaps `/blog/` paths to `/insights/` for URL consistency

## AI Search Optimization

Blog posts output **5 structured data blocks** for maximum AI crawler visibility:

| Schema Type | Purpose |
|---|---|
| `BlogPosting` | Article metadata, author, dates, `abstract` from takeaways |
| `FAQPage` | Structured Q&A pairs for Google AI Overviews and People Also Ask |
| `BreadcrumbList` | Navigation hierarchy (Home → Insights → Article) |
| `SpeakableSpecification` | Targets Quick Answer + Takeaways for voice assistants |
| `ProfessionalService` | Business entity (from root layout) |

### Semantic HTML Attributes

```html
<main data-ai-content="article" data-ai-slug="post-slug">
  <div data-ai-speakable="quick-answer">...</div>
  <div data-ai-speakable="takeaways">...</div>
  <div data-ai-main-content="true">...</div>
</main>
```

## Environment Variables

Create a `.env.local` file with:

```bash
WORDPRESS_API_URL=https://admin.truepath406.com
```

`WORDPRESS_API_URL` is server-only and may be either the WordPress base URL or
the full `/graphql` endpoint. The production default above is used when the
variable is not set.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed via Vercel with automatic builds on push to `main`. WordPress images are served through Next.js Image Optimization via the `remotePatterns` config in `next.config.ts`.
