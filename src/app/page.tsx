import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollImage from "@/components/ScrollImage";
import Button from "@/components/Button";
import LeadFlowAnimation from "@/components/LeadFlowAnimation";
import HomeContactForm from "@/components/HomeContactForm";
import HashScrollHandler from "@/components/HashScrollHandler";
import { serializeJsonLd } from "@/lib/json-ld";
import {
  MotionDiv,
  MotionH2,
  MotionH3,
  MotionSpan,
} from "@/components/MotionPrimitives";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Search, MessageSquare } from "lucide-react";

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://truepath406.com/#webpage",
  url: "https://truepath406.com",
  name: "True Path Digital | Clearer marketing. Better websites.",
  description: "True Path Digital helps owner-operated service businesses find the gaps between visibility, customer trust, lead response, and booked work.",
  inLanguage: "en-US",
  isPartOf: {
    "@id": "https://truepath406.com/#website",
  },
  about: {
    "@id": "https://truepath406.com/#business",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://truepath406.com/images/hero-carpenter.jpg",
  },
  mainEntity: {
    "@id": "https://truepath406.com/#under-the-hood-audit",
  },
};

const auditServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://truepath406.com/#under-the-hood-audit",
  name: "Under the Hood Audit",
  url: "https://truepath406.com/#audit",
  serviceType: "Marketing and lead-flow diagnostic",
  description: "An independent review of a service business's website, Google Business Profile, local visibility, online reputation, and lead response process, followed by a findings memo, review call, and prioritized 90-day action plan.",
  provider: {
    "@id": "https://truepath406.com/#business",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Owner-operated service businesses",
  },
  offers: {
    "@type": "Offer",
    url: "https://truepath406.com/#contact",
    price: "750",
    priceCurrency: "USD",
  },
};

