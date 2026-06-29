import {
  ClipboardCheck,
  FileSignature,
  Handshake,
  Home,
  Search,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const steps = [
  {
    title: "Consultation",
    text: "We understand your budget, purpose, location preference and timeline.",
    icon: Handshake,
  },
  {
    title: "Property Shortlist",
    text: "Our team prepares verified options based on your requirements.",
    icon: Search,
  },
  {
    title: "Project Review",
    text: "We compare developers, payment plans, ROI and handover timelines.",
    icon: ClipboardCheck,
  },
  {
    title: "Booking",
    text: "Once selected, we guide you through booking and initial payment.",
    icon: ShieldCheck,
  },
  {
    title: "Documentation",
    text: "We support you with SPA, forms, IDs and all required paperwork.",
    icon: FileSignature,
  },
  {
    title: "Handover Support",
    text: "Our relationship continues through handover and after-sales support.",
    icon: Home,
  },
];

export default function OurProcess() {
  return (
    <Section className="bg-black">
      <Container>
        <SectionHeading
          badge="Our Process"
          title="A Clear Process From Consultation to Handover"
          description="We make Dubai property buying simple, transparent and professionally managed."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-black text-white/5">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-sm font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-white/55">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}