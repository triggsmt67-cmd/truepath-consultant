# WordPress frontend cleanup and release record

**Approved and applied November 15, 2026.** The reviewed helper and 404 template are installed, the custom `.htaccess` catch-all is removed, and Yoast's XML sitemap feature is disabled. Step 1's public release remains live. The plan below records the approved scope, inspected baseline, exact files, and recovery procedure.

## Live verification completed

- **46 backend HTTP checks passed**, including direct 301s for all 19 published articles and 200 responses at their public destinations; the homepage redirect; direct archive/feed/missing-page/sitemap 404s; robots.txt; GraphQL; REST reads; login; attribution parameters; and a real featured image. [Saved results](live-verification-2026-11-15.json).
- The five SEO tests passed against the public domain, including all 26 sitemap pages and 26 distinct internal paths, metadata, canonicals, redirects, and intended exclusions.
- Authenticated Chrome checks confirmed the dashboard/content list works, an existing draft preview stays on the backend and renders, XML sitemaps remain disabled after reload, and the neighboring REST feature remains enabled.
- The saved `.htaccess` was read back. A backend-only Hostinger cache purge removed cached historical redirect/robots responses; the exact original URLs passed afterward.
- No article content, DNS, existing plugin activation, API permissions, or Search Console submissions were changed. No real form/email submission or test publication was performed. The new-publication-to-revalidation cycle was not exercised; existing published data and the unchanged hourly frontend revalidation configuration were checked.
- The fresh pre-change `.htaccess` matched the inspected baseline. A recovery copy is stored outside the web root at `/Users/trevorriggs/.codex/backups/truepath-wordpress-2026-11-15/htaccess-before.txt`. No separate WordPress staging copy was used; the local checks preceded the approved live rollout.

## What inspection established

The authenticated WordPress dashboard, installed plugins, Reading settings, active theme functions, Yoast redirect screen, Yoast file editor, and Yoast Site features were inspected in Chrome. The WordPress connector does not currently list this self-hosted site.

The redirect owner is the custom **TP DIGITAL HEADLESS SEO REDIRECTS** block in the site's root `.htaccess`, visible under **Yoast SEO → Tools → File editor**. Its catch-all rule is:

```apache
RewriteRule ^/?(.*)$ https://truepath406.com/blog/$1 [R=301,L]
```

Its exceptions protect critical WordPress paths, but the `sitemap.*.xml` exception does not cover child filenames such as `post-sitemap.xml`. The rule treats archives, nonexistent pages, and those child sitemaps as if they were articles. The root is explicitly excluded, leaving the flower-shop template and archive widgets publicly visible.