export default function Home() {
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(auditServiceSchema) }}
      />
      <div className="noise-overlay" />
      <Header />
      <HashScrollHandler />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10">
        {/* 1. Hero Section (Split Layout) */}
        <section className="relative flex min-h-[85vh] flex-col justify-center px-6 md:px-12 py-12">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center"
            >
              <h1 className="max-w-3xl font-serif font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight">
                <MotionSpan variants={itemVariants} className="block text-foreground">I find the marketing leaks</MotionSpan>
                <MotionSpan variants={itemVariants} className="block text-primary">that are costing you jobs.</MotionSpan>
              </h1>

              <MotionDiv variants={itemVariants} className="mt-12 flex flex-col items-start gap-8">
                <p className="max-w-xl text-lg leading-[1.65] text-muted-text">
                  <strong className="font-medium text-foreground">True Path Digital</strong>{" "}
                  provides websites and practical marketing strategy for owner-operated service businesses. Stop guessing what&apos;s broken and start booking more work.
                </p>

                <Button href="/#contact" variant="primary">
                  Find My Leaks
                </Button>
                <p className="flex items-center gap-3 text-sm text-muted-text tracking-wide">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-primary">
                    {/* Magnifying glass */}
                    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Leak droplet inside the glass */}
                    <path d="M8.5 6C8.5 6 7 8 7 9.2C7 10 7.67 10.5 8.5 10.5C9.33 10.5 10 10 10 9.2C10 8 8.5 6 8.5 6Z" fill="currentColor" opacity="0.6" />
                  </svg>
                  15 minutes. No pitch. We&apos;ll look at where jobs may be leaking.
                </p>
                <LeadFlowAnimation />
              </MotionDiv>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-full lg:h-[80vh] h-[50vh]"
            >
              <ScrollImage
                src="/images/hero-carpenter.jpg"
                alt="A focused tradesman marking measurements in his workshop"
                title="Local service business owner — True Path Digital helps tradespeople fix marketing leaks"
                containerClassName="w-full h-full"
                priority
              />
            </MotionDiv>

          </div>
        </section>

        {/* 1.5 Why Good Businesses Lose Jobs */}
        <section className="border-t border-muted-border bg-surface-alt px-6 py-32 md:px-12 md:py-48">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <div className="max-w-5xl">
              <h2 className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-primary">
                <span className="h-px w-8 bg-primary"></span> The Reality
              </h2>
              <h3 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
                Why good businesses<br/>still lose jobs.
              </h3>
              <div className="mt-10 flex max-w-3xl flex-col gap-6 text-lg leading-[1.65] text-muted-text">
                <p>When the owner is busy and every lead feels urgent, it gets harder to see what is actually breaking down.</p>
                <p>So calls get missed. Follow-up gets delayed. Ads get tweaked. The website gets second-guessed. Another change gets made before the last one had time to tell you anything useful.</p>
              </div>
            </div>

            <div className="my-20 border-y border-muted-border py-16 md:my-28 md:py-24">
              <p className="max-w-6xl font-serif text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-foreground">
                Most of the time, the problem is not effort. It is that too many decisions are being made under pressure, without enough context.
              </p>
            </div>

            <div>
              <p className="mb-12 max-w-2xl text-lg leading-[1.65] text-muted-text">
                Clarity does not come from doing more. It comes from seeing what is actually costing you jobs and fixing that first.
              </p>

              <div className="hidden border-b border-muted-border pb-5 text-sm font-medium uppercase tracking-widest md:grid md:grid-cols-12 md:gap-8">
                <span className="text-muted-text md:col-span-5 md:col-start-2">What that usually looks like</span>
                <span className="text-primary md:col-span-6">What changes when things get clear</span>
              </div>

              <div className="border-b border-muted-border">
                {[
                  ["Chasing numbers after the fact", "One clear priority at a time"],
                  ["Changing direction too often", "Fewer unnecessary changes"],
                  ["Conflicting signals from different tools", "Signals you can actually explain"],
                  ["Decisions made under pressure", "Decisions made with context"]
                ].map(([symptom, outcome], i) => (
                  <div
                    key={symptom}
                    className="grid gap-5 border-t border-muted-border py-8 first:border-t-0 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
                  >
                    <span className="text-sm font-medium text-primary opacity-50 md:col-span-1">
                      0{i + 1}
                    </span>
                    <div className="flex items-center gap-4 text-lg text-muted-text md:col-span-5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-muted-text/30 text-xs">✕</span>
                      <span>{symptom}</span>
                    </div>
                    <div className="flex items-center gap-4 text-lg font-medium text-foreground md:col-span-6">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs text-primary">✓</span>
                      <span>{outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </section>

        {/* How I Work */}
        <section id="credibility" className="border-t border-muted-border px-6 py-32 md:px-12 md:py-48">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <div className="grid gap-16 lg:grid-cols-12 items-start">

              {/* Left Column: Photo */}
              <MotionDiv
                variants={{
                  hidden: { opacity: 0, scale: 0.98 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="lg:col-span-5 lg:sticky lg:top-32"
              >
                <ScrollImage
                  src="/images/decision-partner-final.jpg"
                  alt="A practical marketing review with a service-business owner"
                  title="Reviewing where marketing and lead flow are breaking down"
                  containerClassName="w-full aspect-[4/3]"
                />
                <div className="mt-8 border-l-2 border-primary pl-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
                    The rule
                  </p>
                  <p className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] leading-relaxed text-foreground">
                    If the work cannot be tied to calls, booked jobs, or a clearer decision, it does not belong in the plan.
                  </p>
                  <p className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-text">
                    Trevor Riggs, Founder
                  </p>
                </div>
              </MotionDiv>

              {/* Right Column: Copy */}
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-12">
                <MotionH2
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-sm font-medium uppercase tracking-widest text-primary flex items-center gap-3"
                >
                  <span className="w-8 h-px bg-primary"></span> How I Work
                </MotionH2>
                <MotionH3
                  variants={{
                    hidden: { opacity: 0, filter: "blur(15px)", y: 15 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-serif font-medium text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight"
                >
                  Find the real problem. <em className="text-primary not-italic">Fix that first.</em>
                </MotionH3>

                <MotionDiv
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col gap-8 text-lg leading-[1.65] text-muted-text"
                >
                  <p>
                    Most owner-operated service businesses do not need more marketing activity. They need a clear look at where calls, leads, and follow-up are breaking down.
                  </p>
                  <p>
                    I start there. I look at the full path from local search to booked job, find the point that is costing you money, and tell you what I would fix first.
                  </p>
                  <div className="border-l-2 border-primary pl-6">
                    <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-foreground font-medium">
                      No bloated plan. No list of trendy tactics. If I cannot explain how a recommendation connects to revenue, it does not make the cut.
                    </p>
                  </div>
                </MotionDiv>

              </div>
            </div>
          </MotionDiv>
        </section>

        {/* 3. Under the Hood Audit */}
        <section id="audit" className="border-y border-muted-border bg-surface-alt px-6 py-32 md:px-12 md:py-48">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-24">

              <div className="lg:w-5/12 flex flex-col lg:sticky lg:top-32">
                <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> Diagnostic Phase
                </h2>
                <h3 className="font-serif font-medium text-[clamp(2.5rem,4vw,3.5rem)] leading-tight tracking-tight mb-8">
                  Under the Hood<br />Audit
                </h3>

                <ScrollImage
                  src="/images/demand-leak-audit-final.jpg"
                  alt="Reviewing an Under the Hood Audit with a service-business owner"
                  title="Under the Hood Audit — a diagnostic review for local service businesses"
                  containerClassName="w-full max-w-sm aspect-[4/3] mb-8"
                />

                <div className="mt-4 flex items-baseline gap-4 border-t border-muted-border pt-8">
                  <span className="font-serif font-medium text-[clamp(4rem,8vw,6rem)] text-primary tracking-tight leading-none">$750</span>
                  <span className="text-sm uppercase tracking-widest font-medium text-muted-text">Flat Fee</span>
                </div>
                <p className="mt-8 text-base text-muted-text leading-relaxed max-w-md">
                  An objective, independent review of where you lose visibility, leads, and booked work. Includes a findings memo, review call, and prioritized 90-day action plan.
                </p>
                <div className="mt-12">
                  <Button href="/#contact" variant="secondary">
                    Find My Leaks
                  </Button>
                </div>
              </div>

              <div className="lg:w-6/12 flex flex-col w-full">
                {[
                  { title: "Google Profile Health", icon: Search, desc: "Is your local visibility suffering due to a weak, incomplete, or poorly categorized Google Business Profile?" },
                  { title: "Messaging & Conversion", icon: CheckCircle2, desc: "Does your website clearly explain your value and make the next step effortless?" },
                  { title: "Lead Response", icon: MessageSquare, desc: "Are missed calls and delayed replies quietly destroying your ROI?" },
                  { title: "Follow-up Systems", icon: TrendingUp, desc: "Do estimates go cold? Are you systematically generating positive reviews?" },
                  { title: "Competitor Benchmarking", icon: TrendingUp, desc: "How does your digital footprint compare to the top three companies in your local service area?" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex flex-col gap-4 border-b border-muted-border py-10 first:pt-0 transition-all duration-500 hover:bg-background -mx-6 px-6 md:-mx-12 md:px-12 lg:mx-0 lg:px-6 lg:rounded-2xl cursor-default"
                  >
                    <div className="flex items-start gap-8">
                      <span className="text-sm font-medium text-primary pt-1 opacity-50 transition-opacity group-hover:opacity-100">0{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <item.icon className="w-6 h-6 text-primary opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block" />
                          <h4 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-medium md:-ml-10 transition-transform duration-500 group-hover:ml-0">{item.title}</h4>
                        </div>
                        <p className="text-base text-muted-text leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 3.5 Social Proof */}
        <section className="border-y border-muted-border px-6 py-32 md:px-12 bg-surface">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Evidence
              </h2>
              <a href="/work" className="hidden md:flex text-sm font-medium text-primary items-center gap-2 group hover:opacity-80 transition-opacity">
                View All Case Studies <TrendingUp className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  client: "Accurate Auto Repair",
                  metric: "30%",
                  metricClass: "text-5xl md:text-6xl",
                  result: "More calls after correcting outdated business listings and launching a faster, conversion-focused website.",
                  href: "/work#accurate-auto-repair"
                },
                {
                  client: "Benchmark Automotive Service",
                  metric: "Calls every day",
                  metricClass: "text-4xl md:text-5xl",
                  result: "Calls from Google and its website after rebuilding its local search foundation and launching a stronger service-business website.",
                  href: "/work#benchmark-automotive-service"
                }
              ].map((proof, i) => (
                <div
                  key={i}
                  className="border border-muted-border p-10 md:p-16 hover:border-primary/30 transition-colors group relative overflow-hidden bg-background"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-24 -mt-24 transition-all duration-700 group-hover:bg-primary/15"></div>
                  <h4 className={`font-serif ${proof.metricClass} font-medium leading-none text-foreground mb-6 tracking-tight`}>{proof.metric}</h4>
                  <p className="text-lg text-muted-text leading-[1.65] mb-12 max-w-sm">{proof.result}</p>
                  <div className="flex items-center justify-between border-t border-muted-border pt-6">
                    <span className="text-sm font-medium uppercase tracking-widest text-foreground">{proof.client}</span>
                    <Link href={proof.href} className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all">Case Study <TrendingUp className="w-4 h-4" /></Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 md:hidden">
              <Button href="/work" variant="secondary" className="w-full justify-center">
                View All Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Core Capabilities */}
        <section id="services" className="px-6 py-32 md:px-12 md:py-48 relative">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <MotionH2
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary"></span> What I Fix
            </MotionH2>
            <MotionH3
              variants={{
                hidden: { opacity: 0, filter: "blur(15px)", y: 15 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-serif font-medium text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight max-w-4xl"
            >
              Three ways I turn the findings into action.
            </MotionH3>

            <div className="mt-24 border-t border-muted-border">
              {[
                {
                  title: "Google Profile & Local Search",
                  desc: "I clean up and strengthen your Google Business Profile so the right local customers can find you, understand what you do, and call.",
                  image: "/images/google-profile.webp",
                  href: "/services/google-profile"
                },
                {
                  title: "Websites That Turn Visits Into Calls",
                  desc: "I build service-business websites that make it easy to understand what you do, trust the company behind it, and call or request an estimate.",
                  image: "/images/website-builds.webp",
                  href: "/services/website-builds"
                },
                {
                  title: "Lead Response & Follow-Up Systems",
                  desc: "I set up practical follow-up so new inquiries get a quick response and good estimates do not disappear into a forgotten inbox.",
                  image: "/images/lead-response.webp",
                  href: "/services/lead-response"
                }
              ].map((feature, i) => (
                <MotionDiv
                  key={i}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group grid gap-8 border-b border-muted-border py-12 md:grid-cols-12 md:items-center lg:gap-12 lg:py-16"
                >
                  <div className="md:col-span-1 md:self-start">
                    <span className="text-sm font-medium text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                      0{i + 1}
                    </span>
                  </div>

                  <div className={i === 0 ? "md:col-span-3" : "md:col-span-4"}>
                    <h4 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-tight transition-colors duration-300 group-hover:text-primary">
                      <Link href={feature.href}>{feature.title}</Link>
                    </h4>
                  </div>

                  <div className="md:col-span-3">
                    <p className="text-lg text-muted-text leading-[1.65]">{feature.desc}</p>
                    <Link href={feature.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Explore Service Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <Link
                    href={feature.href}
                    className={`${i === 0 ? "md:col-span-5" : "md:col-span-4"} block overflow-hidden`}
                  >
                    <ScrollImage
                      src={feature.image}
                      alt={feature.title}
                      containerClassName="w-full aspect-[16/9]"
                    />
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </section>

        {/* 5. Final CTA / Contact */}
        <section id="contact" className="border-t border-muted-border bg-foreground text-background">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2">

            {/* Left Side: Expectations */}
            <div className="p-6 py-32 md:p-16 lg:p-24 flex flex-col justify-center">
              <h2 className="font-serif font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight mb-8">
                Let&apos;s look at what&apos;s getting missed.
              </h2>
              <p className="text-lg leading-[1.65] text-background/80 max-w-md mb-16">
                Schedule a brief conversation to review your current setup and see if an Under the Hood Audit makes sense for your business.
              </p>

              <div className="flex flex-col gap-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-serif font-medium text-2xl mb-2">Fill out the brief</h4>
                    <p className="text-background/60 text-base leading-relaxed">Give me 2 minutes of context on your business so I don&apos;t waste your time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-serif font-medium text-2xl mb-2">15-Minute Diagnostic</h4>
                    <p className="text-background/60 text-base leading-relaxed">No sales pitch. Just a look under the hood to see if we can help.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form UI */}
            <div className="bg-background/5 p-6 py-24 md:p-16 lg:p-24 lg:border-l border-muted-border flex items-center">
              <HomeContactForm />
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
