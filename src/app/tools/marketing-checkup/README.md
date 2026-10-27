# Service Business Marketing Checkup

Public route: `/checkup`.

Both `/tools/marketing-checkup` and `/tools/hvac-marketing-checkup` redirect here. Its local preview
redirects to the generic preview, and the old email API delegates to the same
handler so already-open worksheets still work. The resource now addresses
plumbers, HVAC contractors, electricians, and other service businesses; the
seven generic questions and answer guidance remain unchanged.

Uses the existing App Router, Header, Footer, Button, typography, and color tokens.
Contact destination is the existing homepage section `/#contact`, backed by
HomeContactForm and `/api/contact`. This worksheet does not submit answers to it.
Answers stay in React memory until the owner explicitly submits the optional
Email me my results form. That action sends their address and seven answers to
`/api/marketing-checkup/email`, which builds the message from the shared question data
and sends HTML plus plain text via the existing Resend connection. No database,
mailing list, CRM record, copy to True Path, or analytics payload is created.
Resend processes the message for delivery; the form explains this before sending.
Reset/reload clears page state, not emails already sent.

## Measurement before launch

No approved analytics implementation was found in the project. None was added.
When an approved implementation is available, measure these events without
answers, question IDs, contact details, or other personal information:

- `marketing_checkup_started`: first answer selected, once per worksheet attempt.
- `marketing_checkup_completed`: first valid Show my questions action per attempt.
- `marketing_checkup_print_clicked`: click on Print / Save as PDF. This records intent,
  not a completed print, saved PDF, or download.
- `marketing_checkup_contact_clicked`: click on the invitation linking to `/#contact`.
  This is not a confirmed inquiry.

Confirmed reset starts a new attempt. Edits/regeneration should not inflate
completion counts. Evaluate relevant visitors and useful actual conversations;
completion and print counts alone do not establish success.

## Local verification

- Existing lint and production build pass. No npm test script exists.
- `node --test scripts/test-marketing-checkup-email.mjs`: ten tests cover canonical result
  content, all-Yes, input rejection, honeypot, missing configuration, provider
  errors, retry idempotency, rate limits, all 21 question/answer guidance paths,
  the production-disabled preview, and the default email sender. Provider calls are mocked.
- An authorized sample was sent through the browser form to Trevor's supplied
  test address; Resend accepted it. Trevor confirmed the first email arrived.
  A revised designed email was also accepted; its Gmail appearance still needs review. Empty/invalid email validation and mobile layout were checked.
- Email controls are hidden in print; all seven selected answers remain visible.
- Browser checks: initially no selections; empty validation and first-missing
  focus; native Space/arrow radio selection; mixed answers in original order;
  all-Yes language; editing hides stale results; regeneration; reset cancellation
  and confirmation; focus on results and reset controls; verified contact link.
- Desktop and 375px mobile visual checks; no horizontal overflow on mobile.
- Print rendering checked across six letter-size pages with all seven selected
  answers and seven sets of next steps, evidence to review, and agency questions,
  and no navigation or form controls.
  Browser-native PDF output was rendered and inspected. The page button itself
  uses window.print(), not a PDF generation or download service.
- Text/control contrast checked against page and result backgrounds. This is
  focused local QA, not an exhaustive accessibility audit or physical-device test.

The landing page is not added to sitewide navigation. No WordPress content or
production environment settings are changed.

## Email configuration and limits

Reuses `RESEND_API_KEY` and optional `CONTACT_EMAIL_FROM`, with the existing
contact form’s default sender when the latter is absent. No new service or setting was
added. Confirm these exist in the launch environment; local settings do not prove
production settings. The endpoint requires all seven valid answers and a valid
single recipient, bounds request size, checks browser Origin, ignores honeypot
submissions, and accepts only a fixed email template. Resend idempotency keys
remain stable across retries of one submission. No answer or address is logged.

Hashed, in-memory counters allow up to 3 attempts per recipient and 15 per IP per
hour per process. These are best-effort limits, reset on restart, and are not
shared across server instances. Reassess shared/platform abuse controls before
exposing the email endpoint to substantial public traffic. No CAPTCHA or new
tracking was installed.

## Designed report (version 2)

Shared `getCheckupReport` guidance supplies the webpage, print view, and email.
Every Yes, No, and Not sure gets its own next step, evidence to review, and agency
question. Items stay in worksheet order. The starting point is the first No,
otherwise the first Not sure; this is explained as a place to start, not a severity
ranking. All-Yes answers suggest visibility without claiming effectiveness.

`src/lib/marketing-checkup-email.ts` creates a complete HTML email with inline styles,
presentation tables, system fonts, a fluid single-column layout, an Outlook width
fallback, and plain text. It uses the existing brand palette and no external
images, fonts, scripts, or tracking pixels. Automated tests bound HTML size below
80 KB. Mobile browser rendering is checked; this does not establish compatibility
with every inbox or dark-mode transformation.

Local preview: `/tools/marketing-checkup/email-preview`. Query `sample=yes`,
`sample=no`, or `sample=unsure` to inspect uniform answers; default is mixed.
It uses only canned answers, never sends email, returns 404 outside development,
and carries noindex/no-store headers. It is not linked in site navigation.
