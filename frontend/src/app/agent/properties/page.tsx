import Link from "next/link";
import { MapPin, Plus } from "lucide-react";

import AgentLayout from "@/components/agent/agent-layout";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AgentPropertiesPage() {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const properties = await prisma.property.findMany({
    where: {
      agentId,
      isFromCRM: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return (
    <AgentLayout
      title="My Properties"
      subtitle="Manage your secondary property listings."
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Link
            href="/agent/properties/add"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
            <p className="text-muted-foreground">
              You have not added any properties yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {properties.map((property) => {
              const imageUrl =
                property.featuredImage || property.images[0]?.url || "";

              return (
                <Link
                  key={property.id}
                  href={`/agent/properties/${property.id}`}
                  className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
                >
                  <div className="relative h-52 bg-muted">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={property.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No Image
                      </div>
                    )}

                    <div className="absolute left-3 top-3 flex gap-2">
                      <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-black">
                        {property.category}
                      </span>

                      <span className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white">
                        {property.approvalStatus}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                      {property.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-[#EBCB4C]" />
                      <span className="line-clamp-1">
                        {property.district || "-"}
                        {property.emirate ? ` • ${property.emirate}` : ""}
                      </span>
                    </div>

                    <p className="mt-3 text-xl font-bold text-foreground">
                      {formatAED(property.price)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted/60 px-3 py-1.5">
                        {property.bedrooms || "-"}
                      </span>

                      <span className="rounded-full bg-muted/60 px-3 py-1.5">
                        {property.size ? `${property.size} Sqft` : "- Sqft"}
                      </span>

                      <span className="rounded-full bg-muted/60 px-3 py-1.5">
                        {property.type || "-"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AgentLayout>
  );
}