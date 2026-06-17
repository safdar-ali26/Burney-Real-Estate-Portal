/**
 * =====================================================
 * FILE: src/components/admin/admin-sidebar.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium admin sidebar with:
 * - Burney logo area
 * - Grouped navigation
 * - Luxury dark UI
 * - Gold brand accents
 * - Option C UI + Option B navigation structure
 * =====================================================
 */

import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Building2,
  ChevronRight,
  CircleDot,
  Home,
  Landmark,
  LayoutDashboard,
  Settings,
  Users,
  UserCog,
} from "lucide-react";

/**
 * -----------------------------------------------------
 * ADMIN NAVIGATION GROUPS
 * -----------------------------------------------------
 * This structure keeps sidebar clean and scalable.
 * Later we can make these groups collapsible.
 * -----------------------------------------------------
 */
const navigationGroups = [
  {
    title: "Overview",
    links: [
      {
        label: "Dashboard",
        href: "/administrator",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Property Management",
    links: [
      {
        label: "Properties",
        href: "/administrator/properties",
        icon: Home,
      },
      {
        label: "Developers",
        href: "/administrator/developers",
        icon: Building2,
      },
      {
        label: "CRM Sync",
        href: "/administrator/crm-sync",
        icon: Landmark,
      },
    ],
  },
  {
    title: "CRM",
    links: [
      {
        label: "Leads",
        href: "/administrator/leads",
        icon: BarChart3,
      },
      {
        label: "Agents",
        href: "/administrator/agents",
        icon: UserCog,
      },
      {
        label: "Users",
        href: "/administrator/users",
        icon: Users,
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        label: "Settings",
        href: "/administrator/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="relative hidden min-h-screen w-80 overflow-hidden border-r border-white/10 bg-[#050505] text-white lg:block">
      {/* Luxury gold glow background */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#EBCB4C]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#EBCB4C]/10 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col p-6">
        {/* Logo Area */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_30px_rgba(235,203,76,0.18)]">
              {/* 
                If logo.png exists inside public folder,
                it will show here.
                Path should be: frontend/public/logo.png
              */}
              <Image
                src="/logo.png"
                alt="Burney Real Estate"
                width={45}
                height={45}
                className="object-contain"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide text-[#EBCB4C]">
                Admin 
              </h2>
              <p className="text-md text-white/50">
                Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-3 flex items-center gap-2 px-2">
                <CircleDot className="h-3 w-3 text-[#EBCB4C]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  {group.title}
                </p>
              </div>

              <div className="space-y-1.5">
                {group.links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm text-white/65 transition-all duration-300 hover:border-[#EBCB4C]/20 hover:bg-white/[0.06] hover:text-[#EBCB4C] hover:shadow-[0_0_30px_rgba(235,203,76,0.08)]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-white/55 transition group-hover:bg-[#EBCB4C]/10 group-hover:text-[#EBCB4C]">
                          <Icon className="h-4 w-4" />
                        </span>

                        {link.label}
                      </span>

                      <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Status Card */}
        <div className="mt-8 rounded-3xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-5">
          <p className="text-sm font-semibold text-[#EBCB4C]">
            Portal Status
          </p>
          <p className="mt-2 text-xs leading-5 text-white/55">
            Authentication active. Database connected. CRM sync pending.
          </p>
        </div>
      </div>
    </aside>
  );
}