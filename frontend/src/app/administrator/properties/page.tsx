/**
 * =====================================================
 * FILE: src/app/administrator/properties/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Admin properties management page.
 *
 * FEATURES:
 * - Compact professional property cards
 * - Featured image preview
 * - AED formatted price
 * - Developer, agent, status and approval info
 * - View details button
 * - Approval workflow buttons
 * =====================================================
 */

import Link from "next/link";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Eye,
  MapPin,
  Plus,
  Ruler,
  UserRound,
} from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import PropertyApprovalButtons from "@/components/admin/property-approval-buttons";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export default async function AdminPropertiesPage() {
  await requireRole("ADMIN");

  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      agent: true,
      developer: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return (
    <AdminLayout
      title="Properties"
      subtitle="Manage Buy, Rent and Off-Plan properties."
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Property Management
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review, approve and manage all property listings.
            </p>
          </div>

          <Link
            href="/administrator/properties/add"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <span className="text-4xl">🏠</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                No properties found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Properties uploaded by agents or synced from CRM will appear here.
              </p>

              <Link
                href="/administrator/properties/add"
                className="mt-6 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Add First Property
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {properties.map((property) => {
              const imageUrl =
                property.featuredImage || property.images[0]?.url || "";

              return (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="relative h-48 bg-muted lg:h-auto lg:w-44 xl:w-48">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full min-h-48 items-center justify-center bg-muted text-xs text-muted-foreground">
                          No Image
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        {property.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                            {property.title}
                          </h3>

                          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                            {property.developer?.name || "No developer"}
                          </p>
                        </div>

                        <span
                          className={`
                            shrink-0 rounded-full px-3 py-1 text-[11px] font-bold
                            ${
                              property.approvalStatus === "APPROVED"
                                ? "bg-green-500/10 text-green-600"
                                : property.approvalStatus === "REJECTED"
                                  ? "bg-red-500/10 text-red-600"
                                  : "bg-yellow-500/10 text-yellow-700"
                            }
                          `}
                        >
                          {property.approvalStatus}
                        </span>
                      </div>

                      <p className="mt-3 text-2xl font-bold text-foreground">
                        {formatAED(property.price)}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-[#EBCB4C]" />
                        <span className="line-clamp-1">
                          {property.district || "-"}
                          {property.emirate ? `, ${property.emirate}` : ""}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-2xl bg-muted/60 px-3 py-2">
                          <div className="flex items-center gap-1.5 text-[#EBCB4C]">
                            <BedDouble className="h-4 w-4" />
                            <span className="text-xs">Beds</span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {property.bedrooms || "-"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/60 px-3 py-2">
                          <div className="flex items-center gap-1.5 text-[#EBCB4C]">
                            <Bath className="h-4 w-4" />
                            <span className="text-xs">Baths</span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {property.bathrooms || "-"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/60 px-3 py-2">
                          <div className="flex items-center gap-1.5 text-[#EBCB4C]">
                            <Ruler className="h-4 w-4" />
                            <span className="text-xs">Size</span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {property.size ? `${property.size}` : "-"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <UserRound className="h-3.5 w-3.5" />
                            Agent
                          </div>

                          <p className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">
                            {property.agent?.name || "Admin / CRM"}
                          </p>
                        </div>

                        <Link
                          href={`/administrator/properties/${property.id}`}
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </div>

                      <div className="mt-3">
                        <PropertyApprovalButtons
                          propertyId={property.id}
                          approvalStatus={property.approvalStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}