# True Path Digital — Consulting Website

A high-performance marketing consultancy website for **True Path Digital**, built with Next.js (App Router) and a headless WordPress CMS backend. Designed for owner-operated service businesses — HVAC, plumbing, electrical — with an emphasis on AI search visibility and conversion.

**Live:** [truepathdigital.com](https://www.truepathdigital.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Typography | Inter + Newsreader (next/font) |
| CMS | Headless WordPress via WPGraphQL |
| Deployment | Vercel |

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout, fonts, global schema
│   ├── insights/
│   │   ├── page.tsx          # Blog listing (Intelligence Feed)
│   │   └── [slug]/page.tsx   # Individual blog posts
│   ├── services/             # Service pages
│   ├── work/                 # Case studies
│   ├── sitemap.ts            # Dynamic XML sitemap
│   └── robots.ts             # Robots.txt generation
├── components/
│   ├── Header.tsx            # Navbar with pill navigation
│   ├── Footer.tsx            # Site footer
│   ├── Button.tsx            # Reusable CTA button
│   ├── DrawerButton.tsx      # Lead capture drawer trigger
│   ├── LeadDrawer.tsx        # Slide-out contact form
│   ├── LeadFlowAnimation.tsx # Animated lead flow visualization
│   └── ScrollImage.tsx       # Scroll-aware image component
├── context/                  # React context providers
└── lib/
    └── wordpress.ts          # WPGraphQL client, types, queries
```

## Headless WordPress Integration

Blog content is fetched at build time from the WordPress GraphQL endpoint at `admin.truepath406.com/graphql`.

### Data Flow

```
WordPress (ACF + Gutenberg) → WPGraphQL → Next.js SSG → Vercel CDN
```

### ACF "AI Overviews" Field Group

Each blog post can include an **AI Overviews** custom field group with three properties:

| ACF Field | Purpose | Rendering |
|---|---|---|
| `ai_quick_answer` | Prose TLDR summary | ⚡ Quick Answer card below hero image |
| `ai_takeaways` | Bullet-point key claims | ✎ Key Takeaways list below Quick Answer |
| `ai_faqs` | Q&A pairs (Q:/A: delimited) | FAQ cards at article bottom |

All three are conditionally rendered — posts without ACF data show no empty sections.

### Content Normalization

The `cleanHtmlContent` utility performs render-time transformations:
- Strips WordPress "more-link" artifacts
- Rewrites legacy `truepath406.com` domain links to `truepathdigital.com`
- Remaps `/blog/` paths to `/insights/` for URL consistency

## AI Search Optimization

Blog posts output **5 structured data blocks** for maximum AI crawler visibility:

| Schema Type | Purpose |
|---|---|
| `BlogPosting` | Article metadata, author, dates, `abstract` from takeaways |
| `FAQPage` | Structured Q&A pairs for Google AI Overviews and People Also Ask |
| `BreadcrumbList` | Navigation hierarchy (Home → Insights → Article) |
| `SpeakableSpecification` | Targets Quick Answer + Takeaways for voice assistants |
| `ProfessionalService` | Business entity (from root layout) |

### Semantic HTML Attributes

```html
<main data-ai-content="article" data-ai-slug="post-slug">
  <div data-ai-speakable="quick-answer">...</div>
  <div data-ai-speakable="takeaways">...</div>
  <div data-ai-main-content="true">...</div>
</main>
```

## Environment Variables

Create a `.env.local` file with:

```bash
WORDPRESS_API_URL=https://admin.truepath406.com
```

`WORDPRESS_API_URL` is server-only and may be either the WordPress base URL or
the full `/graphql` endpoint. The production default above is used when the
variable is not set.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed via Vercel with automatic builds on push to `main`. WordPress images are served through Next.js Image Optimization via the `remotePatterns` config in `next.config.ts`.
