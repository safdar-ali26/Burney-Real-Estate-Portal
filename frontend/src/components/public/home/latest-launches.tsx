import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";
import PropertyCard from "@/components/public/property/property-card";

export default async function LatestLaunches() {
  const properties = await prisma.property.findMany({
    where: {
      category: "OFFPLAN",
      approvalStatus: "APPROVED",
    },
    include: {
      developer: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            badge="Latest Launches"
            title="New Dubai Off Plan Opportunities"
            description="Recently added projects from Dubai’s leading developers."
            align="left"
          />

          <Link
            href="/off-plan"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C] transition hover:opacity-80"
          >
            View All Launches
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div key={property.id} className="relative">
              {/* <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-black uppercase text-black">
                <Clock3 className="h-3 w-3" />
                New
              </div> */}

              <PropertyCard
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
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}