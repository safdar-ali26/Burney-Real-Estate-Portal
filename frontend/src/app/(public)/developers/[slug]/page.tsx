import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe,
  Home,
  MessageCircle,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { formatAED } from "@/lib/format";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import PropertyCard from "@/components/public/property/property-card";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DeveloperDetailsPage({ params }: Props) {
  const { slug } = await params;

  const developer = await prisma.developer.findUnique({
    where: {
      slug,
    },
    include: {
      properties: {
        where: {
          category: "OFFPLAN",
          approvalStatus: "APPROVED",
        },
        include: {
          images: {
            orderBy: {
              order: "asc",
            },
            take: 1,
          },
          developer: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          properties: true,
        },
      },
    },
  });

  if (!developer) {
    notFound();
  }

  const prices = developer.properties
    .map((property) => property.price)
    .filter((price): price is number => price !== null && price > 0);

  const startingPrice = prices.length > 0 ? Math.min(...prices) : null;

  const districts = Array.from(
    new Set(
      developer.properties
        .map((property) => property.district)
        .filter(Boolean) as string[]
    )
  );

  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black to-black" />

        <Container className="relative z-10">
          <Link
            href="/developers"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Developers
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div className="relative mb-7 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white p-4">
                {developer.logo ? (
                  <Image
                    src={developer.logo}
                    alt={developer.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-black/50" />
                )}
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
                Developer
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
                {developer.name}
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                {developer.description ||
                  "Explore premium Dubai off-plan projects by this trusted developer, curated by Burney Real Estate."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {developer.website ? (
                  <Link
                    href={developer.website}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </Link>
                ) : null}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white hover:text-[#EBCB4C]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask About Projects
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="grid gap-3">
                <StatCard label="Projects" value={developer.properties.length.toString()} />
                <StatCard
                  label="Starting From"
                  value={startingPrice ? formatAED(startingPrice) : "On Request"}
                />
                <StatCard
                  label="Communities"
                  value={districts.length.toString()}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#050505]">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
                Projects
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">
                Projects by {developer.name}
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-6 text-white/50">
                Browse approved off-plan projects available through Burney Real Estate.
              </p>
            </div>

            <Link
              href="/off-plan"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]"
            >
              View All Off Plan
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {developer.properties.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {developer.properties.map((property) => (
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
              <Home className="mx-auto h-10 w-10 text-[#EBCB4C]" />
              <p className="mt-4 text-sm font-semibold text-white">
                No approved projects found.
              </p>
              <p className="mt-2 text-xs text-white/45">
                Projects will appear here after they are approved.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}