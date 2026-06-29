import { Award, Building2, MapPin, ShieldCheck } from "lucide-react";

import Container from "@/components/public/ui/container";

export default function AboutHero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-black pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black to-black" />

      <Container className="relative z-10">
        <div className="grid min-h-[62vh] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
              About Burney Real Estate
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
              Building Trust.
              <span className="block font-semibold text-[#EBCB4C]">
                Creating Investments.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
              Burney Real Estate LLC is a Dubai-based real estate company
              helping clients buy, sell, rent and invest in premium property
              opportunities across the UAE.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="grid gap-3">
              <InfoCard icon={<Award />} label="Established" value="2024" />
              <InfoCard icon={<ShieldCheck />} label="ORN Number" value="2381816" />
              <InfoCard icon={<Building2 />} label="DED License" value="1397573" />
              <InfoCard
                icon={<MapPin />}
                label="Office"
                value="Churchill Tower, Business Bay, Dubai"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoCard({
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
      <div className="flex items-center gap-3">
        <span className="text-[#EBCB4C] [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}