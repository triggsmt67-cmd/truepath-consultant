import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversion-Focused Web Design in Missoula",
  description: "Website strategy, focused repairs, and custom builds for Missoula service businesses. Make services clear and inquiries easier. Request a website review.",
  alternates: {
    canonical: "/services/website-builds",
  },
  openGraph: {
    title: "Conversion-Focused Web Design in Missoula",
    description: "Website strategy, focused repairs, and custom builds for Missoula service businesses. Make services clear and inquiries easier. Request a website review.",
    url: "https://truepath406.com/services/website-builds",
    type: "website",
    images: [{ url: "/images/website-builds.webp", width: 1200, height: 630, alt: "Custom website design for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion-Focused Web Design in Missoula | True Path Digital",
    description: "Website strategy, focused repairs, and custom builds for Missoula service businesses. Make services clear and inquiries easier. Request a website review.",
    images: ["/images/website-builds.webp"],
  },
};

export default function WebsiteBuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
