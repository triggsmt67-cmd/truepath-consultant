"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import ScrollImage from "@/components/ScrollImage";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { serializeJsonLd } from "@/lib/json-ld";
import { useServicePhase } from "@/hooks/useServicePhase";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Target, Search, ShieldCheck, Mail, LineChart, MessageSquare, ClipboardCheck, BellRing, PhoneCall, Workflow, Clock } from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does your lead response and follow-up service include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I review how inquiries arrive, assign responsibility for the next step, and set up the agreed workflow in suitable tools. Depending on the scope, that can include missed-call handling, form notifications, estimate follow-up, reminders, and a shared inquiry view. We define the work after reviewing your current process and software."
      }
    },
    {
      "@type": "Question",
      "name": "Will this bring me new leads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This service improves how your business handles inquiries it already receives. Advertising and lead generation are separate work. If the real issue is too few suitable inquiries, we should identify that before building more follow-up automation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a new CRM or phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We check your existing setup first. A shared tracker may be enough for a small team; another business may need its CRM configured differently. Keeping or changing a phone number depends on the provider, number capabilities, and proposed workflow. I confirm those details before recommending a change."
      }
    },
    {
      "@type": "Question",
      "name": "Can this work with Jobber, Housecall Pro, or ServiceTitan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I review your specific account, plan, phone setup, and available integrations before committing to a workflow. Naming a platform does not mean every feature or connection is supported. If a requested step cannot work reliably in your setup, I explain the limitation and the available options."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly should we respond to a new inquiry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set a response window your team can meet during its actual working hours. Track when the inquiry arrived and when a person first attempted a useful response. Keep automated acknowledgments separate from that measure. After-hours messages should explain when someone will respond, without implying that a crew has been dispatched."
      }
    },
    {
      "@type": "Question",
      "name": "How often should we follow up on an estimate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agree on the next contact when you send the estimate. Record the date, channel, and person responsible. A customer waiting for financing needs a different next step from someone ready to schedule. Pause the sequence when the customer replies, books, declines, or asks to stop. Silence alone does not tell you why they have not decided."
      }
    },
    {
      "@type": "Question",
      "name": "Will customers receive automatic texts after every missed call?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only where the phone setup and messaging permissions support that workflow. Before enabling texts, I review permission collection, sender setup, opt-out handling, and what happens if delivery fails. A missed call should not automatically enroll someone in a promotional sequence. Calling back or using another agreed channel may be the right next step."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when the person assigned is unavailable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The workflow needs a backup. We define who takes over, when an overdue inquiry is flagged, and how the next person sees the customer history. Sending an office notification is only useful if someone is responsible for acting on it."
      }
    },
    {
      "@type": "Question",
      "name": "How much does setup cost, and how long does it take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both depend on the number of inquiry sources, users, systems, and integrations involved. The initial 15-minute Lead Review helps identify the priorities. Implementation is separate work with an agreed scope, price, and timing. Software subscriptions or provider charges are identified separately where they apply."
      }
    },
    {
      "@type": "Question",
      "name": "How will we know whether the system is helping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track unique inquiries, assignment gaps, first human response attempts, overdue next steps, and recorded outcomes. Keep booked work separate from acknowledgments and delivered messages. A response system cannot guarantee bookings: availability, service fit, pricing, and the customer’s decision still matter."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://truepath406.com/services/lead-response#service",
  name: "Lead Response and Follow-Up Systems",
  url: "https://truepath406.com/services/lead-response",
  provider: {
    "@id": "https://truepath406.com/#business",
  },
  image: "https://truepath406.com/images/lead-response.webp",
  serviceType: "CRM and automation",
  category: "Lead response and follow-up consulting",
  description: "Lead response and follow-up workflow review and setup for Missoula and Montana service businesses, including inquiry ownership, missed-call handling, estimate follow-up, and outcome tracking.",
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
    title: "Missed Calls Have No Next Step",
    desc: "The phone rings while you are on a job. Without a callback task and a person responsible, that inquiry can sit until someone remembers it."
  },
  {
    title: "Website Leads Sit in an Inbox",
    desc: "A form email can reach the office without anyone accepting responsibility. Check that delivery creates a visible task for a named person."
  },
  {
    title: "Estimates Go Cold",
    desc: "An estimate is sent with no agreed next contact. The customer’s decision remains unknown, while the office has no date or reason to follow up."
  },
  {
    title: "The Same Inquiry Lives in Several Places",
    desc: "A customer calls and submits a form about the same job. Link those contacts so two people do not send conflicting messages or count two opportunities."
  },
  {
    title: "There Is No Clear Lead Owner",
    desc: "An alert sent to everyone can leave ownership unclear. One person needs to accept the inquiry, with a backup when that person is unavailable."
  },
  {
    title: "Follow-Up Is Completely Inconsistent",
    desc: "An unanswered inquiry needs a defined next step. A customer who has replied or declined needs the old sequence stopped and the record updated."
  }
];

