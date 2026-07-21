"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ScrollImage from "@/components/ScrollImage";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, AlertCircle, Quote, Smartphone, Target, Search, ShieldCheck, Mail, LineChart, MessageSquare, ClipboardCheck, BellRing, PhoneCall, Workflow, Clock } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will automated messages sound robotic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They should not. The messages are written in plain language that fits the business’s normal communication style. They should sound like a useful acknowledgment from the company, not a corporate chatbot."
      }
    },
    {
      "@type": "Question",
      "name": "Does automation replace calling the lead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Automation can acknowledge the inquiry, collect details, and remind the team to respond. A real call or personal message is still important for many service inquiries. The purpose is to prevent silence, not eliminate human contact."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to change my phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not necessarily. Some systems can work with an existing business number. Others use call forwarding, number porting, a connected texting number, or a new tracked line."
      }
    },
    {
      "@type": "Question",
      "name": "Can customers text my existing landline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In some cases, business texting can be enabled on an existing landline or VoIP number. That depends on the provider and whether the number is eligible."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly should we respond to a new lead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The first goal is usually immediate acknowledgment followed by a real response as soon as someone qualified is available. A promise the team cannot consistently keep is worse than a clear and realistic expectation."
      }
    },
    {
      "@type": "Question",
      "name": "How often should we follow up on an estimate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The follow-up timing should reflect urgency, job size, customer decision process, and normal sales cycle. The messages should be useful and limited. They should not feel like pressure."
      }
    },
    {
      "@type": "Question",
      "name": "What software do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That depends on the current setup. Possible tools include your existing CRM, Jobber, Housecall Pro, ServiceTitan, or a shared inbox. The first question is whether the current tools can support the process with better setup."
      }
    },
    {
      "@type": "Question",
      "name": "Can this work with Jobber, Housecall Pro, or ServiceTitan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Often, yes. The exact options depend on the platform, subscription plan, integrations, APIs, phone setup, and desired workflow. I confirm what the platform can support before defining the project scope."
      }
    },
    {
      "@type": "Question",
      "name": "Will my technicians have to learn complicated software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not if the system is designed properly. The workflow should match the team’s actual capacity. A technically impressive system that nobody uses is not a successful system."
      }
    },
    {
      "@type": "Question",
      "name": "Can the system respond after hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. It can acknowledge the inquiry, explain business hours, request additional details, and set an expectation for the next response. It should not promise emergency service unless you provide it."
      }
    },
    {
      "@type": "Question",
      "name": "Can customers opt out of text messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Customers need a clear way to opt out, and the system should respect that choice. Text communication follows applicable consent and messaging requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Can this help with missed calls from existing customers too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The system can acknowledge calls from both new and existing customers, routing differently based on the type of inquiry."
      }
    },
    {
      "@type": "Question",
      "name": "Can you automate review requests too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Review requests can be triggered after a job is marked complete or after another appropriate milestone. It links directly to your Google Business Profile."
      }
    },
    {
      "@type": "Question",
      "name": "Can you guarantee that this will increase bookings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A response system cannot guarantee every lead will hire you. But it can reduce preventable losses caused by silence, forgotten follow-up, unclear ownership, and inconsistent handling."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A simple missed-call setup may be completed quickly. A larger system involving CRMs, team assignments, reporting, and integrations takes longer. The scope is defined before implementation begins."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Lead Response and Follow-Up Systems",
  "url": "https://truepathdigital.com/services/lead-response",
  "provider": {
    "@type": "ProfessionalService",
    "@id": "https://truepathdigital.com/#business",
    "name": "True Path Digital",
    "url": "https://truepathdigital.com"
  },
  "serviceType": "CRM & Automation",
  "description": "Lead response and follow-up systems for local service businesses to stop losing good leads to missed calls and slow follow-up.",
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
    title: "The Missed-Call & After-Hours Trap",
    desc: "The phone rings when you are under a vehicle or speaking with a customer. The missed call isn't the problem—the problem is the caller receives no acknowledgment and has no reason to wait."
  },
  {
    title: "Website Leads Sit in an Inbox",
    desc: "Forms often send an email that lands in spam, gets missed after hours, or creates confusion between the office and the owner. The lead disappears without anyone realizing it."
  },
  {
    title: "Estimates Go Cold",
    desc: "You visit the property, prepare an estimate, send it—and wait. Without a calm follow-up process, you assume the customer said no, when they never actually made a decision at all."
  },
  {
    title: "Memory & Sticky Note Chaos",
    desc: "Informal systems work until you get busy. Suddenly, customer details are scattered across phones, texts, and inboxes, and follow-up dates are entirely missed."
  },
  {
    title: "There Is No Clear Lead Owner",
    desc: "If nobody knows who responds first, who qualifies the lead, or who prepares the estimate, leads remain open without anyone actively pushing them forward."
  },
  {
    title: "Follow-Up Is Completely Inconsistent",
    desc: "Some leads receive several messages; others receive none. This inconsistency makes it impossible to know if you're losing jobs because of pricing, or simply because of slow response."
  }
];

