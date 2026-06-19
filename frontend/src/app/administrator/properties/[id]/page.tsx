import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit, Lock } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import DeletePropertyButton from "@/components/admin/delete-property-button";
import { deletePropertyAction } from "@/actions/delete-property";
import { requireRole } from "@/lib/auth-guard";
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
    where: { id },
    include: {
      developer: true,
      agent: true,
      images: {
        orderBy: { order: "asc" },
      },
      propertyAmenities: {
        orderBy: { displayOrder: "asc" },
      },
      propertyDocuments: true,
      propertyUnits: {
        orderBy: { bedrooms: "asc" },
      },
    },
  });

  if (!property) {
    notFound();
  }

  const deleteProperty = deletePropertyAction.bind(null, property.id);

  return (
    <AdminLayout title={property.title} subtitle="Property Details">
      <div className="space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/administrator/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {property.isFromCRM ? (
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

        {/* 80 / 20 Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "63% 35%",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Left 80% */}
          <main style={{ width: "100%" }} className="space-y-4">
            <section
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "28px",
              }}
              className="border border-border bg-card shadow-xl"
            >
              {property.featuredImage ? (
                <img
                  src={property.featuredImage}
                  alt={property.title}
                  style={{
                    height: "460px",
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div className="flex h-[460px] items-center justify-center bg-muted text-muted-foreground">
                  No Featured Image
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  zIndex: 999,
                  display: "flex",
                  gap: "10px",
                }}
              >
                {[
                  ["Availability", property.status],
                  ["Handover", property.completionDate || "TBA"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(235,203,76,0.55)",
                      borderRadius: "999px",
                      padding: "2px 16px",
                      color: "white",
                      backdropFilter: "blur(18px)",
                      boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 600,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="w-full rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-foreground">
                Left Section 80%
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Yahan left side content sections add honge.
              </p>
            </section>
          </main>

          {/* Right 20% */}
          <aside style={{ width: "100%" }}>
            <div className="sticky top-6 rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                {property.title}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <span>
                  {property.district || "-"}
                  {property.emirate ? `, ${property.emirate}` : ""}
                </span>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="mt-1 text-xl font-bold text-[#EBCB4C]">
                    {property.price
                      ? `AED ${Number(property.price).toLocaleString()}`
                      : "Price on Request"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="mt-1 font-semibold">{property.type || "-"}</p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Developer</p>
                  <p className="mt-1 font-semibold">
                    {property.developer?.name || "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="mt-1 font-semibold">
                    {property.bedrooms || "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="mt-1 font-semibold">
                    {property.size
                      ? `${property.size.toLocaleString()} SQFT`
                      : "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Payment Plan</p>
                  <p className="mt-1 font-semibold">
                    {Array.isArray(property.paymentPlans)
                      ? `${property.paymentPlans.length} Plans Available`
                      : "Available"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="mt-1 font-semibold text-green-500">
                    {property.status}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Handover</p>
                  <p className="mt-1 font-semibold">
                    {property.completionDate || "TBA"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
