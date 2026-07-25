import type { Metadata } from "next";
import { Newsreader, Figtree } from "next/font/google";
import "./globals.css";
import { LeadDrawerProvider } from "@/context/LeadDrawerContext";
import LeadDrawer from "@/components/LeadDrawer";
import { serializeJsonLd } from "@/lib/json-ld";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-inter",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://truepathdigital.com"),
  title: {
    default: "True Path Digital | Clearer marketing. Better websites.",
    template: "%s | True Path Digital"
  },
  description: "True Path Digital helps owner-operated service businesses find the gaps between visibility, customer trust, lead response, and booked work.",
  keywords: [
    "local service business marketing",
    "Google Business Profile optimization",
    "website design for contractors",
    "lead response systems",
    "under the hood audit",
    "service business website",
    "Missoula Montana marketing",
    "trade contractor marketing",
    "HVAC marketing",
    "plumber website design"
  ],
  authors: [{ name: "Trevor Riggs", url: "https://truepathdigital.com" }],
  creator: "Trevor Riggs",
  publisher: "True Path Digital",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "True Path Digital | Clearer marketing. Better websites.",
    description: "True Path Digital helps owner-operated service businesses find the gaps between visibility, customer trust, lead response, and booked work.",
    url: "https://truepathdigital.com",
    siteName: "True Path Digital",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/decision-partner-final.jpg",
        width: 1200,
        height: 630,
        alt: "Trevor Riggs consulting with a service business owner",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Path Digital | Clearer marketing. Better websites.",
    description: "I help owner-operated service businesses find and fix the marketing leaks that cost them jobs.",
    images: ["/images/decision-partner-final.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Marketing",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://truepathdigital.com/#business",
  name: "True Path Digital",
  url: "https://truepathdigital.com",
  logo: {
    "@type": "ImageObject",
    "@id": "https://truepathdigital.com/#logo",
    url: "https://truepathdigital.com/images/logo.png",
    width: 153,
    height: 184,
  },
  image: "https://truepathdigital.com/images/decision-partner-final.jpg",
  description: "True Path Digital helps owner-operated service businesses find the gaps between visibility, customer trust, lead response, and booked work.",
  telephone: "+1-406-880-6992",
  email: "trevor@truepathdigital.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-406-880-6992",
    email: "trevor@truepathdigital.com",
    contactType: "sales",
    areaServed: "US",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Missoula",
    addressRegion: "MT",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.8721,
    longitude: -113.994,
  },
  areaServed: [
    { "@type": "City", name: "Missoula" },
    { "@type": "State", name: "Montana" },
  ],
  founder: {
    "@id": "https://truepathdigital.com/#trevor-riggs",
  },
  priceRange: "$$",
  knowsAbout: [
    "Google Business Profile Optimization",
    "Local SEO for Service Businesses",
    "Website Conversion Optimization",
    "Lead Response Systems",
    "CRM Setup for Contractors",
    "Service Business Marketing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://truepathdigital.com/services/google-profile#service",
          name: "Google Business Profile Optimization",
          url: "https://truepathdigital.com/services/google-profile",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://truepathdigital.com/services/website-builds#service",
          name: "Website Design and Conversion Repair",
          url: "https://truepathdigital.com/services/website-builds",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": "https://truepathdigital.com/services/lead-response#service",
          name: "Lead Response and Follow-Up Systems",
          url: "https://truepathdigital.com/services/lead-response",
        },
      },
    ],
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://truepathdigital.com/#trevor-riggs",
  name: "Trevor Riggs",
  jobTitle: "Founder",
  url: "https://truepathdigital.com/#credibility",
  worksFor: {
    "@id": "https://truepathdigital.com/#business",
  },
  knowsAbout: [
    "Local service business marketing",
    "Google Business Profile optimization",
    "Website conversion",
    "Lead response systems",
  ],
  knowsLanguage: "en-US",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://truepathdigital.com/#website",
  name: "True Path Digital",
  url: "https://truepathdigital.com",
  description: "Practical marketing strategy, websites, local visibility, and lead response systems for owner-operated service businesses.",
  inLanguage: "en-US",
  publisher: { "@id": "https://truepathdigital.com/#business" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${figtree.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(founderSchema) }}
        />
      </head>
      <body className="font-sans bg-background text-foreground flex flex-col min-h-screen">
        <LeadDrawerProvider>
          {children}
          <LeadDrawer />
        </LeadDrawerProvider>
      </body>
    </html>
  );
}
