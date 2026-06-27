"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import PublicButton from "@/components/public/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Off Plan", href: "/off-plan" },
  { label: "Developers", href: "/developers" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl">
          <div className="absolute right-4 top-4 w-[calc(100%-32px)] max-w-sm rounded-3xl border border-white/10 bg-[#0B0B0B] p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-[#EBCB4C]">Burney</p>
                <p className="text-xs text-white/50">Real Estate</p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/75 transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 grid gap-3">
              <PublicButton href="/login" variant="secondary">
                Login
              </PublicButton>
              <PublicButton href="/signup">Sign Up</PublicButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}