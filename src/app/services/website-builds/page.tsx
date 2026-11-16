"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { serializeJsonLd } from "@/lib/json-ld";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does a website project cost, and how long does it take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The review comes first. A repair, a revised page structure, and a custom build involve different amounts of work. I define the scope, price, timing, software costs, and support responsibilities before implementation. There is no fixed price or launch date until those decisions are made."
      }
    },
    {
      "@type": "Question",
      "name": "Will I need to write the copy or supply professional photos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I can write from your business information and conversations with you. You check services, coverage, policies, and factual claims before publication. Clear phone photos of your actual team and work can be useful. Any licensed or generated imagery should represent its subject honestly and should not be presented as a completed client project."
      }
    },
    {
      "@type": "Question",
      "name": "Will I own the website and be able to edit it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Domain and business accounts should remain under your control. The agreement identifies the content, project files, licenses, hosting, editing access, and ongoing support included. We choose an editing setup around the changes you want to make yourself."
      }
    },
    {
      "@type": "Question",
      "name": "Can you connect the site to my booking or CRM software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I check your specific platform, plan, forms, and available integrations before agreeing to a connection. A booking link, form notification, and new CRM record are different tasks. The agreed contact route is tested before launch; supported options depend on your setup."
      }
    },
    {
      "@type": "Question",
      "name": "Will a new website improve my Google rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A clearer, accessible site can give search engines and customers better information. A new design by itself does not guarantee rankings or inquiries. I review current Search Console data, relevant pages, technical access, and the services you actually want to sell, then measure what changes after launch."
      }
    },
    {
      "@type": "Question",
      "name": "How many pages should the site have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enough to explain the services and decisions that deserve their own pages. There is no target count. A useful service page has a distinct job; repeating the same copy for every keyword or nearby town does not make it more useful."
      }
    }
  ]
};
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://truepath406.com/services/website-builds#service",
  "name": "Conversion-Focused Web Design in Missoula",
  "url": "https://truepath406.com/services/website-builds",
  "provider": {
    "@id": "https://truepath406.com/#business"
  },
  "serviceType": "Website strategy, design, and conversion repair",
  "category": "Website consulting and development",
  "description": "Website strategy, focused repairs, and custom builds for owner-operated service businesses in Missoula and across Montana.",
  "areaServed": [
    {
      "@type": "City",
      "name": "Missoula"
    },
    {
      "@type": "State",
      "name": "Montana"
    }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Owner-operated local service businesses"
  }
};

const options = [
  { name: "Repair", scope: "A focused fix", when: "The right services and pages are already there, but something gets in the way: unclear copy, a difficult mobile contact route, or a broken form.", work: "Fix that obstacle and test the customer’s route again." },
  { name: "Restructure", scope: "A clearer page plan", when: "The business has useful material, but important services are buried or several pages repeat the same message.", work: "Organize the useful content around the decisions customers need to make." },
  { name: "Rebuild", scope: "A new foundation", when: "The current platform or implementation makes the required changes impractical to deliver and maintain.", work: "Agree on a new structure, the content to keep, and a launch plan for the existing URLs." },
];

