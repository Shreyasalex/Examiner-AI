'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "For Students", href: "#students" },
  { label: "For Faculty", href: "#faculty" },
  { label: "How It Works", href: "#workflow" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[860px]">
        <div
          className={cn(
            "w-full flex items-center justify-between px-5 h-[52px] rounded-2xl transition-all duration-500",
            scrolled
              ? "bg-[rgba(250,246,238,0.88)] backdrop-blur-2xl border border-[rgba(255,255,255,0.7)] shadow-[0_8px_40px_-8px_rgba(80,60,120,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]"
              : "bg-[rgba(255,255,255,0.62)] backdrop-blur-xl border border-[rgba(255,255,255,0.65)] shadow-[0_4px_24px_-4px_rgba(80,60,120,0.13),inset_0_1px_0_rgba(255,255,255,0.9)]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image 
              src="/logo.png" 
              alt="Examiner AI Logo" 
              width={32} 
              height={32} 
              className="object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <span className="font-display font-bold text-[15px] tracking-tight text-[#1E1B24]">
              EXAMINER AI
            </span>
          </Link>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchorClick(link.href)}
                className="text-[13.5px] font-medium text-[#5C5868] hover:text-[#1E1B24] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Login button only */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              href="/login"
              className="bg-[#4A63C9] text-white px-5 py-2 rounded-xl text-[13px] font-semibold hover:bg-[#3d54b3] transition-all duration-200 shadow-[0_3px_12px_rgba(74,99,201,0.28)] hover:shadow-[0_4px_16px_rgba(74,99,201,0.36)] hover:-translate-y-px"
              data-testid="link-nav-login"
            >
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 text-[#1E1B24] rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "md:hidden mt-2 rounded-2xl overflow-hidden transition-all duration-300 origin-top",
            mobileMenuOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          )}
          style={{
            background: "rgba(250,246,238,0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 8px 32px -8px rgba(80,60,120,0.18)",
          }}
        >
          <div className="px-5 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchorClick(link.href)}
                className="text-base font-medium text-[#1E1B24] text-left bg-transparent border-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-[#E3D5BC] my-1" />
            <Link
              href="/login"
              className="bg-[#4A63C9] text-white px-5 py-3 rounded-xl text-center font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
