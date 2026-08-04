import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

type DeveloperCardProps = {
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  projectCount: number;
};

export default function DeveloperCard({
  name,
  slug,
  logo,
  description,
  projectCount,
}: DeveloperCardProps) {
  return (
    <Link
      href={`/developers/${slug}`}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
          {logo ? (
            <Image src={logo} alt={name} fill className="object-contain p-2" />
          ) : (
            <Building2 className="h-7 w-7 text-black/50" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {name}
          </h3>

          <p className="mt-1 text-xs text-[#EBCB4C]">
            {projectCount} Projects
          </p>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-xs leading-6 text-white/50">
        {description || "Explore premium Dubai property projects by this developer."}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs font-bold text-[#EBCB4C]">View Developer</span>
        <ArrowRight className="h-4 w-4 text-[#EBCB4C] transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}