const methodologySteps = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Inquiry-to-Booking Review",
    desc: "I trace a recent inquiry from its source to its current status. We check where it arrived, who saw it, who acted, and what is due next. Any gaps become the starting point for the work."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Lead Assignment & Ownership",
    desc: "We define an owner for each inquiry and a backup for absences or overdue tasks. Assignment includes acceptance, so an alert is not mistaken for a completed handoff."
  },
  {
    icon: <Workflow className="w-8 h-8 text-primary" />,
    title: "Unified Lead View",
    desc: "I help organize the record in a CRM, shared inbox, or simple tracker. Repeated contacts about the same job stay together, with the current status and next action visible."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Lead Qualification",
    desc: "We agree on the details needed to decide the next step, such as service, location, availability, and urgency. A booking is confirmed only when the business can actually take the work."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: "Missed-Call Handling",
    desc: "I set up the agreed callback task and, where supported and appropriate, an acknowledgment. Texting depends on the number, provider, messaging permissions, and opt-out setup. Failed delivery needs a fallback."
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: "Website Lead Confirmation",
    desc: "The customer gets an appropriate confirmation and response expectation. The responsible person gets the inquiry details and a task. We test receipt and routing instead of assuming a successful form submission reached the office."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "After-Hours Acknowledgment",
    desc: "The acknowledgment reflects your actual hours and the next staffed response window. It does not promise emergency attendance or a confirmed appointment that your team has not accepted."
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    title: "Estimate Follow-Up Sequences",
    desc: "We record the agreed next contact, its purpose, and the person responsible. Follow-up should help the customer decide. Replies, bookings, declines, and stop requests change or end the sequence."
  },
  {
    icon: <PhoneCall className="w-8 h-8 text-primary" />,
    title: "New-Lead Follow-Up",
    desc: "We choose reasonable attempts through appropriate channels and a stopping point. A no-reply status stays distinct from a confirmed decline; the record should show what is known."
  },
  {
    icon: <BellRing className="w-8 h-8 text-primary" />,
    title: "Appointment Reminders",
    desc: "Where the tools support it, reminders use the confirmed appointment details. Changes, cancellations, and customer replies need to reach the person managing the schedule."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
    title: "Review Request System",
    desc: "If included in the scope, a completed-job milestone can trigger a neutral invitation for honest feedback. The process should not reward reviews or select customers based on an expected positive rating."
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Basic Reporting & Tracking",
    desc: "I set up a useful record of unique inquiries, assignment, human response attempts, overdue actions, and outcomes. Automated acknowledgments and delivered messages are recorded separately from booked jobs."
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

  const { activePhase, getPhaseProps } = useServicePhase();

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
        <section className="relative flex flex-col justify-center px-6 md:px-12 py-16 border-b border-muted-border">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-8 border border-primary/20">
                <BellRing className="w-4 h-4" />
                Missoula, Montana
              </motion.div>

              <motion.h1 variants={itemVariants} className="font-serif text-[clamp(2.5rem,4.2vw,4rem)] font-medium leading-[1.05] tracking-tight text-foreground mb-8">
                Lead Response & <span className="whitespace-nowrap">Follow-Up</span> for Service Businesses.
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-text leading-relaxed mb-10">
                <p>
                  I help owner-operated service businesses in Missoula and across Montana set up missed-call handling, inquiry assignment, and estimate follow-up.
                </p>
                <p>
                  Every open inquiry needs an owner, a next step, and a due time your team can work with.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
                  Request a Lead Follow-Up Review
                </Button>
              </motion.div>
              <p className="mt-5 text-sm leading-relaxed text-muted-text">A 15-minute conversation to identify the first useful change.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[600px] w-full rounded-sm overflow-hidden border border-muted-border"
            >
              <ScrollImage
                src="/images/lead-response.webp"
                alt="Contractor checking a tablet beside a work truck at a job site"
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
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> The Reality
              </p>
              <h2 className="font-serif font-medium text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] tracking-tight text-foreground">
                Where Lead Response Breaks Down
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

        <section id="handoff-map" aria-labelledby="handoff-heading" className="px-6 py-24 md:px-12 bg-background border-b border-muted-border scroll-mt-24">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-12">
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-5">The inquiry handoff map</p>
              <h2 id="handoff-heading" className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-tight font-medium mb-6">Owner. Next step. Due time.</h2>
              <p className="text-lg leading-relaxed text-muted-text">Open a recent inquiry and look for those three things. If one is missing, that is a useful place to start. This map shows the handoffs a response system needs to keep track of.</p>
            </div>
            <ol className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
              {[
                { title: "Capture", text: "Keep the inquiry and its source in one record. Link repeated calls and forms about the same job.", color: "#436454" },
                { title: "Assign", text: "Name the person taking responsibility. Confirm acceptance and identify the backup.", color: "#955a32" },
                { title: "Set the next step", text: "Record a specific action and due time that fits your working hours and capacity.", color: "#536c7e" },
                { title: "Follow up", text: "Act on the agreed plan. Update or stop the sequence when the customer responds.", color: "#765d79" },
                { title: "Record the outcome", text: "Keep booked, deciding, declined, no capacity, and no reply distinct. Record what you know.", color: "#796229" },
              ].map((step, index) => (
                <li key={step.title} className="p-6 border border-muted-border border-t-4 bg-surface-alt" style={{ borderTopColor: step.color }}>
                  <p className="text-sm font-medium text-primary mb-5">0{index + 1}</p>
                  <h3 className="font-serif text-2xl font-medium mb-4">{step.title}</h3>
                  <p className="text-muted-text leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5 bg-foreground text-background p-6 md:px-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <p className="font-medium">Due time missed or task unaccepted?</p>
              <p className="text-background/85">Flag it for the backup. Keep the history with the inquiry.</p>
            </div>
            <div className="mt-10 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-serif text-2xl font-medium mb-4">What a useful task looks like</h3>
                <p className="text-muted-text leading-relaxed">“Casey: call about the repair request Wednesday by 9 a.m. to confirm the service area and arrange an estimate if we have capacity. Morgan takes over if the task is not accepted.”</p>
                <p className="text-sm text-muted-text leading-relaxed mt-4">Fictional example, not a client result or a universal response-time target. A confirmation message does not mean the customer has spoken with your team or booked a job.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium mb-4">Use it with your team</h3>
                <p className="text-muted-text leading-relaxed mb-5">Save the one-page map and use the blank handoff sheet to trace a recent inquiry. Keep customer details in your own approved system.</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
                  <a href="/downloads/lead-response-handoff-map.png" className="underline underline-offset-4 hover:text-primary">Download the map (PNG)</a>
                  <a href="/downloads/lead-response-handoff-map.svg" className="underline underline-offset-4 hover:text-primary">Scalable map (SVG)</a>
                  <a href="/downloads/lead-response-handoff-sheet.csv" className="underline underline-offset-4 hover:text-primary">Blank handoff sheet (CSV)</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Build Section - Sticky Animation Layout */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-surface-alt border-b border-muted-border relative">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-3xl mb-24">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> How Your Team Handles New Leads
              </p>
              <h2 className="font-serif font-medium text-[clamp(2.5rem,4vw,4rem)] leading-tight tracking-tight text-foreground mb-8">
                What the Setup Can Include
              </h2>
              <p className="text-lg text-muted-text leading-[1.65]">
                We start with your current process and tools. The review identifies which steps need attention; the agreed scope determines what I configure, connect, or document.
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
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(1)}
                >
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
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(2)}
                >
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
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                  className="space-y-12"
                  {...getPhaseProps(3)}
                >
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
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* Stronger System & Audience Section */}
        <section className="px-6 py-24 md:px-12 md:py-32 bg-foreground text-background overflow-hidden relative border-b border-muted-border">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)' }}></div>

          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

            {/* What We Check Before Calling It Ready */}
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight mb-12">
                What We Check Before Calling It Ready
              </h2>

              <div className="mb-10 text-background/80 text-lg leading-relaxed">
                <p>
                  A useful setup needs to work when the office is busy, a message fails, or the usual person is away. These checks make the handoff testable:
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
                  "Test inquiries reach the correct person",
                  "Each open record has an owner, action, and due time",
                  "A backup handles an overdue or unaccepted task",
                  "Replies and stop requests update the workflow",
                  "Duplicate contacts stay attached to one inquiry",
                  "The team can find the status and recorded outcome"
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
                  I’m Trevor Riggs, based in Missoula. This service is for owner-operated and family-run businesses handling calls, service requests, appointments, or estimates. We work around the people and capacity you actually have.
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

        <section aria-labelledby="measure-heading" className="px-6 py-20 md:px-12 border-b border-muted-border">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 id="measure-heading" className="font-serif text-3xl md:text-4xl font-medium mb-6">Measure the handoff all the way through.</h2>
              <p className="text-lg text-muted-text leading-relaxed">Keep the received time, first human response attempt, next action, due time, and outcome. An automated reply belongs in its own field. Count repeated contacts about the same job as one inquiry, so the record tells you where work is waiting.</p>
            </div>
            <div className="text-muted-text leading-relaxed space-y-5">
              <p>For a deeper review, use the <Link href="/insights/home-service-booking" className="text-foreground underline underline-offset-4 hover:text-primary">30-inquiry booking audit</Link>. For sent estimates, see the <Link href="/insights/how-to-follow-up-on-an-estimate-before-it-goes-cold" className="text-foreground underline underline-offset-4 hover:text-primary">estimate follow-up guide</Link>.</p>
              <p>Before enabling messages, we check the chosen provider’s sender, permission, opt-out, and delivery handling. For example, <a href="https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out" className="text-foreground underline underline-offset-4 hover:text-primary">Twilio documents how opt-out events reach an application</a>. The surrounding workflow needs to handle that event too.</p>
            </div>
          </div>
        </section>

        {/* Start With a Review Section (Actionable Review) */}
        <section className="px-6 py-20 md:px-12 md:py-24 bg-surface-alt border-b border-muted-border">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-6">
              Start With a 15-Minute Lead Review
            </h2>
            <div className="text-lg text-muted-text leading-relaxed space-y-6 mb-10">
              <p>
                Bring your current phone and form setup, the tools your team uses, and a recent example of an inquiry that stalled. We will trace the handoff and identify what I would address first.
              </p>
              <p>
                Use the request form’s “Biggest Challenge” field to describe what is happening. I’ll email you to arrange the conversation. Implementation is separate work with an agreed scope, price, and timing.
              </p>
            </div>
            <Button onClick={() => openDrawer()} variant="primary" size="lg" className="group">
              Request a Lead Follow-Up Review
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-tight mb-16 text-center">
              Questions About Lead Response and Follow-Up
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