export default function WebsiteBuildsPage() {
  const { openDrawer } = useLeadDrawer();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <div className="noise-overlay" style={{ width: "100%" }} />
      <Header />
      <main className="relative z-10 pt-32">
        <section className="px-6 md:px-12 pt-10 md:pt-16 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap justify-between gap-3 border-t border-muted-border pt-5 mb-10 text-xs uppercase tracking-widest text-primary font-medium">
              <p>Website strategy &amp; builds</p>
              <p>Missoula, Montana</p>
            </div>
            <div className="grid lg:grid-cols-[1.65fr_1fr] gap-12 lg:gap-24 items-end">
              <div>
                <h1 className="font-serif text-[clamp(2.75rem,5.2vw,5rem)] leading-[1.02] tracking-tight font-medium max-w-4xl">Conversion-focused web design in <span className="text-primary">Missoula.</span></h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-text">I’m Trevor Riggs. I help owner-operated service businesses decide what to keep, what to repair, and what to build. Your website should make your services, coverage, and next step easy to understand.</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
                  <Button onClick={() => openDrawer()} variant="primary">Review my website</Button>
                  <a href="#website-decision" className="text-sm underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4">Repair or rebuild?</a>
                </div>
                <p className="mt-4 text-sm text-muted-text">A 15-minute Lead Review. I’ll email you to arrange a time.</p>
              </div>
              <aside className="border-l border-primary pl-6 lg:pl-8 max-w-md">
                <p className="text-xs uppercase tracking-widest font-medium text-primary mb-5">The starting brief</p>
                <h2 className="font-serif text-3xl leading-tight font-medium mb-7">What should this website help a customer decide?</h2>
                <ol className="space-y-4 text-muted-text leading-relaxed">
                  <li><span className="text-primary mr-3">01</span> Is this the service I need?</li>
                  <li><span className="text-primary mr-3">02</span> Does this business serve my area?</li>
                  <li><span className="text-primary mr-3">03</span> Can I trust them, and how do I ask?</li>
                </ol>
              </aside>
            </div>
          </div>
        </section>

        <section id="website-decision" aria-labelledby="decision-heading" className="scroll-mt-24 bg-surface-alt border-y border-muted-border px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Choose the scope</p>
              <h2 id="decision-heading" className="font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-tight font-medium mb-6">Start with the smallest useful change.</h2>
              <p className="text-muted-text text-lg leading-relaxed mb-8">We look at one priority service and the route from finding it to requesting work. Then we decide which kind of project addresses the problem.</p>
              <dl className="divide-y divide-muted-border border-y border-muted-border">
                {options.map((option) => (
                  <div key={option.name} className="py-7">
                    <dt className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-3"><span className="font-serif text-3xl font-medium">{option.name}</span><span className="text-xs uppercase tracking-widest text-primary">{option.scope}</span></dt>
                    <dd className="text-muted-text leading-relaxed"><p>{option.when}</p><p className="mt-2 text-foreground">{option.work}</p></dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="max-w-xl w-full mx-auto lg:pt-9">
              <Image src="/downloads/website-repair-or-rebuild-map.png" alt="Website scope decision map: an isolated problem suggests repair; a suitable platform can support restructuring; platform constraints may justify a rebuild. Confirm the scope through a review." width={1080} height={960} sizes="(max-width: 1023px) 90vw, 45vw" className="w-full h-auto" />
              <figcaption className="mt-5 text-sm leading-relaxed text-muted-text">A starting point for the review, with the three options explained alongside it. <a href="/downloads/website-repair-or-rebuild-map.png" className="underline underline-offset-4 hover:text-primary">Save the map</a> or <a href="/downloads/website-repair-or-rebuild-map.svg" className="underline underline-offset-4 hover:text-primary">get the scalable SVG</a>.</figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="scope-heading" className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[.8fr_1.4fr] gap-10 lg:gap-24">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">What we agree on</p>
              <h2 id="scope-heading" className="font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-tight font-medium">A website brief you can actually review.</h2>
              <p className="mt-6 text-muted-text leading-relaxed">For Missoula and Montana service businesses, the scope starts with the work you want, the places you serve, and the people handling inquiries.</p>
            </div>
            <ol className="divide-y divide-muted-border border-t border-muted-border">
              {[
                ["Pages with a job", "A page plan tied to actual services and customer questions. Useful existing pages stay in the plan; new pages need a reason to exist."],
                ["Content you can stand behind", "Clear copy, your service boundaries, and real proof you can supply. You review the facts. No invented reviews, credentials, projects, or results."],
                ["A working contact route", "A usable mobile layout and the agreed phone, form, or booking path. Software connections depend on what your actual account supports."],
                ["A considered launch", "Review existing URLs, map any changes, test redirects and contact routing, and define editing access, ownership, measurement, and support responsibilities."],
              ].map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[2rem_1fr] gap-4 py-6">
                  <span className="text-primary text-sm pt-1">0{i + 1}</span>
                  <div><h3 className="font-serif text-2xl font-medium mb-2">{title}</h3><p className="text-muted-text leading-relaxed">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 md:px-12 py-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-[.8fr_1.4fr] gap-6 lg:gap-24">
            <h2 className="font-serif text-3xl font-medium">A focused repair in practice.</h2>
            <p className="text-background/85 leading-relaxed max-w-3xl">On this website, the <Link href="/services/lead-response" className="text-background underline underline-offset-4">lead response page</Link> kept its URL and existing request form while its copy and inquiry workflow were improved. That is a concrete example of changing a page without replacing the entire site. Search and inquiry results still need to be measured.</p>
          </div>
        </section>

        <section aria-labelledby="questions-heading" className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[.8fr_1.4fr] gap-10 lg:gap-24">
            <div>
              <h2 id="questions-heading" className="font-serif text-[clamp(2rem,3.5vw,3.25rem)] font-medium leading-tight">Before you commit.</h2>
              <p className="mt-5 text-muted-text leading-relaxed">The practical details belong in the conversation and the agreed scope.</p>
            </div>
            <div className="border-t border-muted-border">
              {faqSchema.mainEntity.map((faq) => (
                <details key={faq.name} className="group border-b border-muted-border py-5">
                  <summary className="cursor-pointer text-lg leading-relaxed font-medium marker:text-primary focus-visible:outline-2 focus-visible:outline-offset-4">{faq.name}</summary>
                  <p className="mt-4 pl-5 text-muted-text leading-relaxed max-w-3xl">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto border-t-2 border-primary pt-8 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-2xl"><h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Bring the website you have.</h2><p className="text-muted-text leading-relaxed">Tell me which service matters most and what customers are struggling to do. In a 15-minute Lead Review, we’ll identify the first issue to investigate. Implementation is separate work with an agreed scope.</p></div>
            <Button onClick={() => openDrawer()} variant="primary">Review my website</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
