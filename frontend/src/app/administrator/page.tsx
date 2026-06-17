/**
 * =====================================================
 * FILE: src/app/administrator/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium admin dashboard overview page.
 * =====================================================
 */

import { Building2, FolderKanban, TrendingUp, UserCog } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import StatsCard from "@/components/admin/dashboard/stats-card";
import DashboardHeader from "@/components/admin/dashboard/dashboard-header";
import LeadChart from "@/components/admin/dashboard/lead-chart";
import RecentLeads from "@/components/admin/dashboard/recent-leads";
import { requireRole } from "@/lib/auth-guard";

const dashboardCards = [
  {
    title: "Total Properties",
    value: "0",
    change: "+0% this month",
  },
  {
    title: "Total Developers",
    value: "0",
    change: "CRM sync pending",
  },
  {
    title: "Total Leads",
    value: "0",
    change: "+0% this week",
  },
  {
    title: "Total Agents",
    value: "1",
    change: "Active team",
  },
];

export default async function AdministratorPage() {
  await requireRole("ADMIN");

  return (
    <AdminLayout
      title="Administrator Dashboard"
      subtitle="Premium management center for Burney Real Estate."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-[#EBCB4C]/[0.06] p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#EBCB4C]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#EBCB4C]/5 blur-[120px]" />

        <div className="relative z-10">
          <DashboardHeader />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <StatsCard
                key={card.title}
                title={card.title}
                value={card.value}
                change={card.change}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <LeadChart />
            <RecentLeads />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl xl:col-span-2">
              <h3 className="text-lg font-semibold text-white">
                CRM & Automation Status
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  "Database Connected",
                  "Authentication Active",
                  "CRM Sync Pending",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-4 text-sm text-[#EBCB4C]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-[#EBCB4C]">
                Next Step
              </p>

              <h3 className="mt-4 text-xl font-bold text-white">
                Property Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                Build property approval workflow, agent uploads and CRM off-plan
                sync.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
