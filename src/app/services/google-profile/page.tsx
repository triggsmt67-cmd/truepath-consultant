"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ScrollImage from "@/components/ScrollImage";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { serializeJsonLd } from "@/lib/json-ld";
import { useServicePhase } from "@/hooks/useServicePhase";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Search, CheckCircle2, ShieldAlert, BarChart3, AlertTriangle, AlertCircle, Wrench, RefreshCw, MessageSquare } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Google Business Profile optimization include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I check categories, services, business details, service areas, reviews, photos, and the link to your website. The work depends on what is wrong or missing. A profile with an incorrect category needs a different fix from one that gets attention but sends customers to a confusing website. We agree on the cleanup scope after the initial review."
      }
    },
    {
      "@type": "Question",
      "name": "How can my business rank better on Google Maps in Missoula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start with accurate business information, categories that match your work, useful service details, and honest customer reviews. Your website should clearly explain the same services and where you provide them. Google says local results mainly depend on relevance, distance, and popularity. I can improve the information customers and Google have to work with, but I cannot change where the searcher is or guarantee a Map Pack position."
      }
    },
    {
      "@type": "Question",
      "name": "How long does Google Business Profile optimization take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Timing depends on the issues, access to the profile, business documentation, and whether Google requires verification. I explain the work and timing after the review. Completing the cleanup and seeing a change in rankings are different milestones. Google controls when changes appear and how the business ranks."
      }
    },
    {
      "@type": "Question",
      "name": "How much does Google Business Profile optimization cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The scope determines the price. Correcting business details is different from organizing services, building a review process, or resolving a verification issue. Start with the 15-minute Lead Review so I can identify the priorities and explain the proposed work and cost before cleanup begins."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a physical storefront?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligible businesses that travel to customers can have a service-area profile. If customers are not served at your address, the address should be hidden. A home-based plumber or cleaner does not need to rent a storefront just to have a profile. The business still has to meet Google’s eligibility rules; a mailbox or virtual office is not a substitute for an eligible business location."
      }
    },
    {
      "@type": "Question",
      "name": "Will adding more service areas make me rank across Montana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Listing a town does not guarantee visibility there. Use the areas where you actually take jobs. Distance from the searcher still matters, along with relevance and popularity. I check whether your profile and website describe the same operating area, rather than adding cities you do not serve or creating duplicate profiles for each town."
      }
    },
    {
      "@type": "Question",
      "name": "Can you remove negative reviews or competitor listings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google decides what gets removed. An honest negative review is not removable simply because a business dislikes it. If a review or listing appears to violate a specific policy, I can help document the issue and use the appropriate reporting process. There is no promise of removal. For legitimate feedback, a calm response and a fair process for inviting honest reviews are more useful."
      }
    },
    {
      "@type": "Question",
      "name": "How many Google reviews do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no universal target. Compare your profile with businesses providing the same service in your actual market, then build a repeatable process for requesting honest feedback from customers. Google says more reviews and positive ratings can help local ranking. Do not buy reviews, offer rewards, or send invitations only to people expected to leave a positive review."
      }
    },
    {
      "@type": "Question",
      "name": "How does my website support my Google Business Profile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A customer should be able to confirm the service, coverage area, and next step after clicking through. I check for matching business details, clear service pages, and a working contact route. You do not need a separate page for every keyword or every town. Each page should answer a real customer question and describe work you actually offer."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help if my profile has been suspended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I can review possible policy and verification issues, including the name, address, eligibility, duplicates, and supporting documentation. The next step depends on the cause. Google controls reinstatement, so I cannot guarantee approval or a recovery date. Bring the suspension notice to the review before making repeated profile changes or creating another listing."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://truepath406.com/services/google-profile#service",
  name: "Google Business Profile Optimization in Missoula",
  url: "https://truepath406.com/services/google-profile",
  provider: {
    "@id": "https://truepath406.com/#business",
  },
  image: "https://truepath406.com/images/google-profile.webp",
  serviceType: "Local Search Optimization",
  category: "Google Business Profile consulting",
  description: "Google Business Profile review and optimization for Missoula and Montana service businesses: categories, business details, services, honest review processes, and website alignment.",
  areaServed: [
    { "@type": "City", name: "Missoula" },
    { "@type": "State", name: "Montana" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Owner-operated local service businesses",
  },
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
    title: "Reviews Depend on Remembering to Ask",
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
    title: "Possible Policy Violations in Local Results",
    desc: "A listing may use an ineligible location or a name that does not match the real business. I document specific concerns and report them through Google. Removal is Google’s decision."
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
    desc: "I help put a neutral review invitation into your normal job-completion process. That can include a direct review link, QR code, invitation wording, timing, and a person responsible for sending it. Ask for honest feedback without rewards, pressure, suggested review text, or filtering out customers who may be unhappy.",
    icon: <MessageSquare className="w-6 h-6 text-primary" />
  },
  {
    title: "Review Response Guidance",
    desc: "Responding to reviews shows customers that someone is paying attention. I can help create a practical response process that keeps replies professional, specific, and consistent without making them sound automated. Replies should address the feedback without repeating private customer or job details.",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />
  },
  {
    title: "Photo and Profile Content Plan",
    desc: "Customers want to see evidence that the business is real. I help identify the types of photos and updates that are most useful: team members, service vehicles, equipment, completed work, before-and-afters, shop photos, job-site images. The goal is not to post every day, but to maintain a profile that looks current and credible.",
    icon: <Search className="w-6 h-6 text-primary" />
  },
  {
    title: "Competitor and Spam Review",
    desc: "I review the local map results for suspicious listings, duplicates, false locations, or obvious business-name violations. When there is a reasonable basis for a report, I document the issue and use the appropriate Google reporting process. I do not promise Google will remove every listing, and reports need specific policy grounds.",
    icon: <AlertTriangle className="w-6 h-6 text-primary" />
  },
  {
    title: "Website and Profile Alignment",
    desc: "I compare the profile with the company website to identify gaps that may weaken local relevance or customer confidence. That includes missing service pages, weak location info, conflicting contact details, poor internal linking, or generic titles. When the website does not support what the profile claims, I show you what needs to be strengthened.",
    icon: <RefreshCw className="w-6 h-6 text-primary" />
  },
  {
    title: "Tracking and Conversion Review",
    desc: "I review the available profile search terms, call-button clicks, website clicks, and other relevant interactions. A call-button click is not proof of an answered call or a booked job. We compare those signals with your inquiry and job records where available. Business Profile performance can include activity from Google Ads as well as organic results.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />
  }
];

