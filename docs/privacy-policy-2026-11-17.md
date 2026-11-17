# Privacy policy repair — November 17, 2026

Trevor requested a fix for the public privacy-policy 404, including completing it today.

Added a dedicated server-rendered `/privacy-policy` page with canonical metadata,
effective/revision date, and the site's existing visual styling. Covers the actual
contact form fields, optional Checkup email delivery, Google Analytics/Tag Manager,
cookies and visitor controls, Vercel hosting, Resend delivery, provider records,
retention, privacy requests, and external content. Contact is Trevor's public
business email/phone and city; no home street is published.

Source review: contact and Checkup API routes, form components, Checkup memory
state, analytics helper/tracking component, root layout, and the November 16
analytics verification record. Avoided inventing fixed deletion periods or
claiming that provider logs and delivered emails disappear when a worksheet resets.
This release documents the existing setup; it does not change analytics, add a
cookie-consent system, or certify compliance with every jurisdiction's rules.

Added discoverable links in the shared footer, homepage inquiry form, call-request
drawer, and Checkup email disclosure. The drawer's privacy link closes the modal
when navigating. Added the policy to the sitemap and updated the existing SEO test
to expect this real page instead of its former 404.

## Checks

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and static generation.
- `SEO_BASE_URL=http://localhost:3017 node --test scripts/test-seo.mjs`: 5/5 passed;
  29 sitemap pages and 44 internal paths, metadata, crawl rules, redirects and 404s.
- Built-server checks: policy returns 200 and self-canonical; trailing slash returns
  308 to the working page; footer/form links and sitemap entry present.
- Browser review: policy heading, readable text, section headings, business contact
  links and shared navigation rendered correctly at the normal desktop viewport.
- React checklist: static policy remains a Server Component; reused existing
  components, no new state/effects/dependencies, semantic headings and descriptive links.
- Existing article internal-link phrase warnings remain; no blog content changed.
- No production inquiry or email was submitted during checks.

## Sources checked

- https://support.google.com/analytics/answer/7318509
- https://resend.com/legal/privacy-policy
- https://vercel.com/legal/privacy-notice

## Release

Target: existing Git integration, `main`, `triggsmt67-cmd/truepath-consultant`,
Vercel project `truepath-consultant` in `trevor-riggs-projects`, production domain
https://truepath406.com. Live release verification is recorded after deployment.
