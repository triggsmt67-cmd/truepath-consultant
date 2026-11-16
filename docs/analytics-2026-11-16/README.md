# GA4 and Google Tag Manager — November 16, 2026

Installed the Google-provided container site-wide in the root layout. Initialization precedes the asynchronous loader to ensure the data layer exists when it loads. No second Analytics loader or manual page-view sender was added.

- Website: https://truepath406.com
- Container: `GTM-TCVKPSGD`
- GA4 measurement ID: `G-125W3VQB10`
- Stream: True Path Website, ID `16353210217`
- Property: True Path Digital, ID `564540975`
- Analytics account shown in the picker: Benchmark-Automotive, ID `387062614`. This is where the existing setup was found; no account move was made.
- Container account/container IDs: `6405609774` / `287238186`
- Existing Google Analytics destination tag fires on Initialization - All Pages. Workspace had zero pending changes; no duplicate tag was created.
- Code commit: `25d70ae8a6e94c2c6a52d27b9d8dee8840f4752e`
- Vercel production deployment: `dpl_Fz1A4tFZ5Px5fPe7CVfTw9sF1fHW`, READY, assigned to truepath406.com; build approximately 20 seconds.

## Verification

ESLint, production build (including TypeScript), and diff checks passed. Build emitted existing internal-link phrase warnings in article content.

Google installation test reported: “Your Google tag was detected on your website.” See tag-detected.jpg.

Live browser network inspection found exactly one page_view request for the initial /services/chatgpt-business-profile load and exactly one after client navigation to /work. Both requests used G-125W3VQB10 and the correct page URL/title. Realtime then displayed two active users and three page views across the homepage and those two pages, including first_visit and session_start. This includes setup/test traffic and is not a customer traffic baseline. See realtime.jpg.

Completed the existing Analytics onboarding flow and left Realtime and the linked Tag Manager container open. Standard reports still showed the new-property no-data notice while Realtime showed activity.

## Conversion and content tracking — added November 16

Released code commit `5c46c3e51e44eb31f4a8127ffa5e08a960b8e800` through Vercel production deployment `dpl_HiVVWqmET1PXZirHWGzdTtYJvie2` (READY, assigned to truepath406.com; build approximately 19 seconds).

| Event | Trigger | GA4 key event |
| --- | --- | --- |
| generate_lead | Homepage or drawer contact API succeeds with inquiryAccepted: true after the mail provider accepts the request | Yes |
| phone_click | Visitor activates a tel: link anywhere on the site | Yes |
| email_click | Visitor activates a mailto: link anywhere on the site | Yes |
| money_page_view | Initial visit or route change to homepage, /work, or /services/* | No |
| blog_post_view | Initial visit or route change to an individual /insights/slug article | No |

Key events count once per event. No default monetary value was assigned. Phone/email clicks measure intent, not completed calls or sent emails. A successful inquiry means provider acceptance, not inbox delivery or a booked appointment.

The existing installed container and Google Analytics destination route gtag events to G-125W3VQB10. No second loader, manual page_view sender, or duplicate GTM event tags were added. The older container GTM-N7SPSHH9 was visible in a separate user-opened tab and was left untouched.

All five event types carry a public page path/location and content_group (Money pages, Blog posts, Other). Custom event locations omit query strings and fragments. Lead events also carry fixed form_id labels (homepage/drawer); phone/email clicks carry fixed link_position labels (header/footer/content). No inquiry field values enter the custom analytics payload. Existing automatic GA4 collection remains enabled.

Created event-scoped GA4 custom definitions: Inquiry form placement → form_id; Contact link placement → link_position. Content group is a built-in GA4 dimension. Use event counts filtered to money_page_view or blog_post_view and page path/location to compare content; these custom view events are separate from the built-in Views metric. Standard page_view tracking remains responsible for Views. New dimensions apply to newly processed data, not historical reconstruction.

### Verification

- Nine Node tests passed: accepted API requests for both forms, rejected requests, honeypot handling, provider failure, classification, safe payloads, and analytics failure isolation. Mail delivery was mocked; no test inquiry email was sent.
- ESLint, production build with TypeScript, and diff checks passed. Existing article internal-link warnings remained.
- Live /work network check showed one standard page_view and one money_page_view with the correct content group.
- Real UI phone/email link activations produced events with the originating path and footer placement. The phone-app launch prompt was cancelled; no call was placed.
- Live article visit emitted blog_post_view; client navigation to /services/website-builds then emitted money_page_view with the new service path.
- GA4 Realtime visibly received blog_post_view, phone_click, email_click, and money_page_view. Setup interactions are test traffic, not a customer baseline.
- GA4 Events visibly listed generate_lead, phone_click, and email_click as enabled key events. Realtime key-event totals had not populated at the verification snapshot; new settings/reporting need processing time. generate_lead was validated with mocked delivery, not a synthetic production lead.
- Evidence: key-events.jpg and realtime-content-contact.jpg.

### Reading results

Open [Realtime](https://analytics.google.com/analytics/web/#/a387062614p564540975/realtime/overview) for immediate collection checks. Use Reports for processed event and page results; compare each conversion event separately. Money/blog view events should remain unstarred. To analyze which content visitors used before contacting you, use page paths and session journeys alongside the event’s originating page; the page where a form is submitted is not automatically the visitor’s original landing page.

Internal/developer traffic exclusions and Search Console/product links remain separate work. Enhanced measurement’s generic form events are not used as inquiry key events.

Rollback: revert 5c46c3e and deploy; disable the three added key-event definitions separately in GA4 if measurement is being retired.

## References

- [Current Google container installation guidance](https://support.google.com/tagmanager/answer/14847097)
- [GA4 Realtime](https://analytics.google.com/analytics/web/#/a387062614p564540975/realtime/overview)
- [Tag Manager workspace](https://tagmanager.google.com/#/container/accounts/6405609774/containers/287238186/workspaces/2)

To remove the installation, revert code commit 25d70ae and release it through the existing Git/Vercel integration.
