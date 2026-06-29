import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone, UserRound } from "lucide-react";

import { prisma } from "@/lib/prisma";
import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

export default async function MeetAgents() {
  const agents = await prisma.user.findMany({
    where: {
      role: "AGENT",
      isActive: true,
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
        },
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
            badge="Our Agents"
            title="Meet Our Property Consultants"
            description="Speak with experienced Burney Real Estate consultants for buying, selling, renting and investment advisory."
            align="left"
          />

          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C] transition hover:opacity-80"
          >
            View All Agents
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => {
            const whatsappNumber = agent.whatsapp || agent.phone || "";

            return (
              <article
                key={agent.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-xl transition duration-300 hover:-translate-y-1 hover:border-[#EBCB4C]/40"
              >
                <div className="grid sm:grid-cols-[180px_1fr]">
                  <div className="relative min-h-[260px] bg-[#EBCB4C]/10">
                    {agent.profileImage ? (
                      <Image
                        src={agent.profileImage}
                        alt={agent.name || "Agent"}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full min-h-[260px] items-center justify-center text-[#EBCB4C]">
                        <UserRound className="h-20 w-20" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-black uppercase text-black">
                      Consultant
                    </div>
                  </div>

                  <div className="flex flex-col p-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
                        Burney Real Estate
                      </p>

                      <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-white">
                        {agent.name || "Property Consultant"}
                      </h3>

                      <p className="mt-1 text-xs text-white/50">
                        {agent.designation || "Property Consultant"}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                          Listings
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {agent._count.properties}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                          Status
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#EBCB4C]">
                          Active
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <div className="grid grid-cols-3 gap-2">
                        {agent.phone ? (
                          <a
                            href={`tel:${agent.phone}`}
                            className="flex h-10 items-center justify-center rounded-xl bg-[#EBCB4C] text-black transition hover:opacity-90"
                            aria-label="Call agent"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        ) : null}

                        {whatsappNumber ? (
                          <a
                            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                            target="_blank"
                            className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                            aria-label="WhatsApp agent"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        ) : null}

                        {agent.email ? (
                          <a
                            href={`mailto:${agent.email}`}
                            className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                            aria-label="Email agent"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}