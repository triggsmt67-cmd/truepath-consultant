import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Response and Follow-Up Services",
  description: "Lead response and follow-up services for local service businesses. Set up inquiry ownership, missed-call handling, and estimate follow-up. Request a review.",
  alternates: {
    canonical: "/services/lead-response",
  },
  openGraph: {
    title: "Lead Response and Follow-Up Services",
    description: "Lead response and follow-up services for local service businesses. Set up inquiry ownership, missed-call handling, and estimate follow-up. Request a review.",
    url: "https://truepath406.com/services/lead-response",
    type: "website",
    images: [{ url: "/images/lead-response.webp", width: 1200, height: 630, alt: "Lead response and follow-up systems for service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Response and Follow-Up Services | True Path Digital",
    description: "Lead response and follow-up services for local service businesses. Set up inquiry ownership, missed-call handling, and estimate follow-up. Request a review.",
    images: ["/images/lead-response.webp"],
  },
};

export default function LeadResponseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
