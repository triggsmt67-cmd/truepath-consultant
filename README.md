# True Path Digital — Consulting Website

A high-performance marketing consultancy website for **True Path Digital**, built with Next.js (App Router) and a headless WordPress CMS backend. Designed for owner-operated service businesses — HVAC, plumbing, electrical — with an emphasis on AI search visibility and conversion.

**Live:** [truepath406.com](https://truepath406.com)

## SEO improvement checklist

Updated November 15, 2026. Work through these steps in order and update the
checkboxes as each item is completed. **Steps 1 and 2 are live and verified. Step 3 Search Console collection is
complete; GA4 and inquiry measurement are deferred.
The Step 4 Google Profile and Booking articles are published with reference
graphics and downloads; three articles and the service-page proposal remain.**
Trevor approved both releases on November 15, 2026. Article rewrites,
consolidation, content removal, and unrelated settings remain separate work.

### November 15 repository checkpoint

- [x] Complete and verify Steps 1 and 2 on the live site and WordPress backend.
- [x] Complete Step 3 Search Console collection and save the content baseline.
- [x] Complete Step 4 preparation: five researched article replacements,
  exact field comparisons, reading preview, and the separate Google Profile
  service-page proposal.
- [x] Save the completed work and review artifacts in the Git repository.

Trevor requested this checkpoint and a Vercel rebuild on November 15. The
remaining article and service-page replacements remain **review-only and unpublished**
while he reads them. The subsequently approved Google Profile and Booking
articles are published separately; see their release records below. GA4 remains deferred. The remaining publication checkboxes
and Steps 5–7 below are intentionally still open.

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

- [x] Inspect the redirect rule/plugin/server configuration and prepare the
  exact changes for approval before modifying live settings.
- [x] After approval, retire the irrelevant admin frontend and stop exposing
  unnecessary archive links and broken backend sitemap destinations. Retain
  the backend's existing HTTP `noindex, nofollow` policy.
  Send actual legacy articles directly to their matching public articles;
  let nonexistent archives return appropriate 404/410 responses.
- [x] Verify GraphQL, REST reads, images, login, the authenticated dashboard,
  an existing draft preview, and the public site. Keep APIs accessible and
  retain the existing publishing and hourly revalidation configuration.

**Applied November 15, 2026, with Trevor's approval.** The
[Step 2 cleanup and release record](docs/wordpress-cleanup-proposal/README.md)
contains the before/after `.htaccess`, installed helper and minimal 404 template,
the Yoast sitemap setting change, and rollback instructions. The two existing
Hostinger must-use plugins and six regular active plugins were preserved.

Verification passed: **46 backend checks**, including all 19 published article
redirects and public destinations; direct archive/feed/sitemap 404s; crawlable
robots.txt without the admin sitemap; GraphQL and REST reads; login, media,
and tracking parameters. The five SEO tests also passed against the public
site, covering all 26 sitemap pages and 26 internal paths. Chrome verified
the saved XML sitemap switch is off, the REST switch remains on, and an
existing signed-in draft preview renders. Hostinger's cache was cleared only
for `admin.truepath406.com` to remove cached old redirects and robots output.
See [HTTP verification evidence](docs/wordpress-cleanup-proposal/live-verification-2026-11-15.json).

Rollback copy: `/Users/trevorriggs/.codex/backups/truepath-wordpress-2026-11-15/htaccess-before.txt`.
The reviewed baseline is also retained in the cleanup folder. No article was
edited, deleted, or published for testing; a full new-publication/revalidation
cycle was not exercised. Search Console submissions remain unchanged.

Correction to the original audit: the admin homepage already sends an HTTP
`noindex, nofollow` header, despite its conflicting HTML `index, follow` tag.
The earlier claim that it was indexable missed that HTTP header. The confirmed
redirect source is the custom block in `.htaccess`, not Yoast's redirect manager.

### Step 3 Gather missing Search Console details and a content baseline

- [x] Obtain the exact URLs for the two redirect errors, duplicate/canonical
  cases, discovered-but-not-indexed pages, and seven noindex exclusions.
- [x] Inspect the three discovered final URLs and two old duplicate URLs.
  Record Google's selected canonical or N/A and distinguish recorded index data
  from live HTTP checks. `/work` now reports unknown in Inspection, despite the
  older discovered-page list.
- [x] Save three-month and 28-day search performance, canonical content inventory,
  and available backlink information before consolidation.
- [ ] Add GA4 and qualified inquiry measurements later. **Deferred by Trevor;
  unavailable, not zero.** No GA4 setup is included in this step.

[Step 3 baseline, exact URLs, and evidence](docs/search-console-baseline-2026-11-15/README.md)
records 8 clicks/982 impressions over August 14–November 13 and 1 click/228
impressions over October 17–November 13. All seven noindex examples are backend
URLs. Four old error/duplicate examples now reach the correct articles through
three redirects; shortening those chains remains a technical follow-up.
No content, indexing requests, or Search Console submissions were changed.

### Step 4 Correct the priority articles

- [x] Prepare revisions for review: fix the booking-rate formula and unsupported
  response-time claims in **Home Service Booking**, and update the outdated
  posting advice and ranking claims in **Inactive Google Profile**.
- [x] Prepare removal of the editing instruction from **Why Digital Marketing Fails Early**;
  verify source claims in **Estimate Follow-Up** and **Reviews Process**, and
  reconcile conflicting follow-up advice in the proposed drafts.

The [Step 4 review package](docs/step-four-article-review-2026-11-15/README.md)
contains five full replacements, research/source notes, current/proposed fields,
corrected summaries and FAQs, and an unapplied frontend patch.
[Open the reading preview](docs/step-four-article-review-2026-11-15/review.html).
The companion Google Profile service-page proposal targets the Missoula
optimization phrase with clearer metadata, H1, and introductory copy.
**Google Profile article approved and published November 15.** Trevor reviewed
the owner-friendly rewrite and authorized a colorful website planning map and
WordPress publication. The map includes 30 numbered example pages, a text
equivalent, PNG/CSV downloads, and optional image-and-credit markup. The
frontend now uses the WordPress article title.
[Google Profile article and map release record](docs/google-profile-map-2026-11-15/README.md).
Live verification passed: revised title/body, four FAQs and schema, all four
downloads, and five SEO checks across 26 sitemap pages and 29 internal paths.
The Booking article was then authorized for full completion and publication:
[Booking guide and inquiry-map release record](docs/booking-guide-2026-11-15/README.md).
It now includes a reconciled 30-inquiry example, five outcome groups, a reference
graphic, blank and filled CSV worksheets, and five corrected FAQs.
Live verification passed: article metadata, body, five FAQs/schema, all five
resource files, and five SEO checks across 26 sitemap pages and 33 internal paths.
The remaining three article revisions and service-page proposal are unapplied.

- [x] Publish the approved Google Profile article and its matching summary/FAQ
  fields with the reference map.
- [x] Research, rewrite, illustrate, and publish the Booking article and its
  corrected formula, summaries, FAQs, and worksheet downloads.
- [ ] Get approval for the remaining three article revisions and service-page
  proposal before publication; verify their text, metadata, links, and schema.

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
