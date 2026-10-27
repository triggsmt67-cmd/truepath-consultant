import { createHash } from "node:crypto";
import { choices, questions, type Answer } from "@/lib/marketing-checkup";
import { renderCheckupEmail } from "@/lib/marketing-checkup-email";

export const runtime = "nodejs";

// Short-lived, hashed counters only. Best-effort per process; no worksheet storage.
const limits = new Map<string, { count: number; until: number }>();
function allow(key: string, maximum: number) {
  const now = Date.now();
  for (const [id, entry] of limits) if (entry.until <= now) limits.delete(id);
  const entry = limits.get(key);
  if (entry && entry.count >= maximum) return false;
  if (!entry && limits.size >= 5000) return false;
  limits.set(key, { count: (entry?.count ?? 0) + 1, until: entry?.until ?? now + 3_600_000 });
  return true;
}
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const unavailable = "Email is temporarily unavailable. Please try again later. Your results and printing are still available.";
const respond = (body: object, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return respond({ error: "Please send your results from the checkup page." }, 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return respond({ error: "Invalid request." }, 415);
  }
  // Bound streamed input too, rather than trusting Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return respond({ error: "Invalid request." }, 400);
  let raw = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  let submission: Record<string, unknown>;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) {
        await reader.cancel();
        return respond({ error: "Request is too large." }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    submission = parsed as Record<string, unknown>;
  } catch {
    return respond({ error: "Invalid request." }, 400);
  }
  if (submission.company_url) return respond({ ok: true });
  const email = typeof submission.email === "string" ? submission.email.trim() : "";
  if (email.length > 254 || !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(email)) {
    return respond({ error: "Enter a valid email address to receive a copy." }, 400);
  }
  if (!Array.isArray(submission.answers) || submission.answers.length !== questions.length ||
    !submission.answers.every((answer: unknown) => choices.includes(answer as Answer))) {
    return respond({ error: "Complete all seven questions before requesting an email." }, 400);
  }
  if (typeof submission.requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(submission.requestId)) {
    return respond({ error: "Please try sending from the checkup page again." }, 400);
  }
  if (!process.env.RESEND_API_KEY) {
    return respond({ error: unavailable }, 503);
  }
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(`ip:${hash(ip)}`, 15) || !allow(`recipient:${hash(email.toLowerCase())}`, 3)) {
    return respond({ error: "Too many email requests. Please try again in an hour, or print your results now." }, 429);
  }
  const answers = submission.answers as Answer[];
  const { text, html } = renderCheckupEmail(answers);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `marketing-v3-${hash(JSON.stringify([submission.requestId, email, answers]))}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM ?? "True Path Consultants <website@truepath406.com>", to: [email],
        subject: "Your Marketing Checkup results", text, html,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) return respond({ error: unavailable }, 502);
    const result = await response.json().catch(() => null);
    if (!result?.id) return respond({ error: unavailable }, 502);
    return respond({ ok: true });
  } catch {
    return respond({ error: "We couldn’t confirm the send. Please try again. Your results and printing are still available." }, 502);
  }
}
