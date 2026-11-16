# Search Console validation review

November 15, 2026. The initial read-only review was followed by the owner's instruction to submit the confirmed repairs. All three repaired issue categories now show **Validation started**, started 15/11/2026. This is not a Google validation pass. Prior per-URL indexing requests for the three service pages are separate from issue-category validation.

## Current report

15 indexed; 79 not indexed across eight active reasons at the initial report snapshot. Blocked by robots.txt is Passed with zero affected URLs. Counts are report totals; the individual URL inspections below give the more specific article status. Only the three repaired categories were submitted for validation.

| Category | Count | Review result |
|---|---:|---|
| Page with redirect | 33 | All 33 examples followed to HTTP 200. Expected legacy, hostname, HTTP, and old route exclusions. |
| Not found (404) | 12 | All 12 return 404 after following redirects. Eleven backend archive/resource URLs and the old public `/hello-world/`. No relevant replacement was established. |
| Redirect error | 2 | Validation started. Both old www/blog URLs now reach their matching public insights page through three 308 hops; final HTTP 200 and self-canonical. Google last crawled these examples June/August. |
| Duplicate without user-selected canonical | 1 | Validation started. Old www/blog Technician Utilization URL now redirects through three 308 hops to its matching insights page, HTTP 200, self-canonical. Report crawl June 2. |
| Google chose different canonical than user | 1 | Validation started. Old www/blog Service Business Website URL now redirects through three 308 hops to its matching insights page, HTTP 200, self-canonical. Report crawl June 8. |
| Excluded by noindex | 7 | All examples are on the WordPress backend, which is deliberately excluded from public search. |
| Crawled, currently not indexed | 20 | Mixed inventory: 8 canonical insights articles, old blog URLs, backend and JavaScript resources, and the unresolved privacy-policy URL. All 8 canonical articles individually inspected below. |
| Discovered, currently not indexed | 3 | `/insights`, `/work`, `/insights/local-service-business-google-visibility`: all three individually confirmed still discovered/unindexed, no crawl recorded. |

[Current HTTP checks for 49 reported URLs](live-url-checks.json). The four historical redirect/canonical cases have healthy final responses today; this does not prove Google has recrawled them or selected the new canonical. Three-hop chains remain a possible cleanup improvement. All raw category captures and the overview are saved beside this record.

## Submitted validation evidence

Saved the visible Google response after each submission: [redirect errors](redirect-error-validation-started.txt), [duplicate without canonical](duplicate-without-canonical-validation-started.txt), [Google chose a different canonical](google-chose-canonical-validation-started.txt). All show Validation started and the November 15 start date. Expected redirects, intentional noindex, and removed resources were not submitted as repaired errors.

## Individual inspections and content triage

All eight crawled articles report successful fetch, crawling and indexing allowed, the correct public self-canonical, and Google-selected canonical “Inspected URL.” This does not establish a specific reason for Google declining to index them. No additional blanket technical fix is supported by these inspections. Saved raw results are `inspection-01.txt` through `inspection-11.txt`; current CMS content is in [content-inventory.json](content-inventory.json). Word counts are descriptive, not a Google quality threshold.

