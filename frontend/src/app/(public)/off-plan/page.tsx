import { Search } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    search?: string;
    emirate?: string;
    district?: string;
    developerId?: string;
    type?: string;
    bedrooms?: string;
  }>;
}

export default async function OffPlanPage({ searchParams }: Props) {
  const params = await searchParams;

  const properties = await prisma.property.findMany({
    where: {
      category: "OFFPLAN",
      approvalStatus: "APPROVED",

      emirate: params.emirate || undefined,
      district: params.district || undefined,
      developerId: params.developerId || undefined,
      type: params.type || undefined,
      bedrooms: params.bedrooms || undefined,

      OR: params.search
        ? [
            {
              title: {
                contains: params.search,
                mode: "insensitive",
              },
            },
            {
              district: {
                contains: params.search,
                mode: "insensitive",
              },
            },
            {
              emirate: {
                contains: params.search,
                mode: "insensitive",
              },
            },
            {
              developer: {
                name: {
                  contains: params.search,
                  mode: "insensitive",
                },
              },
            },
          ]
        : undefined,
    },
    include: {
      developer: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Section className="min-h-screen bg-black pt-44">
      <Container>
        <SectionHeading
          badge="Off Plan"
          title="Latest Dubai Off Plan Projects"
          description="Search results from Burney Real Estate off-plan inventory."
        />

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[#EBCB4C]" />
            <span>
              Showing <strong className="text-white">{properties.length}</strong>{" "}
              off-plan project result(s)
            </span>
          </div>

          {params.search ? (
            <p className="mt-2 text-xs text-white/45">
              Search: <span className="text-[#EBCB4C]">{params.search}</span>
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <h3 className="line-clamp-1 text-sm font-bold text-white">
                {property.title}
              </h3>

              <p className="mt-2 text-xs text-white/50">
                {property.district || "-"}
                {property.emirate ? `, ${property.emirate}` : ""}
              </p>

              <p className="mt-3 text-xs text-[#EBCB4C]">
                {property.developer?.name || "Developer"}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}