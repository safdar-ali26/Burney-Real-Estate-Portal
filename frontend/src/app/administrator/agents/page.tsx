import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Mail,
  Phone,
  Plus,
  UserCog,
  MessageCircle,
} from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AgentsPage() {
  await requireRole("ADMIN");

  const agents = await prisma.user.findMany({
    where: {
      role: "AGENT",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          properties: true,
          leads: true,
        },
      },
    },
  });

  return (
    <AdminLayout
      title="Agents"
      subtitle="Manage company agents and property consultants."
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Agent Management
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View all agents, their properties, leads and account status.
            </p>
          </div>

          <Link
            href="/administrator/agents/add"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </Link>
        </div>

        {agents.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <UserCog className="h-10 w-10 text-[#EBCB4C]" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                No agents found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Agents created by admin will appear here.
              </p>

              <Link
                href="/administrator/agents/add"
                className="mt-6 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Add First Agent
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted">
                    {agent.profileImage ? (
                      <Image
                        src={agent.profileImage}
                        alt={agent.name || "Agent"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserCog className="h-9 w-9 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                          {agent.name || "Unnamed Agent"}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {agent.designation || "Property Consultant"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${
                          agent.isActive
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {agent.isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#EBCB4C]" />
                        <span className="line-clamp-1">{agent.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#EBCB4C]" />
                        <span>{agent.phone || "-"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-[#EBCB4C]" />
                        <span>{agent.whatsapp || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-muted/60 p-4">
                    <p className="text-xs text-muted-foreground">
                      Properties
                    </p>
                    <p className="mt-1 text-xl font-bold text-foreground">
                      {agent._count.properties}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-muted/60 p-4">
                    <p className="text-xs text-muted-foreground">Leads</p>
                    <p className="mt-1 text-xl font-bold text-foreground">
                      {agent._count.leads}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end border-t border-border pt-4">
                  <Link
                    href={`/administrator/agents/${agent.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    <Eye className="h-4 w-4" />
                    View Agent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}