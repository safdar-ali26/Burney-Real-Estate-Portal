/**
 * =====================================================
 * FILE: src/app/administrator/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium admin dashboard overview page.
 * =====================================================
 */


import AdminLayout from "@/components/admin/admin-layout";
import StatsCard from "@/components/admin/dashboard/stats-card";
import LeadChart from "@/components/admin/dashboard/lead-chart";
import RecentLeads from "@/components/admin/dashboard/recent-leads";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";


export default async function AdministratorPage() {
  await requireRole("ADMIN");

  const [
  totalProperties,
  totalDevelopers,
  totalLeads,
  totalAgents,
] = await Promise.all([
  prisma.property.count(),
  prisma.developer.count(),
  prisma.lead.count(),
  prisma.user.count({
    where: {
      role: "AGENT",
    },
  }),
]);

const dashboardCards = [
  {
    title: "Total Properties",
    value: String(totalProperties),
    change: "Live from database",
  },
  {
    title: "Total Developers",
    value: String(totalDevelopers),
    change: "Live from database",
  },
  {
    title: "Total Leads",
    value: String(totalLeads),
    change: "Live from database",
  },
  {
    title: "Total Agents",
    value: String(totalAgents),
    change: "Active team",
  },
];

  return (
    <AdminLayout
      title="Administrator Dashboard"
      subtitle="Premium management center for Burney Real Estate."
    >
      <div className="w-full max-w-full overflow-x-hidden space-y-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#EBCB4C]/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 left-20 h-72 w-72 rounded-full bg-[#EBCB4C]/5 blur-[120px]" />

        <div className="relative z-10">

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
  <div className="rounded-3xl border border-border bg-card p-6 shadow-xl xl:col-span-2">
    <h3 className="text-lg font-semibold text-foreground">
      CRM & Automation Status
    </h3>

    <p className="mt-1 text-sm text-muted-foreground">
      Current system connection and automation overview.
    </p>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {[
        "Database Connected",
        "Authentication Active",
        "CRM Sync Pending",
      ].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-5 py-4 text-sm font-medium text-[#8A6A00] shadow-sm dark:text-[#EBCB4C]"
        >
          {item}
        </div>
      ))}
    </div>
  </div>

  <div className="rounded-3xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 p-6 shadow-xl">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8A6A00] dark:text-[#EBCB4C]">
      Next Step
    </p>

    <h3 className="mt-4 text-xl font-bold text-foreground">
      Property Management
    </h3>

    <p className="mt-3 text-sm leading-6 text-muted-foreground">
      Build property approval workflow, agent uploads and CRM off-plan sync.
    </p>
  </div>
</div>
        </div>
      </div>
    </AdminLayout>
  );
}
