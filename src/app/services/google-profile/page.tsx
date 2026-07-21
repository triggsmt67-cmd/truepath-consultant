"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ScrollImage from "@/components/ScrollImage";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, MapPin, Search, CheckCircle2, ShieldAlert, BarChart3, AlertTriangle, AlertCircle, Wrench, RefreshCw, MessageSquare, Quote } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does Google Business Profile optimization take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The initial review and cleanup can often be completed within a few weeks, depending on the number of issues, the availability of business documentation, and whether Google requires reverification. Visibility improvements may appear relatively quickly after major errors are corrected, but there is no guaranteed timeline. Competitive markets, weak websites, limited reviews, proximity, and other factors can affect how quickly results change."
      }
    },
    {
      "@type": "Question",
      "name": "Can you guarantee that I will rank in the Google Map Pack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No credible consultant can guarantee a specific Google Maps ranking. Google controls the search results, and rankings vary by search term, searcher location, competition, relevance, distance, and prominence. What I can do is identify preventable weaknesses, improve the profile’s accuracy and relevance, strengthen supporting signals, and give the business a better foundation for local search."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a physical storefront?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. Google allows eligible service-area businesses to hide their address when customers are not served at that location. A plumber, electrician, HVAC company, cleaning company, or mobile repair business may be able to operate as a service-area business. The profile still needs to represent a real, eligible business. Virtual offices, mailboxes, and locations where the company does not maintain a legitimate presence may not qualify."
      }
    },
    {
      "@type": "Question",
      "name": "How large should my service area be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your service area should reflect where the company realistically works. Listing every city in a large region does not automatically make the business rank in those locations. The profile, website, reviews, job history, proximity, competition, and actual operating footprint all play a role. A focused and accurate service area is usually more credible than an exaggerated one."
      }
    },
    {
      "@type": "Question",
      "name": "Can you remove negative reviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legitimate negative reviews generally cannot be removed simply because the business disagrees with them. Reviews may be reportable when they violate Google’s policies, such as spam, harassment, conflicts of interest, impersonation, or content unrelated to a real customer experience. Google decides whether a review is removed. I can help identify possible policy violations, submit appropriate reports, improve the business’s response, and build a steady process for earning more honest customer feedback."
      }
    },
    {
      "@type": "Question",
      "name": "Should I respond to every review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In most cases, yes. Responses show that the business is engaged and gives you an opportunity to thank customers, address concerns, and demonstrate professionalism to future readers. The replies do not need to be long. They should sound human, specific, and appropriate to the review."
      }
    },
    {
      "@type": "Question",
      "name": "How many reviews do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no universal number. The useful comparison is not an arbitrary benchmark. It is the competitive landscape in your service category and local market. A business with 40 recent, detailed reviews may look strong in one town and weak in another. Review recency, quality, relevance, overall rating, response behavior, and consistency all matter alongside total volume."
      }
    },
    {
      "@type": "Question",
      "name": "Do Google posts improve rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google does not guarantee that frequent posts will improve rankings. Posts can still be useful for communicating offers, seasonal services, company updates, events, and important customer information. They should be treated as a customer communication tool, not as a shortcut to the top of the Map Pack."
      }
    },
    {
      "@type": "Question",
      "name": "Does adding keywords to my business name help?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only use the real-world name of the business. Adding service keywords, city names, or promotional language that are not part of the legitimate business name can violate Google’s guidelines and create suspension risk. A keyword-stuffed name may sometimes appear to perform well temporarily, but it is not a sound long-term strategy."
      }
    },
    {
      "@type": "Question",
      "name": "How does my website affect my Google Business Profile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your website helps Google and customers understand your services, location, expertise, and legitimacy. Strong service pages, accurate contact information, clear local context, useful content, and consistent business details can support the profile. The profile and website should reinforce each other rather than provide conflicting information."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help if my profile has been suspended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, depending on the cause. The first step is to identify the likely policy or verification issue. That may involve the business name, address, documentation, eligibility, duplicate profiles, or recent changes. Reinstatement is controlled by Google and cannot be guaranteed. A careful review and properly documented appeal give the business a better chance than repeatedly changing information or submitting incomplete requests."
      }
    },
    {
      "@type": "Question",
      "name": "Is Google Business Profile optimization the same as local SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is one part of local SEO. Local visibility can also depend on your website, location and service pages, reviews, business citations, local links, on-page content, technical website health, proximity to the searcher, competition, and overall online prominence. The profile is often the most visible part of local search, but it does not operate alone."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Google Business Profile Optimization",
  "url": "https://truepathdigital.com/services/google-profile",
  "provider": {
    "@type": "ProfessionalService",
    "@id": "https://truepathdigital.com/#business",
    "name": "True Path Digital",
    "url": "https://truepathdigital.com"
  },
  "serviceType": "Local Search Optimization",
  "description": "Google Business Profile optimization, category audit, review systems, spam removal, and local search visibility for owner-operated service businesses.",
  "areaServed": [
    { "@type": "City", "name": "Missoula" },
    { "@type": "State", "name": "Montana" }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Owner-operated local service businesses"
  }
};

