import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

export default function HomeCTA() {
  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#EBCB4C]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EBCB4C]">
                Get Expert Advice
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white md:text-4xl">
                Ready to Find Your Next Dubai Property?
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Speak with Burney Real Estate and discover the best opportunities
                based on your budget, location and investment goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black transition hover:opacity-90"
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <a
                href="tel:+971506486626"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-xs font-bold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}