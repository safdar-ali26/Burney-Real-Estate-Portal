"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const propertyItems = [
  {
    title: "Buy",
    href: "/buy",
    description: "Explore premium properties for sale.",
  },
  {
    title: "Rent",
    href: "/rent",
    description: "Find apartments, villas and townhouses for rent.",
  },
  {
    title: "Off Plan",
    href: "/off-plan",
    description: "Discover latest launches and payment plans.",
  },
];

export default function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navItems.slice(0, 2).map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}

      <div className="group relative">
        <button className="flex items-center gap-1 rounded-xl px-3 py-2 text-[13px] font-medium text-white/75 transition hover:text-[#EBCB4C]">
          Properties
          <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
        </button>

        <div className="invisible absolute left-1/2 top-full w-[460px] -translate-x-1/2 translate-y-4 rounded-2xl border border-white/10 bg-black/90 p-3 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
          <div className="grid gap-2">
            {propertyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
              >
                <h4 className="text-sm font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs leading-5 text-white/50">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {navItems.slice(2).map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-2 text-[13px] font-medium text-white/75 transition hover:text-[#EBCB4C]"
    >
      {children}
    </Link>
  );
}