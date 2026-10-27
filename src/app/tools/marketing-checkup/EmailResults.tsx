"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import type { Answer } from "@/lib/marketing-checkup";
import styles from "./checkup.module.css";

export default function EmailResults({ answers }: { answers: Answer[] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const requestId = useRef<string | null>(null);
  const sending = useRef(false);

  async function sendResults(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    if (!emailRef.current?.validity.valid || !email.trim()) {
      setStatus("error");
      setError("Enter a valid email address to receive a copy.");
      emailRef.current?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setError("");
    requestId.current ??= crypto.randomUUID();
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch("/api/marketing-checkup/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(), answers, requestId: requestId.current,
          company_url: data.get("company_url"),
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "We couldn’t email your results. Please try again. You can still print them.");
      }
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setError(error instanceof Error && error.name !== "TimeoutError"
        ? error.message
        : "We couldn’t confirm the send. Please try again. You can still print your results.");
    } finally {
      sending.current = false;
    }
  }

  return (
    <div className={styles.emailResults}>
      <h3 className="font-serif text-3xl">Email me my results</h3>
      <p id="email-explanation">Optional. Get a copy of your answers and follow-up questions. You can keep using your results and printing without an email.</p>
      {status !== "success" && <form onSubmit={sendResults} noValidate aria-label="Email my checkup results" aria-busy={status === "sending"}>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="checkup-company-url">Leave this blank</label>
          <input id="checkup-company-url" name="company_url" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="checkup-email">Email address</label>
        <input ref={emailRef} id="checkup-email" name="email" type="email" required autoComplete="email" maxLength={254} value={email} disabled={status === "sending"} aria-invalid={status === "error" || undefined} aria-describedby={`email-explanation email-privacy${error ? " email-error" : ""}`} onChange={(event) => {
          setEmail(event.target.value);
          setStatus("idle");
          setError("");
          requestId.current = null;
        }} />
        <p id="email-privacy" className={styles.emailPrivacy}>By choosing Email me my results, you send your email address and answers to True Path and its email provider to deliver this copy. This does not sign you up for marketing emails.</p>
        {error && <p id="email-error" role="alert" className={styles.error}>{error}</p>}
        <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Email me my results"}</Button>
      </form>}
      <p role="status" aria-live="polite">{status === "success" ? "Your email is on its way. Check your inbox or spam folder." : status === "sending" ? "Sending your results…" : ""}</p>
    </div>
  );
}
