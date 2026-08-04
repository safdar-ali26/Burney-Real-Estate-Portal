import { Search, SlidersHorizontal } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import PropertyCard from "@/components/public/property/property-card";

interface Props {
  searchParams: Promise<{
    search?: string;
    district?: string;
    developerId?: string;
    type?: string;
    bedrooms?: string;
    page?: string;
  }>;
}

type PaginationPage = number | "...";

export default async function OffPlanPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search?.trim() || "";
  const district = params.district?.trim() || "";
  const developerId = params.developerId?.trim() || "";
  const type = params.type?.trim() || "";
  const bedrooms = params.bedrooms?.trim() || "";

  const currentPage = Math.max(Number(params.page || "1"), 1);
  const pageSize = 12;
  const skip = (currentPage - 1) * pageSize;

  const whereClause = {
    category: "OFFPLAN" as const,
    approvalStatus: "APPROVED" as const,
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { district: { contains: search, mode: "insensitive" as const } },
              { emirate: { contains: search, mode: "insensitive" as const } },
              {
                developer: {
                  name: { contains: search, mode: "insensitive" as const },
                },
              },
            ],
          }
        : {},
      district ? { district } : {},
      developerId ? { developerId } : {},
      type ? { type } : {},
      bedrooms ? { bedrooms } : {},
    ],
  };

  const [properties, totalProperties, developers, filterOptions] =
    await Promise.all([
      prisma.property.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          developer: true,
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      }),

      prisma.property.count({
        where: whereClause,
      }),

      prisma.developer.findMany({
        orderBy: { name: "asc" },
      }),

      prisma.property.findMany({
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
        },
        select: {
          emirate: true,
          district: true,
          type: true,
          bedrooms: true,
        },
      }),
    ]);

  const totalPages = Math.ceil(totalProperties / pageSize);

  const districts = uniqueOptions(filterOptions.map((item) => item.district));
  const types = uniqueOptions(filterOptions.map((item) => item.type));
  const bedroomOptions = uniqueOptions(
    filterOptions.map((item) => item.bedrooms),
  );

  function createPageUrl(page: number) {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (district) query.set("district", district);
    if (developerId) query.set("developerId", developerId);
    if (type) query.set("type", type);
    if (bedrooms) query.set("bedrooms", bedrooms);

    query.set("page", String(page));

    return `/off-plan?${query.toString()}`;
  }

  const hasFilters =
    search || district || developerId || type || bedrooms;

  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />

        <Container className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
            Off Plan Properties
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
            Dubai Off Plan
            <span className="block font-semibold text-[#EBCB4C]">Projects</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
            Explore approved off-plan projects synced from CRM and curated by
            Burney Real Estate.
          </p>
        </Container>
      </section>

      <Section className="bg-[#050505]">
        <Container>
          <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <input type="hidden" name="page" value="1" />

            <div className="mb-4 flex items-center gap-2 text-[#EBCB4C]">
              <SlidersHorizontal className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Search & Filters
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search project, area or developer..."
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/35 pl-11 pr-4 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#EBCB4C]/50"
                />
              </div>
              <Select
                name="district"
                defaultValue={district}
                placeholder="All Districts"
                options={districts}
              />
              <Select
                name="developerId"
                defaultValue={developerId}
                placeholder="All Developers"
                options={developers.map((developer) => ({
                  label: developer.name,
                  value: developer.id,
                }))}
              />
              <Select
                name="type"
                defaultValue={type}
                placeholder="All Types"
                options={types}
              />
              <Select
                name="bedrooms"
                defaultValue={bedrooms}
                placeholder="All Bedrooms"
                options={bedroomOptions}
              />

              <button
                type="submit"
                className="h-11 rounded-2xl bg-[#EBCB4C] px-5 text-xs font-bold text-black transition hover:opacity-90"
              >
                Apply Filters
              </button>
            </div>

            {hasFilters ? (
              <a
                href="/off-plan"
                className="mt-4 inline-flex text-xs font-bold text-[#EBCB4C]"
              >
                Clear Filters
              </a>
            ) : null}
          </form>

          <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-xs text-white/50">
              Showing {properties.length} of {totalProperties} projects
            </p>

            <p className="text-xs text-white/50">
              Page {currentPage} of {totalPages || 1}
            </p>
          </div>

          <div className="mt-8">
            {properties.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    slug={property.slug}
                    title={property.title}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    size={property.size}
                    emirate={property.emirate}
                    district={property.district}
                    type={property.type}
                    status={property.status}
                    completionDate={property.completionDate}
                    featuredImage={property.featuredImage}
                    imageUrl={property.images[0]?.url}
                    developer={property.developer}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
                <p className="text-sm font-semibold text-white">
                  No off-plan projects found.
                </p>
                <p className="mt-2 text-xs text-white/45">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {currentPage > 1 ? (
                <a
                  href={createPageUrl(currentPage - 1)}
                  className="flex h-10 items-center justify-center rounded-full border border-white/10 px-5 text-xs font-bold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                >
                  Previous
                </a>
              ) : null}

              {getPaginationPages(currentPage, totalPages).map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="flex h-10 w-10 items-center justify-center text-xs font-bold text-white/40"
                  >
                    ...
                  </span>
                ) : (
                  <a
                    key={page}
                    href={createPageUrl(page)}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-full px-4 text-xs font-bold transition ${
                      page === currentPage
                        ? "bg-[#EBCB4C] text-black"
                        : "border border-white/10 text-white hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                    }`}
                  >
                    {page}
                  </a>
                ),
              )}

              {currentPage < totalPages ? (
                <a
                  href={createPageUrl(currentPage + 1)}
                  className="flex h-10 items-center justify-center rounded-full border border-white/10 px-5 text-xs font-bold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                >
                  Next
                </a>
              ) : null}
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

function uniqueOptions(values: (string | null)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[]))
    .sort()
    .map((value) => ({
      label: value,
      value,
    }));
}

const EMIRATES = [
  { label: "Dubai", value: "Dubai" },
  { label: "Abu Dhabi", value: "Abu Dhabi" },
  { label: "Sharjah", value: "Sharjah" },
  { label: "Ajman", value: "Ajman" },
  { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
  { label: "Fujairah", value: "Fujairah" },
  { label: "Umm Al Quwain", value: "Umm Al Quwain" },
];

function Select({
  name,
  defaultValue,
  placeholder,
  options,
}: {
  name: string;
  defaultValue: string;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      className="h-11 rounded-2xl border border-white/10 bg-black/35 px-4 text-xs text-white outline-none focus:border-[#EBCB4C]/50"
    >
      <option value="" className="bg-black text-white">
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-black">
          {option.label}
        </option>
      ))}
    </select>
  );
}

function getPaginationPages(
  currentPage: number,
  totalPages: number,
): PaginationPage[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
