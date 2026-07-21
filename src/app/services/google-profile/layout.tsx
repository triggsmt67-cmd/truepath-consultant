import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Business Profile Optimization",
  description: "I help owner-operated service businesses clean up, strengthen, and better manage their Google Business Profiles so they show up better on Google Maps and turn more local searches into calls.",
  alternates: {
    canonical: "/services/google-profile",
  },
  openGraph: {
    title: "Google Business Profile Optimization",
    description: "I help owner-operated service businesses clean up, strengthen, and better manage their Google Business Profiles so they show up better on Google Maps.",
    url: "https://truepathdigital.com/services/google-profile",
    type: "website",
    images: [{ url: "/images/google-profile.png", width: 1200, height: 630, alt: "Google Business Profile optimization for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Business Profile Optimization | True Path Digital",
    description: "I help service businesses clean up and strengthen their Google Business Profiles to turn more local searches into calls.",
    images: ["/images/google-profile.png"],
  },
};

export default function GoogleProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
