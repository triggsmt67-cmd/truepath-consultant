# Search Console and content baseline — November 15, 2026

Step 3 collection is complete for available Search Console data. GA4 setup is deferred at Trevor's request. Organic sessions, inquiry events, qualified leads, and conversion rates are **unavailable**, not zero. No tracking settings, content, indexing requests, or sitemap submissions were changed during collection.

## Search performance

Domain property: `sc-domain:truepath406.com`; Web (text-based) search, no query or page filter.

| Period | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| August 14–November 13, 2026 (92 days) | 8 | 982 | 0.8% | 9.4 |
| October 17–November 13, 2026 (28 days) | 1 | 228 | 0.4% | 8.3 |

These overlapping windows are a baseline, not a before/after comparison. They predate today's fixes. Three-month daily chart totals independently reconcile to 8 clicks and 982 impressions. Property totals are not reconstructed by adding page impressions or URL aliases.

The original three-month ZIP and all seven extracted CSVs are preserved here. Chrome blocked the second CSV download; the 28-day table and totals were captured from the visible report instead. The derived CSV removes UI action labels from one URL cell.

[Content baseline CSV](content-baseline.csv) joins the live sitemap's **26 canonical pages, including 19 articles**, to reported metrics for both periods. “Not reported” means the URL is absent from that report, not proven zero activity. Legacy URLs remain separate in the source page reports.

The homepage recorded 6 clicks/271 impressions over three months. The current Estimate Follow-Up article recorded 2/154; it supplied the only click in the 28-day period (1/90). Its old URL variants also have impressions, so preserve those redirects and review claims carefully when rewriting. Low traffic alone does not justify deleting an article.

## Exact missing indexing examples

The Page indexing report was last updated **November 8, 2026**, with 17 indexed and 76 not indexed across eight reasons. These are historic observations, not a verdict on today's cleanup. The five previously missing issue lists are captured below, with dates retained in their JSON files.

### Redirect errors — 2

- `https://www.truepath406.com/blog/ai-search-visibility-why-local-businesses-are-disappearing/` — last crawled 4 Aug 2026.
- `https://www.truepath406.com/blog/marketing-attention-is-the-scarce-resource-and-that-changes-everything/` — last crawled 9 Jun 2026.

### Duplicate without user-selected canonical — 1

- `https://www.truepath406.com/blog/technician-utilization-profit-leak/` — last crawled 2 Jun 2026.

### Google selected a different canonical — 1

- `https://www.truepath406.com/blog/service-business-website/` — last crawled 8 Jun 2026.

### Discovered, currently not indexed — 3

- `https://truepath406.com/insights` — last crawled N/A.
- `https://truepath406.com/insights/local-service-business-google-visibility` — last crawled N/A.
- `https://truepath406.com/work` — last crawled N/A.

### Excluded by noindex — 7

- `https://admin.truepath406.com/google-profile-is-killing-your-local-visibility/` — last crawled 26 Oct 2026.
- `https://admin.truepath406.com/home-service-booking/` — last crawled 26 Oct 2026.
- `https://admin.truepath406.com/the-1-profit-leak-in-a-service-business/` — last crawled 18 Sept 2026.
- `https://admin.truepath406.com/service-business-website/` — last crawled 17 Jul 2026.
- `https://admin.truepath406.com/thin-service-pages-look-generic/` — last crawled 7 Jul 2026.
- `https://admin.truepath406.com/?s={search_term_string}` — last crawled 7 Jul 2026.
- `https://admin.truepath406.com/` — last crawled 12 Apr 2026.

All seven noindex examples belong to the intentionally excluded WordPress backend. Keep the exclusion; do not make these URLs indexable to reduce the report count.

## URL Inspection versus current live behavior

Saved URL Inspection records are Google's recorded index data, not live tests:

- `/insights`: discovered, currently not indexed; no recorded crawl or selected canonical.
- `/insights/local-service-business-google-visibility`: discovered, currently not indexed; no recorded crawl or selected canonical; no referring sitemap detected, with the old `www` sitemap listed as a referring page.
- `/work`: the November 8 issue list says discovered, currently not indexed, but the inspection collected November 15 says **URL is unknown to Google**. Preserve both observations; do not assume a fresh crawl or invent a canonical.
- Old `www` Technician Utilization URL: duplicate without user-selected canonical, crawled June 2. Google selected the non-`www` **old `/blog/` URL**, not today's `/insights/` URL.
- Old `www` Service Business Website URL: Google selected a different canonical, crawled June 8. Its chosen canonical was also the non-`www` old `/blog/` URL.

[Current HTTP evidence](live-url-verification.json) separately confirms that all four old redirect/duplicate examples now follow **three 308 redirects** to the matching `/insights/` page, return 200, and declare that final URL as canonical. No current loop or failed destination was observed. Shortening these chains is a follow-up technical improvement; the historic error alone does not prove a current failure.

All three discovered URLs return 200 and self-canonicalize today. This does not prove Google has crawled or indexed them. Follow up on the canonical public sitemap and important final URLs in Step 7; no Request Indexing or Validate Fix action was submitted here.

## Backlink baseline and content decisions

Search Console reports **192 external links from 6 linking sites**, all targeting the homepage in its target-page table. Top five sites: unitedformulas.com (103), missoulalegends.com (55), greatfallsheatingandair.com (17), benchmarkmissoula.com (13), and agencywebatlas.com (2). This is a partial Search Console link report, not an exhaustive backlink audit. No article target is reported; that is not proof that articles have no backlinks.

The internal-link report lists 97 links: homepage 28 and each of the three service pages 23. This historic partial graph does not replace today's site crawl.

Neither proposed AI-search consolidation article has a row in either captured performance table, and neither appears as an external link target. Treat their traffic and backlink evidence as **not reported**. This supports reviewing overlap, but does not establish that either page has no value or authorize a redirect.

Next: Step 4, prepare factual corrections to priority articles for review. Preserve Estimate Follow-Up's URL and useful content. Keep useful service pages, `/work`, `/insights`, and the Local SEO article while addressing discovery and content quality. Step 5 consolidation remains subject to review and approval. Add GA4 and inquiry measurement later as a separate task.

## Source files

- `performance-three-months-original.zip`: original Search Console download; extracted CSVs use the `performance-three-months-` prefix.
- `performance-28-days-ui.json` and `performance-28-days-pages.csv`: visible report capture and cleaned derived table.
- `content-baseline.csv` and `public-sitemap.xml`: canonical page inventory and metric join.
- Five issue JSON files: exact URLs and report/capture dates.
- `inspection-*.json`: five recorded inspections; canonicals left unavailable where Google reports N/A.
- `external-link-targets-ui.json` and `links-overview-ui.json`: visible backlink report evidence.
- `live-url-verification.json`: public HTTP redirect and canonical checks.
