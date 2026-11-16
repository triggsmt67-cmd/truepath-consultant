import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { serializeJsonLd } from "@/lib/json-ld";

const url = "https://truepath406.com/services/chatgpt-business-profile";
const title = "ChatGPT Business Profile Setup | True Path Digital";
const description = "Check your business’s eligibility for ChatGPT Business Hub, prepare accurate profile information, and get help with the setup available to your business.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [{ url: "/downloads/chatgpt-business-profile-guide-cover.png", width: 1200, height: 630, alt: "Business facts sheet covering services, coverage, contact, and the next step" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/downloads/chatgpt-business-profile-guide-cover.png"] },
};

const service = {
  "@context": "https://schema.org", "@type": "Service", "@id": `${url}#service`,
  name: "ChatGPT Business Profile Readiness and Setup Help", url,
  provider: { "@id": "https://truepath406.com/#business" },
  serviceType: "Business profile eligibility review, information preparation, and supported setup assistance",
  description,
  areaServed: [{ "@type": "State", name: "Montana" }],
};

export default function ChatGPTBusinessProfilePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(service) }} />
    <Header />
    <main className="pt-32 relative z-10">
      <section className="px-6 md:px-12 pt-8 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-xs uppercase tracking-widest text-primary mb-8">ChatGPT Business Profile help · Missoula, Montana</p>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">
            <div>
              <h1 className="font-serif text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[1.03] tracking-tight font-medium">ChatGPT Business Profile setup <span className="text-primary">for service businesses.</span></h1>
              <p className="text-lg leading-relaxed text-muted-text mt-7 max-w-2xl">OpenAI’s new Business Hub gives eligible businesses a way to manage their information in ChatGPT. I help service-business owners check what is available, prepare the details, and work through supported setup.</p>
              <p className="text-muted-text leading-relaxed mt-5 max-w-2xl">I’m Trevor Riggs. Before we spend time on a profile, we check whether your business has a claim route. That decision comes before an implementation quote.</p>
              <div className="mt-8"><Button href="/#contact" variant="primary">Ask about my business</Button></div>
              <p className="mt-4 text-sm text-muted-text">Send your website and business type. We’ll arrange a 15-minute review.</p>
            </div>
            <aside aria-labelledby="facts-heading" className="bg-foreground text-white p-7 md:p-9 lg:mt-3">
              <p className="text-xs uppercase tracking-widest text-white/80 mb-5">The working document</p>
              <h2 id="facts-heading" className="font-serif text-3xl md:text-4xl leading-tight mb-7">One business.<br />One checked fact sheet.</h2>
              <dl className="divide-y divide-white/25 text-sm">
                {[["Identity", "Real name, website, owner"], ["Work", "Services offered and excluded"], ["Coverage", "Where you actually take jobs"], ["Contact", "Correct hours, phone, email"], ["Next step", "Where an inquiry should go"]].map(([term, text]) => <div key={term} className="grid grid-cols-[5rem_1fr] gap-4 py-4"><dt className="text-white/80">{term}</dt><dd>{text}</dd></div>)}
              </dl>
              <p className="text-white/80 text-sm leading-relaxed mt-6">An owner-approved reference for the profile and the website. No invented credentials, reviews, or service areas.</p>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="availability-heading" className="px-6 md:px-12 py-12 border-y border-muted-border bg-surface-alt">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-[.8fr_1.6fr] gap-8 md:gap-16">
          <div><p className="text-xs uppercase tracking-widest text-primary mb-4">Beta availability</p><h2 id="availability-heading" className="font-serif text-3xl font-medium">Is ChatGPT Business Hub available for your business?</h2><p className="text-sm text-muted-text mt-4">Guidance reviewed November 15, 2026.</p></div>
          <div className="text-muted-text leading-relaxed space-y-5">
            <p>Business profiles and Business Agents have different eligibility rules. OpenAI currently limits Business Agents to eligible U.S. ecommerce and online service businesses. A local company should not assume it can create an agent because it has a website.</p>
            <p>We check the options shown for your actual business in Business Hub. If setup is unavailable, I’ll explain that and identify useful preparation you can keep. We agree on any paid work before it starts.</p>
            <h3 className="font-serif text-2xl font-medium text-foreground">Why I’d prepare early</h3>
            <p>I think there’s real value in getting ready while these tools develop. We can check eligibility, correct your business facts, and make the relevant website pages agree now. If ChatGPT becomes a bigger source of local recommendations, you’ll have a foundation you understand and can keep improving. That preparation is the early advantage I’d help you build.</p>
            <p className="text-sm">See <a className="underline underline-offset-4 hover:text-primary" href="https://openai.com/business/businesses-in-chatgpt/">OpenAI’s current eligibility overview</a>. Approval, review timing, recommendations, and customer inquiries remain outside my control.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="deliverables-heading" className="px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto">
          <h2 id="deliverables-heading" className="font-serif text-[clamp(2rem,3.5vw,3.25rem)] leading-tight font-medium max-w-2xl mb-10">You should leave with something you can use.</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-9">
            {[
              ["A clear eligibility finding", "A record of the claim or setup options available for your business, with the next action or current limitation written down."],
              ["Profile information you have checked", "A concise description, service boundaries, contact details, and relevant links. You approve the facts before they are submitted."],
              ["A website that agrees", "A list of conflicting or missing details on the relevant service and contact pages. Any website repairs are scoped separately."],
              ["A handoff you understand", "Help with the supported claim process, an owner-held account, and a record of what was submitted. You handle identity checks directly with the verification provider."],
            ].map(([heading, text]) => <div key={heading} className="border-t border-muted-border pt-5"><h3 className="font-serif text-2xl font-medium mb-3">{heading}</h3><p className="leading-relaxed text-muted-text">{text}</p></div>)}
          </div>
          <p className="max-w-3xl text-muted-text leading-relaxed mt-10">This is independent consulting from True Path Digital. I don’t represent OpenAI, promise preferential placement, or sell a guaranteed ChatGPT ranking. The work follows <a href="https://openai.com/policies/businesses-in-chatgpt/" className="underline underline-offset-4 hover:text-primary">OpenAI’s business policy</a> and the options your account supports.</p>
        </div>
      </section>

      <section className="bg-surface-alt px-6 md:px-12 py-12 border-t border-muted-border">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-10">
          <div><h2 className="font-serif text-3xl font-medium mb-4">Want to understand it first?</h2><p className="text-muted-text leading-relaxed mb-5">The owner’s guide separates claiming, verification, and optional agents. It includes a fact-sheet template and a clearly labeled service-business example.</p><Link href="/insights/businesses-in-chatgpt-for-service-businesses" className="underline underline-offset-4 hover:text-primary">Read the Businesses in ChatGPT guide</Link></div>
          <div><h2 className="font-serif text-3xl font-medium mb-4">Keep the rest of the business working.</h2><p className="text-muted-text leading-relaxed mb-5">A new profile belongs alongside accurate local search information, useful service pages, and someone who answers inquiries.</p><div className="flex flex-col items-start gap-3"><Link href="/services/google-profile" className="underline underline-offset-4 hover:text-primary">Google Business Profile optimization</Link><Link href="/services/lead-response" className="underline underline-offset-4 hover:text-primary">Lead response and follow-up</Link><a href="mailto:trevor@truepath406.com" className="underline underline-offset-4 hover:text-primary">trevor@truepath406.com</a></div></div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