const methodologySteps = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Lead Response Audit",
    desc: "I review the current process from first contact through booking. The goal is to identify exactly where leads wait, disappear, duplicate, or lose momentum."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Lead Assignment & Ownership",
    desc: "I create a simple process that makes one person responsible for each inquiry—by location, service, or shift—so it's obvious who owns the next step."
  },
  {
    icon: <Workflow className="w-8 h-8 text-primary" />,
    title: "Unified Lead View",
    desc: "I consolidate lead information into one reliable view (a CRM, shared inbox, or lightweight tracker) so the team knows exactly what is scheduled, open, won, or lost."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Lead Qualification",
    desc: "Not every inquiry is a good fit. We collect enough info (location, urgency, photos) to prioritize the lead without interrogating the customer."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: "Instant Missed-Call Response",
    desc: "When a call is missed, the caller receives a natural text acknowledging them, keeping the conversation open until the team can properly respond."
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: "Website Lead Confirmation",
    desc: "Forms trigger an immediate text or email confirmation setting expectations for response timing, while immediately notifying the responsible employee."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "After-Hours Acknowledgment",
    desc: "Inquiries outside working hours receive a clear message explaining when you will respond and what to do in an emergency, creating confidence instantly."
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    title: "Estimate Follow-Up Sequences",
    desc: "I build calm, practical follow-up sequences for sent proposals. The goal isn't to pressure the customer, but to prevent good estimates from being forgotten."
  },
  {
    icon: <PhoneCall className="w-8 h-8 text-primary" />,
    title: "New-Lead Follow-Up",
    desc: "If a customer doesn't respond to the first callback, a short sequence (a second text, a voicemail, an email) makes reasonable attempts before closing the lead out."
  },
  {
    icon: <BellRing className="w-8 h-8 text-primary" />,
    title: "Appointment Reminders",
    desc: "Confirmations and reminders (arrival windows, prep instructions) are automated to reduce confusion and prevent avoidable no-shows."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
    title: "Review Request System",
    desc: "After the job is complete, the system automatically sends a direct Google review link at the right time based on the real customer experience."
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Basic Reporting & Tracking",
    desc: "I setup tracking to answer practical questions: How many leads arrived? How quickly did we respond? How many estimates were followed up? Reporting that supports decisions."
  }
];

