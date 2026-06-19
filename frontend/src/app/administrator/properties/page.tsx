/**
 * =====================================================
 * FILE: src/app/administrator/properties/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Admin properties management page.
 *
 * FEATURES:
 * - Search properties
 * - Filter properties
 * - Pagination
 * - Compact Reelly-style property cards
 * - Full card clickable
 * - Featured image preview
 * - AED formatted price
 * - Developer logo
 * =====================================================
 */

import Link from "next/link";
import Image from "next/image";
import { MapPin, Plus, Search } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { formatAED } from "@/lib/format";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    emirate?: string;
    district?: string;
    developer?: string;
    type?: string;
    bedrooms?: string;
    status?: string;
    approvalStatus?: string;
  }>;
}

const districts = [
  "Al Barari",
  "Al Barsha",
  "Al Furjan",
  "Al Jaddaf",
  "Al Jaddaf Waterfront",
  "Al Quoz 2",
  "Al Satwa",
  "Al Sufouh",
  "Al Warsan",
  "Arabian Ranches 3",
  "Arjan",
  "Azizi Riviera at Meydan One",
  "Beach Front",
  "Bukadra",
  "Business Bay",
  "City Of Arabia",
  "City Walk",
  "Damac Hills",
  "Damac Hills 2",
  "Damac Lagoons",
  "Damac Riverside",
  "Damac Suncity",
  "DIFC (Dubai International Financial Center)",
  "Discovery Gardens",
  "Downtown Dubai",
  "Dubai Creek Harbour",
  "Dubai Design District",
  "Dubai Expo City",
  "Dubai Harbour",
  "Dubai Hills",
  "Dubai Industrial City",
  "Dubai International City",
  "Dubai Internet City",
  "Dubai Investments Park",
  "Dubai Islands",
  "Dubai Land",
  "Dubai Land Residence Complex",
  "Dubai Marina",
  "Dubai Motor City",
  "Dubai Production City",
  "Dubai Science Park",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Dubai Sports City",
  "Dubai Studio City",
  "Dubailand Residence Complex",
  "Emaar South",
  "Es Sanhaya 2",
  "Grand Polo Club and Resort",
  "Green Gate at Dubai Creek Harbour",
  "Jebel Ali Freezone Extension",
  "Jebel Ali Village",
  "JLT (Jumeirah Lake Towers)",
  "Jumeirah Beach Residence (JBR)",
  "Jumeirah Golf Estates",
  "Jumeirah Islands",
  "Jumeirah Second",
  "JVC (Jumeirah Village Circle)",
  "JVT (Jumeirah Village Triangle)",
  "Majan",
  "Maritime City",
  "MBR District 1",
  "MBR District 11 (Meydan South)",
  "Meydan (Nad Al Sheba 1)",
  "Mina Rashid",
  "Mirdif",
  "MJL (Madinat Jumeirah Living)",
  "Mudon",
  "Nad Al Sheba Gardens",
  "Palm Jebel Ali",
  "Palm Jumeirah",
  "Pearl Jumeirah",
  "Port De La Mer",
  "Ras Al Khor",
  "Remraam",
  "Safa Park",
  "Saih Shuaib",
  "Sobha Central",
  "Sobha Hartland",
  "Sobha Hartland 2",
  "The Heights",
  "The Oasis",
  "The Valley",
  "Tilal Al Ghaf",
  "Town Square",
  "Trade Center",
  "Wadi Al Safa 2",
  "Wadi Al Safa 3",
  "Wadi Al Safa 7",
  "World of Islands",
  "Zabeel 1&2",
];

