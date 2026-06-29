import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default async function FeaturedDevelopers() {
  const developers = await prisma.developer.findMany({
    where: {
      properties: {
        some: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
        },
      },
    },
    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    take: 8,
  });

  return (
    <Section className="bg-black">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            badge="Developers"
            title="Dubai’s Leading Developers"
            description="Explore premium projects from trusted developers across Dubai."
            align="left"
          />

          <Link
            href="/developers"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C] transition hover:opacity-80"
          >
            View All Developers
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((developer) => (
            <Link
              key={developer.id}
              href={`/developers/${developer.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
                  {developer.logo ? (
                    <Image
                      src={developer.logo}
                      alt={developer.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <Building2 className="h-6 w-6 text-black/50" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-1 text-sm font-semibold text-white">
                    {developer.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/50">
                    {developer._count.properties} projects
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[11px] font-semibold text-white/45">
                  Explore Projects
                </span>

                <ArrowRight className="h-3.5 w-3.5 text-[#EBCB4C] transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}