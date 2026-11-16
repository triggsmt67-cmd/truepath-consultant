# Bing Webmaster Tools and IndexNow — November 16, 2026

Owner requested Bing alignment with the November 15 Search Console repairs and an IndexNow installation if needed.

## Baseline and changes

- Bing property: https://truepath406.com/ (already verified and accessible).
- Bing initially listed an old www sitemap submission. Submitted https://truepath406.com/sitemap.xml; Bing showed the canonical entry as Processing, submitted November 16. Historical discovered counts were stale and were not treated as the current live inventory.
- No active IndexNow activity was found in Bing; the site repository had no installation.
- Website-builds service page: Bing Index reported Indexed successfully. Bing Live URL test reported indexable with no SEO/GEO issues.
- New Businesses in ChatGPT article: stored Bing Index report said Blocked with no specific technical reason. A fresh Live URL test reported indexable with no SEO/GEO issues. These are distinct results; neither proves that the stored restriction has cleared.
- Public robots.txt permits bingbot, OAI-SearchBot and ChatGPT-User. The deliberate API crawl exclusion remains. The WordPress backend retains its noindex policy and does not advertise the retired backend sitemap.
- Existing redirects and metadata are shared website behavior: no separate Bing version of these fixes is required. Google's validation-started statuses cannot be transferred to Bing.

## IndexNow implementation

A generated root text verification file is installed in public/. indexnow/config.json identifies it. This IndexNow proof-of-host key is not an account credential. No additional website tracking script is needed.

scripts/indexnow.mjs fetches the canonical live sitemap, checks each page's HTTP response, canonical and indexing eligibility, and compares hashes of main content, relevant links/images, title, description, robots and structured data. Runtime JavaScript and CSS classes do not cause notifications. It notifies new/changed pages, and verifies missing sitemap pages actually redirect or return 404/410 before notifying removals. HTTP 202 remains pending for retry; errors do not advance the saved snapshot. Repeated notifications are separated by at least five minutes.

The GitHub Actions workflow runs after successful Production deployments, daily at 13:43 UTC, and on manual dispatch. The daily check catches WordPress changes after the existing hourly frontend cache refresh; it is not an immediate WordPress publish webhook. Fingerprint state persists in GitHub Actions cache and result logs are retained as artifacts for 30 days. Missing cache causes an initial inventory submission; routine runs send only changes. This first full inventory is appropriate to the recently updated/restructured site.

The workflow uses pinned official GitHub actions, read-only repository permission, no persistent checkout credentials, and no new service secrets. Notification receipt is not a promise of indexing, ranking, or ChatGPT citation.

Commands:

- npm run indexnow:check — live read-only comparison; no notification and no state advancement.
- npm run indexnow — verifies the live key and submits changes, recording .indexnow/latest-result.json and .indexnow/state.json.
- node --test scripts/test-indexnow.mjs — mocked behavior and failure-path checks.

## Verification before release

- Five IndexNow tests passed, including invalid-host/private-URL rejection, sitemap completeness, meaningful-content comparisons, HTTP 202 retention, successful retry, debounce, unchanged-content suppression, and failure isolation.
- Lint and production build including TypeScript passed.
- Five SEO tests passed against the live site: 28 sitemap pages, 43 internal paths, metadata, contact details, CMS HTML, crawl directives, redirects and 404s. Existing content/link phrase warnings remain unrelated.
- Workflow YAML parsed successfully. Repository Actions is enabled.

## Follow-up and rollback

Release/first-run results are recorded below after deployment. Bing must still recrawl/process the sitemap and affected URLs. Existing editorial findings in the November 15 review remain open; this task did not rewrite articles, remove expected redirects, or turn intentional noindex/404 exclusions into indexable pages.

To stop automatic notifications, disable the Notify IndexNow workflow in GitHub Actions. To remove the installation entirely, revert the key file/config/script/workflow changes and deploy. Do not remove the verification file while pending submissions still rely on it.

Sources: [IndexNow protocol](https://www.indexnow.org/documentation), [IndexNow FAQ](https://www.indexnow.org/faq), [Bing sitemap and AI-search guidance](https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/), [OpenAI crawler guidance](https://developers.openai.com/api/docs/bots).

## Initial release and verification

- Code commit `49fcf22bbd94204f5a711d5bde4ddf09e86699ed`, Vercel production deployment `dpl_9dRCLcaD6nPqFPkq7H2o89dW1b9s`: READY and assigned to truepath406.com.
- Public key file: HTTP 200, text/plain, exact key content confirmed (key-verification.json).
- Initial automatic deployment-status run [43919553161](https://github.com/triggsmt67-cmd/truepath-consultant/actions/runs/43919553161) submitted all 28 canonical pages following the recent site migration/rebuild. IndexNow returned HTTP 202, accepted pending validation. That is receipt, not proof of indexing. Exact result is saved in first-run/latest-result.json.
- The run's logs revealed that GitHub cache is unsupported for deployment_status events without a branch/tag ref. The follow-up replaces cache with state artifacts from successful runs of this exact workflow on main. Actions have read-only contents/actions permissions; no new credentials are stored. Node 24 action versions are pinned to verified official commits.
- Notifications run after successful Production deployments, daily at 13:43 UTC (6:43 a.m. Mountain Standard Time on this date), and on manual workflow dispatch. WordPress-only changes are picked up on the daily check after frontend revalidation, not immediately on publication. Unchanged fingerprints are skipped. HTTP 202 URLs remain pending for retry with a minimum five-minute interval.
- A missing state artifact initializes the migration inventory; expired existing state fails closed for review. Normal state artifacts are retained 90 days and refreshed on successful runs. Each run's public-URL result log is retained 30 days.
- Bing accepted the separate indexing request for the new ChatGPT guide (visible “Indexing requested.”). Bing had no explicit entries under Configuration → Block URLs.
- Started a ten-URL Site Scan named “November 16 canonical SEO fixes,” scoped to the homepage, four service pages, Work, Insights and three recently updated articles. No subdomain crawl was requested; email scan updates were unchecked. Initial status: Queued.
