"use client";

import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function LeadDrawer() {
  const { isOpen, closeDrawer } = useLeadDrawer();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => closeDrawer(), [closeDrawer]);

  useFocusTrap(dialogRef, isOpen, handleClose);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          source: "drawer",
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "Your request could not be sent.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Your request could not be sent. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        setSubmitError("");
        setHoneypot("");
      }}
    >
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
            aria-describedby="lead-drawer-description"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-muted-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-muted-border">
              <h2 id="lead-drawer-title" className="font-serif text-2xl font-medium">Request a Review</h2>
              <button
                onClick={closeDrawer}
                aria-label="Close request form"
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
                      <p id="lead-drawer-description" className="text-muted-text leading-relaxed">
                        Give me a little context on your business and where you feel you are losing jobs. I&apos;ll review your setup and let you know if I can help.
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
                        <label htmlFor="drawer-name" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Name *</label>
                        <input
                          id="drawer-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                          <label htmlFor="drawer-business" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Business Name</label>
                          <input
                            id="drawer-business"
                            name="business"
                            type="text"
                            autoComplete="organization"
                            className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label htmlFor="drawer-phone" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Phone Number</label>
                          <input
                            id="drawer-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <label htmlFor="drawer-email" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Email Address *</label>
                        <input
                          id="drawer-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label htmlFor="drawer-website" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Website URL *</label>
                        <input
                          id="drawer-website"
                          name="website"
                          type="url"
                          required
                          autoComplete="url"
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label htmlFor="drawer-challenge" className="text-xs font-medium text-foreground/70 uppercase tracking-widest">Biggest Challenge *</label>
                        <textarea
                          id="drawer-challenge"
                          name="challenge"
                          required
                          className="w-full bg-transparent border-b border-foreground/20 py-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none h-20"
                          placeholder="Where do you feel like you are losing jobs?"
                        ></textarea>
                      </div>
                      <div className="mt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-full justify-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Request"}
                        </Button>
                        <p
                          className="mt-3 min-h-5 text-center text-sm text-red-700"
                          role={submitError ? "alert" : undefined}
                          aria-live="polite"
                        >
                          {submitError}
                        </p>
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
