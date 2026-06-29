import {
  BadgeCheck,
  Eye,
  Gem,
  Handshake,
  Target,
  Users,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

const values = [
  {
    title: "Integrity",
    description: "Transparent advice and honest communication at every step.",
    icon: BadgeCheck,
  },
  {
    title: "Client First",
    description: "Recommendations based on your budget, goals and timeline.",
    icon: Users,
  },
  {
    title: "Long-Term Value",
    description: "We focus on sustainable investment value, not short-term hype.",
    icon: Gem,
  },
];

export default function CompanyIntro() {
  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EBCB4C]">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              A Dubai real estate company built around trust.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Burney Real Estate LLC helps clients navigate Dubai’s property
              market with confidence. From off-plan opportunities to secondary
              sales, leasing and investment advisory, our team focuses on
              matching every client with the right property decision.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
              <Handshake className="h-5 w-5 text-[#EBCB4C]" />
              <p className="text-xs font-semibold text-white">
                Client-first property advisory in Dubai
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <InfoBlock
              icon={<Target />}
              title="Our Mission"
              text="To provide transparent, professional and result-driven real estate guidance that helps clients make confident property decisions in Dubai."
            />

            <InfoBlock
              icon={<Eye />}
              title="Our Vision"
              text="To become a trusted Dubai real estate brand known for client care, market knowledge and long-term investment value."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-white">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/50">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function InfoBlock({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
          <span className="[&_svg]:h-5 [&_svg]:w-5">{icon}</span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-6 text-white/55">{text}</p>
        </div>
      </div>
    </div>
  );
}