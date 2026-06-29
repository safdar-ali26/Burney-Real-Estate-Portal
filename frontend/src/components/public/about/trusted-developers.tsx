import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default async function TrustedDevelopers() {
  const developers = await prisma.developer.findMany({
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
    take: 12,
  });

  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeading
            badge="Trusted Developers"
            title="Working With Dubai's Leading Developers"
            description="We proudly collaborate with Dubai's most respected developers, giving our clients access to premium investment opportunities."
            align="left"
          />

          <Link
            href="/developers"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]"
          >
            View All Developers
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {developers.map((developer) => (

            <Link
              key={developer.id}
              href={`/developers/${developer.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/5"
            >

              <div className="relative mx-auto flex h-20 items-center justify-center">

                {developer.logo ? (
                  <Image
                    src={developer.logo}
                    alt={developer.name}
                    fill
                    className="object-contain p-2 grayscale transition duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="text-sm font-semibold text-white">
                    {developer.name}
                  </div>
                )}

              </div>

              <div className="mt-5 border-t border-white/10 pt-4 text-center">

                <h3 className="line-clamp-1 text-xs font-semibold text-white">
                  {developer.name}
                </h3>

                <p className="mt-2 text-[11px] text-white/45">
                  {developer._count.properties} Projects
                </p>

              </div>

            </Link>

          ))}

        </div>

      </Container>
    </Section>
  );
}