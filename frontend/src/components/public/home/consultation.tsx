import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Coins,
  Phone,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

const points = [
  "Personalized investment strategy",
  "Best off-plan payment plans",
  "ROI, rental yield & Golden Visa guidance",
];

export default function Consultation() {
  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(235,203,76,0.1),transparent_25%)]" />

          <div className="relative grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
                <BadgeCheck className="h-3.5 w-3.5" />
                Free Consultation
              </div>

              <h2 className="mt-5 max-w-2xl text-2xl font-semibold leading-tight text-white md:text-4xl">
                Get a tailored Dubai property investment plan.
              </h2>

              <p className="mt-4 max-w-xl text-xs leading-6 text-white/60 md:text-sm">
                Share your details and our team will help you shortlist the
                right Dubai off-plan opportunities based on your budget,
                timeline and investment goal.
              </p>

              <div className="mt-7 grid gap-3">
                {points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBCB4C]/10 text-[#EBCB4C]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <p className="text-xs font-medium text-white/70">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <MiniStat icon={<Coins />} label="Starting Budget" value="AED 500K+" />
                <MiniStat icon={<BarChart3 />} label="ROI Guidance" value="Free" />
                <MiniStat icon={<ShieldCheck />} label="Verified Projects" value="100%" />
              </div>
            </div>

            <div className="rounded-[24px] border border-[#EBCB4C]/20 bg-black/55 p-5 shadow-[0_0_35px_rgba(235,203,76,0.12)] backdrop-blur-xl md:p-6">
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#EBCB4C]">
                  Request Callback
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  Speak with an advisor
                </h3>
              </div>

              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
                />

                <div className="flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-[#EBCB4C]">
                  <div className="flex h-full items-center gap-2 border-r border-white/10 px-3 text-xs font-semibold text-white/75">
                    🇦🇪 +971
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-white/35"
                  />
                </div>

                <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs text-white outline-none transition focus:border-[#EBCB4C]">
                  <option className="bg-black text-white">
                    Investment Budget
                  </option>
                  <option className="bg-black text-white">AED 500K - 1M</option>
                  <option className="bg-black text-white">AED 1M - 2M</option>
                  <option className="bg-black text-white">AED 2M - 5M</option>
                  <option className="bg-black text-white">AED 5M+</option>
                </select>

                <button
                  type="submit"
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] text-xs font-bold text-black transition hover:opacity-90"
                >
                  Request Free Consultation
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/45">
                <Phone className="h-3.5 w-3.5 text-[#EBCB4C]" />
                Or call us: +971 50 648 6626
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <div className="text-[#EBCB4C] [&_svg]:h-4 [&_svg]:w-4">{icon}</div>

      <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}