import AgentLayout from "@/components/agent/agent-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AgentDashboardPage() {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const [totalProperties, pendingProperties, approvedProperties, totalLeads] =
    await Promise.all([
      prisma.property.count({
        where: {
          agentId,
          isFromCRM: false,
        },
      }),

      prisma.property.count({
        where: {
          agentId,
          isFromCRM: false,
          approvalStatus: "PENDING",
        },
      }),

      prisma.property.count({
        where: {
          agentId,
          isFromCRM: false,
          approvalStatus: "APPROVED",
        },
      }),

      prisma.lead.count({
        where: {
          assignedToId: agentId,
        },
      }),
    ]);

  const cards = [
    ["My Properties", totalProperties],
    ["Pending Approval", pendingProperties],
    ["Approved Listings", approvedProperties],
    ["My Leads", totalLeads],
  ];

  return (
    <AgentLayout
      title="Agent Dashboard"
      subtitle="Manage your secondary properties and leads."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value]) => (
          <div
            key={title}
            className="rounded-3xl border border-border bg-card p-6 shadow-xl"
          >
            <p className="text-sm text-muted-foreground">{title}</p>
            <h2 className="mt-3 text-4xl font-bold text-foreground">
              {value}
            </h2>
          </div>
        ))}
      </div>
    </AgentLayout>
  );
}