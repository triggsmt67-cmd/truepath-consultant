# Home Service Booking guide and inquiry map

November 15, 2026 (America/Denver). Trevor authorized completion of the next
priority article using the Google Profile workflow, including research,
writing, useful graphics, WordPress publication, frontend release, and checks.

Home Service Booking was selected because its published formula was reversed
in a FAQ and its booking-lift claims and thresholds were unsupported.

## Final content and resources

- Title: **Home Service Booking Rate: Follow Your Last 30 Inquiries**.
- Canonical URL retained: `https://truepath406.com/insights/home-service-booking`.
- [Complete article](article.md) and [research/tone audit](RESEARCH.md).
- Five corrected FAQs plus aligned quick answer, takeaways, excerpt, and SEO fields.
- A colorful 1024 by 1536 inquiry map, generated with built-in image_gen.
  [Exact generation prompt](image-generation-prompt.txt).
- Public PNG and compressed WebP, a blank 30-inquiry worksheet, a filled
  fictional example, and optional image-and-credit markup.

The article's perspective is to explain what happened to a group of inquiries
before changing the budget. The fictional example reconciles 40 contact
records minus 6 repeats and 4 spam/unrelated contacts to 30 eligible inquiries.
Outcomes are 12 booked, 6 still deciding, 5 no capacity, 4 customer declined,
and 3 no reply yet. The booking rate is 40% so far, with 9 still open. These
are teaching numbers, not a client result or industry benchmark.

The blank CSV has 30 rows with reference IDs and no customer information. The
example CSV contains the 30 eligible inquiries after exclusions, with explicit
fictional labels. Date and owner fields are blank rather than inventing a real
measurement period. The text and metadata contain zero em dashes. No AI
detector or guarantee of perceived authorship is claimed.

## WordPress publication

Post **134** was updated through the existing signed-in editor. WordPress
displayed **Post updated**. The existing slug, author, featured image, categories,
and original February 13, 2026 publication date were retained.

Changed fields: title, body, manual excerpt, all three ACF summary/FAQ fields,
Yoast focus keyphrase, Yoast title, and Yoast description. The body uses editable
core blocks; the image block validated without recovery warnings. Media **250**
has descriptive alt text, caption, title, and source attribution.

Fresh GraphQL reads confirm the article and five FAQs. Comparing all 19
published posts shows only post 134 changed. Approved article text and ACF
values match after normalizing WordPress typography and line endings.
[CMS verification](cms-verification.json). Before/after data and the original
editor fields are saved here for rollback.

## Frontend and release checks

The only application-code change removes this article's obsolete hard-coded
search title so WordPress controls its metadata. The remaining three articles
and separate Google Profile service-page proposal are not applied.

Lint and four local SEO checks passed before release. The deployment and live
verification results will be recorded after the public frontend finishes
updating. A CMS save alone does not verify the public article or downloads.
