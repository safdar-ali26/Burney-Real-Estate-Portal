import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Heart, MapPin, Scale } from "lucide-react";

import { formatAED } from "@/lib/format";

type PropertyCardProps = {
  id: string;
  title: string;
  slug: string;
  price?: number | null;
  bedrooms?: string | null;
  size?: number | null;
  emirate?: string | null;
  district?: string | null;
  type?: string | null;
  status?: "AVAILABLE" | "LIMITED" | "SOLD";
  completionDate?: string | null;
  featuredImage?: string | null;
  imageUrl?: string | null;
  developer?: {
    name?: string | null;
    logo?: string | null;
  } | null;
};

export default function PropertyCard({
  title,
  slug,
  price,
  bedrooms,
  size,
  emirate,
  district,
  type,
  status = "AVAILABLE",
  completionDate,
  featuredImage,
  imageUrl,
  developer,
}: PropertyCardProps) {
  const finalImage = featuredImage || imageUrl || "";
  const location = [district, emirate].filter(Boolean).join(", ");

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#EBCB4C]/40">
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
        {finalImage ? (
          <Image
            src={finalImage}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-white/35">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold uppercase text-black">
            {type || "Off Plan"}
          </span>

          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase text-white backdrop-blur">
            {status}
          </span>
        </div>

        <div className="absolute right-3 top-3 flex gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-[#EBCB4C] hover:text-black">
            <Heart className="h-3.5 w-3.5" />
          </button>

          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-[#EBCB4C] hover:text-black">
            <Scale className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {developer?.name ? (
          <div className="mb-3 flex items-center gap-2">
            {developer.logo ? (
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white">
                <Image
                  src={developer.logo}
                  alt={developer.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ) : null}

            <p className="text-[11px] font-semibold text-[#EBCB4C]">
              {developer.name}
            </p>
          </div>
        ) : null}

        <h3 className="line-clamp-1 text-sm font-semibold text-white">
          {title}
        </h3>

        {location ? (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-white/50">
            <MapPin className="h-3.5 w-3.5 text-[#EBCB4C]" />
            <span className="line-clamp-1">{location}</span>
          </div>
        ) : null}

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Starting From
            </p>
            <p className="mt-1 text-base font-bold text-white">
              {formatAED(price)}
            </p>
          </div>

          {completionDate ? (
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Completion
              </p>
              <p className="mt-1 text-xs font-semibold text-white">
                {completionDate}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-white/55">
          {bedrooms ? (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-[#EBCB4C]" />
              {bedrooms}
            </span>
          ) : null}

          {size ? <span>{size.toLocaleString()} sqft</span> : null}
        </div>

        <Link
          href={`/off-plan/${slug}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#EBCB4C]/35 px-4 py-2.5 text-xs font-bold text-[#EBCB4C] transition hover:bg-[#EBCB4C] hover:text-black"
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}