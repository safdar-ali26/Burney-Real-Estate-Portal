import { Search, Users } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import AgentCard from "@/components/public/agent/agent-card";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function AgentsPage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params.search?.trim() || "";

  const agents = await prisma.user.findMany({
    where: {
      role: "AGENT",
      isActive: true,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { phone: { contains: search, mode: "insensitive" } },
              { designation: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      whatsapp: true,
      profileImage: true,
      designation: true,
      _count: {
        select: {
          properties: true,
          leads: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalListings = agents.reduce(
    (total, agent) => total + agent._count.properties,
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
                Our Agents
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
                Meet Burney
                <span className="block font-semibold text-[#EBCB4C]">
                  Property Consultants
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                Connect with our Dubai real estate consultants for buying,
                selling, renting and off-plan investment advisory.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-3">
                <HeroStat label="Agents" value={agents.length.toString()} />
                <HeroStat label="Listings" value={totalListings.toString()} />
              </div>

              <form className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/35 p-2">
                <Search className="ml-3 h-4 w-4 text-white/40" />

                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Search agent..."
                  className="h-10 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/35"
                />

                <button className="h-10 rounded-xl bg-[#EBCB4C] px-5 text-xs font-bold text-black">
                  Search
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#050505]">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
                Agent Directory
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Browse Our Agents
              </h2>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/50 md:block">
              {agents.length} result(s)
            </div>
          </div>

          {agents.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  id={agent.id}
                  name={agent.name}
                  email={agent.email}
                  phone={agent.phone}
                  whatsapp={agent.whatsapp}
                  profileImage={agent.profileImage}
                  designation={agent.designation}
                  propertyCount={agent._count.properties}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
              <Users className="mx-auto h-10 w-10 text-[#EBCB4C]" />

              <p className="mt-4 text-sm font-semibold text-white">
                No agents found.
              </p>

              <p className="mt-2 text-xs text-white/45">
                Try searching with another name, phone or email.
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
      <p className="text-2xl font-bold text-white">{value}</p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
    </div>
  );
}