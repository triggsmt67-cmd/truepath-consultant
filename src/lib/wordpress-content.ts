import "server-only";

import sanitizeHtml from "sanitize-html";

interface InternalLinkSpec {
  phrase: string;
  href: string;
}

const internalLinksBySlug: Record<string, InternalLinkSpec[]> = {
  "technician-utilization-profit-leak": [
    {
      phrase: "profitable on paper",
      href: "/insights/the-1-profit-leak-in-a-service-business",
    },
    { phrase: "same-day response", href: "/services/lead-response" },
    {
      phrase: "judgment, trust, speed",
      href: "/insights/what-ai-cant-replace-the-surprising-value-of-experience",
    },
    { phrase: "callback prevention", href: "/#audit" },
  ],
  "service-business-website": [
    { phrase: "routing problem", href: "/services/website-builds" },
    {
      phrase: "service pages",
      href: "/insights/thin-service-pages-look-generic",
    },
    { phrase: "click-to-call taps", href: "/services/lead-response" },
    { phrase: "Local Services Ads", href: "/services/google-profile" },
  ],
  "how-to-follow-up-on-an-estimate-before-it-goes-cold": [
    {
      phrase: "response time",
      href: "/insights/the-leak-every-home-service-business-should-measure",
    },
    { phrase: "Your reviews", href: "/services/google-profile" },
    {
      phrase: "estimate-to-close rate",
      href: "/insights/home-service-booking",
    },
    { phrase: "estimate process", href: "/services/lead-response" },
  ],
  "thin-service-pages-look-generic": [
    {
      phrase: "how real people read service pages",
      href: "/services/website-builds",
    },
    { phrase: "service area pages", href: "/services/google-profile" },
    {
      phrase: "review snippets",
      href: "/insights/reviews-feel-awkward-when-theres-no-process",
    },
    { phrase: "real photos", href: "/work" },
  ],
  "reviews-feel-awkward-when-theres-no-process": [
    { phrase: "map pack", href: "/services/google-profile" },
    { phrase: "thank-you text", href: "/services/lead-response" },
    {
      phrase: "specific reviews",
      href: "/insights/google-profile-is-killing-your-local-visibility",
    },
    { phrase: "real leak", href: "/#audit" },
  ],
  "diagnose-a-slow-month": [
    { phrase: "conversion problem", href: "/services/website-builds" },
    { phrase: "Google Business Profile", href: "/services/google-profile" },
    { phrase: "call answer rate", href: "/services/lead-response" },
    { phrase: "diagnostic question", href: "/#audit" },
  ],
  "the-leak-every-home-service-business-should-measure": [
    { phrase: "better rankings", href: "/services/google-profile" },
    { phrase: "30-day call audit", href: "/#audit" },
    {
      phrase: "call-to-action buttons",
      href: "/services/website-builds",
    },
    { phrase: "faster callbacks", href: "/services/lead-response" },
  ],
  "the-1-profit-leak-in-a-service-business": [
    {
      phrase: "never converted",
      href: "/insights/how-to-follow-up-on-an-estimate-before-it-goes-cold",
    },
    {
      phrase: "More marketing spend",
      href: "/insights/diagnose-a-slow-month",
    },
    { phrase: "fix the right things", href: "/#audit" },
    { phrase: "converted to booked jobs", href: "/services/lead-response" },
  ],
  "google-profile-is-killing-your-local-visibility": [
    { phrase: "local search results", href: "/services/google-profile" },
    {
      phrase: "website and social profiles",
      href: "/services/website-builds",
    },
    {
      phrase: "review request habit",
      href: "/insights/reviews-feel-awkward-when-theres-no-process",
    },
    { phrase: "booked-jobs problem", href: "/#audit" },
  ],
  "home-service-booking": [
    { phrase: "buying more leads", href: "/services/lead-response" },
    {
      phrase: "return calls",
      href: "/insights/the-leak-every-home-service-business-should-measure",
    },
    {
      phrase: "follow up on estimates",
      href: "/insights/how-to-follow-up-on-an-estimate-before-it-goes-cold",
    },
    { phrase: "call-to-book rate", href: "/#audit" },
  ],
  "marketing-attention-is-the-scarce-resource-and-that-changes-everything": [
    { phrase: "show proof they can trust", href: "/work" },
    { phrase: "decision asset", href: "/#audit" },
    { phrase: "landing page", href: "/services/website-builds" },
    { phrase: "qualified demos", href: "/services/lead-response" },
  ],
  "marketing-tactics-business-owners-can-safely-ignore-in-2026": [
    { phrase: "core services", href: "/services/website-builds" },
    { phrase: "photos of real work", href: "/work" },
    { phrase: "Route leads", href: "/services/lead-response" },
    { phrase: "review requests", href: "/services/google-profile" },
  ],
  "ai-search-visibility-why-local-businesses-are-disappearing": [
    { phrase: "AI search", href: "/services/google-profile" },
    { phrase: "local websites", href: "/services/website-builds" },
    {
      phrase: "review recency",
      href: "/insights/reviews-feel-awkward-when-theres-no-process",
    },
    { phrase: "signal you trust", href: "/work" },
  ],
  "why-digital-marketing-fails-early": [
    { phrase: "Montana-based client", href: "/work" },
    { phrase: "landing page", href: "/services/website-builds" },
    { phrase: "one clear problem", href: "/#audit" },
    { phrase: "city pages", href: "/services/google-profile" },
  ],
  "the-digital-inversion-why-your-business-is-vanishing-from-ai-search": [
    { phrase: "local businesses", href: "/services/google-profile" },
    { phrase: "Schema Markup", href: "/services/website-builds" },
    {
      phrase: "generic blog posts",
      href: "/insights/thin-service-pages-look-generic",
    },
    { phrase: "data gap", href: "/#audit" },
  ],
  "clear-marketing-decisions-for-montana-business-owners": [
    { phrase: "marketing report", href: "/#audit" },
    { phrase: "make the phone ring", href: "/services/lead-response" },
    { phrase: "high-intent keywords", href: "/services/google-profile" },
    { phrase: "results in plain language", href: "/work" },
  ],
  "what-ai-cant-replace-the-surprising-value-of-experience": [
    { phrase: "human experience", href: "/#credibility" },
    { phrase: "AI to automate scheduling", href: "/services/lead-response" },
    { phrase: "judgment, trust, presence", href: "/work" },
    { phrase: "contextual judgment", href: "/#audit" },
  ],
};

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "figure",
  "figcaption",
  "img",
  "picture",
  "source",
  "iframe",
];

