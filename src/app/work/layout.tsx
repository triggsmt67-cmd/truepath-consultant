import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Work",
  description: "Case studies showing how True Path Digital helps local service businesses fix demand leaks and drive real revenue through practical website and marketing improvements.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "My Work | True Path Digital",
    description: "Real case studies showing how I help service businesses fix demand leaks and drive revenue.",
    url: "https://truepathdigital.com/work",
    type: "website",
    images: [{ url: "/images/decision-partner-final.jpg", width: 1200, height: 630, alt: "True Path Digital case studies and results" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Work | True Path Digital",
    description: "Real case studies showing how I help service businesses fix demand leaks and drive revenue.",
    images: ["/images/decision-partner-final.jpg"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
