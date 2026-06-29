import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";
import { formatAED } from "@/lib/format";

const communities = [
  {
    name: "Jumeirah Village Circle (JVC)",
    image: "/images/communities/jvc.jpg",
    aliases: ["Jumeirah Village Circle", "JVC"],
  },
  {
    name: "Dubai Hills Estate",
    image: "/images/communities/dubai-hills-estate.jpg",
    aliases: ["Dubai Hills Estate", "Dubai Hills"],
  },
  {
    name: "Dubai Creek Harbour",
    image: "/images/communities/dubai-creek-harbour.jpg",
    aliases: ["Dubai Creek Harbour", "Creek Harbour"],
  },
  {
    name: "Emaar Beachfront",
    image: "/images/communities/emaar-beachfront.jpg",
    aliases: ["Emaar Beachfront"],
  },
  {
    name: "Dubai South",
    image: "/images/communities/dubai-south.jpg",
    aliases: ["Dubai South", "Dubai World Central"],
  },
  {
    name: "Arabian Ranches",
    image: "/images/communities/arabian-ranches.jpg",
    aliases: ["Arabian Ranches", "Arabian Ranches 3"],
  },
];

export default async function ExploreCommunities() {
  const communityData = await Promise.all(
    communities.map(async (community) => {
      const where = {
        category: "OFFPLAN" as const,
        approvalStatus: "APPROVED" as const,
        OR: community.aliases.map((alias) => ({
          district: {
            contains: alias,
            mode: "insensitive" as const,
          },
        })),
      };

      const [count, minPrice] = await Promise.all([
        prisma.property.count({ where }),
        prisma.property.aggregate({
          where,
          _min: {
            price: true,
          },
        }),
      ]);

      return {
        ...community,
        count,
        minPrice: minPrice._min.price,
      };
    })
  );

  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            badge="Communities"
            title="Explore Dubai Communities"
            description="Discover high-potential areas across Dubai with curated off-plan opportunities."
            align="left"
          />

          <Link
            href="/off-plan"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C] transition hover:opacity-80"
          >
            View All Communities
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {communityData.map((community) => (
            <Link
              key={community.name}
              href={`/off-plan?district=${encodeURIComponent(
                community.aliases[0]
              )}`}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${community.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-5">
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold text-[#EBCB4C] backdrop-blur">
                  <MapPin className="h-3 w-3" />
                  Dubai
                </div>

                <h3 className="text-base font-semibold text-white">
                  {community.name}
                </h3>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Projects
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white">
                      {community.count}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      From
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#EBCB4C]">
                      {community.minPrice
                        ? formatAED(community.minPrice)
                        : "On Request"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}