function isInternalHref(href: string): boolean {
  if (href.startsWith("/")) return true;

  try {
    const url = new URL(href);
    return [
      "truepath406.com",
      "www.truepath406.com",
      "truepathdigital.com",
      "www.truepathdigital.com",
    ].includes(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function unwrapExistingInternalLinks(html: string): string {
  return html.replace(
    /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
    (fullMatch, attributes: string, content: string) => {
      const hrefMatch = attributes.match(
        /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i,
      );
      const href = hrefMatch?.[1] ?? hrefMatch?.[2];

      return href && isInternalHref(href) ? content : fullMatch;
    },
  );
}

function insertLink(
  html: string,
  { phrase, href }: InternalLinkSpec,
): { html: string; inserted: boolean } {
  const tokens = html.split(/(<[^>]+>)/g);
  let anchorDepth = 0;
  let blockedDepth = 0;
  let eligibleDepth = 0;
  let inserted = false;

  const result = tokens.map((token) => {
    if (!token.startsWith("<")) {
      if (
        inserted ||
        anchorDepth > 0 ||
        blockedDepth > 0 ||
        eligibleDepth === 0
      ) {
        return token;
      }

      const index = token.toLowerCase().indexOf(phrase.toLowerCase());
      if (index === -1) return token;

      inserted = true;
      const matchedPhrase = token.slice(index, index + phrase.length);
      return `${token.slice(0, index)}<a href="${href}" data-internal-link="true">${matchedPhrase}</a>${token.slice(index + phrase.length)}`;
    }

    const tagMatch = token.match(/^<\s*(\/?)\s*([a-z0-9]+)/i);
    if (!tagMatch) return token;

    const isClosing = tagMatch[1] === "/";
    const tagName = tagMatch[2].toLowerCase();
    const isSelfClosing =
      /\/\s*>$/.test(token) ||
      ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"].includes(
        tagName,
      );
    const isBlocked = [
      "code",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "pre",
      "script",
      "style",
    ].includes(tagName);
    const isEligible = ["li", "p"].includes(tagName);

    if (isClosing) {
      if (tagName === "a") anchorDepth = Math.max(0, anchorDepth - 1);
      if (isBlocked) blockedDepth = Math.max(0, blockedDepth - 1);
      if (isEligible) eligibleDepth = Math.max(0, eligibleDepth - 1);
    } else if (!isSelfClosing) {
      if (tagName === "a") anchorDepth += 1;
      if (isBlocked) blockedDepth += 1;
      if (isEligible) eligibleDepth += 1;
    }

    return token;
  });

  return { html: result.join(""), inserted };
}

function addCanonicalInternalLinks(html: string, slug?: string): string {
  if (!slug) return html;

  const linkSpecs = internalLinksBySlug[slug];
  if (!linkSpecs) return html;

  let linkedHtml = unwrapExistingInternalLinks(html);

  for (const linkSpec of linkSpecs) {
    const result = insertLink(linkedHtml, linkSpec);
    linkedHtml = result.html;

    if (!result.inserted) {
      console.warn(
        `Internal link phrase "${linkSpec.phrase}" was not found in "${slug}".`,
      );
    }
  }

  return linkedHtml;
}

function normalizeHeadingText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeCmsHeadings(html: string, articleTitle?: string): string {
  const normalizedTitle = articleTitle
    ? normalizeHeadingText(articleTitle)
    : undefined;
  let removedDuplicateTitle = false;

  return html.replace(
    /<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi,
    (_fullMatch, attributes: string, content: string) => {
      if (
        normalizedTitle &&
        !removedDuplicateTitle &&
        normalizeHeadingText(content) === normalizedTitle
      ) {
        removedDuplicateTitle = true;
        return "";
      }

      return `<h2${attributes}>${content}</h2>`;
    },
  );
}

function removeEditorialArtifacts(html: string): string {
  return html
    .replace(/\s*\[Insert link[^\]]*\]/gi, "")
    .replace(
      /\s*<p\b[^>]*>\s*<strong>\s*Links added\s*<\/strong>\s*<\/p>[\s\S]*$/i,
      "",
    );
}

export function sanitizeWordPressHtml(
  html: string,
  slug?: string,
  articleTitle?: string,
): string {
  if (!html) return "";

  const cleanedHtml = normalizeCmsHeadings(
    removeEditorialArtifacts(
      html.replace(/<p><a class="more-link".*?<\/a><\/p>/gi, ""),
    ),
    articleTitle,
  );

  const normalizedHtml = addCanonicalInternalLinks(
    cleanedHtml,
    slug,
  )
    .replace(
      /https?:\/\/(www\.)?(?:truepath406|truepathdigital)\.com\/blog\//gi,
      "https://truepath406.com/insights/",
    )
    .replace(
      /https?:\/\/(www\.)?(?:truepath406|truepathdigital)\.com\//gi,
      "https://truepath406.com/",
    );

  return sanitizeHtml(normalizedHtml, {
    allowedTags,
    allowedAttributes: {
      "*": ["class", "id", "title", "aria-*", "data-*"],
      a: ["href", "name", "target", "rel"],
      blockquote: ["cite"],
      iframe: [
        "src",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "frameborder",
        "loading",
        "title",
      ],
      img: [
        "src",
        "alt",
        "width",
        "height",
        "loading",
        "decoding",
        "srcset",
        "sizes",
      ],
      li: ["value"],
      ol: ["start", "reversed", "type"],
      source: ["src", "srcset", "type", "media", "sizes"],
      time: ["datetime"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: [
      "www.youtube.com",
      "youtube.com",
      "www.youtube-nocookie.com",
      "player.vimeo.com",
    ],
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.target !== "_blank") {
          return { tagName, attribs };
        }

        const relValues = new Set(
          (attribs.rel || "").split(/\s+/).filter(Boolean),
        );
        relValues.add("noopener");
        relValues.add("noreferrer");

        return {
          tagName,
          attribs: {
            ...attribs,
            rel: Array.from(relValues).join(" "),
          },
        };
      },
    },
  });
}
