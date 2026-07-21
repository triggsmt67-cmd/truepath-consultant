import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Response and Follow-Up Systems",
  description: "I help local service businesses build simple lead response and follow-up systems so inquiries are acknowledged, tracked, and followed up without adding unnecessary software.",
  alternates: {
    canonical: "/services/lead-response",
  },
  openGraph: {
    title: "Lead Response and Follow-Up Systems",
    description: "I help local service businesses build simple lead response and follow-up systems so inquiries are acknowledged, tracked, and followed up.",
    url: "https://truepathdigital.com/services/lead-response",
    type: "website",
    images: [{ url: "/images/lead-response.png", width: 1200, height: 630, alt: "Lead response and follow-up systems for service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Response and Follow-Up Systems | True Path Digital",
    description: "Stop losing good leads to missed calls and slow follow-up. I build simple systems that work.",
    images: ["/images/lead-response.png"],
  },
};

export default function LeadResponseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