| URL / title | Inspection | Last crawl | Recommended next action |
|---|---|---|---|
| [Google Profile](https://truepath406.com/insights/google-profile-is-killing-your-local-visibility) | Crawled, not indexed | Oct 26 | Recent Nov 15 revision postdates Google's crawl. Preserve useful map and examples; assess after recrawl before another rewrite. |
| [Reviews Process](https://truepath406.com/insights/reviews-feel-awkward-when-theres-no-process) | Crawled, not indexed | Sep 20 | Prioritize the prepared correction: remove unsupported ranking certainty and requests that steer review wording; verify survey figures and first-person shop evidence. Prior prepared correction remains unpublished. |
| [Estimate Follow-Up](https://truepath406.com/insights/how-to-follow-up-on-an-estimate-before-it-goes-cold) | Crawled, not indexed | Sep 18 | Apply the prepared, separately reviewed correction next: practical timing/ownership examples, narrower causation claims, substantiate any client anecdote. Do not assume silence explains most lost estimates. |
| [Profit Leak](https://truepath406.com/insights/the-1-profit-leak-in-a-service-business) | Crawled, not indexed | Sep 18 | High priority: published “Links added” editorial notes; unsupported efficiency benchmarks and annual-loss example. Remove editing notes in an approved correction and verify or replace figures with a labeled calculation. |
| [Thin Service Pages](https://truepath406.com/insights/thin-service-pages-look-generic) | Crawled, not indexed | Sep 7 | Not thin by length (about 1,600 words). Replace absolute claims about Google seeing through pages and AI rankings; verify cited survey figures; add a specific annotated service-page example instead of padding. |
| [Why Marketing Fails Early](https://truepath406.com/insights/why-digital-marketing-fails-early) | Crawled, not indexed | Aug 13 | High priority: public drafting instruction at ending (“If you want to localize this tighter…”), unsupported platform assertions, client anecdote to substantiate. Prior prepared correction remains unpublished. |
| [Marketing Attention](https://truepath406.com/insights/marketing-attention-is-the-scarce-resource-and-that-changes-everything) | Crawled, not indexed | Jul 27 | Keep only if it adds a distinct, demonstrable owner decision. Verify the claimed team result; replace general declarations with a worked scheduling/content-priority example. Review overlap with other marketing opinion articles before deciding on consolidation. |
| [Leak Every Home Service Business Should Measure](https://truepath406.com/insights/the-leak-every-home-service-business-should-measure) | Crawled, not indexed | Jul 27 | High priority: literal “[Insert link to Google Local Services Ads Help documentation]” placeholder is published. Verify the LSA claim, remove the placeholder, and distinguish this phone-response article from Booking and Lead Response. |
| [Insights index](https://truepath406.com/insights) | Discovered, not indexed | None | Keep this useful discovery page linked from navigation and sitemap. Confirm article links remain usable and monitor crawl; do not manufacture extra prose for a word count. |
| [Work](https://truepath406.com/work) | Discovered, not indexed | None | Preserve actual portfolio work. Add only owner-supported context/results; the existing evidence/percentage-claim audit remains open. Do not invent proof to prompt indexing. |
| [Local service Google visibility](https://truepath406.com/insights/local-service-business-google-visibility) | Discovered, not indexed | None | Current revised ~967-word guide has a clear owner accountability angle. Keep linked, confirm sitemap visibility and monitor initial crawl. Google reports only the old www sitemap as a discovery source in this inspection; that is not proof the current sitemap omits it. |

No article was deleted, noindexed, consolidated or rewritten during this inspection. Older public editing artifacts are findings for the next content pass, not completed repairs. Unindexed status alone is not a reason to remove useful content. The new Businesses in ChatGPT publication is a separate task and does not resolve these older article findings.

## Next actions

1. Recheck the three submitted categories when Google completes validation. Do not label “started” as “passed.”
2. Preserve expected redirects and intentional 404/noindex exclusions. Do not redirect removed or meaningless URLs to unrelated pages just to reduce counts.
3. Work through the editorial findings above, prioritizing public editing artifacts and unsupported claims. Then request recrawl of materially corrected priority pages where appropriate. No new per-URL indexing requests were submitted in this run; this run submitted category validation only.
4. Resolve the privacy-policy content requirement from the existing audit; the URL still returns 404, with the content requirement unresolved. Its presence in a historical crawled category does not mean it currently returns 200.

Google explains that exclusions can be appropriate, validation is distinct from live checks, and counts can update on recrawl without a validation submission: [Page indexing report documentation](https://support.google.com/webmasters/answer/7440203?hl=en), consulted November 15.
