# Website Strategy and Builds service-page release

November 15, 2026. Trevor authorized Search Console review, a distinct and useful page, a graphic, publication, verification, and README updates. He also asked for shorter pages and less repetition across service-page layouts. Previous source: `0e9ba1658c43ea773afffb938cbd5fc7617d5732`.

## Baseline and decision

Exact page: https://truepath406.com/services/website-builds. Google Search Console Web report, August 14–November 13: **50 impressions, 0 clicks, 0% CTR, average position 12.08** in the original export (12.1 in the UI). The one visible query is **conversion focused web design missoula**, with 9 impressions, 0 clicks, and average position 36.9.

The visible query accounts for 9 of 50 impressions. Do not assign the other 41 to invented queries or treat the overall position as this keyword’s position. This is a small, relevant signal for the offer, not proof of demand volume or the cause of zero clicks. The URL is already indexed and served over HTTPS. [Query evidence](search-console-page-queries.txt), [baseline](baseline.json), and [inspection](indexing-before.txt).

Decision: keep this money page, focus its offer on conversion-focused web design in Missoula, and make the page easier to evaluate before hiring. No URL change, consolidation, new city pages, or unrelated sitewide redesign.

## Distinct direction and changes

**Visual direction:** a concise editorial website brief for a service-business owner deciding what to repair, restructure, or rebuild. Preserve the established ivory, forest, rust, serif type, header, footer, and inquiry form. Use an asymmetric opening, a plain-language scope comparison, one custom decision graphic, and compact native disclosures.

The earlier page repeated the split photo hero, pitfalls grid, quote panel, animated phases, audience badges, and long FAQ sequence used by the other services. The replacement removes that pattern and the stock-style hero image. It removes page-specific scroll animations and their imports. This is a page-specific redesign; the other service pages are not silently restyled.

- Align title, H1, introduction, social metadata, and Service schema with the relevant visible query and actual service area.
- Explain three possible scopes, with a reason for each: repair a specific obstacle; restructure useful content; consider rebuilding when platform constraints make the required work impractical.
- Show a reviewable brief: purposeful pages, factual content and proof, a working contact route, and a considered launch.
- Use a verifiable example from this website: the Lead Response page kept its URL and request form while its copy and workflow explanation changed. Link that page without claiming traffic or conversion gains.
- Consolidate thirteen FAQs into six expandable answers. Cover price/timing, copy/photos, ownership/editing, integrations, rankings, and page count. Preserve relevant boundaries without repeating whole sections.
- Update this URL’s sitemap revision date. Retain its canonical URL and indexability.

Main content is **829 words versus 1,418 before, a 41.5% reduction**, using the same word-token method and including all collapsed FAQ answers. [Comparison](length-comparison.json), [before text/count](before.json), and [before main HTML](before-main.html). Shortening is an editorial choice for this offer, not a ranking target. The page has zero em dashes in its main copy.

## Graphic and sources

- [Decision map PNG](../../public/downloads/website-repair-or-rebuild-map.png), 1080 × 960.
- [Editable SVG](../../public/downloads/website-repair-or-rebuild-map.svg), including title and text description.
- [Rebuild the graphic](build-decision-map.mjs): `node docs/website-builds-service-2026-11-15/build-decision-map.mjs`.

The map is an original review aid with “consider” outcomes, not an automated diagnosis or universal spending rule. Text beside it explains the options. No fabricated client screenshot, statistic, testimonial, or credential. Research, copy, and vector code were prepared with AI assistance and checked; the exported graphic and rendered page were visually reviewed.

Sources reopened November 15:

- [Google’s SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): no ideal word count; clear, useful content, descriptive titles, and relevant links/media.
- [People-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): useful, specific content and honest evidence. Improvements are not a guarantee of ranking gains.
- [Scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content): the policy concerns many low-value pages produced to manipulate rankings. Our assessment is that shared branding or a familiar layout alone does not establish that violation. The observed problem here was repetition and weak differentiation for buyers.
- [Site moves and URL mapping](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): inventory valuable URLs, map changes, test redirects, and monitor. Published copy offers a scoped launch review; no claim of zero migration risk.

No provider integration or new measurement setup was activated. Prices, timing, licenses, files, and support remain dependent on an agreed scope. GA4 and inquiry measurement remain deferred, not zero.

## Verification and follow-up

Local production build/TypeScript and ESLint passed. The page was inspected at 1440, 768, and 390 pixels; client and scroll widths matched. The request form opened/closed without submitting an inquiry. A native FAQ opened with Enter and closed with Enter. The decision graphic was revised from “Specific problem?” to “Focused fix enough?” to make its branching question clearer. Final release checks are recorded below after publication. Review search outcomes after recrawl and about four to six weeks, approximately December 13–27, using equal 28-day windows and the exact page filter. Assess query mix, impressions, CTR, clicks, and positions together. Concurrent releases, seasonality, and small samples limit attribution. Qualified inquiry outcomes are not yet measured. Do not describe this content release as a proven ranking improvement.

## Published and verified

- Source commit `af2d78684142be1f56201276887ad44f86acc8ad`; Vercel production deployment `dpl_2iUuuNY9RmnBm4ofVBrnAPyRxuHj`, **READY**, assigned to `truepath406.com`.
- Production build/TypeScript and ESLint passed. All five production SEO checks passed across 26 sitemap pages and 38 internal paths, including CMS article HTML, metadata, robots, redirects, and expected 404s. Existing optional editorial-link phrase warnings remain informational. [Check output](seo-checks.txt).
- Targeted live checks passed: HTTP 200, self-canonical, index/follow, exact new title/H1/description, six native expandable answers matching FAQ schema, Service name, 829 main-content words, zero em dashes, retained example link, and the sitemap revision date. [Verification JSON](live-verification.json).
- Both public map downloads return 200 and match the local bytes; SVG XML parses. The PNG is 94,692 bytes. The original vector and generator remain editable in Git.
- Desktop, tablet, and mobile visual checks passed; no horizontal overflow. Both request buttons fit on mobile. The live request form opened and closed without sending an inquiry. Native FAQs were tested with Enter. No runtime errors were returned in the selected Vercel scan range. Field Core Web Vitals and business conversion outcomes were not newly measured.
- Search Console confirmed **Indexing requested** after live URL checking. [Evidence](indexing-request.txt). This is not proof of recrawl completion or a ranking gain.
- Screenshot: `/Users/trevorriggs/Documents/Codex/outputs/truepath-website-builds-live-2026-11-15.jpg`. Before screenshot: `/Users/trevorriggs/Documents/Codex/outputs/truepath-website-builds-before-2026-11-15.jpg`.
- WordPress articles, the other two service-page designs, tracking, and external settings were not changed. This release establishes a distinct direction for this page and a less formulaic editorial standard for future work.
