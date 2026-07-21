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
    client: "Northwest Plumbing Co.",
    industry: "HVAC & Plumbing",
    symptom: "High website traffic, but incoming phone calls were completely flat despite spending $2,000/mo on local SEO.",
    diagnosis: "The mobile experience hid the phone number behind a 3-tap menu. Trust signals (Google reviews) were buried on a separate page that no one visited.",
    cure: "Rebuilt the mobile navigation with a sticky 'Call Now' header. Pulled verified Google reviews directly into the hero section to establish immediate credibility.",
    result: "300% increase in qualified lead calls within 30 days.",
    image: "/images/tools.png"
  },
  {
    id: "02",
    client: "Elite Custom Builders",
    industry: "Custom Home Construction",
    symptom: "Receiving too many low-budget 'tire-kicker' leads, wasting the sales team's time.",
    diagnosis: "The website looked identical to budget contractors. There was no pricing friction and no qualifying intake form to filter out bad fits.",
    cure: "Implemented a premium, high-contrast visual identity to signal high-end positioning. Replaced the basic contact form with a multi-step project qualification questionnaire.",
    result: "80% drop in unqualified leads. Average project size increased by $150k.",
    image: "/images/meeting.png"
  },
  {
    id: "03",
    client: "Apex Roofing Specialists",
    industry: "Commercial Roofing",
    symptom: "Losing commercial bids to larger, out-of-state competitors.",
    diagnosis: "The website lacked any proof of commercial capability. Case studies were just generic photos of roofs without any narrative or scale.",
    cure: "Developed deep editorial case studies detailing the symptom, diagnosis, and cure for massive commercial projects. Added drone footage and safety compliance markers to the homepage.",
    result: "Secured three 6-figure commercial contracts directly attributed to the new trust markers.",
    image: "/images/audit.png"
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
                    <ScrollImage 
                      src={study.image} 
                      alt={`${study.client} website preview`}
                      containerClassName="w-full max-w-sm aspect-[4/3] mb-12"
                    />

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
                Schedule a Lead Review
              </Button>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
