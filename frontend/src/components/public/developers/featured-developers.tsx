import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Crown } from "lucide-react";

type FeaturedDeveloper = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  projectCount: number;
};

export default function FeaturedDevelopersSection({
  developers,
}: {
  developers: FeaturedDeveloper[];
}) {
  if (developers.length === 0) return null;

  return (
    <section className="bg-[#050505] py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EBCB4C]">
              Featured Developers
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white md:text-4xl">
              Top Developers to Explore
            </h2>
          </div>

          <Link
            href="/developers"
            className="hidden items-center gap-2 text-xs font-bold text-[#EBCB4C] md:inline-flex"
          >
            Browse All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {developers.map((developer, index) => (
            <Link
              key={developer.id}
              href={`/developers/${developer.slug}`}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#EBCB4C]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-white p-3">
                    {developer.logo ? (
                      <Image
                        src={developer.logo}
                        alt={developer.name}
                        fill
                        className="object-contain p-3"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-black/50" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-black uppercase text-black">
                    <Crown className="h-3 w-3" />
                    Top {index + 1}
                  </div>
                </div>

                <h3 className="line-clamp-1 text-xl font-semibold text-white">
                  {developer.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/55">
                  {developer.description ||
                    "Explore premium Dubai off-plan opportunities from this trusted developer."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      Projects
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {developer.projectCount}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C]">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}