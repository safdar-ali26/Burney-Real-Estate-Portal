"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { Heart, Scale, UserRound } from "lucide-react";
import Container from "@/components/public/ui/container";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import LanguageSelector from "./language-selector";

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-black/85 shadow-2xl backdrop-blur-xl"
          : "border-white/10 bg-transparent"
      }`}
    >
      {/* TOP BAR */}
      <div className="border-b border-white/10">
        <Container>
          <div className="flex h-10 items-center justify-between gap-4 text-xs text-white/65">
            <div className="flex items-center gap-5">
              <a
                href="mailto:info@burneyrealestate.com"
                className="hidden items-center gap-2 transition hover:text-[#EBCB4C] sm:flex"
              >
                <Mail className="h-3.5 w-3.5" />
                info@burneyrealestate.com
              </a>

              <a
                href="tel:+971506486626"
                className="flex items-center gap-2 transition hover:text-[#EBCB4C]"
              >
                <Phone className="h-3.5 w-3.5" />
                +971 50 648 6626
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-3 md:flex">
                <Social href="#" icon={<FaFacebookF />} />
                <Social href="#" icon={<FaInstagram />} />
                <Social href="#" icon={<FaLinkedinIn />} />
                <Social href="#" icon={<FaYoutube />} />
              </div>

              <Link
                href="/saved-properties"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
              >
                <Heart className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/compare"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
              >
                <Scale className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/login"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
              >
                <UserRound className="h-3.5 w-3.5" />
              </Link>

              
              <LanguageSelector />
              
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN NAV */}
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <img
              src="https://burneyrealestate.com/wp-content/uploads/2026/01/Burney-Logos-01-1-e1757405829806.png"
              alt="Burney Real Estate"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <DesktopNav />

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

function Social({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      className="text-white/65 transition hover:text-[#EBCB4C] [&_svg]:h-3.5 [&_svg]:w-3.5"
    >
      {icon}
    </a>
  );
}
