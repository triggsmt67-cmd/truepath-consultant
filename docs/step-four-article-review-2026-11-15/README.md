# Step 4 — Priority article corrections for review

Prepared November 15, 2026. **Google Profile and Booking articles published;
the Google Profile service page is also published. Three article revisions remain review-only.**

Open [the reading preview](review.html) to see all five complete proposed
articles, their current body text, exact title/excerpt/summary/FAQ changes, and
the service-page release note. The preview is a reading layout; it does
not reproduce the production theme.

## Proposed scope

| Article | Distinct value | Main corrections |
|---|---|---|
| Booking | Unique-inquiry ledger and constraint diagnosis | Correct formula, denominator, capacity logic, and follow-up; remove unsupported rates and booking-lift claims. |
| Google Profile | Owner-friendly steps with description, service, and post examples | Remove inactivity/ranking mythology, explain content structure, and test the contact route. |
| Why Marketing Fails Early | Delivery-to-booking handoff audit | Keep message match, add delivery constraints, remove editing artifact and unsupported platform certainty. |
| Estimate Follow-Up | Customer-agreed sequence and useful scripts | Preserve title/URL; remove misapplied research, assumptions about silence, and unverified anecdote. |
| Reviews Process | Neutral invitations and delivery audit | Keep useful tap-card workflow; correct NFC terminology, selection, wording, and messaging guidance. |

User-selected phrases: **Google Business Profile Optimization**, **Reviews
Process**, and **Why Marketing Fails Early**. Booking and Estimate Follow-Up
use their existing topics as working editorial targets, not newly verified
search-demand claims.

**Google Profile review revision, November 15:** Trevor requested a more
practical "you don't need to be an expert" angle and an audit for AI-style
phrasing and em dashes. The current local draft and publishing fields reflect
that request. [Tone audit](google-profile-tone-audit.md) records the findings.
Trevor then approved this article and the additional website planning map for
publication. See the [single-article release record](../google-profile-map-2026-11-15/README.md).

The saved query is the **Missoula variant**: 24 impressions, 0 clicks, average
position 21.58 over August 14–November 13. The original separate query/page exports did not identify its landing page. An exact-page filter now confirms the query belongs to `/services/google-profile`; see the [service-page release](../google-profile-service-2026-11-15/README.md). [Research and intent decisions](RESEARCH.md)
explain why the service page and article need distinct roles.

## Exact review artifacts

- `drafts/*-review.md`: SEO audit first, full replacement article, exact fields,
  and change log. The shorter matching `.md` files contain only body copy and H1.
- `before/`: current public CMS snapshot, HTML, and derived plain text.
- `after/`: exact proposed body HTML without H1 or duplicate body FAQs.
- [Proposed WordPress fields](proposed-wordpress-fields.json): five post IDs,
  titles, excerpts, body HTML, and all three `aiOverviews.ai_overviews` fields.
  Replace the old FAQ field in full so incorrect claims do not survive in
  visible FAQs or FAQ structured data. These JSON records describe changes;
  they are not an assumed API write schema or an executable publication script.
- [Frontend release status](proposed-frontend.json): both article title overrides
  have been removed and the service-page update is released. The old proposal
  patch is now empty; it must not overwrite the published service copy.
- Three blank CSV audit templates provide a reusable starting point for the
  workflows. They contain no customer data.

Each proposed record retains the post ID, slug, original publication date, and
featured image. The release would update modification time naturally. No
redirect, consolidation, deletion, new page, tracking setup, or unsupported
client result is proposed in this step.

## Approval and eventual release

Review the five replacements. The Google Profile and Booking articles and the
Google Profile service page are approved and published. The three remaining articles
wait for Trevor's approval, as requested. No additional
approval is needed to read or revise these local drafts.

Before an approved release, re-fetch the posts and compare modification times
and content hashes with the captured baseline. Resolve any edits made since
capture. Preserve a fresh rollback copy of all changed fields. Apply only the
approved portions of the frontend patch and the five CMS field replacements.

Then verify the live H1/body, metadata, quick answers, takeaways, FAQs/schema,
links, retained URLs, and the profile-review CTA. Use build/lint and the existing
SEO checks for an applied code change, then confirm revalidation on the live
site. Check CMS editing and draft preview without publishing a test article.
Update the README with the actual release and verification result.

Research and artifact checks are not evidence of live publication. GA4 and
inquiry measurement remain deferred. AI-search consolidation is still Step 5.

## Booking publication

Trevor authorized completion and publication of the next priority article using
the same workflow. Home Service Booking was selected because of the reversed
formula and unsupported claims. The [Booking release record](../booking-guide-2026-11-15/README.md)
contains the final article, source research, image prompt, downloads, rollback
content, and verification. The other three articles remain pending.
