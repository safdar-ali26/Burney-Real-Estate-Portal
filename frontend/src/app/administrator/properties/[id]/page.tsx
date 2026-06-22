import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit, Lock } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import DeletePropertyButton from "@/components/admin/delete-property-button";
import { deletePropertyAction } from "@/actions/delete-property";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import ReadMoreDescription from "@/components/admin/read-more-description";

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

  const recommendedProjects = await prisma.property.findMany({
    where: {
      id: {
        not: property.id,
      },
      category: "OFFPLAN",
      approvalStatus: "APPROVED",
    },
    take: 2,
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
  });

  if (!property) {
    notFound();
  }

  const deleteProperty = deletePropertyAction.bind(null, property.id);

  function cleanDescription(description?: string | null) {
    if (!description) return "No description available.";

    return description.replaceAll("#####", "").replaceAll("####", "").trim();
  }

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
    alignItems: "start",
    overflow: "visible",
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

            <ReadMoreDescription description={property.description} />

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">Details</h2>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-0">
                  {[
                    ["Project Name", property.title],
                    ["Developer", property.developer?.name || "-"],
                    ["Building Count", property.buildingCount || "-"],
                    ["Unit Count", property.unitCount || "-"],
                    ["District", property.district || "-"],
                    ["Region", property.emirate || "-"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[42%_58%] items-center border-b border-border py-5"
                    >
                      <p className="text-sm font-semibold text-muted-foreground">
                        {label}
                      </p>

                      <p className="break-words text-right text-sm font-bold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-0">
                  {[
                    ["Construction Status", property.constructionStatus || "-"],
                    ["Sale Status", property.status || "-"],
                    [
                      "Size Range",
                      property.size
                        ? `${property.size.toLocaleString()} sqft`
                        : "-",
                    ],
                    [
                      "Price Range",
                      property.price
                        ? `AED ${Number(property.price).toLocaleString()}`
                        : "Price on Request",
                    ],
                    [
                      "Last Updated",
                      property.updatedAt
                        ? new Date(property.updatedAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-",
                    ],
                    ["Country", "UAE"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[48%_52%] items-center border-b border-border py-5"
                    >
                      <p className="text-sm font-semibold text-muted-foreground">
                        {label}
                      </p>

                      <p className="break-words text-right text-sm font-bold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                Available Units by Type
              </h2>

              <div className="mt-6 space-y-0">
                {property.propertyUnits.length > 0 ? (
                  property.propertyUnits.map((unit) => (
                    <div
                      key={unit.id}
                      className="flex items-center justify-between border-b border-border py-4 last:border-b-0"
                    >
                      <p className="text-sm font-semibold text-muted-foreground">
                        {unit.bedrooms === 0
                          ? "Studio"
                          : unit.bedrooms
                            ? `${unit.bedrooms} Bedrooms`
                            : "Unit"}
                      </p>

                      <p className="text-sm font-bold text-foreground">
                        {unit.area ? `${unit.area.toLocaleString()} sqft` : "-"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No unit details available.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                Payment Plan
              </h2>

              {Array.isArray(property.paymentPlans) &&
              property.paymentPlans.length > 0 ? (
                <div className="mt-6 space-y-6">
                  {(property.paymentPlans as any[]).map((plan, planIndex) => (
                    <div
                      key={plan.id || planIndex}
                      className="rounded-3xl border border-border bg-background p-5"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-[#EBCB4C]/10 p-4">
                          <p className="text-sm font-semibold text-muted-foreground">
                            Pre-Handover
                          </p>
                          <p className="mt-2 text-2xl font-bold text-[#EBCB4C]">
                            {plan.preHandoverPercentage || 0}%
                          </p>
                        </div>

                        <div className="rounded-2xl bg-green-500/10 p-4">
                          <p className="text-sm font-semibold text-muted-foreground">
                            Post-Handover
                          </p>
                          <p className="mt-2 text-2xl font-bold text-green-500">
                            {plan.postHandoverPercentage || 0}%
                          </p>
                        </div>
                      </div>

                      {Array.isArray(plan.steps) && plan.steps.length > 0 ? (
                        <>
                          <h3 className="mt-6 text-base font-bold text-foreground">
                            Payment Timeline
                          </h3>

                          <div className="mt-4 flex h-12 overflow-hidden rounded-2xl bg-muted">
                            {plan.steps.map((step: any, index: number) => (
                              <div
                                key={step.id || index}
                                style={{
                                  width: `${step.percentage || 0}%`,
                                }}
                                className="flex items-center justify-center bg-[#EBCB4C] text-xs font-bold text-black"
                              >
                                {step.percentage}%
                              </div>
                            ))}
                          </div>

                          <h3 className="mt-6 text-base font-bold text-foreground">
                            Payment Breakdown
                          </h3>

                          <div className="mt-4 space-y-3">
                            {plan.steps.map((step: any, index: number) => (
                              <div
                                key={step.id || index}
                                className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="h-3 w-3 rounded-full bg-[#EBCB4C]" />
                                  <p className="text-sm font-semibold text-foreground">
                                    {step.name}
                                  </p>
                                </div>

                                <p className="text-sm font-bold text-foreground">
                                  {step.percentage}%
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : null}

                      <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-4">
                        <p className="text-sm font-bold text-foreground">
                          Payment plan subject to change
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          The down payment percentage and payment schedule may
                          vary. Please contact the developer or sales office for
                          the most up-to-date payment plan details.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  No payment plan available.
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                Features / Amenities
              </h2>

              {property.propertyAmenities.length > 0 ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {property.propertyAmenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
                    >
                      <div className="h-36 overflow-hidden bg-muted">
                        {amenity.iconUrl ? (
                          <img
                            src={amenity.iconUrl}
                            alt={amenity.name}
                            className="h-full w-full object-cover transition duration-500 hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#EBCB4C]/10">
                            <span className="text-2xl">⭐</span>
                          </div>
                        )}
                      </div>

                      <div className="flex min-h-16 items-center justify-center px-3 py-3 text-center">
                        <p className="line-clamp-2 text-sm font-bold text-foreground">
                          {amenity.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  No amenities available.
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Master Plan
                </h2>

                {property.images.find(
                  (image) => image.alt === "general_plan",
                ) ? (
                  <a
                    href={
                      property.images.find(
                        (image) => image.alt === "general_plan",
                      )?.url
                    }
                    target="_blank"
                    className="text-sm font-bold text-[#EBCB4C] transition hover:opacity-80"
                  >
                    🔍 View Full Size
                  </a>
                ) : null}
              </div>

              {property.images.find((image) => image.alt === "general_plan") ? (
                <div className="mt-6 overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={
                      property.images.find(
                        (image) => image.alt === "general_plan",
                      )?.url
                    }
                    alt="Master Plan"
                    className="h-[480px] w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mt-6 flex h-[360px] items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  Master plan is not available.
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                Documents & Links
              </h2>

              {property.propertyDocuments.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {property.propertyDocuments.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-xl">
                          📄
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground">
                            {document.name}
                          </h4>

                          {document.type && (
                            <p className="text-xs text-muted-foreground">
                              {document.type}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-[#EBCB4C] px-5 py-2 text-sm font-bold text-black transition hover:opacity-90"
                        >
                          Open
                        </a>

                        <a
                          href={document.url}
                          download
                          className="rounded-xl border border-border p-2 transition hover:border-[#EBCB4C]"
                        >
                          ⬇️
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/5 p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-[#EBCB4C] text-xl">ℹ️</div>

                      <p className="text-sm leading-6 text-muted-foreground">
                        Documents are provided by the developer. Click
                        <span className="font-semibold text-foreground">
                          {" "}
                          Open{" "}
                        </span>
                        to view the file in a new tab or use the download icon
                        to save it.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-border bg-background p-8 text-center text-muted-foreground">
                  No documents available.
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-foreground">
                Recommended Projects
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {recommendedProjects.map((item) => {
                  const imageUrl =
                    item.featuredImage || item.images[0]?.url || "";

                  return (
                    <Link
                      key={item.id}
                      href={`/administrator/properties/${item.id}`}
                      className="group block overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-2xl"
                    >
                      <div className="relative h-44 overflow-hidden bg-muted">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No Image
                          </div>
                        )}

                        <div className="absolute left-3 top-3 flex gap-2">
                          <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold text-foreground shadow-sm backdrop-blur">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                          {item.title}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {item.district || "-"}
                          {item.emirate ? ` • ${item.emirate}` : ""}
                        </p>

                        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                          by {item.developer?.name || "Developer"}
                        </p>

                        <p className="mt-3 text-lg font-bold text-[#EBCB4C]">
                          {item.price
                            ? `AED ${Number(item.price).toLocaleString()}`
                            : "Price on request"}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.bedrooms || "-"}</span>
                          <span>
                            {item.completionDate || item.type || "Off-plan"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/5 p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  These projects are recommended based on similar approved
                  off-plan inventory. Click on any project to view more details.
                </p>
              </div>
            </section>
          </main>

          {/* Right 20% */}
          <aside
  style={{
    width: "100%",
    alignSelf: "start",
    position: "sticky",
    top: "120px",
    height: "fit-content",
  }}
  className="space-y-6"
>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
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
                  <p className="mt-1 font-semibold text-foreground">
                    {property.type || "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Developer</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {property.developer?.name || "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {property.bedrooms || "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {property.size
                      ? `${property.size.toLocaleString()} SQFT`
                      : "-"}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm text-muted-foreground">Payment Plan</p>
                  <p className="mt-1 font-semibold text-foreground">
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
                  <p className="mt-1 font-semibold text-foreground">
                    {property.completionDate || "TBA"}
                  </p>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-border bg-card p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white">
                  {property.developer?.logo ? (
                    <img
                      src={property.developer.logo}
                      alt={property.developer.name || "Developer"}
                      className="h-full w-full object-contain p-3"
                    />
                  ) : (
                    <span className="text-xl font-bold text-black">
                      {property.developer?.name?.charAt(0) || "D"}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {property.developer?.name || "Developer"}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Project Developer
                  </p>
                </div>
              </div>

              <Link
                href={`/administrator/properties?developer=${property.developerId || ""}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-4 py-3 text-sm font-bold text-[#EBCB4C] transition hover:bg-[#EBCB4C] hover:text-black"
              >
                <span>🏢</span>
                View All Projects by {property.developer?.name || "Developer"}
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
