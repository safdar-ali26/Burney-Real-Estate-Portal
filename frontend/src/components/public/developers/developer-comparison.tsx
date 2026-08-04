import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, GitCompare } from "lucide-react";

import { formatAED } from "@/lib/format";

type ComparisonDeveloper = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  projectCount: number;
  startingPrice?: number | null;
  topDistrict?: string | null;
};

export default function DeveloperComparison({
  developers,
}: {
  developers: ComparisonDeveloper[];
}) {
  if (developers.length === 0) return null;

  return (
    <section className="bg-black py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
              <GitCompare className="h-3.5 w-3.5" />
              Developer Comparison
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-white md:text-4xl">
              Compare Top Developers
            </h2>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/55 md:text-sm">
              Compare developers by active projects, starting price and main
              communities to make better investment decisions.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="hidden grid-cols-[1.4fr_0.8fr_0.9fr_1fr_0.6fr] border-b border-white/10 bg-[#EBCB4C]/10 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#EBCB4C] md:grid">
            <div>Developer</div>
            <div>Projects</div>
            <div>Starting From</div>
            <div>Top Community</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-white/10">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="grid gap-4 px-5 py-5 transition hover:bg-[#EBCB4C]/5 md:grid-cols-[1.4fr_0.8fr_0.9fr_1fr_0.6fr] md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
                    {developer.logo ? (
                      <Image
                        src={developer.logo}
                        alt={developer.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <Building2 className="h-5 w-5 text-black/50" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {developer.name}
                    </p>
                    <p className="mt-1 text-[11px] text-white/40">
                      Trusted Developer
                    </p>
                  </div>
                </div>

                <MobileLabel label="Projects" />
                <p className="text-sm font-bold text-white">
                  {developer.projectCount}
                </p>

                <MobileLabel label="Starting From" />
                <p className="text-sm font-bold text-[#EBCB4C]">
                  {developer.startingPrice
                    ? formatAED(developer.startingPrice)
                    : "On Request"}
                </p>

                <MobileLabel label="Top Community" />
                <p className="text-xs font-medium text-white/60">
                  {developer.topDistrict || "Dubai"}
                </p>

                <Link
                  href={`/developers/${developer.slug}`}
                  className="inline-flex items-center justify-start gap-2 text-xs font-bold text-[#EBCB4C] md:justify-end"
                >
                  View
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 md:hidden">
      {label}
    </p>
  );
}