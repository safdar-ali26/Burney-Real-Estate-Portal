"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PropertyCard from "@/components/public/property/property-card";

type PropertyItem = {
  id: string;
  slug: string;
  title: string;
  price?: number | null;
  bedrooms?: string | null;
  size?: number | null;
  emirate?: string | null;
  district?: string | null;
  type?: string | null;
  status: "AVAILABLE" | "LIMITED" | "SOLD";
  completionDate?: string | null;
  featuredImage?: string | null;
  imageUrl?: string | null;
  developer?: {
    name?: string | null;
    logo?: string | null;
  } | null;
};

export default function FeaturedProjectsCarousel({
  properties,
}: {
  properties: PropertyItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  return (
    <div className="relative mt-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {properties.map((property) => (
            <div
              key={property.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] xl:flex-[0_0_32%]"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}