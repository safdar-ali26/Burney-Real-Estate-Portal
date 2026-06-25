import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeveloperDetailsPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const developer = await prisma.developer.findUnique({
    where: { id },
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
    },
  });

  if (!developer) {
    notFound();
  }

  return (
    <AdminLayout title={developer.name} subtitle="Developer Details">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/administrator/developers"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Developers
          </Link>

          {developer.website ? (
            <a
              href={developer.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
            >
              <Globe className="h-4 w-4" />
              Visit Website
            </a>
          ) : null}
        </div>

        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="relative p-6">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#EBCB4C]/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#EBCB4C]/30 bg-white shadow-lg">
                {developer.logo ? (
                  <Image
                    src={developer.logo}
                    alt={developer.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-black" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-3xl font-bold text-foreground">
                  {developer.name}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {developer.properties.length} properties linked with this
                  developer.
                </p>

                {developer.description ? (
                  <p className="mt-4 line-clamp-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                    {developer.description}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No developer description available.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 px-6 py-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBCB4C]">
                  Total Properties
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {developer.properties.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Developer Properties
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                All projects synced or linked with {developer.name}.
              </p>
            </div>
          </div>

          {developer.properties.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-background p-6 text-sm text-muted-foreground">
              No properties found for this developer.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {developer.properties.map((property) => {
                const imageUrl =
                  property.featuredImage || property.images[0]?.url || "";

                return (
                  <Link
                    key={property.id}
                    href={`/administrator/properties/${property.id}`}
                    className="group block overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-2xl"
                  >
                    <div className="relative h-52 overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          No Image
                        </div>
                      )}

                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-black shadow-sm backdrop-blur">
                          {property.category}
                        </span>

                        <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-black shadow-sm backdrop-blur">
                          {property.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="-mt-10 mb-3">
                        {developer.logo ? (
                          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-card shadow-lg">
                            <Image
                              src={developer.logo}
                              alt={developer.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-card bg-[#EBCB4C] text-lg font-bold text-black shadow-lg">
                            {developer.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                        {property.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#EBCB4C]" />
                        <span className="line-clamp-1">
                          {property.district || "-"}
                          {property.emirate ? ` • ${property.emirate}` : ""}
                        </span>
                      </div>

                      <p className="mt-3 text-xl font-bold text-foreground">
                        {formatAED(property.price)}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted/60 px-3 py-1.5">
                          {property.bedrooms || "-"}
                        </span>

                        <span className="rounded-full bg-muted/60 px-3 py-1.5">
                          {property.size ? `${property.size} Sqft` : "- Sqft"}
                        </span>

                        <span className="rounded-full bg-muted/60 px-3 py-1.5">
                          {property.isFromCRM ? "CRM" : "Manual"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                            property.approvalStatus === "APPROVED"
                              ? "bg-green-500/10 text-green-600"
                              : property.approvalStatus === "REJECTED"
                                ? "bg-red-500/10 text-red-600"
                                : "bg-yellow-500/10 text-yellow-700"
                          }`}
                        >
                          {property.approvalStatus}
                        </span>

                        <span className="text-xs font-bold text-[#EBCB4C]">
                          Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}