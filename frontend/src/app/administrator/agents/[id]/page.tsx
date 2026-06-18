import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Eye,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserCog,
} from "lucide-react";
import { notFound } from "next/navigation";

import AdminLayout from "@/components/admin/admin-layout";
import DeleteAgentButton from "@/components/admin/delete-agent-button";
import { deleteAgentAction } from "@/actions/delete-agent";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDetailsPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const agent = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      properties: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          developer: true,
          images: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
      leads: {
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!agent || agent.role !== "AGENT") {
    notFound();
  }

  const deleteAgent = deleteAgentAction.bind(null, agent.id);

  return (
    <AdminLayout title={agent.name || "Agent"} subtitle="Agent Details">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/administrator/agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agents
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/administrator/agents/${agent.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
            >
              <Edit className="h-4 w-4" />
              Edit Agent
            </Link>

            <DeleteAgentButton action={deleteAgent} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted">
              {agent.profileImage ? (
                <Image
                  src={agent.profileImage}
                  alt={agent.name || "Agent"}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserCog className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">
                {agent.name || "Unnamed Agent"}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                  agent.isActive
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {agent.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {agent.designation || "Property Consultant"}
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#EBCB4C]" />
                {agent.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#EBCB4C]" />
                {agent.phone || "-"}
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#EBCB4C]" />
                {agent.whatsapp || "-"}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              Performance Summary
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted/60 p-5">
                <p className="text-sm text-muted-foreground">
                  Total Properties
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {agent.properties.length}
                </p>
              </div>

              <div className="rounded-2xl bg-muted/60 p-5">
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {agent.leads.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h3 className="text-xl font-bold text-foreground">
            Agent Properties
          </h3>

          {agent.properties.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No properties assigned to this agent.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {agent.properties.map((property) => {
                const imageUrl =
                  property.featuredImage || property.images[0]?.url || "";

                return (
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
                  >
                    <div className="relative h-48 bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        {property.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="line-clamp-1 text-lg font-bold text-foreground">
                        {property.title}
                      </h4>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {property.developer?.name || "No developer"}
                      </p>

                      <p className="mt-3 text-xl font-bold text-foreground">
                        {formatAED(property.price)}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-[#EBCB4C]" />
                        <span className="line-clamp-1">
                          {property.district || "-"}
                          {property.emirate ? `, ${property.emirate}` : ""}
                        </span>
                      </div>

                      <div className="mt-5 flex justify-end border-t border-border pt-4">
                        <Link
                          href={`/administrator/properties/${property.id}`}
                          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h3 className="text-xl font-bold text-foreground">Recent Leads</h3>

          {agent.leads.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No leads assigned to this agent.
            </p>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {agent.leads.map((lead: any) => (
                    <tr key={lead.id}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {lead.name || "-"}
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.phone || "-"}
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.status || "-"}
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}