"use client";

import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";

export default function LeadDrawer() {
  const { isOpen, closeDrawer } = useLeadDrawer();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef<number>(0);

  // Reset form state and record open time when drawer opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setHoneypot("");
      openedAt.current = Date.now();
    }
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam: honeypot field should be empty
    if (honeypot) return;

    // Anti-spam: reject submissions faster than 2 seconds
    if (Date.now() - openedAt.current < 2000) return;

    // In a real app, this would send data to an API
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-muted-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-muted-border">
              <h2 className="font-serif text-2xl font-medium">Request a Review</h2>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-muted-border transition-colors text-muted-text hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10">
                      <h3 className="font-serif text-3xl font-medium mb-4">Plug the leaks.</h3>
                      <p className="text-muted-text leading-relaxed">
                        Give me a little context on your business and where you feel you are losing jobs. I'll review your setup and let you know if I can help.
                      </p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                      {/* Honeypot — invisible to humans, bots fill it */}
                      <div className="absolute overflow-hidden" style={{ left: '-9999px', top: '-9999px', position: 'absolute' }} aria-hidden="true">
                        <label htmlFor="drawer-company-url">Company URL</label>
                        <input
                          id="drawer-company-url"
                          type="text"
                          name="company_url"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Name *</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
                          placeholder="John Doe" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Business Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
                            placeholder="Your Company" 
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Phone Number</label>
                          <input 
                            type="tel" 
                            className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
                            placeholder="(555) 555-5555" 
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
                          placeholder="john@example.com" 
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Website URL *</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
                          placeholder="yourwebsite.com" 
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Biggest Challenge *</label>
                        <textarea 
                          required
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none h-20" 
                          placeholder="Where do you feel like you are losing jobs?"
                        ></textarea>
                      </div>
                      <div className="mt-2">
                        <Button type="submit" variant="primary" className="w-full justify-center">
                          Send Request
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-serif text-3xl font-medium mb-4">Request Sent</h3>
                    <p className="text-muted-text text-lg leading-relaxed mb-10">
                      Thank you. I have received your information and will be in touch shortly to schedule a review.
                    </p>
                    <Button variant="secondary" onClick={closeDrawer} className="w-full justify-center">
                      Close
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
