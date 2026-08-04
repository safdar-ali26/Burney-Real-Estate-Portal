import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import PropertyCard from "@/components/public/property/property-card";
import AgentLanguages from "@/components/public/agent/agent-languages";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDetailsPage({ params }: Props) {
  const { id } = await params;

  const agent = await prisma.user.findUnique({
    where: {
      id,
      role: "AGENT",
      isActive: true,
    },
    include: {
      properties: {
        where: {
          approvalStatus: "APPROVED",
        },
        include: {
          developer: true,
          images: {
            orderBy: {
              order: "asc",
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          properties: true,
          leads: true,
        },
      },
    },
  });

  if (!agent) {
    notFound();
  }

  const whatsappNumber = agent.whatsapp || agent.phone || "";

  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black to-black" />

        <Container className="relative z-10">
          <Link
            href="/agents"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Agents
          </Link>

          <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-end">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-[24px] bg-[#EBCB4C]/10">
                {agent.profileImage ? (
                  <Image
                    src={agent.profileImage}
                    alt={agent.name || "Agent"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#EBCB4C]">
                    <UserRound className="h-24 w-24" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
                Property Consultant
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
                {agent.name || "Burney Agent"}
              </h1>

              <p className="mt-3 text-lg text-[#EBCB4C]">
                {agent.designation || "Property Consultant"}
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                Connect with {agent.name || "our consultant"} for professional
                guidance on Dubai property buying, selling, renting and
                investment opportunities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {agent.phone ? (
                  <Link
                    href={`tel:${agent.phone}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black"
                  >
                    <Phone className="h-4 w-4" />
                    Call Agent
                  </Link>
                ) : null}

                {whatsappNumber ? (
                  <Link
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white hover:text-[#EBCB4C]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Link>
                ) : null}

                {agent.email ? (
                  <Link
                    href={`mailto:${agent.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white hover:text-[#EBCB4C]"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Link>
                ) : null}
              </div>

              <div className="mt-10 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-3">
                <StatCard
                  label="Listings"
                  value={agent._count.properties.toString()}
                />
                <StatCard
                  label="Leads Managed"
                  value={agent._count.leads.toString()}
                />
              <AgentLanguages languages={agent.languages} />
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
                Agent Listings
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">
                Properties by {agent.name || "Agent"}
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-6 text-white/50">
                Browse approved properties handled by this Burney Real Estate
                consultant.
              </p>
            </div>

            <Link
              href="/off-plan"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]"
            >
              View All Properties
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {agent.properties.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {agent.properties.map((property) => (
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
                No approved listings yet.
              </p>

              <p className="mt-2 text-xs text-white/45">
                Agent properties will appear here once approved.
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
    <div className="flex h-full min-h-[110px] flex-col rounded-2xl border border-white/10 bg-black/35 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