export default function LeadResponsePage() {
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
                <BellRing className="w-4 h-4" />
                Response & Follow-Up
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-8">
                Stop Losing Good Leads to Missed Calls & Slow Follow-Up.
              </motion.h1>
              
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-text leading-relaxed mb-10">
                <p>
                  Most local service businesses do not lose leads because nobody is interested. They lose them because the phone rings at the wrong time, an estimate is never followed up, or nobody is clearly responsible for the next step.
                </p>
                <p>
                  I help local service businesses build simple response systems that ensure inquiries are acknowledged, assigned, and followed up without adding unnecessary software.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
                  Review My Response Process
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
                src="/images/lead-response.png" 
                alt="Lead response systems and CRM dashboard for local businesses"
                title="Lead response and follow-up systems for service business owners"
                containerClassName="w-full h-full"
                priority
              />
            </motion.div>

          </div>
        </section>

        {/* Why Standard Systems Fail Section (Card Grid) */}
        <section className="border-b border-muted-border bg-surface-alt px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-16">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> The Reality
              </h2>
              <h3 className="font-serif font-medium text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-tight text-foreground">
                Where Lead Response Breaks Down
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
                "The business continues paying for expensive advertising while good opportunities quietly disappear between the first inquiry and the booked job."
              </p>
              <footer className="text-base md:text-lg text-muted-text uppercase tracking-widest font-medium">
                More traffic will not repair a <span className="text-primary font-bold">broken response process</span>.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* What I Build Section - Sticky Animation Layout */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-alt border-b border-muted-border relative">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-24">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> The Architecture
              </h2>
              <h3 className="font-serif font-medium text-[clamp(2.5rem,4vw,4rem)] leading-tight tracking-tight text-foreground mb-8">
                What I Build to Improve Lead Response
              </h3>
              <p className="text-xl text-muted-text leading-relaxed">
                I do not begin by forcing you into a complicated software platform. I begin by reviewing where inquiries come from, who is responsible for them, and where they lose momentum.
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
                         <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                           <div className="absolute inset-0 border-2 border-primary/20 rounded-sm"></div>
                           <div className="absolute w-full h-px bg-primary/40 -translate-y-6"></div>
                           <div className="absolute w-full h-px bg-primary/40 translate-y-6"></div>
                           <div className="absolute h-full w-px bg-primary/40 -translate-x-6"></div>
                           <div className="absolute h-full w-px bg-primary/40 translate-x-6"></div>
                           <Target className="w-16 h-16 text-primary relative z-10 bg-background" />
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
                         <div className="flex gap-4 mb-8">
                           <motion.div 
                             animate={{ y: [0, -15, 0] }}
                             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                             className="w-20 h-20 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center"
                           >
                             <MessageSquare className="w-8 h-8 text-primary" />
                           </motion.div>
                           <motion.div 
                             animate={{ y: [0, -15, 0] }}
                             transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeInOut" }}
                             className="w-20 h-20 bg-primary/10 rounded-full border border-primary/30 flex items-center justify-center"
                           >
                             <PhoneCall className="w-8 h-8 text-primary" />
                           </motion.div>
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
                           <ClipboardCheck className="w-40 h-40 text-primary" />
                           <motion.div 
                             className="absolute bottom-0 right-0 w-12 h-12 bg-background border border-primary rounded-full flex items-center justify-center"
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ repeat: Infinity, duration: 2 }}
                           >
                             <CheckCircle2 className="w-8 h-8 text-green-500" />
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
                       {activePhase === 1 && "Foundation & Assignment"}
                       {activePhase === 2 && "Immediate Response"}
                       {activePhase === 3 && "Nurturing & Closeout"}
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Foundation & Assignment</h3>
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Immediate Response</h3>
                  </div>
                  <div className="space-y-12">
                    {methodologySteps.slice(4, 7).map((step, idx) => (
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
                    <h3 className="font-serif text-3xl font-medium text-foreground">Nurturing & Closeout</h3>
                  </div>
                  <div className="space-y-12">
                    {methodologySteps.slice(7, 12).map((step, idx) => (
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

        {/* Stronger System & Audience Section */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-foreground text-background overflow-hidden relative border-b border-muted-border">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)' }}></div>
          
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            
            {/* What a Good Result Looks Like */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                What a Good Result Looks Like
              </h2>
              
              <div className="mb-10 text-background/80 text-lg leading-relaxed">
                <p>
                  A useful system creates a clear, repeatable path. The goal is to make sure good opportunities do not disappear for preventable reasons.
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
                  "Fewer unanswered inquiries", 
                  "Immediate, automated acknowledgment", 
                  "Clear, designated lead ownership", 
                  "More consistent call-backs & follow-ups", 
                  "Fewer forgotten prospects & lost quotes", 
                  "Drastically reduced administrative stress"
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
                  Lead response systems are built for owner-operated and family-run local service businesses that receive estimates or appointment requests.
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
                  "Auto Repair", "Appliance Repair", "Remodelers"
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
                    "Calls are frequently missed because you are in the field",
                    "Estimates are sent without any follow-up",
                    "Staff rely on memory or handwritten notes",
                    "Nobody knows who actually owns each lead",
                    "You pay for ads but cannot track the actual outcomes",
                    "The current CRM is underused or far too complicated"
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

        {/* Start With a Review Section (Actionable Review) */}
        <section className="px-6 py-20 md:px-12 md:py-24 bg-surface-alt border-b border-muted-border">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-6">
              Start With a Lead Response Review
            </h2>
            <div className="text-lg text-muted-text leading-relaxed space-y-6 mb-10">
              <p>
                You may not need more leads. You may just need to answer the leads you already have more consistently. 
              </p>
              <p>
                I will review how calls, forms, messages, and estimates currently move through your business and identify the points where opportunities are going cold.
              </p>
            </div>
            <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
              Review My Response Process
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
