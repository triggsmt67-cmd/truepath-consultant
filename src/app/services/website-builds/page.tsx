"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ScrollImage from "@/components/ScrollImage";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, Quote, Smartphone, Code, Target, MapPin, MousePointerClick, ShieldCheck, Mail, LineChart, LayoutDashboard, Search } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a completely new website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not always. Some websites need focused conversion repairs rather than a full rebuild. I first look at the current structure, mobile experience, content, technical condition, search visibility, and lead flow. If the existing site can be repaired efficiently, I will say so."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to write the website copy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. I write the website copy based on interviews, existing materials, customer reviews, services, service areas, and the way the business actually operates. You review the content for accuracy before it is published."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need professional photography?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional photography is helpful but not always required. Real photos from a modern phone can be useful when they clearly show the team, vehicles, equipment, and completed work. Generated or licensed images may be used selectively, but they should not misrepresent the company."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a custom website take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many service-business website projects can be completed in several weeks. The actual timeline depends on the number of pages, availability of photos and business information, review speed, and CRM integrations."
      }
    },
    {
      "@type": "Question",
      "name": "How many service pages do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That depends on the number of meaningful services the company provides and how customers search for them. The strongest candidates usually include core revenue-producing services and services customers need explained."
      }
    },
    {
      "@type": "Question",
      "name": "Will the website rank on Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No developer can guarantee a specific ranking. A well-built website can create a stronger foundation through clear content, sound technical structure, local relevance, and alignment with the Google Business Profile."
      }
    },
    {
      "@type": "Question",
      "name": "Will the website be fast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The site will be built with performance as a priority. I avoid unnecessary scripts and bloated components, optimize images, and test the site across common mobile and desktop conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Will I own my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You should own your domain name, website content, business accounts, and the project files covered by the agreement. There are no hostage contracts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I update the website myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That depends on the project setup. Some clients want a simple editing system for changing text, photos, hours, or basic service information. Others prefer to request changes. I determine the appropriate setup based on your needs."
      }
    },
    {
      "@type": "Question",
      "name": "Can the site connect to Jobber, Housecall Pro, or ServiceTitan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, yes. The available options depend on the platform, plan, forms, APIs, and integration tools it supports. Connections may include form routing, booking links, or CRM entry."
      }
    },
    {
      "@type": "Question",
      "name": "Can you use my existing domain name?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The domain can usually remain with the current registrar and be connected to the new website. The domain should always remain in an account controlled by you."
      }
    },
    {
      "@type": "Question",
      "name": "What happens to my old website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The old site remains available until the replacement has been tested and is ready to launch. Before launch, I review existing URLs, redirects, forms, and DNS records to prevent disruption."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing website support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ongoing support can be included when the business needs it. That may cover hosting oversight, software updates, backups, small content changes, and performance checks."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design and Conversion Repair",
  "url": "https://truepathdigital.com/services/website-builds",
  "provider": {
    "@type": "ProfessionalService",
    "@id": "https://truepathdigital.com/#business",
    "name": "True Path Digital",
    "url": "https://truepathdigital.com"
  },
  "serviceType": "Web Development",
  "description": "Website design and conversion repair for owner-operated local service businesses that turns more visitors into calls, estimates, and booked work.",
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
    title: "The Mobile Experience Is Difficult to Use",
    desc: "Most customers searching for an urgent service are on a phone. They are not browsing patiently. If the phone number is difficult to tap, the text is too small, or the menu is confusing, they will return to Google."
  },
  {
    title: "The Website Uses Generic Language",
    desc: "Phrases like 'quality service' and 'trusted professionals' are too vague. Your website should clearly explain the specific problems you solve, where you work, and exactly why the business is credible."
  },
  {
    title: "Stock Photos Destroy Credibility",
    desc: "Customers want to see the actual company they may hire. A website filled with generic contractors, spotless tools, and staged handshakes creates a false picture and reduces real trust."
  },
  {
    title: "Vague Services & Locations",
    desc: "Packing everything onto a single homepage confuses visitors and starves Google of local ranking signals. Customers shouldn't have to guess if you handle their specific problem in their exact town."
  },
  {
    title: "There Is Not Enough Trust",
    desc: "Hiring a contractor is a risk decision. Your website must actively reduce uncertainty by providing real reviews, licenses, guarantees, service process explanations, and straightforward policies."
  },
  {
    title: "The Next Step Creates Friction",
    desc: "Vague buttons like 'Submit' or quote forms that ask for too much information kill leads. The path to calling or booking an estimate must be specific, visible, and completely frictionless."
  }
];