const failureReasons = [
  {
    title: "The Primary Category Is Wrong or Too Broad",
    desc: "Selecting an inaccurate or broad category makes it hard for your profile to appear for the most valuable searches. The goal isn't to pick the most categories, but the most accurate ones."
  },
  {
    title: "Services Are Missing or Vague",
    desc: "Listing only a category gives Google and customers little context. Clearly detailing your actual services helps customers instantly know you can solve their specific problem."
  },
  {
    title: "No Consistent Review Process",
    desc: "Without a simple review process, you collect few reviews while competitors appear more established. A steady stream of honest customer feedback is essential for local trust."
  },
  {
    title: "The Profile Looks Neglected",
    desc: "Outdated hours, old photos, and unanswered reviews make a business appear less dependable. Keeping your profile current gives customers better information to work with."
  },
  {
    title: "Poor Website Alignment",
    desc: "Your profile and website should tell the exact same story. Conflicting details, buried services, or missing locations create uncertainty for search engines and customers."
  },
  {
    title: "Competitor Spam Taking Map Results",
    desc: "Some markets are crowded with listings using fake locations or keyword-stuffed names. We document and report these clear violations through proper Google channels."
  }
];

const methodologySteps = [
  {
    title: "Comprehensive Category and Service Audit",
    desc: "I review your primary category, secondary categories, listed services, service areas, business description, and profile structure. I compare the setup with the services you actually provide, the language customers use, your website content, your strongest local competitors, and Google eligibility requirements. The goal is to make the profile more accurate, focused, and relevant.",
    icon: <Search className="w-6 h-6 text-primary" />
  },
  {
    title: "Business Information Cleanup",
    desc: "I check the core information customers and Google rely on, including business name, address or hidden-address setup, phone number, website link, hours, holiday hours, service areas, appointment links, opening date, and attributes. Incorrect or inconsistent information gets corrected where possible.",
    icon: <MapPin className="w-6 h-6 text-primary" />
  },
  {
    title: "Service and Description Improvements",
    desc: "I rewrite or organize the profile information so customers can quickly understand what you do, who you serve, where you work, what types of jobs you handle, and what makes the business credible. This is written for real customers first. It should be clear and useful, not stuffed with awkward keywords.",
    icon: <Wrench className="w-6 h-6 text-primary" />
  },
  {
    title: "Profile Cleanup and Suspension Risk Review",
    desc: "I look for profile elements that may create unnecessary risk, including keyword-stuffed names, duplicate listings, ineligible addresses, incorrect storefront settings, unrealistic service areas, conflicting business information, or unsupported categories. The goal is to reduce avoidable risk and keep information aligned with Google guidelines.",
    icon: <ShieldAlert className="w-6 h-6 text-primary" />
  },
  {
    title: "Review Generation System",
    desc: "I create a straightforward process your team can actually use. Depending on the business, that may include a direct review link, QR code, text-message wording, email wording, staff instructions, recommended timing, and a simple follow-up sequence. The system should fit naturally into the customer experience, not depend on you remembering to ask.",
    icon: <MessageSquare className="w-6 h-6 text-primary" />
  },
  {
    title: "Review Response Guidance",
    desc: "Responding to reviews shows customers that someone is paying attention. I can help create a practical response process that keeps replies professional, specific, and consistent without making them sound automated. Responses can also reinforce useful context, like the service performed, when it belongs naturally in the conversation.",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  },
  {
    title: "Photo and Profile Content Plan",
    desc: "Customers want to see evidence that the business is real. I help identify the types of photos and updates that are most useful: team members, service vehicles, equipment, completed work, before-and-afters, shop photos, job-site images. The goal is not to post every day, but to maintain a profile that looks current and credible.",
    icon: <Search className="w-6 h-6 text-primary" />
  },
  {
    title: "Competitor and Spam Review",
    desc: "I review the local map results for suspicious listings, duplicates, false locations, or obvious business-name violations. When there is a reasonable basis for a report, I document the issue and use the appropriate Google reporting process. I do not promise Google will remove every listing, but I ensure it is properly reported.",
    icon: <AlertTriangle className="w-6 h-6 text-primary" />
  },
  {
    title: "Website and Profile Alignment",
    desc: "I compare the profile with the company website to identify gaps that may weaken local relevance or customer confidence. That includes missing service pages, weak location info, conflicting contact details, poor internal linking, or generic titles. When the website does not support what the profile claims, I show you what needs to be strengthened.",
    icon: <RefreshCw className="w-6 h-6 text-primary" />
  },
  {
    title: "Tracking and Conversion Review",
    desc: "Visibility matters, but calls and booked work matter more. Where appropriate, I review how the profile is currently generating activity, including calls, website visits, direction requests, messages, and search terms. This helps separate a ranking problem from a conversion or lead-handling problem.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />
  }
];

