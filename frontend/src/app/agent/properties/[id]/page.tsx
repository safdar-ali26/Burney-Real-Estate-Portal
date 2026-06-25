import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit, MapPin, Trash2 } from "lucide-react";

import AgentLayout from "@/components/agent/agent-layout";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { agentDeletePropertyAction } from "@/actions/agent-delete-property";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentPropertyDetailsPage({ params }: Props) {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const { id } = await params;

  const property = await prisma.property.findFirst({
    where: {
      id,
      agentId,
      isFromCRM: false,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  const heroImage = property.featuredImage || property.images[0]?.url || "";
  const deleteProperty = agentDeletePropertyAction.bind(null, property.id);

  return (
    <AgentLayout title={property.title} subtitle="Property Details">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/agent/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Properties
          </Link>

          <div className="flex flex-wrap items-center gap-3">
  <Link
    href={`/agent/properties/${property.id}/edit`}
    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
  >
    <Edit className="h-4 w-4" />
    Edit Property
  </Link>

  <form action={deleteProperty}>
    <button
      type="submit"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
    >
      <Trash2 className="h-4 w-4" />
      Delete Property
    </button>
  </form>
</div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={property.title}
              width={1400}
              height={650}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-muted text-muted-foreground">
              No Featured Image
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-xs font-bold text-black">
                  {property.category}
                </span>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-foreground">
                  {property.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    property.approvalStatus === "APPROVED"
                      ? "bg-green-500/10 text-green-600"
                      : property.approvalStatus === "REJECTED"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-yellow-500/10 text-yellow-700"
                  }`}
                >
                  {property.approvalStatus}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground">
                {property.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#EBCB4C]" />
                <span>
                  {property.district || "-"}
                  {property.emirate ? `, ${property.emirate}` : ""}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBCB4C]">
                Price
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatAED(property.price)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-xl font-bold text-foreground">
            Property Information
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Category", property.category],
              ["Status", property.status],
              ["Approval Status", property.approvalStatus],
              ["Price", formatAED(property.price)],
              ["Bedrooms", property.bedrooms || "-"],
              ["Bathrooms", property.bathrooms || "-"],
              ["Size", property.size ? `${property.size.toLocaleString()} SQFT` : "-"],
              ["Emirate", property.emirate || "-"],
              ["District", property.district || "-"],
              ["Property Type", property.type || "-"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-background p-4"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-xl font-bold text-foreground">Description</h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {property.description || "No description available."}
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-xl font-bold text-foreground">
            Gallery Images
          </h2>

          {property.images.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No gallery images uploaded.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {property.images.map((image) => (
                <div
                  key={image.id}
                  className="relative h-40 overflow-hidden rounded-2xl border border-border bg-muted"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AgentLayout>
  );
}