const methodologySteps = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Website Conversion Review",
    desc: "I review the existing site to identify where visitors are getting confused, losing trust, or abandoning the next step. The goal is to separate design preferences from actual business problems."
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Website Strategy & Page Planning",
    desc: "I determine what the website needs to accomplish and which pages are necessary, including decisions about main services, priority service areas, trust content, and lead routing."
  },
  {
    icon: <Quote className="w-8 h-8 text-primary" />,
    title: "Conversion-Focused Copywriting",
    desc: "I write the copy based on your actual business, services, and customers. The writing is designed to answer the questions customers care about and help them make a confident decision."
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Service Page Development",
    desc: "Important services receive dedicated pages. A strong service page explains the problem, common symptoms, the service process, related services, and how to request help."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "Mobile-First & Click-to-Call Design",
    desc: "The mobile experience is built around fast access to essential information. This includes tap-to-call buttons, short forms, simple menus, readable text, and sticky mobile actions."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Real Trust and Proof",
    desc: "I organize the information customers use to evaluate the business: review excerpts, real work photos, team info, guarantees, licenses, and before-and-after examples."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
    title: "Fast, Clean Website Development",
    desc: "I build lean websites without unnecessary plugins, bloated page builders, or excessive scripts. The priorities are fast loading, mobile usability, security, accessibility, and clean code."
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Local Search Foundation",
    desc: "I build the site so search engines can easily understand geographic relevance, using clear page titles, logical heading structures, clean URLs, internal linking, and XML sitemap setup."
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: "Forms, CRM, and Lead Routing",
    desc: "I connect the site to the tools you already use, such as Jobber, Housecall Pro, ServiceTitan, or direct email notifications, ensuring inquiries reach the right person quickly."
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Tracking and Measurement",
    desc: "I install or improve tracking so you can see what the site is producing, including phone-call tracking, form submissions, and Google Analytics to help you make better decisions."
  }
];

