"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollImage from "@/components/ScrollImage";
import Button from "@/components/Button";
import LeadFlowAnimation from "@/components/LeadFlowAnimation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Search, MessageSquare } from "lucide-react";
import { useState, useRef } from "react";

export default function Home() {
  const [homeHoneypot, setHomeHoneypot] = useState("");
  const homeLoadedAt = useRef(Date.now());

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
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1 w-full overflow-hidden pt-32 relative z-10">
        {/* 1. Hero Section (Split Layout) */}
        <section className="relative flex min-h-[85vh] flex-col justify-center px-6 md:px-12 py-12">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center"
            >
              <h1 className="max-w-3xl font-serif font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight">
                <motion.span variants={itemVariants} className="block text-foreground">I find the marketing leaks</motion.span>
                <motion.span variants={itemVariants} className="block text-primary">that are costing you jobs.</motion.span>
              </h1>
              
              <motion.div variants={itemVariants} className="mt-12 flex flex-col items-start gap-8">
                <p className="max-w-xl text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-muted-text">
                  <strong className="font-medium text-foreground">True Path Digital</strong> provides websites and practical marketing strategy for owner-operated service businesses. Stop guessing what's broken and start booking more work.
                </p>
                
                <Button href="/#contact" variant="primary">
                  Schedule a Lead Review
                </Button>
                <LeadFlowAnimation />
              </motion.div>
            </motion.div>

            <motion.div 
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
            </motion.div>

          </div>
        </section>

        {/* 1.5 Why Good Businesses Lose Jobs */}
        <section className="border-t border-muted-border bg-surface-alt px-6 py-32 md:px-12 md:py-48">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
              
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> The Reality
                </h2>
                <h3 className="font-serif font-medium text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-tight mb-8">
                  Why good businesses<br/>still lose jobs.
                </h3>
                <div className="flex flex-col gap-6 text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-muted-text">
                  <p>When the owner is busy and every lead feels urgent, it gets harder to see what is actually breaking down.</p>
                  <p>So calls get missed. Follow-up gets delayed. Ads get tweaked. The website gets second-guessed. Another change gets made before the last one had time to tell you anything useful.</p>
                  <div className="mt-8 pt-8 border-t border-muted-border">
                    <p className="font-serif text-[clamp(1.5rem,2vw,1.75rem)] leading-snug text-foreground">
                      Most of the time, the problem is not effort. It is that too many decisions are being made under pressure, without enough context.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center gap-16">
                
                <div>
                  <h4 className="font-serif text-2xl font-medium mb-6 text-foreground">What that usually looks like</h4>
                  <ul className="flex flex-col gap-4">
                    {[
                      "Chasing numbers after the fact",
                      "Changing direction too often",
                      "Conflicting signals from different tools",
                      "Decisions made under pressure"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-base text-muted-text opacity-80">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-muted-text/30 text-xs">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-medium mb-4 text-primary">What changes when things get clear</h4>
                  <p className="text-sm text-muted-text mb-6">Clarity does not come from doing more. It comes from seeing what is actually costing you jobs and fixing that first.</p>
                  <ul className="flex flex-col gap-4">
                    {[
                      "One clear priority at a time",
                      "Fewer unnecessary changes",
                      "Signals you can actually explain",
                      "Decisions made with context"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-base text-foreground font-medium">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </motion.div>
        </section>

        <section className="border-t border-muted-border px-6 py-32 md:px-12 md:py-48">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <div className="mb-16 md:mb-24 max-w-4xl">
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-primary"></span> The Disconnect
              </motion.h2>
              <motion.h3 
                variants={{
                  hidden: { opacity: 0, filter: "blur(15px)", y: 15 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif font-medium text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight text-foreground"
              >
                Marketing agencies sell noise. <br className="hidden lg:block" />
                <span className="text-muted-text">You need a decision partner.</span>
              </motion.h3>
            </div>

            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.98 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="lg:col-span-7"
              >
                <ScrollImage 
                  src="/images/decision-partner-final.jpg" 
                  alt="Trevor meeting over coffee with a business owner to review marketing strategy"
                  title="Trevor Riggs consulting with a service business owner on demand leak strategy"
                  containerClassName="w-full aspect-video"
                />
              </motion.div>
              
              <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", x: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-muted-text"
                >
                  As an owner-operator in the trades, you spend money on marketing but lack confidence that your website, visibility, and follow-up systems are actually working together.
                </motion.p>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", x: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="border-l-2 border-primary pl-6"
                >
                  <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-foreground font-medium">
                    I don't push generic retainers. I diagnose exactly where you are losing leads, trust, or booked work—and provide focused implementation to fix it.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. The Demand Leak Audit */}
        <section id="audit" className="border-y border-muted-border bg-surface-alt px-6 py-32 md:px-12 md:py-48">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-24">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="lg:w-5/12 flex flex-col lg:sticky lg:top-32"
              >
                <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> Diagnostic Phase
                </h2>
                <h3 className="font-serif font-medium text-[clamp(2.5rem,4vw,3.5rem)] leading-tight tracking-tight mb-8">
                  The Demand<br />Leak Audit
                </h3>

                <ScrollImage 
                  src="/images/demand-leak-audit-final.jpg" 
                  alt="Trevor presenting the Demand Leak Audit report to a contractor in his shop"
                  title="The Demand Leak Audit — a diagnostic review for local service businesses"
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
                    Schedule a Lead Review
                  </Button>
                </div>
              </motion.div>

              <div className="lg:w-6/12 flex flex-col w-full">
                {[
                  { title: "Google Profile Health", icon: Search, desc: "Is your local visibility suffering due to a weak, incomplete, or poorly categorized Google Business Profile?" },
                  { title: "Messaging & Conversion", icon: CheckCircle2, desc: "Does your website clearly explain your value and make the next step effortless?" },
                  { title: "Lead Response", icon: MessageSquare, desc: "Are missed calls and delayed replies quietly destroying your ROI?" },
                  { title: "Follow-up Systems", icon: TrendingUp, desc: "Do estimates go cold? Are you systematically generating positive reviews?" },
                  { title: "Competitor Benchmarking", icon: TrendingUp, desc: "How does your digital footprint compare to the top three companies in your local service area?" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 80, damping: 20 }}
                    className="group flex flex-col gap-4 border-b border-muted-border py-10 first:pt-0 transition-all duration-500 hover:bg-white -mx-6 px-6 md:-mx-12 md:px-12 lg:mx-0 lg:px-6 lg:rounded-2xl cursor-default"
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
                  </motion.div>
                ))}
              </div>
              
            </div>
          </div>
        </section>

        {/* 3.5 Social Proof */}
        <section className="border-y border-muted-border px-6 py-32 md:px-12 bg-surface">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex items-center justify-between mb-16"
            >
              <h2 className="text-sm font-medium uppercase tracking-widest text-primary flex items-center gap-3">
                <span className="w-8 h-px bg-primary"></span> Evidence
              </h2>
              <a href="/work" className="hidden md:flex text-sm font-medium text-primary items-center gap-2 group hover:opacity-80 transition-opacity">
                View All Case Studies <TrendingUp className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                { 
                  client: "Local HVAC Contractor", 
                  metric: "$40k+", 
                  result: "Recovered in lost pipeline due to broken lead routing and a weak Google Profile."
                },
                { 
                  client: "Regional Plumbing Service", 
                  metric: "30%", 
                  result: "Increase in inbound calls without any additional ad spend by optimizing local visibility."
                }
              ].map((proof, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="border border-muted-border p-10 md:p-16 hover:border-primary/30 transition-colors group relative overflow-hidden bg-background"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-24 -mt-24 transition-all duration-700 group-hover:bg-primary/15"></div>
                  <h4 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight">{proof.metric}</h4>
                  <p className="text-lg md:text-xl text-muted-text leading-relaxed mb-12 max-w-sm">{proof.result}</p>
                  <div className="flex items-center justify-between border-t border-muted-border pt-6">
                    <span className="text-sm font-medium uppercase tracking-widest text-foreground">{proof.client}</span>
                    <a href="/work" className="text-sm font-medium text-primary flex items-center gap-2 group-hover:gap-3 transition-all">Case Study <TrendingUp className="w-4 h-4" /></a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="mt-12 md:hidden"
            >
              <Button href="/work" variant="secondary" className="w-full justify-center">
                View All Case Studies
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* 4. Core Capabilities */}
        <section id="services" className="px-6 py-32 md:px-12 md:py-48 relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="mx-auto w-full max-w-[1400px]"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm font-medium uppercase tracking-widest text-primary mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary"></span> Implementation
            </motion.h2>
            <motion.h3 
              variants={{
                hidden: { opacity: 0, filter: "blur(15px)", y: 15 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-serif font-medium text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight max-w-4xl"
            >
              Fixing the leaks that cost you booked jobs.
            </motion.h3>
            
            <div className="mt-24 grid gap-x-12 gap-y-16 md:grid-cols-3">
              {[
                { 
                  title: "Google Profile & Local Search", 
                  desc: "I optimize, clean up, and manage your Google Business Profile so your business ranks cleanly where local customers are actively searching and hiring.",
                  image: "/images/google-profile.png",
                  href: "/services/google-profile"
                },
                { 
                  title: "High-Converting Website Builds", 
                  desc: "Websites built specifically for service businesses. I strip away fluff, build instant trust, and design every page strictly to drive phone calls and booked work.",
                  image: "/images/website-builds.png",
                  href: "/services/website-builds"
                },
                { 
                  title: "Lead Response & Follow-Up Systems", 
                  desc: "Stop losing revenue to delayed replies or cold estimates. I implement practical workflows so every inbound lead is answered quickly and nurtured.",
                  image: "/images/lead-response.png",
                  href: "/services/lead-response"
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col group"
                >
                  <div className="mb-8 h-[1px] w-full bg-muted-border relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full bg-primary -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"></div>
                  </div>

                  <Link href={feature.href} className="block overflow-hidden">
                    <ScrollImage 
                      src={feature.image} 
                      alt={feature.title}
                      containerClassName="w-full aspect-[16/9] mb-8"
                    />
                  </Link>

                  <h4 className="font-serif text-2xl font-medium transition-colors duration-300 group-hover:text-primary">
                    <Link href={feature.href}>{feature.title}</Link>
                  </h4>
                  <p className="mt-4 text-[clamp(1.125rem,1.5vw,1.25rem)] text-muted-text leading-relaxed">{feature.desc}</p>
                  
                  <Link href={feature.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Explore Service Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. Final CTA / Contact */}
        <section id="contact" className="border-t border-muted-border bg-foreground text-background">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-2">
            
            {/* Left Side: Expectations */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="p-6 py-32 md:p-16 lg:p-24 flex flex-col justify-center"
            >
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight mb-8"
              >
                Plug the leaks.
              </motion.h2>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-background/80 max-w-md mb-16"
              >
                Schedule a brief conversation to review your current setup and see if a Demand Leak Audit makes sense for your business.
              </motion.p>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col gap-10"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-serif font-medium text-2xl mb-2">Fill out the brief</h4>
                    <p className="text-background/60 text-base leading-relaxed">Give me 2 minutes of context on your business so I don't waste your time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background/10 border border-background/20 flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-serif font-medium text-2xl mb-2">15-Minute Diagnostic</h4>
                    <p className="text-background/60 text-base leading-relaxed">No sales pitch. Just a look under the hood to see if we can help.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side: Form UI */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-background/5 p-6 py-24 md:p-16 lg:p-24 lg:border-l border-muted-border flex items-center"
            >
              <form className="w-full max-w-md mx-auto flex flex-col gap-8" onSubmit={(e) => {
                e.preventDefault();
                if (homeHoneypot) return;
                if (Date.now() - homeLoadedAt.current < 2000) return;
                // In a real app, this would send data to an API
              }}>
                {/* Honeypot — invisible to humans, bots fill it */}
                <div className="absolute overflow-hidden" style={{ left: '-9999px', top: '-9999px', position: 'absolute' }} aria-hidden="true">
                  <label htmlFor="home-company-url">Company URL</label>
                  <input
                    id="home-company-url"
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={homeHoneypot}
                    onChange={(e) => setHomeHoneypot(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-medium text-background/70 uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-medium text-background/70 uppercase tracking-widest">Website URL</label>
                  <input type="url" className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors" placeholder="yourwebsite.com" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-medium text-background/70 uppercase tracking-widest">Biggest Challenge</label>
                  <textarea className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors resize-none h-24" placeholder="Where do you feel like you are losing jobs?"></textarea>
                </div>
                <div className="mt-8">
                  <Button variant="light" className="w-full justify-center">
                    Request a Lead Review
                  </Button>
                </div>
              </form>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