The same block already sets `X-Robots-Tag: noindex, nofollow`. This header was present in the original audit capture as well as today's check. **The earlier claim that the backend homepage was indexable was incorrect:** the audit read its HTML `index, follow` tag but missed the lowercase HTTP header name. Google applies the more restrictive rule. This cleanup retires unnecessary frontend output and broken routing; it does not introduce a previously missing backend indexing restriction. [Google's robots rules](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

Settings and components inspected before cleanup:

| Item | Inspected value | Proposed treatment |
| --- | --- | --- |
| Reading homepage | Static **Home** page; no posts page | Keep stored setting and page; redirect its public frontend to the real homepage |
| Reading search visibility | “Discourage search engines” unchecked | Leave unchanged; keep crawling available to observe the existing HTTP noindex |
| Yoast XML sitemaps | Enabled | Disable only this feature |
| Yoast REST API endpoint | Enabled | Keep enabled |
| Yoast plain redirects | No items; premium controls disabled | Do not add rules here or buy Premium |
| Physical robots.txt | No physical file; virtual output advertises admin sitemap | Keep virtual robots; remove CMS sitemap advertising through the helper |
| Active theme | Twenty Twenty-One; no routing code found in its inspected functions.php | No theme-file edits or theme switch |
| Six active plugins | ACF, Hostinger Reach, WP Webhooks, WPGraphQL, WPGraphQL for ACF, Yoast SEO | Keep active; no bulk updates/deactivations |
| Two must-use plugins | Hostinger Preview Domain; Hostinger Smart Auto Updates | Preserve both |

## Exact approved changes

### 1 Replace only the custom htaccess block

The fresh live file matched [htaccess-before.txt](htaccess-before.txt), and its custom block was replaced with [htaccess-after.txt](htaccess-after.txt). The WordPress-managed block and cache markers were preserved.

The replacement custom block is:

```apache
# --- BEGIN TP DIGITAL HEADLESS SEO REDIRECTS ---
# Preserve the existing backend indexing policy. Public frontend routing is
# handled by tpd-headless-frontend.php after WordPress resolves real content.
<IfModule mod_headers.c>
Header set X-Robots-Tag "noindex, nofollow"
</IfModule>
# --- END TP DIGITAL HEADLESS SEO REDIRECTS ---
```

The LiteSpeed marker blocks and the WordPress-managed rewrite/authorization block remain unchanged. Remove the old catch-all redirect rather than adding another competing rule. Retain the current backend-wide noindex policy; narrowing that policy for media indexing would be a separate reviewed change.

### 2 Add a small WordPress routing helper

Installed files on the server:

- `wp-content/mu-plugins/tpd-headless-frontend.php` — [complete review copy](tpd-headless-frontend.php).
- `wp-content/mu-plugins/tpd-headless/404.php` — [minimal not-found template](tpd-headless/404.php).

The helper uses WordPress's resolved content, so it can distinguish a real published post from an archive or nonexistent path. Future published posts do not require editing a hardcoded redirect list. It runs only for this backend site.

Its exact behavior is:

| Request | Current behavior | Proposed result |
| --- | --- | --- |
| `https://admin.truepath406.com/` | 200 flower-shop template with archives | 301 directly to `https://truepath406.com/` |
| `/service-business-website/` | 301 to `/blog/service-business-website/`, then public normalization/redirects | 301 directly to `https://truepath406.com/insights/service-business-website` |
| Any other real published, unprotected article | Same legacy chain | One 301 to its matching public `/insights/slug` |
| `/2026/03/`, `/2026/04/`, category/tag/author archives | Invented article redirects ending in 404 | Direct HTML 404 without archive widgets |
| `/feed/`, search results | Incorrect public article path or unnecessary CMS view | Direct HTML 404 |
| A nonexistent path or non-public post | Invented public article redirect | Direct HTML 404; no guessed replacement |
| Admin login/dashboard, GraphQL, REST, media, scripts, cron, non-GET/HEAD requests | Existing API/admin behavior | Pass through unchanged |
| Authenticated previews and Customizer | WordPress preview behavior | Pass through unchanged |

The helper removes WordPress's fuzzy canonical redirect for handled frontend requests, preventing an unknown slug from being guessed into a different article. The 404 template contains only a not-found message and a link to the public homepage; the response remains 404, rather than redirecting to that homepage.

Common attribution parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`) survive valid redirects. WordPress routing parameters, arbitrary parameters, and preview/authentication data are not forwarded. Password-protected posts are not treated as public replacements.

### 3 Disable only the backend XML sitemap feature

At **Yoast SEO → Settings → Site features → Technical SEO → XML sitemaps**, change **Enabled → Disabled** and save that setting after approval. Keep the neighboring **REST API endpoint** enabled. Keep Yoast, ACF, WPGraphQL, and WPGraphQL for ACF active.

The helper also disables WordPress core's sitemap, preventing it from replacing the retired Yoast sitemap. It filters the existing virtual robots.txt to:

```text
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
```

There is no blanket `Disallow: /` and no admin sitemap advertisement. The public website already advertises `https://truepath406.com/sitemap.xml` in its own robots.txt. The backend sitemap URLs should return 404, not redirect to articles. Removing the obsolete Search Console submission remains a separate account-level follow-up.

## Local validation completed before rollout

- PHP 8.2 syntax checks passed for the helper and 404 template using the PHP binary already bundled with Local.
- `test-routing.php` passed **26 mocked checks**, including real/new article decisions, root redirects, archives, feeds, missing/draft/protected posts, tracking, login, GraphQL, REST, media, cron, previews, robots, other hosts, and sitemap suppression.
- The proposed `.htaccess` retains the inspected WordPress-managed block and cache markers verbatim.
- These local code/decision checks were followed by the live verification recorded above. The local test runner was not uploaded. Full new-publication/revalidation testing remains unperformed; existing published article data, APIs, and authenticated preview were verified.

## Approved rollout and rollback procedure

The November 15 rollout followed the approved live changes and verification below. For any future reapplication, obtain approval and re-read the then-current configuration before changing it:

1. Re-read `.htaccess` and export a fresh backup outside the web root. Record the current Yoast XML switch and virtual robots output. Confirm staging availability and a working Hostinger file-manager recovery path.
2. Stage the two helper files and validate them in a full WordPress copy if available. Check home/article/404 routing and previews before production. Do not modify WordPress core or theme files.
3. Install the two reviewed helper files on production, disable the one Yoast XML sitemap feature, and replace only the custom `.htaccess` block. This is one coordinated change: the helper alone cannot bypass the existing server catch-all.
4. Check all 19 current published article destinations, the seven reported archives, a missing slug, root, feed, sitemap index/children, and robots.txt. Confirm no unrelated homepage redirects, loops, or accidental API redirects.
5. Confirm public GraphQL still returns the expected posts, the REST index and needed read routes work, an existing media file loads, login remains accessible, and an authenticated draft preview works. Check public Next.js pages and sitemap. Verify publishing/revalidation with an approved draft/test workflow; do not publish a test article without authorization.
6. Recheck through Hostinger's cache after any specifically scoped cache refresh needed for these changed URLs. Historical cached 301s in browsers may remain; use fresh HTTP checks as well as the browser. Mark the README's live-change boxes complete only after verification.

If anything breaks, restore the original `.htaccess`, restore the Yoast XML switch, and remove/rename only the two newly added helper files through Hostinger File Manager. Restore the original config before removing the helper to avoid exposing a briefly unhandled frontend. Verify GraphQL, login, and the public site again. The stored homepage, posts, categories, media, and existing plugin files are not deleted by this proposal.

## Approval boundary

Trevor approved **the custom `.htaccess` replacement, the two site-specific helper files, and the single Yoast XML sitemap setting**, and these are now applied. That approval does not extend to rewriting articles, deleting content, changing DNS, disabling APIs, updating unrelated plugins, or altering Search Console submissions.

Step 2's live cleanup and the recorded integration checks are complete. Step 3 is next: gather the missing Search Console URL details and a content-performance baseline.
