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

## Remaining measurement work

Successful inquiry submissions and phone/email clicks have not been configured as dedicated key events. Enhanced measurement was already enabled; its generic form events should not be treated as proof of a successfully delivered inquiry. Internal/developer traffic exclusions and Search Console/product links were not configured during this basic installation.

## References

- [Current Google container installation guidance](https://support.google.com/tagmanager/answer/14847097)
- [GA4 Realtime](https://analytics.google.com/analytics/web/#/a387062614p564540975/realtime/overview)
- [Tag Manager workspace](https://tagmanager.google.com/#/container/accounts/6405609774/containers/287238186/workspaces/2)

To remove the installation, revert code commit 25d70ae and release it through the existing Git/Vercel integration.
