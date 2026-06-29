import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HandCoins,
  Home,
  KeyRound,
  LineChart,
  WalletCards,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

const services = [
  { title: "Buy", text: "Find the right property for living or investment.", href: "/buy", icon: Home },
  { title: "Sell", text: "Market your property with professional guidance.", href: "/contact", icon: HandCoins },
  { title: "Rent", text: "Discover ready homes across Dubai communities.", href: "/rent", icon: KeyRound },
  { title: "Management", text: "End-to-end property care for landlords.", href: "/contact", icon: Building2 },
  { title: "Advisory", text: "ROI-focused investment recommendations.", href: "/off-plan", icon: LineChart },
  { title: "Mortgage", text: "Support with mortgage planning and banks.", href: "/contact", icon: WalletCards },
];

export default function Services() {
  return (
    <Section className="bg-black">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EBCB4C]">
              Our Services
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Complete Dubai real estate support.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Whether you want to buy, sell, rent or invest, Burney Real Estate
              provides expert support from consultation to closing.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black"
            >
              Speak With Expert
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#EBCB4C]" />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-white/50">
                    {service.text}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}