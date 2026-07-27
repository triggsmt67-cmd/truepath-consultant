import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

type ContactSubmission = {
  source?: unknown;
  name?: unknown;
  business?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
  challenge?: unknown;
  company_url?: unknown;
};

const fieldLimits = {
  name: 100,
  business: 150,
  phone: 50,
  email: 254,
  website: 500,
  challenge: 5_000,
} as const;

function readField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  let submission: ContactSubmission;

  try {
    submission = (await request.json()) as ContactSubmission;
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot submissions get a success response without sending an email.
  if (readField(submission.company_url, 500)) {
    return Response.json({ ok: true });
  }

  const name = readField(submission.name, fieldLimits.name);
  const business = readField(submission.business, fieldLimits.business);
  const phone = readField(submission.phone, fieldLimits.phone);
  const email = readField(submission.email, fieldLimits.email);
  const website = readField(submission.website, fieldLimits.website);
  const challenge = readField(submission.challenge, fieldLimits.challenge);
  const source =
    readField(submission.source, 50) === "drawer"
      ? "Request a Review drawer"
      : "Homepage contact form";

  if (!name || !email || !challenge) {
    return Response.json(
      { error: "Please complete your name, email, and biggest challenge." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form is missing RESEND_API_KEY.");
    return Response.json(
      { error: "The form is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_EMAIL_TO ?? "trevor@truepathconsultants.com";
  const from =
    process.env.CONTACT_EMAIL_FROM ??
    "True Path Consultants <website@truepath406.com>";
  const subject = `New website inquiry from ${name}${business ? ` — ${business}` : ""}`;
  const fields = [
    ["Form", source],
    ["Name", name],
    ["Business", business || "Not provided"],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Website", website || "Not provided"],
    ["Biggest challenge", challenge],
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1f2933">
      <h1 style="font-size:24px;margin-bottom:24px">New website inquiry</h1>
      ${fields
        .map(
          ([label, value]) => `
            <div style="margin-bottom:18px">
              <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b">${escapeHtml(label)}</div>
              <div style="font-size:16px;line-height:1.6;white-space:pre-wrap">${escapeHtml(value)}</div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error("Resend contact email failed:", resendResponse.status, resendError);
    return Response.json(
      { error: "Your request could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
