"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/work", label: "My Work" },
  { href: "/#services", label: "Capabilities" },
  { href: "/services/google-profile", label: "Google Profile" },
  { href: "/services/website-builds", label: "Website Builds" },
  { href: "/services/lead-response", label: "Lead Response" },
  { href: "/#audit", label: "Under the Hood Audit" },
  { href: "/insights", label: "Insights" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openDrawer } = useLeadDrawer();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent ${
          isScrolled || isMobileMenuOpen ? "bg-background/90 backdrop-blur-md border-muted-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/images/logo.png" alt="True Path Digital Logo" title="True Path Digital — Marketing for Local Service Businesses" width={32} height={32} className="w-8 h-auto object-contain transition-transform group-hover:scale-105" />
            <span className="font-serif text-xl md:text-2xl font-medium tracking-tight">True Path Digital.</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/work" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
              My Work
            </Link>
            <Link href="/#services" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
              Capabilities
            </Link>
            <Link href="/#audit" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
              Under the Hood Audit
            </Link>
            <Link href="/insights" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
              Insights
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/#contact" variant="primary" size="sm">
              Find My Leaks
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-background pt-24"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col px-6 py-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 font-serif text-2xl font-medium text-foreground hover:text-primary transition-colors border-b border-muted-border"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openDrawer();
                  }}
                >
                  Find My Leaks
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
