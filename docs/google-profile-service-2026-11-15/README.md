# Google Profile service-page release

November 15, 2026. Trevor authorized improving and publishing this page using its Search Console queries. The owning source is the Next.js route, not WordPress. Article publication and the three remaining article drafts are separate work.

## What the evidence supports

Exact URL: https://truepath406.com/services/google-profile

The page is indexed. The August 14–November 13 Web baseline is **57 impressions, zero clicks, average position 15.11** (UI rounds to 15.1). Exact-page filtering confirms these two visible queries:

| Query | Impressions | Clicks | Average position, UI |
|---|---:|---:|---:|
| google business profile optimization missoula | 24 | 0 | 21.6 |
| rank on google maps in missoula mt | 5 | 0 | 23.2 |

[Raw visible report](search-console-page-queries.txt) and [structured baseline](baseline.json). These rows cover 29 of 57 impressions; hidden query data is not zero. The sample supports a local commercial focus but cannot prove why no one clicked. These are website search positions, not Maps rankings. The older domain-level export did not establish the landing page; the exact-page filter now does.

## Changes

1. Replace “Show Up Better on Google Maps” with **Google Business Profile Optimization in Missoula**. Align the search title, social titles, description, introduction, and Service name with that actual offer.
2. Replace the generic quote panel with a three-step profile → website → inquiry example. A fictional plumber helps readers check service continuity. It is explicitly illustrative, with no client-result claim. Link the existing owner guide and 30-page planning map without making page count a requirement.
3. Explain the 15-minute Lead Review, what to bring, how to request it, and that agreed cleanup work is separate. Retain the working inquiry form and existing service scope. Add no invented price, turnaround, credentials, testimonial, or results.
4. Tighten ten visible FAQs and matching schema around scope, Missoula Maps visibility, cost, timing, eligibility, geographic limits, reviews, website alignment, and suspension review. Correct review invitations and metric definitions. Keep reporting decisions with Google.
5. Correct heading hierarchy and the page’s decorative overlay width so a desktop scrollbar does not create horizontal overflow. Keep the existing brand, imagery, animations, URL, canonical, navigation, and indexability. Add the actual revision date for this URL in the sitemap.

Voice check: no em dashes, invented experience, keyword-city lists, or ranking promises. Reader purpose: help a Missoula service-business owner decide whether a profile review is useful and understand the next step. Unique contribution: the service-continuity example plus a specific review process, rather than another general optimization tutorial.

## Research and material claims

Official sources reopened November 15, 2026. Ordinary commercial service information; no regulated professional advice or fabricated business evidence.

| Claim or decision | Evidence and boundary |
|---|---|
| Accurate profile data; relevance, distance, popularity; more reviews and positive ratings can help | [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en). No fixed rank, timeline, or service-area expansion guarantee. |
| Real business name, eligible locations, accurate service area | [Business representation rules](https://support.google.com/business/answer/3038177?hl=en). Eligibility must be reviewed for each business. |
| Neutral review requests, no incentives or selective positive solicitation | [Review policies](https://support.google.com/contributionpolicy/answer/7400114?hl=en). No required review wording or pressured customers. |
| Call-button clicks differ from answered calls/bookings; reporting can include Ads | [Profile performance definitions](https://support.google.com/business/answer/9918094?hl=en). Use only available applicable metrics and separate inquiry records. |
| Descriptive title and prominent main heading | [Search title guidance](https://developers.google.com/search/docs/appearance/title-link). Google may rewrite titles/snippets. |
| Useful original contribution and adequate answers | [People-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). No word-count target or claim that FAQs/schema earn higher rankings. |
| Missoula-based Trevor, Montana service-business audience, 15-minute Lead Review and email scheduling | Existing site and inquiry form. No new location, price, case history, or credential added. |

Internal editorial assessment: **91/100 (91.25/100 before rounding), high confidence, 100% content-criteria coverage**. This is our judgment, not a Google score or ranking forecast. Rubric criterion ratings in row order: 4,4 / 3,3 / 4,4 / 3,3 / 4,4 / 4,4, with weights 10,10 / 10,10 / 12.5,12.5 / 7.5,7.5 / 7.5,7.5 / 2.5,2.5. Remaining limitation: no verified client outcome study is supplied. Do not invent one. Decision: publish the authorized service clarification; assess search outcomes later.

## Verification and follow-up

Local checks passed: ESLint, production compilation and TypeScript, four local SEO tests, and desktop/mobile layout checks. At 390px, content width and scroll width both measured 375px with the scrollbar present. The review form opened and closed without submitting an inquiry. Release verification is recorded below after deployment. Main content is present in initial HTML. FAQ schema is generated from the same data as visible answers. Structured-data syntax does not imply rich-result eligibility. Core Web Vitals and field performance are not newly measured by this content update.

After Google recrawls, compare equal 28-day windows using the exact page filter. First outcome review: approximately December 13–27, 2026, allowing four to six weeks and sufficient data. Compare query mix, impressions, clicks, CTR, and positions together; keep seasonality and small counts in view. No reminder was scheduled. GA4 and inquiry measurement remain deferred, so qualified leads are unmeasured rather than zero. Other article updates are happening in the same period, preventing clean causal attribution.

## Live release verified

- Production source commit: `60d773ca2ef739d1e03e311a04e4ee8f0b588684`; Vercel deployment `dpl_4ukKUbrASZTuet2LQqDVPVRicJvi`, **READY**, assigned to `truepath406.com`. Production build duration approximately 20 seconds.
- Local production build/TypeScript and ESLint passed. The five production SEO checks passed across 26 sitemap pages and 33 internal paths. Existing optional editorial-link phrase warnings remain informational.
- Targeted live checks: HTTP 200, self-canonical, index/follow, new title/H1/descriptions, ten visible FAQ answers matching schema, Service name, illustrative example, zero em dashes in main text, and sitemap revision date. [Machine-readable verification](live-verification.json) and [SEO check output](seo-checks.txt).
- Desktop and mobile layout checked. Live review form opens and closes; no inquiry submitted. No runtime errors were returned by Vercel’s selected-range error scan. This is a point-in-time result, not an uptime or field-performance guarantee.
- Search Console confirmed **Indexing requested** and placement in a priority crawl queue. [Confirmation record](indexing-request.txt). The page was already indexed; this request does not establish that Google has recrawled the new copy or changed its rankings.
- Screenshot: `/Users/trevorriggs/Documents/Codex/outputs/truepath-google-profile-service-live-2026-11-15.jpg`.
- WordPress content and tracking settings were not changed. Roll back application changes through Git if needed; the previous source is `ed6c1b6830a120c125432e07fa896d5b6e997b55`. Revert the scoped release rather than overwriting subsequent work.
