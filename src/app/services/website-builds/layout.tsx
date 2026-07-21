import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design and Conversion Repair",
  description: "I build and repair websites for local service businesses that turn more visitors into calls, estimates, and booked work. No templates. No filler pages.",
  alternates: {
    canonical: "/services/website-builds",
  },
  openGraph: {
    title: "Website Design and Conversion Repair",
    description: "I build and repair websites for local service businesses that turn more visitors into calls, estimates, and booked work.",
    url: "https://truepathdigital.com/services/website-builds",
    type: "website",
    images: [{ url: "/images/website-builds.png", width: 1200, height: 630, alt: "Custom website design for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design and Conversion Repair | True Path Digital",
    description: "I build and repair websites for service businesses that turn visitors into booked work.",
    images: ["/images/website-builds.png"],
  },
};

export default function WebsiteBuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
