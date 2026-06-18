/**
 * =====================================================
 * FILE: src/app/administrator/properties/[id]/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Property details page.
 *
 * FEATURES:
 * - View full property details
 * - Back to properties button
 * - Edit property button for manual properties
 * - Delete property button for manual properties
 * - CRM properties read-only mode
 * - Featured image
 * - Gallery images
 * =====================================================
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit, Lock } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import DeletePropertyButton from "@/components/admin/delete-property-button";
import { deletePropertyAction } from "@/actions/delete-property";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      developer: true,
      agent: true,
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

  const isCrmProperty = property.isFromCRM;

  const deleteProperty = deletePropertyAction.bind(null, property.id);

  return (
    <AdminLayout title={property.title} subtitle="Property Details">
      <div className="space-y-6">
        {/* Page actions */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/administrator/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {isCrmProperty ? (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-5 py-3 text-sm font-semibold text-[#EBCB4C]">
                <Lock className="h-4 w-4" />
                CRM Read Only
              </div>
            ) : (
              <>
                <Link
                  href={`/administrator/properties/${property.id}/edit`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
                >
                  <Edit className="h-4 w-4" />
                  Edit Property
                </Link>

                <DeletePropertyButton action={deleteProperty} />
              </>
            )}
          </div>
        </div>

        {/* CRM Notice */}
        {isCrmProperty ? (
          <div className="rounded-3xl border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 p-5 text-sm text-muted-foreground">
            This property is synced from CRM. It is read-only in the admin panel.
            To update this property, update it in CRM and run CRM Sync again.
          </div>
        ) : null}

        {/* Featured Image */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {property.featuredImage ? (
            <img
              src={property.featuredImage}
              alt={property.title}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-muted">
              <span className="text-muted-foreground">No Featured Image</span>
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground">
              {property.title}
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
              {property.description || "No description available."}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <h3 className="font-semibold text-foreground">
              Property Information
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              {[
                ["Source", property.isFromCRM ? "CRM" : "Manual"],
                ["Price", formatAED(property.price)],
                ["Category", property.category],
                ["Status", property.status],
                ["Approval", property.approvalStatus],
                ["Bedrooms", property.bedrooms || "-"],
                ["Bathrooms", property.bathrooms || "-"],
                ["Size", property.size ? `${property.size} SQFT` : "-"],
                ["Emirate", property.emirate || "-"],
                ["District", property.district || "-"],
                ["Type", property.type || "-"],
                ["Developer", property.developer?.name || "-"],
                ["Agent", property.agent?.name || "Admin / CRM"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h3 className="mb-5 text-xl font-semibold text-foreground">
            Property Gallery
          </h3>

          {property.images.length === 0 ? (
            <p className="text-muted-foreground">
              No gallery images available.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {property.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="h-56 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}