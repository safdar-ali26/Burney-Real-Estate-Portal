/**
 * =====================================================
 * FILE: src/app/administrator/properties/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Admin properties management page.
 *
 * FEATURES:
 * - Protected admin access
 * - Fetch properties from Supabase via Prisma
 * - Display properties in premium table layout
 * - Shows category, type, district, status and approval
 * =====================================================
 */

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import PropertyApprovalButtons from "@/components/admin/property-approval-buttons";
import { formatAED } from "@/lib/format";

export default async function AdminPropertiesPage() {
  await requireRole("ADMIN");

  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      agent: true,
      developer: true,
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

          <button className="rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90">
            <a
              href="/administrator/properties/add"
              className="rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
            >
              Add Property
            </a>
          </button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          {properties.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <span className="text-4xl">🏠</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                No properties found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Properties uploaded by agents or synced from CRM will appear
                here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="px-4 py-4 font-medium">Property</th>
                    <th className="px-4 py-4 font-medium">Price</th>
                    <th className="px-4 py-4 font-medium">Category</th>
                    <th className="px-4 py-4 font-medium">Type</th>
                    <th className="px-4 py-4 font-medium">District</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Approval</th>
                    <th className="px-4 py-4 font-medium">Agent</th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-border/60 transition hover:bg-[#EBCB4C]/5"
                    >
                      <td className="px-4 py-5">
                        <div>
                          <p className="font-semibold text-foreground">
                            {property.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {property.developer?.name || "No developer"}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-5 font-semibold text-foreground">
                        {formatAED(property.price)}
                      </td>

                      <td className="px-4 py-5 text-muted-foreground">
                        {property.category}
                      </td>

                      <td className="px-4 py-5 text-muted-foreground">
                        {property.type || "-"}
                      </td>

                      <td className="px-4 py-5 text-muted-foreground">
                        {property.district || "-"}
                      </td>

                      <td className="px-4 py-5">
                        <span className="rounded-full bg-[#EBCB4C]/10 px-3 py-1 text-xs font-medium text-[#8A6A00] dark:text-[#EBCB4C]">
                          {property.status}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`
    rounded-full
    px-3
    py-1
    text-xs
    font-medium

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
                      </td>

                      <td className="px-4 py-5 text-muted-foreground">
                        {property.agent?.name || "Admin / CRM"}
                      </td>

                      <td className="px-4 py-5">
                        <PropertyApprovalButtons
                          propertyId={property.id}
                          approvalStatus={property.approvalStatus}
                        />
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
