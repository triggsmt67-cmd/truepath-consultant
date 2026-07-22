"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollImage from "@/components/ScrollImage";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "01",
    client: "Benchmark Automotive Service",
    industry: "Automotive Repair",
    url: "https://www.benchmarkmissoula.com",
    symptom: "As a new business, Benchmark Automotive was nearly invisible on Google. The website received no meaningful search traffic and didn't reflect the quality of the shop or its work.",
    diagnosis: "Google had very few signals confirming the business's relevance and credibility. Its business profile, service categories, website information, local citations, and inbound links were either incomplete or missing.",
    cure: "We rebuilt the Google Business Profile, corrected and completed its categories and business information, strengthened its local listings, and created a new website that aligned with the profile and better represented the shop.",
    result: "Benchmark Automotive now receives calls from Google and its website every day.",
    image: "/images/benchmark-automotive.png"
  },
  {
    id: "02",
    client: "United Formulas",
    industry: "Chemical Manufacturing",
    url: "https://www.unitedformulas.com",
    symptom: "United Formulas sold directly to businesses, but customers had no simple way to find products, place orders, or return to the website when it was time to reorder.",
    diagnosis: "The website wasn't built around how customers actually purchased. Product information was difficult to navigate, online ordering wasn't available, and customers had no quick way to get answers about the products.",
    cure: "We built a complete e-commerce website that made products easier to find, purchase, and reorder. We also added an AI-powered assistant connected to the company's product database, giving customers accurate answers while helping the sales team guide buying decisions.",
    result: "Approximately 200% increase in customer retention, with the website now serving as an everyday sales tool for the United Formulas team.",
    image: "/images/united-formulas.png"
  },
  {
    id: "03",
    client: "Accurate Auto Repair",
    industry: "Auto Repair",
    url: "https://www.accurateautorepair.net",
    symptom: "Accurate Auto Repair's online information hadn't been updated in nearly 20 years. Customers were finding the wrong address and phone numbers, causing confusion and missed calls.",
    diagnosis: "Outdated business information had spread across Google Maps, Bing, Yelp, and other major directories. The company also lacked a modern website that could turn local searches into calls.",
    cure: "We corrected and unified their information across the major online listings. Then we built a fast, industry-specific website that made the shop easy to find, understand, and contact from any device.",
    result: "Accurate Auto Repair now has a consistent, credible online presence that is generating 30% more calls.",
    image: "/images/accurate-auto-repair.png"
  }
];

export default function WorkPage() {
  return (
    <>
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10">
        
        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-16 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-primary"></span> Our Work
            </h2>
            <h1 className="max-w-4xl font-serif font-medium text-[clamp(3.5rem,6vw,5rem)] leading-[1.05] tracking-tight">
              Fixing demand leaks. <br />
              <span className="text-muted-text">Driving real revenue.</span>
            </h1>
          </motion.div>
        </section>

        {/* Case Studies Gallery */}
        <section className="px-6 md:px-12 pb-32 md:pb-48">
          <div className="mx-auto w-full max-w-[1400px]">
            {CASE_STUDIES.map((study, i) => (
              <motion.article 
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.1 }}
                className="group relative border-t border-muted-border py-24 first:border-t-0 transition-colors duration-500 hover:bg-surface-alt -mx-6 px-6 md:-mx-12 md:px-12 rounded-3xl lg:rounded-none lg:mx-0 lg:px-6"
              >
                <div className="grid gap-16 md:grid-cols-12 md:gap-8">
                  
                  {/* Left Column: Metadata & Result */}
                  <div className="md:col-span-5 lg:col-span-4 flex flex-col">
                    <span className="text-sm font-medium text-primary mb-4 opacity-50">{study.id}</span>
                    <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-tight mb-2 transition-colors duration-300 group-hover:text-primary">
                      {study.client}
                    </h3>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-text mb-12">
                      {study.industry}
                    </p>

                    {/* Premium Scroll Image Insert */}
                    {study.url ? (
                      <a href={study.url} target="_blank" rel="noopener noreferrer" className="block group/img">
                        <ScrollImage 
                          src={study.image} 
                          alt={`${study.client} website preview`}
                          containerClassName="w-full max-w-lg aspect-[16/9] mb-12 transition-shadow duration-300 group-hover/img:shadow-xl group-hover/img:shadow-primary/10"
                        />
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-text mt-[-0.5rem] mb-4 transition-colors duration-300 group-hover/img:text-primary">
                          Visit live site <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    ) : (
                      <ScrollImage 
                        src={study.image} 
                        alt={`${study.client} website preview`}
                        containerClassName="w-full max-w-lg aspect-[16/9] mb-12"
                      />
                    )}

                    <div className="mt-auto">
                      <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">The Result</p>
                      <p className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-snug text-foreground">
                        {study.result}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Editorial Narrative */}
                  <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 flex flex-col justify-center gap-12">
                    
                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-widest text-foreground mb-4">Symptom</h4>
                      <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-muted-text border-l-2 border-primary/20 pl-6 transition-colors duration-300 group-hover:border-primary/50">
                        {study.symptom}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-widest text-foreground mb-4">Diagnosis</h4>
                      <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-muted-text border-l-2 border-primary/20 pl-6 transition-colors duration-300 group-hover:border-primary/50">
                        {study.diagnosis}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-widest text-foreground mb-4">Cure</h4>
                      <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-foreground border-l-2 border-primary pl-6">
                        {study.cure}
                      </p>
                    </div>

                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-muted-border px-6 py-32 md:px-12 md:py-48 bg-foreground text-background">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
          >
            <h2 className="font-serif font-medium text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-tight">
              Let's fix your leaks.
            </h2>
            <div className="mt-16">
              <Button href="/#contact" variant="light">
                Find My Leaks
              </Button>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
