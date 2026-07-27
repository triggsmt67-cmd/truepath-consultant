import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://truepath406.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${baseUrl}/images/hero-carpenter.jpg`,
        `${baseUrl}/images/decision-partner-final.jpg`,
        `${baseUrl}/images/demand-leak-audit-final.jpg`,
      ],
    },
    {
      url: `${baseUrl}/services/google-profile`,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/images/google-profile.webp`],
    },
    {
      url: `${baseUrl}/services/website-builds`,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/images/website-builds.webp`],
    },
    {
      url: `${baseUrl}/services/lead-response`,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}/images/lead-response.webp`],
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        `${baseUrl}/images/benchmark-automotive.webp`,
        `${baseUrl}/images/united-formulas.webp`,
        `${baseUrl}/images/accurate-auto-repair.webp`,
      ],
    },
    {
      url: `${baseUrl}/insights`,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${baseUrl}/images/decision-partner-final.jpg`],
    },
  ];

  // Dynamic blog posts from WordPress. Let CMS failures surface so a
  // deployment cannot silently publish an incomplete sitemap.
  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    ...(post.featuredImage?.node?.sourceUrl
      ? { images: [post.featuredImage.node.sourceUrl] }
      : {}),
  }));

  return [...staticPages, ...blogPages];
}
