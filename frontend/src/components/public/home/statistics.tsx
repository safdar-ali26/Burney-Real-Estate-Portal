"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Handshake, Landmark, Users } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

const stats = [
  {
    label: "Sales Volume",
    value: 500,
    suffix: "M+",
    prefix: "AED ",
    icon: Landmark,
  },
  {
    label: "Happy Clients",
    value: 1500,
    suffix: "+",
    prefix: "",
    icon: Users,
  },
  {
    label: "Projects",
    value: 70,
    suffix: "+",
    prefix: "",
    icon: Building2,
  },
  {
    label: "Developers",
    value: 25,
    suffix: "+",
    prefix: "",
    icon: Handshake,
  },
];

export default function Statistics() {
  return (
    <Section className="bg-[#050505]">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#EBCB4C]/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-5 text-3xl font-bold text-white">
                  {stat.prefix}
                  <Counter end={stat.value} />
                  {stat.suffix}
                </p>

                <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let start = 0;
        const duration = 1200;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;

          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}