import { renderCheckupEmail } from "@/lib/marketing-checkup-email";
import type { Answer } from "@/lib/marketing-checkup";

// Local-only, canned samples. No email address, submission data, or sending.
export function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
  const sample = new URL(request.url).searchParams.get("sample");
  const answer: Answer | null = sample === "yes" ? "Yes" : sample === "no" ? "No" : sample === "unsure" ? "Not sure" : null;
  const answers: Answer[] = answer ? Array(7).fill(answer) : ["Yes", "No", "Not sure", "Yes", "No", "Not sure", "Yes"];
  return new Response(renderCheckupEmail(answers).html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}