export default function GoogleProfilePage() {
  const { openDrawer } = useLeadDrawer();
  const [activePhase, setActivePhase] = useState(1);
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);

  const isPhase1InView = useInView(phase1Ref, { margin: "-20% 0px -20% 0px" });
  const isPhase2InView = useInView(phase2Ref, { margin: "-20% 0px -20% 0px" });
  const isPhase3InView = useInView(phase3Ref, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (isPhase3InView) setActivePhase(3);
    else if (isPhase2InView) setActivePhase(2);
    else if (isPhase1InView) setActivePhase(1);
  }, [isPhase1InView, isPhase2InView, isPhase3InView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-x-clip pt-32 relative z-10">
        
        {/* Hero Section */}
        <section className="relative flex flex-col justify-center px-6 md:px-12 py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center"
            >
              <motion.div variants={itemVariants} className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Profile Optimization
              </motion.div>

              <h1 className="max-w-3xl font-serif font-medium text-[clamp(2.75rem,4.5vw,4.5rem)] leading-[1.08] tracking-tight">
                <motion.span variants={itemVariants} className="block text-foreground">Show Up Better</motion.span>
                <motion.span variants={itemVariants} className="block text-primary">on Google Maps.</motion.span>
              </h1>
              
              <motion.div variants={itemVariants} className="mt-8 flex flex-col items-start gap-8">
                <p className="max-w-xl text-[clamp(1.125rem,1.4vw,1.25rem)] leading-relaxed text-muted-text">
                  Your Google Business Profile is often the first thing a potential customer sees. I help owner-operated service businesses clean up, strengthen, and better manage their profiles so they can turn more local searches into phone calls.
                </p>
                
                <Button onClick={() => openDrawer()} variant="primary">
                  Get Your Google Profile Reviewed
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-full lg:h-[70vh] h-[45vh]"
            >
              <ScrollImage 
                src="/images/google-profile.png" 
                alt="Google Profile optimization analysis on tablet"
                title="Google Business Profile optimization for local service businesses in Missoula, Montana"
                containerClassName="w-full h-full"
                priority
              />
            </motion.div>

          </div>
        </section>

        {/* Why Profiles Fail Section (Card Grid) */}
        <section className="border-t border-muted-border bg-surface-alt px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Common Pitfalls
              </h2>
              <h3 className="font-serif font-medium text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-tight text-foreground">
                Why Some Google Business Profiles Fail to Generate Consistent Calls
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {failureReasons.map((item, i) => (
                <div key={i} className="border border-muted-border bg-background p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-medium text-primary mb-4 block">0{i + 1}</span>
                    <h4 className="font-serif text-2xl font-medium mb-4 text-foreground">{item.title}</h4>
                    <p className="text-muted-text leading-relaxed text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Cost Quote (Supports the section above) */}
        <section className="px-6 py-24 md:py-32 border-y border-muted-border bg-background relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5" aria-hidden="true">
            <Quote className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rotate-180" strokeWidth={1} />
          </div>
          <div className="mx-auto w-full max-w-4xl text-center relative z-10 px-4">
            <blockquote className="space-y-8">
              <p className="font-serif text-[clamp(1.75rem,3.5vw,3.25rem)] font-medium leading-tight text-foreground">
                "An inaccurate or incomplete Google Profile means a ready-to-buy customer may never even reach your website."
              </p>
              <footer className="text-base md:text-lg text-muted-text uppercase tracking-widest font-medium">
                Optimization is not just an SEO task &mdash; it is a <span className="text-primary font-bold">trust and conversion</span> problem.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* What I Do Section - Sticky Animation Layout */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-alt border-y border-muted-border relative">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-20">
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-6">
                What I Do to Improve Your Local Visibility
              </h2>
              <p className="text-lg text-muted-text leading-relaxed">
                I do not hand you a generic report filled with charts and leave you to figure out the next step. I review the profile, identify the weaknesses that matter, and make practical improvements to the setup. The exact work depends on the business, market, and condition of the existing profile.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
              
              {/* Sticky Animation Column */}
              <div className="hidden lg:flex flex-col justify-center items-center sticky top-40 h-[65vh] border border-muted-border bg-background p-12">
                 <div className="relative w-full max-w-[240px] h-[340px]">
                    <AnimatePresence mode="wait">
                      {activePhase === 1 && (
                        <motion.svg key="phase1" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ duration: 0.4 }}
                        >
                           <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" className="text-muted-border" strokeWidth="3" strokeLinecap="round" />
                           <line x1="20" y1="50" x2="60" y2="50" stroke="currentColor" className="text-muted-border" strokeWidth="3" strokeLinecap="round" />
                           <line x1="20" y1="70" x2="70" y2="70" stroke="currentColor" className="text-muted-border" strokeWidth="3" strokeLinecap="round" />
                           
                           <motion.g
                              initial={{ x: -10, y: -10 }}
                              animate={{ x: [ -10, 25, -10 ], y: [ -10, 25, -10 ] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           >
                              <circle cx="35" cy="35" r="15" fill="var(--color-background, #fff)" stroke="var(--color-primary, #A16207)" strokeWidth="3" />
                              <line x1="46" y1="46" x2="60" y2="60" stroke="var(--color-primary, #A16207)" strokeWidth="4" strokeLinecap="round" />
                           </motion.g>
                        </motion.svg>
                      )}
                      
                      {activePhase === 2 && (
                        <motion.svg key="phase2" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ duration: 0.4 }}
                        >
                          <motion.circle cx="50" cy="50" r="30" fill="transparent" stroke="currentColor" className="text-muted-border" strokeWidth="2" strokeDasharray="4 4" 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{ originX: "50px", originY: "50px" }}
                          />
                          <motion.circle cx="50" cy="50" r="10" fill="transparent" stroke="var(--color-primary, #A16207)" strokeWidth="3" 
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                          />
                          <motion.line x1="10" y1="90" x2="43" y2="57" stroke="var(--color-primary, #A16207)" strokeWidth="3" strokeLinecap="round" 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          <motion.polygon points="43,57 33,57 43,67" fill="var(--color-primary, #A16207)" 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            style={{ transformOrigin: "43px 57px" }}
                          />
                        </motion.svg>
                      )}

                      {activePhase === 3 && (
                        <motion.svg key="phase3" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           transition={{ duration: 0.4 }}
                        >
                          <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" className="text-muted-border" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" className="text-muted-border" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" className="text-muted-border" strokeWidth="1" strokeDasharray="2 2" />
                          
                          <motion.path
                            d="M 5,85 C 30,85 40,50 60,50 C 80,50 90,20 95,15"
                            fill="transparent"
                            stroke="var(--color-primary, #A16207)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                          />
                          
                          <motion.path
                            d="M 85,15 L 95,15 L 95,25"
                            fill="transparent"
                            stroke="var(--color-primary, #A16207)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ opacity: 0, pathLength: 0 }}
                            animate={{ opacity: 1, pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 1.3, ease: "easeOut" }}
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                 </div>
                 <div className="mt-8 text-center relative h-16 w-full flex flex-col items-center">
                   <div className="text-xs font-medium uppercase tracking-widest text-primary mb-2">The Objective</div>
                   <AnimatePresence mode="wait">
                     <motion.h4 
                       key={activePhase}
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -5 }}
                       className="font-serif text-xl font-medium text-foreground leading-tight absolute top-6"
                     >
                       {activePhase === 1 && "Identify The Leaks"}
                       {activePhase === 2 && "Build Authority & Trust"}
                       {activePhase === 3 && "Turn Searches Into Calls"}
                     </motion.h4>
                   </AnimatePresence>
                 </div>
              </div>

              {/* Scrollable Phases Column */}
              <div className="space-y-24">
                
                {/* Phase 1 */}
                <div className="space-y-12" ref={phase1Ref}>
                  <div className="border-b border-muted-border pb-4">
                    <span className="text-sm font-medium uppercase tracking-widest text-primary block mb-3">Phase 01</span>
                    <h3 className="font-serif text-3xl font-medium text-foreground">Audit & Cleanup</h3>
                  </div>
                  <div className="space-y-12">
                    {methodologySteps.slice(0, 4).map((step, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="flex-shrink-0 mt-1">{step.icon}</div>
                        <div>
                          <h4 className="font-serif text-xl font-medium text-foreground mb-3">{step.title}</h4>
                          <p className="text-muted-text leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="space-y-12" ref={phase2Ref}>
                  <div className="border-b border-muted-border pb-4">
                    <span className="text-sm font-medium uppercase tracking-widest text-primary block mb-3">Phase 02</span>
                    <h3 className="font-serif text-3xl font-medium text-foreground">Authority & Alignment</h3>
                  </div>
                  <div className="space-y-12">
                    {methodologySteps.slice(4, 8).map((step, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="flex-shrink-0 mt-1">{step.icon}</div>
                        <div>
                          <h4 className="font-serif text-xl font-medium text-foreground mb-3">{step.title}</h4>
                          <p className="text-muted-text leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="space-y-12" ref={phase3Ref}>
                  <div className="border-b border-muted-border pb-4">
                    <span className="text-sm font-medium uppercase tracking-widest text-primary block mb-3">Phase 03</span>
                    <h3 className="font-serif text-3xl font-medium text-foreground">Tracking & Growth</h3>
                  </div>
                  <div className="space-y-12">
                    {methodologySteps.slice(8, 10).map((step, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="flex-shrink-0 mt-1">{step.icon}</div>
                        <div>
                          <h4 className="font-serif text-xl font-medium text-foreground mb-3">{step.title}</h4>
                          <p className="text-muted-text leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Stronger Profile & Audience Section */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-foreground text-background overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)' }}></div>
          
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            
            {/* What a Stronger Profile Looks Like */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                What a Stronger Profile Looks Like
              </h2>
              
              <div className="mb-10 text-background/80 text-lg leading-relaxed">
                <p>
                  A good result is not simply a profile with more fields filled out. It is a profile that accurately represents the business and makes it easier for the right customer to take the next step. That usually means:
                </p>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid gap-4"
              >
                {[
                  "Accurate categories & service details", 
                  "A consistent, healthy review flow", 
                  "Stronger alignment with your website", 
                  "Reduced suspension & compliance risks", 
                  "Clearer performance tracking", 
                  "A frictionless path from search to a phone call"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                    }}
                    className="flex items-center gap-4 bg-background/5 p-4 md:p-5 rounded-sm border border-background/10 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-[0.95rem] md:text-base">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-12 pt-8 border-t border-background/20 text-background/70 text-base leading-relaxed">
                <p>
                  Search visibility can never be guaranteed. Rankings vary based on relevance, distance, prominence, competition, location, search history, and other factors controlled by Google. The goal is to remove preventable weaknesses and give the business a stronger local search foundation.
                </p>
              </div>
            </div>

            {/* Who This Service Is For */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                Who This Service Is For
              </h2>
              
              <div className="text-background/80 text-lg leading-relaxed mb-8">
                <p>
                  Optimization is best suited for owner-operated and family-run service businesses that depend on customers within a defined geographic area.
                </p>
              </div>

              {/* Industry Badges */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-wrap gap-2 md:gap-3 mb-12"
              >
                {[
                  "HVAC", "Plumbers", "Electricians", "Roofers", "Septic & Excavation", 
                  "Cleaning Companies", "Landscapers", "Pest Control", "Garage Door Cos.", 
                  "Auto Repair", "Appliance Repair"
                ].map((industry, i) => (
                  <motion.span 
                    key={i}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                    className="px-4 py-2 rounded-full border border-background/20 bg-background/5 text-background text-sm font-medium hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {industry}
                  </motion.span>
                ))}
              </motion.div>

              <div className="bg-background/5 border border-background/10 p-8 md:p-10 rounded-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-6 opacity-10">
                  <AlertTriangle className="w-32 h-32 text-primary" />
                </div>
                
                <h3 className="font-serif text-2xl font-medium mb-8 relative z-10 text-primary">
                  It is especially useful when:
                </h3>
                
                <motion.ul 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  className="space-y-5 relative z-10"
                >
                  {[
                    "Your competitors consistently appear above you on Google Maps",
                    "Your profile generates views but not enough calls",
                    "You have fewer reviews than comparable competitors",
                    "Your categories or services have never been reviewed",
                    "Your business information is inconsistent",
                    "Your service area is unclear",
                    "You have recently moved or changed your phone number",
                    "You are worried about suspension or verification problems",
                    "Your website and profile do not match",
                    "You are paying for ads while your local profile remains weak"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                      className="flex items-start gap-4 group"
                    >
                      <AlertCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                      <span className="text-background/90 text-base">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

            </div>

          </div>
        </section>



        {/* FAQ Section */}
        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-16 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-12">
              {faqSchema.mainEntity.map((faq, idx) => (
                <div key={idx} className="border-b border-muted-border pb-10">
                  <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                    {faq.name}
                  </h3>
                  <p className="text-muted-text text-lg leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-muted-border bg-foreground text-background py-24 px-6 md:px-12 text-center">
          <div className="mx-auto w-full max-w-3xl flex flex-col items-center">
            <h2 className="font-serif font-medium text-[clamp(2.5rem,4.5vw,4rem)] leading-tight mb-6">
              Start With a Google Profile Review
            </h2>
            <p className="text-background/80 text-lg leading-relaxed mb-10 max-w-xl">
              You may not need a large SEO campaign. You may need the categories corrected, the services organized, the review process fixed, or the profile and website brought into alignment. Schedule a brief 15-minute Lead Review. I will look at your current profile, identify the most important issues, and explain what I would fix first.
            </p>
            <Button onClick={() => openDrawer()} variant="light">
              Get Your Google Profile Reviewed
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
