import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  Phone,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

export default function AboutCTA() {
  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-[#EBCB4C]/20 bg-gradient-to-br from-[#0b0b0b] via-[#111111] to-[#171717] p-10 lg:p-16">

          {/* Glow */}

          <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#EBCB4C]/10 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#EBCB4C]/10 blur-[120px]" />

          <div className="relative z-10 text-center">

            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
              Let's Start
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-light leading-tight text-white md:text-5xl">
              Ready To Find Your
              <span className="block font-semibold text-[#EBCB4C]">
                Dream Property In Dubai?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/60">
              Whether you're buying your first home, investing in off-plan
              projects or expanding your portfolio, our experts are ready to
              help you make the right decision.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

              <Link
                href="https://wa.me/971506486626"
                target="_blank"
                className="inline-flex h-12 items-center gap-3 rounded-xl bg-[#EBCB4C] px-6 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Link>

              <Link
                href="tel:+971506486626"
                className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
              >
                <CalendarDays className="h-4 w-4" />
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}