import "server-only";

import sanitizeHtml from "sanitize-html";

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "figure",
  "figcaption",
  "img",
  "picture",
  "source",
  "iframe",
];

export function sanitizeWordPressHtml(html: string): string {
  if (!html) return "";

  const normalizedHtml = html
    .replace(/<p><a class="more-link".*?<\/a><\/p>/gi, "")
    .replace(
      /https?:\/\/(www\.)?truepath406\.com\/blog\//gi,
      "https://truepathdigital.com/insights/",
    )
    .replace(
      /https?:\/\/(www\.)?truepath406\.com\//gi,
      "https://truepathdigital.com/",
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
