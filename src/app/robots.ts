import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const searchAndAiCrawlers = [
    "Googlebot",
    "bingbot",
    "Applebot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "FacebookBot",
    "cohere-ai",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: searchAndAiCrawlers,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://www.truepathdigital.com/sitemap.xml",
    host: "https://www.truepathdigital.com",
  };
}
