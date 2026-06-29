"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";
import SectionHeading from "@/components/public/ui/heading";

const testimonials = [
  {
    name: "Ahmed Khan",
    country: "United Arab Emirates",
    role: "Investor",
    text: "Burney Real Estate helped me compare multiple off-plan projects and guided me with the right payment plan for my budget.",
  },
  {
    name: "Sarah Wilson",
    country: "United Kingdom",
    role: "Buyer",
    text: "The team was professional, responsive and transparent throughout the entire property purchase process in Dubai.",
  },
  {
    name: "Muhammad Ali",
    country: "Pakistan",
    role: "Investor",
    text: "I received clear advice on ROI, location potential and developer options. The consultation was very helpful.",
  },
  {
    name: "Priya Sharma",
    country: "India",
    role: "End User",
    text: "Burney Real Estate made the process simple and helped us shortlist properties that matched our family requirements.",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  return (
    <Section className="bg-black">
      <Container>
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            badge="Testimonials"
            title="What Our Clients Say"
            description="Trusted by buyers, investors and families looking for Dubai real estate opportunities."
            align="left"
          />

          <div className="flex gap-3">
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

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_48%] xl:flex-[0_0_32%]"
              >
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40">
                  <Quote className="h-8 w-8 text-[#EBCB4C]/50" />

                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5 fill-[#EBCB4C] text-[#EBCB4C]"
                      />
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/65">
                    “{item.text}”
                  </p>

                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-sm font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-[#EBCB4C]">
                      {item.role}
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      {item.country}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}