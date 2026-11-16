# Businesses in ChatGPT publication

November 15, 2026, America/Denver. Broad launch-week research followed by a new commercial service page and WordPress owner’s guide. See [research and sources](RESEARCH.md), [keyword research and exact tags](KEYWORDS.md), [article source](article.md), [publication fields](publication.json), and [saved public CMS record](published-wordpress.json).

## Content

- Service: `/services/chatgpt-business-profile`. Eligibility-first consulting, a checked business fact sheet, supported setup help, owner-controlled verification, and separately scoped website corrections. Server-rendered page; no new client-side feature or third-party script.
- Article: `/insights/businesses-in-chatgpt-for-service-businesses`, WordPress post **253**, published, with landscape featured media **258**. The article uses core editable blocks, dated sources, a fictional appliance-repair example, and practical test questions. ACF summary/FAQs intentionally blank to avoid repeating the introduction or manufacturing a standard FAQ section.
- WordPress records the publication as November 16 in UTC; this work record uses November 15 in America/Denver. The publication was not backdated.
- Resources: original `chatgpt-business-readiness-map.png` and `.svg`, plus `chatgpt-business-fact-sheet.csv`. The text explains the distinctions outside the graphic too. A separate 1200×630 cover avoids cropping the instructional map in the template's hero. Featured media is hosted in WordPress; the in-article graphic and public downloads are served by the frontend. Original map media 255 remains in the library; it was not deleted.
- Discovery: service link in footer/mobile navigation, matching Service entry in the business catalog, canonical metadata/social preview, and sitemap entry. Article discovery remains through the CMS-driven Insights index and sitemap.

## Keyword follow-up

The owner requested keyword research before final release. The service now leads with “ChatGPT Business Profile setup”; the guide leads with claiming a business in “ChatGPT Business Hub.” The title, H1, two relevant H2s and summaries follow distinct commercial/informational intents. Remaining headings describe their actual sections; no keyword-density targets or artificial H3s. No claims of search-volume, ranking difficulty, or guaranteed future demand.

The article's frontend search title uses the existing per-slug title map in `src/app/insights/[slug]/page.tsx`; its H1 remains CMS-owned. Yoast stores the matching search title, while the frontend's meta description comes from the manually set excerpt (149 characters), matching the Yoast description. If retitled later, review both the CMS fields and this frontend title entry.

This is independent True Path consulting, not an OpenAI partnership or proof that True Path/client businesses are eligible. No business was claimed, no identity information was submitted, and no agent was created. No prices, results, client experience or ranking guarantees were invented. Official Nov 10 launch guidance is dated; recheck before selling an implementation scope.

## Validation

- Lint, TypeScript and production build passed. A fresh local CMS cache was required to include the newly published article; final build includes 20 articles and the new service page.
- Visual review at 1440, 768 and 390 pixels; no horizontal overflow. Service inquiry CTA reaches the existing contact form; no inquiry submitted.
- WordPress visual editor recognizes the blocks with no invalid-block warnings. Published status, title, slug, excerpt and featured-image alt text confirmed; public GraphQL record saved.
- Zero em dashes and none of the checked stock AI phrases in either new text. Factual review matters more than a phrase scan: no unsupported capability, ranking or firsthand-experience claims were introduced.
- Existing optional internal-link phrase warnings from older CMS articles remain; they are not new failures. The separate unindexed-content review records the actual older article cleanup priorities.

## Production release and live results

- Content release **f03be9c586c067c828f2faf06e67102c82b99782**, Vercel **dpl_FzEE2vxA1WTSiLkAxt914uiNGTFN**, READY, production, matching main commit.
- Live [service](https://truepath406.com/services/chatgpt-business-profile) and [guide](https://truepath406.com/insights/businesses-in-chatgpt-for-service-businesses) both return HTTP 200, have one H1, the researched search titles, distinct accurate descriptions and self-canonical public URLs. Both are present in the sitemap and internal discovery links. WordPress post 253 and its content API remain healthy.
- Live PNG/SVG readiness map, blank CSV and landscape cover return HTTP 200 with correct content types. The new cover and in-article map load in the browser. The author portrait is an existing lazy-loaded asset, separate from the new graphics.
- Full live SEO suite: **5/5 passed**, verifying **28 sitemap pages and 43 internal paths**, metadata, contact email, CMS HTML, robots, redirects and expected 404s. Contact-email mock tests: **2/2 passed**; no real inquiry/email was sent. The inquiry CTA was checked through to the existing form.
- Live article inspection exposed an existing 15-pixel horizontal overflow from its decorative `100vw` overlay. Changed only the article template overlay width to `100%`, matching the existing pattern used elsewhere. Follow-up **1b950c4d965bfac97add1273e13fe8cbcdff4ecc**, Vercel **dpl_2gihoCmRZhrNWVNjqDsVwRitQzGi**, READY, production. Lint/build and the live SEO suite passed after the correction. Live article scroll width equals client width at 390 (375/375), 768 (753/753) and 1440 (1425/1425) viewport widths.
- Screenshots saved under `/Users/trevorriggs/Documents/Codex/outputs/truepath-businesses-chatgpt-2026-11-15/`. Browser viewport overrides were cleared after checks; both new public pages are left open for review.

Publication and technical verification are complete. Google indexing, rankings and business outcomes are not yet established. No new per-URL indexing requests were submitted in this run; the three separate repaired GSC categories were submitted and remain Validation started. Follow-up content recommendations for the older unindexed articles remain open in the separate validation review.


### Early-readiness opinion follow-up, November 15

- [x] Added the approved “Why I think getting ready early matters” section near the beginning of the ChatGPT Business Hub guide, before the eligibility section. It presents Trevor’s opinion about preparation and learning, with conditional future benefits.
- [x] Published WordPress post 253, refreshed the production `wordpress` cache tag, and verified the exact paragraph on the public page (HTTP 200). Search title, H1, canonical, excerpt and featured image remain intact. WordPress visual blocks remain editable; the live page has no horizontal overflow at the normal desktop viewport.
- [x] Synced the local article, serialized blocks and public CMS snapshot. Saved the prior blocks for recovery and a live screenshot at `Documents/Codex/outputs/truepath-businesses-chatgpt-2026-11-15/early-readiness-live.jpg`. No application-code change was needed.
