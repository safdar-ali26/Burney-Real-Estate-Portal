import { Building2, Rocket, Settings, TrendingUp } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const timeline = [
  {
    year: "2024",
    title: "Company Established",
    description:
      "Burney Real Estate LLC was founded in Dubai with a client-first real estate vision.",
    icon: Building2,
  },
  {
    year: "2025",
    title: "Developer Network Growth",
    description:
      "Expanded relationships with Dubai developers and off-plan project inventory.",
    icon: TrendingUp,
  },
  {
    year: "2026",
    title: "Digital Portal Launch",
    description:
      "Started building Burney’s digital real estate portal, CRM and automation systems.",
    icon: Settings,
  },
  {
    year: "Future",
    title: "Smart Property Experience",
    description:
      "AI-powered property search, investment advisory and client automation.",
    icon: Rocket,
  },
];

export default function CompanyTimeline() {
  return (
    <Section className="bg-black">
      <Container>
        <SectionHeading
          badge="Timeline"
          title="Our Journey Forward"
          description="A growing Dubai real estate company focused on trust, technology and long-term client value."
        />

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block" />

          <div className="grid gap-5">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isRight = index % 2 === 1;

              return (
                <div
                  key={item.title}
                  className={`relative grid gap-5 md:grid-cols-2 ${
                    isRight ? "" : "md:[&>div:first-child]:col-start-2"
                  }`}
                >
                  <div
                    className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#EBCB4C]/40 ${
                      isRight ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
                          {item.year}
                        </p>

                        <h3 className="mt-2 text-sm font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-white/50">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-4 top-6 hidden h-3 w-3 rounded-full bg-[#EBCB4C] shadow-[0_0_20px_rgba(235,203,76,0.7)] md:left-1/2 md:block md:-translate-x-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}