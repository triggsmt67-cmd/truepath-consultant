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