export default async function AdminPropertiesPage({ searchParams }: Props) {
  await requireRole("ADMIN");

  const params = await searchParams;

  const currentPage = Math.max(Number(params.page || "1"), 1);
  const pageSize = 12;
  const skip = (currentPage - 1) * pageSize;

  const search = params.search?.trim() || "";
  const emirate = params.emirate?.trim() || "";
  const district = params.district?.trim() || "";
  const developer = params.developer?.trim() || "";
  const type = params.type?.trim() || "";
  const bedrooms = params.bedrooms?.trim() || "";
  const status = params.status?.trim() || "";
  const approvalStatus = params.approvalStatus?.trim() || "";

  const developers = await prisma.developer.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const whereClause = {
    AND: [
      search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                district: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                emirate: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                developer: {
                  name: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
            ],
          }
        : {},
      emirate ? { emirate } : {},
      district ? { district } : {},
      developer ? { developerId: developer } : {},
      type ? { type } : {},
      bedrooms ? { bedrooms } : {},
      status ? { status: status as any } : {},
      approvalStatus ? { approvalStatus: approvalStatus as any } : {},
    ],
  };

  const totalProperties = await prisma.property.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalProperties / pageSize);

  const properties = await prisma.property.findMany({
    where: whereClause,
    skip,
    take: pageSize,
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

  const hasFilters =
    search ||
    emirate ||
    district ||
    developer ||
    type ||
    bedrooms ||
    status ||
    approvalStatus;

  function createPageUrl(page: number) {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (emirate) query.set("emirate", emirate);
    if (district) query.set("district", district);
    if (developer) query.set("developer", developer);
    if (type) query.set("type", type);
    if (bedrooms) query.set("bedrooms", bedrooms);
    if (status) query.set("status", status);
    if (approvalStatus) query.set("approvalStatus", approvalStatus);

    query.set("page", String(page));

    return `/administrator/properties?${query.toString()}`;
  }

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

        <form className="rounded-3xl border border-border bg-card p-4 shadow-xl">
          <input type="hidden" name="page" value="1" />

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by title, district, emirate or developer..."
                className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#EBCB4C]"
              />
            </div>

            <select
              name="emirate"
              defaultValue={emirate}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Emirates</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Fujairah">Fujairah</option>
              <option value="Ras Al Khaimah">Ras Al Khaimah</option>
              <option value="Umm Al Quwain">Umm Al Quwain</option>
            </select>

            <select
              name="district"
              defaultValue={district}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Districts</option>
              {districts.map((districtItem) => (
                <option key={districtItem} value={districtItem}>
                  {districtItem}
                </option>
              ))}
            </select>

            <select
              name="developer"
              defaultValue={developer}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Developers</option>
              {developers.map((developerItem) => (
                <option key={developerItem.id} value={developerItem.id}>
                  {developerItem.name}
                </option>
              ))}
            </select>

            <select
              name="type"
              defaultValue={type}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Hotel Apartment">Hotel Apartment</option>
            </select>

            <select
              name="bedrooms"
              defaultValue={bedrooms}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Bedrooms</option>
              <option value="Studio">Studio</option>
              <option value="1 BR">1 BR</option>
              <option value="2 BR">2 BR</option>
              <option value="3 BR">3 BR</option>
              <option value="4 BR">4 BR</option>
              <option value="5 BR">5 BR</option>
              <option value="6 BR">6 BR</option>
              <option value="7 BR">7 BR</option>
              <option value="8 BR">8 BR</option>
              <option value="11 BR">11 BR</option>
            </select>

            <select
              name="status"
              defaultValue={status}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="LIMITED">Limited</option>
              <option value="SOLD">Sold</option>
            </select>

            <select
              name="approvalStatus"
              defaultValue={approvalStatus}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Approval</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Apply Filters
            </button>

            {hasFilters ? (
              <Link
                href="/administrator/properties"
                className="flex items-center justify-center rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
              >
                Clear Filters
              </Link>
            ) : null}
          </div>
        </form>

        {properties.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <span className="text-4xl">🏠</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                {hasFilters
                  ? "No matching properties found"
                  : "No properties found"}
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected filters."
                  : "Properties uploaded by agents or synced from CRM will appear here."}
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
          <>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
              <span>
                Showing {properties.length} of {totalProperties} properties
              </span>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {properties.map((property) => {
                const imageUrl =
                  property.featuredImage || property.images[0]?.url || "";

                return (
                  <Link
                    key={property.id}
                    href={`/administrator/properties/${property.id}`}
                    className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-2xl"
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
                        <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-foreground shadow-sm backdrop-blur">
                          {property.category}
                        </span>

                        <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-foreground shadow-sm backdrop-blur">
                          {property.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="-mt-10 mb-3">
                        {property.developer?.logo ? (
                          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-card shadow-lg">
                            <Image
                              src={property.developer.logo}
                              alt={property.developer.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-card bg-[#EBCB4C] text-lg font-bold text-black shadow-lg">
                            {property.developer?.name?.charAt(0) || "B"}
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

            {totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-xl">
                {currentPage > 1 ? (
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    Previous
                  </Link>
                ) : null}

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <Link
                      key={page}
                      href={createPageUrl(page)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        page === currentPage
                          ? "bg-[#EBCB4C] text-black"
                          : "border border-border text-foreground hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}

                {currentPage < totalPages ? (
                  <Link
                    href={createPageUrl(currentPage + 1)}
                    className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    Next
                  </Link>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </AdminLayout>
  );
}