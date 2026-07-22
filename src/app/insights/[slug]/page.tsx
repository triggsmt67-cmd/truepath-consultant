import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DrawerButton from "@/components/DrawerButton";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts, type AiOverviewsData } from "@/lib/wordpress";
import { ArrowLeft, Calendar, Zap } from "lucide-react";
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
      url: `https://truepathdigital.com/insights/${post.slug}`,
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
    .replace(/—|–/g, " - ")
    // Rewrite old domain links to new canonical domain
    .replace(/https?:\/\/(www\.)?truepath406\.com\/blog\//g, "https://truepathdigital.com/insights/")
    .replace(/https?:\/\/(www\.)?truepath406\.com\//g, "https://truepathdigital.com/");
}

interface ParsedFaq {
  question: string;
  answer: string;
}

function parseFaqs(rawFaqs: string | null | undefined): ParsedFaq[] {
  if (!rawFaqs) return [];

  const faqs: ParsedFaq[] = [];
  // Split on "Q:" to get individual Q&A blocks
  const blocks = rawFaqs.split(/\nQ:\s*/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Each block is: "question text\nA: answer text"
    // Handle the first block which may start with "Q:" already stripped
    const content = trimmed.startsWith("Q:") ? trimmed.slice(2).trim() : trimmed;
    const parts = content.split(/\nA:\s*/);

    if (parts.length >= 2) {
      const question = parts[0].replace(/\r/g, "").trim();
      const answer = parts.slice(1).join("\nA: ").replace(/\r/g, "").trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
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

  // Extract AI Overviews ACF data
  const aiData = post.aiOverviews?.ai_overviews;
  const quickAnswer = aiData?.ai_quick_answer;
  const faqs = parseFaqs(aiData?.ai_faqs);
  const takeaways = aiData?.ai_takeaways
    ? aiData.ai_takeaways
        .split(/\r?\n/)
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter(Boolean)
    : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": cleanDescription,
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
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
    ...(imageUrl ? { "image": [imageUrl] } : {}),
    ...(takeaways.length > 0 ? { "abstract": takeaways.join(". ") + "." } : {}),
    ...(quickAnswer ? {
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-ai-speakable='quick-answer']", "[data-ai-speakable='takeaways']"]
      }
    } : {})
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://truepathdigital.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://truepathdigital.com/insights/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://truepathdigital.com/insights/${post.slug}/`
      }
    ]
  };

  // FAQPage structured data for SEO
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10" data-ai-content="article" data-ai-slug={post.slug}>
        
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

            {/* Quick Answer Card */}
            {quickAnswer && (
              <div className="mb-12 border border-muted-border bg-surface-alt p-6 md:p-8" data-ai-speakable="quick-answer">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Answer
                </h2>
                <div className="text-lg text-foreground font-medium leading-relaxed space-y-4">
                  {quickAnswer.split(/\r?\n\r?\n/).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {takeaways.length > 0 && (
              <div className="mb-12 border-l-4 border-primary bg-surface-alt p-6 md:p-8" data-ai-speakable="takeaways">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  {takeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="article-content text-foreground text-lg leading-relaxed space-y-6"
              data-ai-main-content="true"
              dangerouslySetInnerHTML={{ __html: cleanHtmlContent(post.content || "") }}
            />

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <section className="mt-20 pt-16 border-t border-muted-border">
                <h2 className="font-serif text-3xl font-medium text-foreground mb-8 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border border-muted-border bg-surface-alt p-6 md:p-8"
                    >
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-lg text-muted-text leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
