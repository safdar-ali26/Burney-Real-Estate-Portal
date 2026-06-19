/**
 * =====================================================
 * FILE: src/app/administrator/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium admin dashboard overview page.
 *
 * FEATURES:
 * - Real database statistics
 * - Admin portal progress overview
 * - Quick actions
 * - CRM / system status
 * - Recent records overview
 * =====================================================
 */

import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Database,
  Home,
  Settings,
  ShieldCheck,
  Users,
  UserCog,
} from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import StatsCard from "@/components/admin/dashboard/stats-card";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AdministratorPage() {
  await requireRole("ADMIN");

  const [
    totalProperties,
    totalDevelopers,
    totalLeads,
    totalAgents,
    totalUsers,
    totalSettings,
    recentProperties,
    recentAgents,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.developer.count(),
    prisma.lead.count(),
    prisma.user.count({
      where: {
        role: "AGENT",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
    prisma.siteSetting.count(),
    prisma.property.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        developer: true,
      },
    }),
    prisma.user.findMany({
      take: 4,
      where: {
        role: "AGENT",
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const dashboardCards = [
    {
      title: "Properties",
      value: String(totalProperties),
      change: "Live inventory",
      icon: Home,
    },
    {
      title: "Developers",
      value: String(totalDevelopers),
      change: "CRM synced",
      icon: Building2,
    },
    {
      title: "Agents",
      value: String(totalAgents),
      change: "Active team",
      icon: UserCog,
    },
    {
      title: "Users",
      value: String(totalUsers),
      change: "Website accounts",
      icon: Users,
    },
  ];

  const quickActions = [
    {
      title: "Add Property",
      href: "/administrator/properties/add",
      description: "Create a manual property listing.",
      icon: Home,
    },
    {
      title: "Add Agent",
      href: "/administrator/agents/add",
      description: "Create a new agent account.",
      icon: UserCog,
    },
    {
      title: "Add User",
      href: "/administrator/users/add",
      description: "Create a website user account.",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/administrator/settings",
      description: "Update company portal settings.",
      icon: Settings,
    },
  ];

  const systemStatus = [
    {
      label: "Database Connected",
      value: "Active",
      icon: Database,
    },
    {
      label: "Authentication",
      value: "Active",
      icon: ShieldCheck,
    },
    {
      label: "Admin Portal",
      value: "Nearly Complete",
      icon: CheckCircle2,
    },
    {
      label: "Leads Module",
      value: totalLeads > 0 ? "Active" : "Pending",
      icon: Users,
    },
  ];

  return (
    <AdminLayout
      title="Administrator Dashboard"
      subtitle="Premium management center for Burney Real Estate."
    >
      <div className="w-full max-w-full space-y-8 overflow-x-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#EBCB4C]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#EBCB4C]/5 blur-[120px]" />

        <div className="relative z-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <StatsCard
                key={card.title}
                title={card.title}
                value={card.value}
                change={card.change}
              />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Admin Portal Progress
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Current completion status of core admin modules.
                  </p>
                </div>

                <span className="rounded-full border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-4 py-2 text-sm font-bold text-[#8A6A00] dark:text-[#EBCB4C]">
                  Leads Pending
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Properties Module", "Complete"],
                  ["Developers Module", "Complete"],
                  ["Agents Module", "Complete"],
                  ["Users Module", "Complete"],
                  ["My Profile", "Complete"],
                  ["Account Settings", "Complete"],
                  ["Company Settings", totalSettings > 0 ? "Configured" : "Pending"],
                  ["Leads Module", "Pending"],
                ].map(([label, status]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {label}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                        status === "Complete" || status === "Configured"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-yellow-500/10 text-yellow-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 p-6 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8A6A00] dark:text-[#EBCB4C]">
                Next Priority
              </p>

              <h3 className="mt-4 text-2xl font-bold text-foreground">
                Leads Module
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Build website inquiry leads for off-plan and secondary
                properties after Admin, Agent and User portals are ready.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-card/70 p-4">
                <p className="text-sm font-semibold text-foreground">
                  Current rule
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Off-plan inquiries stay with Admin. Secondary property
                  inquiries will show the assigned agent.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-foreground">
                Quick Actions
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Frequently used admin shortcuts.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {quickActions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h4 className="mt-4 font-bold text-foreground">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-foreground">
                System Status
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Portal connection and module overview.
              </p>

              <div className="mt-6 space-y-4">
                {systemStatus.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-[#8A6A00] dark:text-[#EBCB4C]">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-foreground">
                Recent Properties
              </h3>

              <div className="mt-5 space-y-3">
                {recentProperties.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No recent properties found.
                  </p>
                ) : (
                  recentProperties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/administrator/properties/${property.id}`}
                      className="block rounded-2xl border border-border bg-background px-4 py-3 transition hover:border-[#EBCB4C]/40"
                    >
                      <p className="line-clamp-1 font-semibold text-foreground">
                        {property.title}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {property.developer?.name || "No developer"} •{" "}
                        {property.category}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-foreground">
                Recent Agents
              </h3>

              <div className="mt-5 space-y-3">
                {recentAgents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No recent agents found.
                  </p>
                ) : (
                  recentAgents.map((agent) => (
                    <Link
                      key={agent.id}
                      href={`/administrator/agents/${agent.id}`}
                      className="block rounded-2xl border border-border bg-background px-4 py-3 transition hover:border-[#EBCB4C]/40"
                    >
                      <p className="line-clamp-1 font-semibold text-foreground">
                        {agent.name || "Unnamed Agent"}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {agent.email}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}