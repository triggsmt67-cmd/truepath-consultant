"use client";

import { useRef, useState } from "react";

import Button from "@/components/Button";

export default function HomeContactForm() {
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          source: "homepage",
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "Your request could not be sent.");
      }

      formRef.current?.reset();
      setHoneypot("");
      setStatus("success");
      setMessage("Thanks — your request was sent. I’ll be in touch shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Your request could not be sent. Please try again.",
      );
    }
  };

  return (
    <form
      ref={formRef}
      className="w-full max-w-md mx-auto flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div
        className="absolute overflow-hidden"
        style={{ left: "-9999px", top: "-9999px", position: "absolute" }}
        aria-hidden="true"
      >
        <label htmlFor="home-company-url">Company URL</label>
        <input
          id="home-company-url"
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="home-name"
          className="text-xs font-medium text-background/70 uppercase tracking-widest"
        >
          Name
        </label>
        <input
          id="home-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors"
          placeholder="John Doe"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="home-email"
          className="text-xs font-medium text-background/70 uppercase tracking-widest"
        >
          Email
        </label>
        <input
          id="home-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors"
          placeholder="you@company.com"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="home-website"
          className="text-xs font-medium text-background/70 uppercase tracking-widest"
        >
          Website URL <span className="normal-case tracking-normal text-background/40">(optional)</span>
        </label>
        <input
          id="home-website"
          name="website"
          type="url"
          autoComplete="url"
          className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="home-challenge"
          className="text-xs font-medium text-background/70 uppercase tracking-widest"
        >
          Biggest Challenge
        </label>
        <textarea
          id="home-challenge"
          name="challenge"
          required
          className="w-full bg-transparent border-b border-background/20 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors resize-none h-24"
          placeholder="Where do you feel like you are losing jobs?"
        />
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          variant="light"
          className="w-full justify-center"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Find My Leaks"}
        </Button>
        <p
          className={`mt-4 text-center text-xs leading-relaxed ${
            status === "error" ? "text-red-300" : "text-background/60"
          }`}
          role={status === "error" ? "alert" : undefined}
          aria-live="polite"
        >
          {message ||
            "I’ll use this information only to reply about your request."}
        </p>
      </div>
    </form>
  );
}