export default function GoogleProfilePage() {
  const { openDrawer } = useLeadDrawer();
  const { activePhase, getPhaseProps } = useServicePhase();

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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <div className="noise-overlay" style={{ width: "100%" }} />
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
                <span className="w-8 h-px bg-primary"></span> Missoula, Montana
              </motion.div>

              <h1 className="max-w-3xl font-serif font-medium text-[clamp(2.5rem,4.2vw,4rem)] leading-[1.08] tracking-tight">
                <motion.span variants={itemVariants} className="block text-foreground">Google Business Profile</motion.span>{" "}
                <motion.span variants={itemVariants} className="block text-primary">Optimization in Missoula.</motion.span>
              </h1>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col items-start gap-8">
                <p className="max-w-xl text-[clamp(1.125rem,1.4vw,1.25rem)] leading-relaxed text-muted-text">
                  I help Missoula service businesses correct their Google Business Profile, organize the services they actually offer, and give customers a clear path to call or request work. Start with the profile, then check that the website backs it up.
                </p>

                <Button onClick={() => openDrawer()} variant="primary">
                  Request a Google Business Profile Review
                </Button>
                <p className="max-w-xl text-sm leading-relaxed text-muted-text">A 15-minute Lead Review to identify what needs attention. I’ll email you to arrange a time.</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-full lg:h-[70vh] h-[45vh]"
            >
              <ScrollImage
                src="/images/google-profile.webp"
                alt="Service technician checking a business listing on a phone"
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
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Common Pitfalls
              </p>
              <h2 className="font-serif font-medium text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-tight text-foreground">
                Where a Google Business Profile Can Lose Customers
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {failureReasons.map((item, i) => (
                <div key={i} className="border border-muted-border bg-background p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-medium text-primary mb-4 block">0{i + 1}</span>
                    <h3 className="font-serif text-2xl font-medium mb-4 text-foreground">{item.title}</h3>
                    <p className="text-muted-text leading-relaxed text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A practical example of profile and website alignment */}
        <section aria-labelledby="profile-path-heading" className="px-6 py-24 md:px-12 border-y border-muted-border bg-background">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-5">The profile-to-website check</p>
              <h2 id="profile-path-heading" className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-6">One service. A clear path to the right job.</h2>
              <p className="text-lg text-muted-text leading-relaxed">If a customer finds you for water heater replacement, can they confirm that you do that work, serve their area, and know how to reach you? I check the whole path before recommending more content.</p>
            </div>
            <ol className="grid md:grid-cols-3 gap-6">
              {[
                { label: "01 / Google Profile", title: "Name the actual service", text: "A plumber lists water heater replacement as a service and describes the work clearly. The business name stays its real-world name.", color: "border-t-primary" },
                { label: "02 / Website", title: "Explain the same work", text: "The linked website makes water heater replacement easy to find. The service page explains what is included and where the company takes jobs.", color: "border-t-[#4d6b5f]" },
                { label: "03 / Inquiry", title: "Make the next step clear", text: "A working phone link or request form lets the customer describe the job. The business confirms coverage and availability before promising a visit.", color: "border-t-foreground" },
              ].map((step) => (
                <li key={step.label} className={`border border-muted-border border-t-4 ${step.color} bg-surface-alt p-7 md:p-8`}>
                  <p className="text-xs font-medium uppercase tracking-widest text-primary mb-5">{step.label}</p>
                  <h3 className="font-serif text-2xl font-medium mb-4">{step.title}</h3>
                  <p className="text-muted-text leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 grid lg:grid-cols-2 gap-6 text-sm leading-relaxed text-muted-text">
              <p>Illustrative plumbing example, not a client result. Only list work you provide. The service list helps customers understand your business; adding a phrase does not guarantee a ranking.</p>
              <p>Working on this yourself? Use the <Link href="/insights/google-profile-is-killing-your-local-visibility" className="text-foreground underline underline-offset-4 decoration-primary hover:text-primary">Google Business Profile optimization guide</Link> and its <a href="/downloads/google-business-profile-website-planning-map.png" className="text-foreground underline underline-offset-4 decoration-primary hover:text-primary">30-page website planning map</a>. The map is an example structure, not a target page count.</p>
            </div>
          </div>
        </section>

        {/* What I Do Section - Sticky Animation Layout */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-alt border-y border-muted-border relative">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-20">
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-6">
                What Your Google Profile Cleanup Can Include
              </h2>
              <p className="text-lg text-muted-text leading-relaxed">
                I review the profile against your actual business, identify what needs attention, and agree on the work with you. These are the areas I check. The review determines which changes are needed.
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
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(1)}
                >
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
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(2)}
                >
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
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(3)}
                >
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
                </motion.div>

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
                  "A clear path from the profile to an inquiry"
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
                  Google controls local rankings. Accurate information, a useful website, and honest reviews give customers better reasons to consider you, but no cleanup can promise a particular position or a fixed number of calls.
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
                  I’m Trevor Riggs, based in Missoula. I work with owner-operated and family-run service businesses in Missoula and across Montana. The review starts with the services you provide and the places where you actually take jobs.
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



        <section aria-labelledby="review-scope-heading" className="px-6 py-24 md:px-12 bg-surface-alt border-b border-muted-border">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-5">Start with a review</p>
              <h2 id="review-scope-heading" className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-6">Find the issue before paying for more work.</h2>
              <p className="text-lg text-muted-text leading-relaxed">In the 15-minute Lead Review, we look at the profile, the services you want more inquiries for, and the page customers reach after clicking through. I explain the first issues I would address. It is an initial conversation; the cleanup itself is separate work with an agreed scope.</p>
            </div>
            <div className="border border-muted-border bg-background p-8 md:p-10">
              <h3 className="font-serif text-2xl font-medium mb-6">Bring these to the conversation</h3>
              <ul className="space-y-4 text-muted-text leading-relaxed list-disc pl-5">
                <li>Your Google Maps profile link and website address.</li>
                <li>The services you want more of, plus the towns where you actually take jobs.</li>
                <li>What concerns you: visibility, incorrect information, few inquiries, or a verification notice.</li>
                <li>Any available profile performance or inquiry records. If you have none, we start with the information we can check.</li>
              </ul>
              <p className="mt-6 pt-6 border-t border-muted-border text-sm leading-relaxed text-muted-text">In the form’s “Biggest Challenge” field, mention your Google profile and the service you want to discuss. I’ll email you to arrange a time.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-16 text-center">
              Questions About Google Business Profile Optimization
            </h2>
            <p className="text-muted-text leading-relaxed mb-12">The work follows Google’s <a href="https://support.google.com/business/answer/3038177?hl=en" className="underline underline-offset-4 hover:text-primary">business representation guidelines</a>, <a href="https://support.google.com/business/answer/7091?hl=en" className="underline underline-offset-4 hover:text-primary">local ranking guidance</a>, and <a href="https://support.google.com/contributionpolicy/answer/7400114?hl=en" className="underline underline-offset-4 hover:text-primary">review policies</a>. See its <a href="https://support.google.com/business/answer/9918094?hl=en" className="underline underline-offset-4 hover:text-primary">performance definitions</a> for what profile interactions measure.</p>
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
              Tell me which services you want more inquiries for and what is happening now. Use the request form to arrange a 15-minute Lead Review. I will look at the profile with you, explain what I would fix first, and discuss whether cleanup work makes sense.
            </p>
            <Button onClick={() => openDrawer()} variant="light">
              Request a Google Business Profile Review
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
