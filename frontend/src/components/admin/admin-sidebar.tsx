/**
 * =====================================================
 * FILE: src/components/admin/admin-sidebar.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium theme-aware admin sidebar.
 *
 * FEATURES:
 * - Dark / Light mode support
 * - Logo switching support
 * - Active menu highlight
 * - Grouped admin navigation
 * =====================================================
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

import ThemeLogo from "@/components/brand/theme-logo";

/**
 * -----------------------------------------------------
 * ADMIN NAVIGATION GROUPS
 * -----------------------------------------------------
 * Option B navigation structure:
 * - Overview
 * - Property Management
 * - CRM
 * - System
 * -----------------------------------------------------
 */
const navigationGroups = [
  {
    title: "Overview",
    links: [
      { label: "Dashboard", href: "/administrator", icon: LayoutDashboard },
    ],
  },
  {
    title: "Property Management",
    links: [
      { label: "Properties", href: "/administrator/properties", icon: Home },
      { label: "Developers", href: "/administrator/developers", icon: Building2 },
      { label: "CRM Sync", href: "/administrator/crm-sync", icon: Landmark },
    ],
  },
  {
    title: "CRM",
    links: [
      { label: "Leads", href: "/administrator/leads", icon: BarChart3 },
      { label: "Agents", href: "/administrator/agents", icon: UserCog },
      { label: "Users", href: "/administrator/users", icon: Users },
    ],
  },
  {
    title: "System",
    links: [
      { label: "Settings", href: "/administrator/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  /**
   * Current URL path.
   * Used to highlight active sidebar link.
   */
  const pathname = usePathname();

  return (
    <aside className="relative hidden min-h-screen w-80 overflow-hidden border-r border-border bg-card text-card-foreground lg:block">
      {/* Theme-aware luxury gold glow */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#EBCB4C]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#EBCB4C]/10 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col p-6">
        {/* Logo Area */}
        <div className="mb-8 rounded-3xl border border-border bg-background/60 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_30px_rgba(235,203,76,0.18)]">
              <ThemeLogo />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide text-[#EBCB4C]">
                Burney
              </h2>

              <p className="text-xs text-muted-foreground">
                Real Estate Portal
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

                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {group.title}
                </p>
              </div>

              <div className="space-y-1.5">
                {group.links.map((link) => {
                  const Icon = link.icon;

                  /**
                   * -----------------------------------------------------
                   * ACTIVE MENU LOGIC
                   * -----------------------------------------------------
                   * Exact match:
                   * /administrator
                   *
                   * Nested match:
                   * /administrator/properties
                   * /administrator/properties/add
                   *
                   * Special case:
                   * Dashboard should only be active on /administrator
                   * -----------------------------------------------------
                   */
                  const isDashboard = link.href === "/administrator";

                  const isActive = isDashboard
                    ? pathname === link.href
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        group
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "border border-[#EBCB4C]/35 bg-[#EBCB4C]/12 text-[#EBCB4C] shadow-[0_0_35px_rgba(235,203,76,0.10)]"
                            : "border border-transparent text-muted-foreground hover:border-[#EBCB4C]/30 hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            transition

                            ${
                              isActive
                                ? "bg-[#EBCB4C]/15 text-[#EBCB4C]"
                                : "bg-muted text-muted-foreground group-hover:bg-[#EBCB4C]/10 group-hover:text-[#EBCB4C]"
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        {link.label}
                      </span>

                      <ChevronRight
                        className={`
                          h-4
                          w-4
                          transition

                          ${
                            isActive
                              ? "translate-x-1 opacity-100 text-[#EBCB4C]"
                              : "opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                          }
                        `}
                      />
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

          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Authentication active. Database connected. CRM sync pending.
          </p>
        </div>
      </div>
    </aside>
  );
}