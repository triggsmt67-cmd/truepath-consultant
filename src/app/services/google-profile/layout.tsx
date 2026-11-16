import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Business Profile Optimization in Missoula",
  description: "Google Business Profile optimization for Missoula service businesses. Improve categories, services, reviews, and website alignment. Request a profile review.",
  alternates: {
    canonical: "/services/google-profile",
  },
  openGraph: {
    title: "Google Business Profile Optimization in Missoula",
    description: "Google Business Profile optimization for Missoula service businesses. Improve categories, services, reviews, and website alignment. Request a profile review.",
    url: "https://truepath406.com/services/google-profile",
    type: "website",
    images: [{ url: "/images/google-profile.webp", width: 1200, height: 630, alt: "Google Business Profile optimization for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Business Profile Optimization in Missoula | True Path Digital",
    description: "Google Business Profile optimization for Missoula service businesses. Improve categories, services, reviews, and website alignment. Request a profile review.",
    images: ["/images/google-profile.webp"],
  },
};

export default function GoogleProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