export default function WebsiteBuildsPage() {
  const { openDrawer } = useLeadDrawer();
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
        <section className="relative flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 border-b border-muted-border">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-8 border border-primary/20">
                <LayoutDashboard className="w-4 h-4" />
                Custom Strategy & Builds
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-8">
                Turn More Website Visitors Into Calls & Booked Work.
              </motion.h1>
              
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-text leading-relaxed mb-10">
                <p>
                  A service-business website does not need to be flashy. It needs to help the right customer understand what you do, trust your business, and take the next step without getting lost.
                </p>
                <p>
                  I design and improve websites for owner-operated local service businesses that need clearer messaging, stronger trust, better local visibility, and a simpler path from search to phone call.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
                  Request a Website Review
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[600px] w-full rounded-sm overflow-hidden border border-muted-border"
            >
              <ScrollImage 
                src="/images/website-builds.png" 
                alt="Website design and conversion layout for contractors"
                title="Custom website design and conversion repair for local service businesses"
                containerClassName="w-full h-full"
                priority
              />
            </motion.div>

          </div>
        </section>

        {/* Why Standard Websites Fail Section (Card Grid) */}
        <section className="border-b border-muted-border bg-surface-alt px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> The Reality
              </h2>
              <h3 className="font-serif font-medium text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-tight text-foreground">
                Why Standard Service-Business Websites Fail To Convert
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
        <section className="px-6 py-24 md:py-32 border-b border-muted-border bg-background relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5" aria-hidden="true">
            <Quote className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rotate-180" strokeWidth={1} />
          </div>
          <div className="mx-auto w-full max-w-4xl text-center relative z-10 px-4">
            <blockquote className="space-y-8">
              <p className="font-serif text-[clamp(1.75rem,3.5vw,3.25rem)] font-medium leading-tight text-foreground">
                "A website can have polished graphics, modern animations, and stock photos, while still burying the exact information your customer needs."
              </p>
              <footer className="text-base md:text-lg text-muted-text uppercase tracking-widest font-medium">
                The goal is to remove friction &mdash; not just <span className="text-primary font-bold">redesign for appearance</span>.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* What I Do Section - Sticky Animation Layout */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-alt border-b border-muted-border relative">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-24">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> The Process
              </h2>
              <h3 className="font-serif font-medium text-[clamp(2.5rem,4vw,4rem)] leading-tight tracking-tight text-foreground mb-8">
                What I Do to Improve Your Website
              </h3>
              <p className="text-xl text-muted-text leading-relaxed">
                I do not begin with colors, animations, or design trends. I begin by looking at how the customer finds the site, what they need to understand, what may be causing hesitation, and what action you want them to take.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 relative">
              
              {/* Sticky Left Column (Animated Visuals) */}
              <div className="hidden lg:block relative">
                 <div className="sticky top-40 w-full h-[600px] bg-background border border-muted-border rounded-sm overflow-hidden flex flex-col items-center justify-center p-12">
                   
                   <AnimatePresence mode="wait">
                     {/* Phase 1 Graphic */}
                     {activePhase === 1 && (
                       <motion.div
                         key="phase1"
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.1 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col items-center"
                       >
                         <div className="relative w-48 h-48 mb-8">
                           <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                           <div className="absolute inset-4 border border-primary/50 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
                           <div className="absolute inset-0 flex items-center justify-center">
                             <Target className="w-16 h-16 text-primary" />
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {/* Phase 2 Graphic */}
                     {activePhase === 2 && (
                       <motion.div
                         key="phase2"
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.1 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col items-center"
                       >
                         <div className="grid grid-cols-2 gap-4 mb-8">
                           <div className="w-24 h-24 bg-primary/10 rounded-sm border border-primary/30 flex items-center justify-center">
                             <Smartphone className="w-10 h-10 text-primary" />
                           </div>
                           <div className="w-24 h-24 bg-primary/10 rounded-sm border border-primary/30 flex items-center justify-center">
                             <Code className="w-10 h-10 text-primary" />
                           </div>
                           <div className="w-24 h-24 bg-primary/10 rounded-sm border border-primary/30 flex items-center justify-center">
                             <ShieldCheck className="w-10 h-10 text-primary" />
                           </div>
                           <div className="w-24 h-24 bg-primary/10 rounded-sm border border-primary/30 flex items-center justify-center">
                             <Search className="w-10 h-10 text-primary" />
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {/* Phase 3 Graphic */}
                     {activePhase === 3 && (
                       <motion.div
                         key="phase3"
                         initial={{ opacity: 0, y: 40 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -40 }}
                         transition={{ duration: 0.5 }}
                         className="flex flex-col items-center"
                       >
                         <div className="relative mb-8">
                           <LineChart className="w-40 h-40 text-primary" />
                           <motion.div 
                             className="absolute top-0 right-0 w-8 h-8 bg-background rounded-full flex items-center justify-center"
                             animate={{ y: [0, -10, 0] }}
                             transition={{ repeat: Infinity, duration: 2 }}
                           >
                             <CheckCircle2 className="w-6 h-6 text-green-500" />
                           </motion.div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <AnimatePresence mode="wait">
                     <motion.h4 
                       key={activePhase}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="font-serif text-3xl font-medium text-foreground text-center"
                     >
                       {activePhase === 1 && "Strategy & Structure"}
                       {activePhase === 2 && "Design & Foundation"}
                       {activePhase === 3 && "Routing & Measurement"}
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Strategy & Structure</h3>
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Design & Foundation</h3>
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Routing & Measurement</h3>
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

        {/* Stronger Website & Audience Section */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-foreground text-background overflow-hidden relative border-b border-muted-border">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)' }}></div>
          
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            
            {/* What a Stronger Website Looks Like */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                What a Good Result Looks Like
              </h2>
              
              <div className="mb-10 text-background/80 text-lg leading-relaxed">
                <p>
                  A successful service-business website should make the company easier to understand and easier to hire. The goal is to create a useful path from customer need to business response.
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
                  "Visitors quickly identify main services", 
                  "The service area is explicitly clear", 
                  "Phone numbers are easy to find & tap", 
                  "Quote forms are simple & frictionless", 
                  "Real proof replaces generic claims", 
                  "Leads actually reach the correct person"
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
            </div>

            {/* Who This Service Is For */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                Who This Service Is For
              </h2>
              
              <div className="text-background/80 text-lg leading-relaxed mb-8">
                <p>
                  This service is built for owner-operated and family-run local service businesses that depend on customers within a defined geographic area.
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
                    "Your website looks outdated or generic",
                    "Mobile visitors are bouncing without calling",
                    "You pay for traffic but see low inquiries",
                    "Your services are poorly explained",
                    "Your contact form fails or is too complex",
                    "Leads are not reaching the correct person",
                    "Your business has outgrown the existing site"
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

        {/* Website Repair or Rebuild Section (Actionable Review) */}
        <section className="px-6 py-20 md:px-12 md:py-24 bg-surface-alt border-b border-muted-border">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-6">
              Start With a Website Review
            </h2>
            <div className="text-lg text-muted-text leading-relaxed space-y-6 mb-10">
              <p>
                Not every underperforming website needs to be completely replaced. Sometimes the highest-value improvements are focused: rewriting the homepage, shortening forms, fixing mobile speed, or connecting leads to a CRM. 
              </p>
              <p>
                I will review your current website, explain where it may be losing calls, and show you what I would fix first.
              </p>
            </div>
            <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
              Request a Website Review
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-16 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-12">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-muted-border pb-12 last:border-0 last:pb-0">
                  <h3 className="font-serif text-2xl font-medium mb-4">{faq.name}</h3>
                  <p className="text-muted-text leading-relaxed text-lg">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
