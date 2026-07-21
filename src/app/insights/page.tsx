import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/wordpress";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Field Notes",
  description: "Practical marketing insights, profit leak diagnostics, and conversion advice written specifically for trade contractors and owner-operators.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Field Notes",
    description: "Practical marketing insights and conversion advice for trade contractors and owner-operators.",
    url: "https://truepathdigital.com/insights",
    type: "website",
    images: [{ url: "/images/decision-partner-final.jpg", width: 1200, height: 630, alt: "True Path Digital marketing insights for service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Field Notes | True Path Digital",
    description: "Practical marketing insights and conversion advice for trade contractors.",
    images: ["/images/decision-partner-final.jpg"],
  },
};

function cleanExcerpt(htmlExcerpt: string): string {
  if (!htmlExcerpt) return "";
  return htmlExcerpt
    .replace(/<[^>]+>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/Continue reading.*/g, "")
    .trim();
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export default async function InsightsPage() {
  const posts = await getAllPosts();

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "True Path Digital Insights & Field Notes",
    "description": "Practical marketing insights, profit leak diagnostics, and conversion advice written specifically for trade contractors.",
    "url": "https://truepathdigital.com/insights",
    "publisher": {
      "@type": "Organization",
      "@id": "https://truepathdigital.com/#business",
      "name": "True Path Digital",
      "url": "https://truepathdigital.com"
    },
    "blogPost": posts.slice(0, 20).map((post: { title: string; slug: string; date: string }) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://truepathdigital.com/insights/${post.slug}`,
      "datePublished": post.date
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10">
        
        {/* Hero Section */}
        <section className="px-6 py-16 md:px-12 md:py-24 border-b border-muted-border">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-primary"></span> Articles & Field Notes
            </div>
            <h1 className="font-serif font-medium text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.08] tracking-tight max-w-4xl mb-6">
              Practical Marketing Insights for Trade Owners.
            </h1>
            <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] text-muted-text max-w-2xl leading-relaxed">
              No agency buzzwords or fluff. Honest articles on diagnostic marketing, profit leaks, website conversion, and local search visibility.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-6 py-20 md:px-12 md:py-32 bg-surface-alt">
          <div className="mx-auto w-full max-w-[1400px]">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-text text-lg">No articles published yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const imageUrl = post.featuredImage?.node?.sourceUrl;
                  const imageAlt = post.featuredImage?.node?.altText || post.title;

                  return (
                    <article key={post.id} className="border border-muted-border bg-background p-6 md:p-8 flex flex-col justify-between group hover:border-primary/40 transition-colors">
                      <div>
                        {imageUrl && (
                          <Link href={`/insights/${post.slug}`} className="block relative overflow-hidden mb-6 aspect-video bg-surface-alt border border-muted-border">
                            <Image 
                              src={imageUrl} 
                              alt={imageAlt}
                              title={imageAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-text mb-3 uppercase tracking-wider font-medium">
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <h2 className="font-serif text-2xl font-medium text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                          <Link href={`/insights/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-muted-text text-base leading-relaxed mb-6 line-clamp-3">
                          {cleanExcerpt(post.excerpt)}
                        </p>
                      </div>

                      <Link href={`/insights/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all pt-4 border-t border-muted-border">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom Conversion CTA */}
        <section className="border-t border-muted-border bg-foreground text-background py-24 px-6 md:px-12 text-center">
          <div className="mx-auto w-full max-w-3xl flex flex-col items-center">
            <h2 className="font-serif font-medium text-[clamp(2.5rem,4.5vw,4rem)] leading-tight mb-6">
              Ready to fix the leaks in your business?
            </h2>
            <p className="text-background/80 text-lg leading-relaxed mb-10 max-w-xl">
              Stop guessing where you are losing jobs. Schedule a brief 15-minute diagnostic call or request a Demand Leak Audit.
            </p>
            <Button href="/#contact" variant="light">
              Schedule a Lead Review
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
