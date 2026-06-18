import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Eye, Globe, MapPin } from "lucide-react";
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

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted">
              {developer.logo ? (
                <Image
                  src={developer.logo}
                  alt={developer.name}
                  fill
                  className="object-contain p-3"
                />
              ) : (
                <Building2 className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-foreground">
              {developer.name}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {developer.properties.length} properties linked
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              About Developer
            </h3>

            <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
              {developer.description || "No developer description available."}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h3 className="text-xl font-bold text-foreground">
            Developer Properties
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            All properties linked with this developer.
          </p>

          {developer.properties.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-background p-6 text-sm text-muted-foreground">
              No properties found for this developer.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {developer.properties.map((property) => {
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

                      <p className="mt-2 text-xl font-bold text-foreground">
                        {formatAED(property.price)}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-[#EBCB4C]" />
                        <span className="line-clamp-1">
                          {property.district || "-"}
                          {property.emirate ? `, ${property.emirate}` : ""}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                            property.isFromCRM
                              ? "bg-[#EBCB4C]/10 text-[#EBCB4C]"
                              : "bg-blue-500/10 text-blue-600"
                          }`}
                        >
                          {property.isFromCRM ? "CRM" : "Manual"}
                        </span>

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
      </div>
    </AdminLayout>
  );
}