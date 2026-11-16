# Businesses in ChatGPT publication

November 15, 2026, America/Denver. Broad launch-week research followed by a new commercial service page and WordPress owner’s guide. See [research and sources](RESEARCH.md), [keyword research and exact tags](KEYWORDS.md), [article source](article.md), [publication fields](publication.json), and [saved public CMS record](published-wordpress.json).

## Content

- Service: `/services/chatgpt-business-profile`. Eligibility-first consulting, a checked business fact sheet, supported setup help, owner-controlled verification, and separately scoped website corrections. Server-rendered page; no new client-side feature or third-party script.
- Article: `/insights/businesses-in-chatgpt-for-service-businesses`, WordPress post **253**, published, with landscape featured media **258**. The article uses core editable blocks, dated sources, a fictional appliance-repair example, and practical test questions. ACF summary/FAQs intentionally blank to avoid repeating the introduction or manufacturing a standard FAQ section.
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

Production deployment and final live check details are recorded below after the Git release.
