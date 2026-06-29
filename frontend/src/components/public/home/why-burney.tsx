import {
  BadgeCheck,
  Building2,
  Handshake,
  Home,
  LineChart,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const items = [
  {
    title: "Dubai Market Experts",
    description:
      "Our consultants understand Dubai communities, developers, payment plans and investment trends.",
    icon: LineChart,
  },
  {
    title: "Trusted Developers",
    description:
      "Access curated projects from leading Dubai developers with verified project details.",
    icon: Building2,
  },
  {
    title: "Client-First Advisory",
    description:
      "We guide clients based on budget, purpose, ROI expectations and long-term property goals.",
    icon: Handshake,
  },
  {
    title: "Verified Opportunities",
    description:
      "Every opportunity is reviewed before presenting it to buyers, tenants and investors.",
    icon: BadgeCheck,
  },
  {
    title: "End-to-End Support",
    description:
      "From consultation to booking, documentation, handover and after-sales support.",
    icon: Home,
  },
  {
    title: "Secure Process",
    description:
      "Transparent communication, clear documentation and professional real estate guidance.",
    icon: ShieldCheck,
  },
];

export default function WhyBurney() {
  return (
    <Section className="bg-black">
      <Container>
        <SectionHeading
          badge="Why Burney"
          title="A Smarter Way to Invest in Dubai Real Estate"
          description="Burney Real Estate combines local expertise, premium developer access and a client-first approach."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 text-[#EBCB4C]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-sm font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/55">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}