import {
  Award,
  BadgeCheck,
  Building,
  Crown,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const trustItems = [
  {
    title: "RERA Registered",
    description: "Professional real estate brokerage operating in Dubai.",
    icon: ShieldCheck,
  },
  {
    title: "DLD Compliance",
    description: "Guidance aligned with Dubai Land Department processes.",
    icon: Building,
  },
  {
    title: "Golden Visa Guidance",
    description: "Support for eligible property investors.",
    icon: Crown,
  },
  {
    title: "Trusted Developers",
    description: "Projects from leading Dubai developers.",
    icon: BadgeCheck,
  },
];

export default function TrustAwards() {
  return (
    <Section className="bg-black">
      <Container>
        <SectionHeading
          badge="Trust"
          title="Built on Transparency and Professional Guidance"
          description="Burney Real Estate helps clients invest with confidence through verified opportunities and clear advisory."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center transition hover:-translate-y-1 hover:border-[#EBCB4C]/40"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 text-[#EBCB4C]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-sm font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/50">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-5 text-center">
          <Award className="mx-auto h-6 w-6 text-[#EBCB4C]" />

          <p className="mt-3 text-sm font-semibold text-white">
            ORN: 2381816 | DED License: 1397573
          </p>

          <p className="mt-2 text-xs text-white/50">
            Burney Real Estate LLC — Churchill Tower, Business Bay, Dubai
          </p>
        </div>
      </Container>
    </Section>
  );
}