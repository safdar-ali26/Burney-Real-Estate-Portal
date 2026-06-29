import HeroSearch from "./hero-search";
import { getOffPlanSearchOptions } from "@/lib/public-search-options";

export default async function HeroSection() {
  const searchOptions = await getOffPlanSearchOptions();

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 pt-28 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
          Dubai Off Plan Opportunities
        </p>

        <h1 className="mt-3 text-3xl font-light uppercase tracking-[0.08em] text-white md:text-5xl">
          Find Your <span className="font-semibold text-[#EBCB4C]">Dream Property</span>
        </h1>

        <p className="mt-4 max-w-xl text-xs leading-6 text-white/65 md:text-sm">
          Unlock exclusive off-plan real estate opportunities in Dubai with
          Burney Real Estate.
        </p>

        <HeroSearch
          emirates={searchOptions.emirates}
          districts={searchOptions.districts}
          developers={searchOptions.developers}
          types={searchOptions.types}
          bedrooms={searchOptions.bedrooms}
        />
      </div>
    </section>
  );
}