import { Building2, Sparkles } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import DeveloperCard from "@/components/public/developers/developer-card";
import DeveloperSearch from "@/components/public/developers/developer-search";
import FeaturedDevelopersSection from "@/components/public/developers/featured-developers";
import DeveloperComparison from "@/components/public/developers/developer-comparison";

interface Props {
  searchParams: Promise<{ search?: string }>;
}

export default async function DevelopersPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search?.trim();

  const developers = await prisma.developer.findMany({
  where: search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : undefined,
  include: {
    properties: {
      where: {
        category: "OFFPLAN",
        approvalStatus: "APPROVED",
      },
      select: {
        price: true,
        district: true,
      },
    },
    _count: {
      select: {
        properties: true,
      },
    },
  },
  orderBy: { name: "asc" },
});

  const featuredDevelopers = developers
  .filter((developer) => developer.properties.length > 0)
  .sort((a, b) => b.properties.length - a.properties.length)
  .slice(0, 6)
  .map((developer) => ({
    id: developer.id,
    name: developer.name,
    slug: developer.slug,
    logo: developer.logo,
    description: developer.description,
    projectCount: developer.properties.length,
  }));

  const comparisonDevelopers = developers
  .filter((developer) => developer.properties.length > 0)
  .sort((a, b) => b.properties.length - a.properties.length)
  .slice(0, 8)
  .map((developer) => {
    const prices = developer.properties
      .map((property) => property.price)
      .filter((price): price is number => price !== null && price > 0);

    const districts = developer.properties
      .map((property) => property.district)
      .filter(Boolean) as string[];

    const topDistrict = districts[0] || null;

    return {
      id: developer.id,
      name: developer.name,
      slug: developer.slug,
      logo: developer.logo,
      projectCount: developer.properties.length,
      startingPrice: prices.length > 0 ? Math.min(...prices) : null,
      topDistrict,
    };
  });

  const totalProjects = developers.reduce(
  (total, developer) => total + developer.properties.length,
  0
);

  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
                Developers
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
                Dubai’s Leading
                <span className="block font-semibold text-[#EBCB4C]">
                  Property Developers
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                Explore premium off-plan projects from trusted developers across
                Dubai, curated by Burney Real Estate.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-3">
                <HeroStat label="Developers" value={developers.length.toString()} />
                <HeroStat label="Projects" value={totalProjects.toString()} />
              </div>
              <DeveloperSearch />
            </div>
          </div>
        </Container>
      </section>

      <FeaturedDevelopersSection developers={featuredDevelopers} />
      <DeveloperComparison developers={comparisonDevelopers} />

      <Section className="bg-[#050505]">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
                Developer Directory
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Browse Developers
              </h2>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/50 md:block">
              {developers.length} result(s)
            </div>
          </div>

          {developers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {developers.map((developer) => (
                <DeveloperCard
                  key={developer.id}
                  name={developer.name}
                  slug={developer.slug}
                  logo={developer.logo}
                  description={developer.description}
                  projectCount={developer._count.properties}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
              <Building2 className="mx-auto h-10 w-10 text-[#EBCB4C]" />
              <p className="mt-4 text-sm font-semibold text-white">
                No developers found.
              </p>
              <p className="mt-2 text-xs text-white/45">
                Try searching with another developer name.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <Sparkles className="h-4 w-4 text-[#EBCB4C]" />
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
    </div>
  );
}