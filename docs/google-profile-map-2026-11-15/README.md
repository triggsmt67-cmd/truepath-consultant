# Google Profile article and website planning map

November 15, 2026. Trevor approved creation of the colorful reference map and
publication of the revised Google Profile article in WordPress. Scope is this
article, its publishing fields, reference asset, and matching frontend title.
The other four priority articles and service-page proposal remain unapproved.

The map uses a fictional plumbing business. Its thirty pages are a planning
example, not a Google requirement or a recommendation to create empty pages.
Location pages require genuine service coverage and useful local information.
The article will include an accessible text equivalent and a shareable image.

## Publication

The existing published post **153** was updated through WordPress's signed-in
editor on November 15, 2026 (America/Denver). The original slug, publication
date, author, featured image, and categories were retained. WordPress reports
`modified: 2026-11-16T00:48:03` in its UTC-oriented backend record.

Changed fields: title, body, manual excerpt, quick answer, takeaways, FAQs,
Yoast focus keyphrase, Yoast title, and Yoast description. Four FAQs now agree
with the article, including the explanation that thirty pages are not required.
The body is editable core WordPress blocks. WordPress's image-block recovery
removed unsupported saved dimensions; the recovered markup was retained.

Media **247** is the generated map with a descriptive title, alt text, caption,
and source attribution. The final built-in image generation prompt is saved in
[image-generation-prompt.txt](image-generation-prompt.txt). One targeted image
edit connected all six website branches to Home. The selected final PNG is
1086 by 1448 pixels. The WebP is a compressed display copy of the same image.

Downloads served by the public frontend:

- `/downloads/google-business-profile-website-planning-map.png`
- `/downloads/google-business-profile-website-planning-map.webp`
- `/downloads/google-business-profile-website-planning-map.csv`
- `/downloads/google-business-profile-website-planning-map-embed.txt`

Attribution is a reader-facing request, not a compulsory keyword-rich backlink.
No backlink count, traffic increase, or ranking outcome is promised.

## Verification and rollback

WordPress displayed **Post updated**. A fresh GraphQL read confirms the new
article, map, excerpt, and four FAQs. Comparing all 19 published posts before
and after shows **only post 153 changed**. The original editor content and
published-data snapshots are saved here for rollback. Media metadata was also
read back after saving.

Lint and four local SEO checks passed before the frontend rebuild. The only
application-code change removes this article's old hard-coded search title,
allowing the current WordPress title to drive metadata. The service-page copy
and other four articles remain unapplied.

Production deployment **dpl_7fpxKnmmu3ZpvcLRueTFKh4p8YdN** is **READY** on
`truepath406.com`, built from commit `7dae377c0cefb0f6977b2919a3712a087ce5b56a`.
The public article's title, canonical, revised body, map, four FAQs/FAQ schema,
and original publication date passed live checks. All four downloadable files
return 200 and match the committed bytes; both image formats are 1086 by 1448.
[Live verification](live-verification.json).

All five SEO checks passed against production, covering **26 sitemap pages and
29 distinct internal paths**. Lint passed. The deployment's available error/fatal
runtime-log scan returned no matching entries. No external log drains are
configured, so this is a release check rather than continuous monitoring.

The publication is complete. Any later documentation-only rebuild serves the
same approved article and assets. This does not complete the other four
editorial revisions or the separate service-page proposal.
