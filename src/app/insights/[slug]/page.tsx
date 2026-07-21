import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DrawerButton from "@/components/DrawerButton";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "@/lib/wordpress";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const cleanDescription = post.excerpt
    ? post.excerpt.replace(/<[^>]+>/g, "").replace(/Continue reading.*/g, "").trim()
    : "Read this field note from True Path Digital.";

  const imageUrl = post.featuredImage?.node?.sourceUrl;

  return {
    title: post.title,
    description: cleanDescription,
    authors: [{ name: "Trevor Riggs" }],
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: cleanDescription,
      type: "article",
      publishedTime: post.date,
      authors: ["Trevor Riggs"],
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanDescription,
      ...(imageUrl ? { images: [imageUrl] } : {})
    }
  };
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

function cleanHtmlContent(html: string): string {
  if (!html) return "";
  return html
    .replace(/<p><a class="more-link".*?<\/a><\/p>/gi, "")
    .replace(/—|–/g, " - ");
}

export default async function SingleInsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cleanDescription = post.excerpt
    ? post.excerpt.replace(/<[^>]+>/g, "").replace(/Continue reading.*/g, "").trim()
    : "Read this field note from True Path Digital.";

  const imageUrl = post.featuredImage?.node?.sourceUrl;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": cleanDescription,
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://truepathdigital.com/insights/${post.slug}`
    },
    "author": {
      "@type": "Person",
      "name": "Trevor Riggs"
    },
    "publisher": {
      "@type": "Organization",
      "name": "True Path Digital",
      "url": "https://truepathdigital.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://truepathdigital.com/images/logo.png",
        "width": 512,
        "height": 512
      }
    },
    ...(imageUrl ? { "image": [imageUrl] } : {})
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10">
        
        {/* Article Header */}
        <section className="px-6 py-12 md:px-12 md:py-16 border-b border-muted-border bg-background">
          <div className="mx-auto w-full max-w-4xl">
            <Link 
              href="/insights" 
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
            
            <div className="flex items-center gap-3 text-xs text-muted-text uppercase tracking-widest font-medium mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Published {formatDate(post.date)}</span>
            </div>

            <h1 className="font-serif font-medium text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.1] tracking-tight text-foreground">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Article Body */}
        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-3xl">
            
            {post.featuredImage?.node?.sourceUrl && (
              <div className="mb-12 relative aspect-video overflow-hidden border border-muted-border bg-surface-alt">
                <Image 
                  src={post.featuredImage.node.sourceUrl} 
                  alt={post.featuredImage.node.altText || post.title}
                  title={post.featuredImage.node.altText || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div 
              className="article-content text-foreground text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: cleanHtmlContent(post.content || "") }}
            />

            {/* End of Article Conversion Box */}
            <div className="mt-20 border-2 border-primary/30 bg-surface-alt p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              
              <div className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
                Diagnostic Next Step
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4 leading-tight">
                Tired of losing jobs to missed calls and cold estimates?
              </h3>
              
              <p className="text-muted-text text-base leading-relaxed mb-8 max-w-xl">
                Stop guessing where your marketing is breaking down. Schedule a 15-minute diagnostic call or order a $750 Demand Leak Audit for your business.
              </p>
              
              <DrawerButton variant="primary">
                Schedule a Lead Review
              </DrawerButton>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
