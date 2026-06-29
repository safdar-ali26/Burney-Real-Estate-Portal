import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

export default function OfficeExperience() {
  return (
    <Section className="bg-black">
      <Container>
        <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#EBCB4C]">
                Visit Our Office
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
                Meet our team in the heart of Business Bay.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                Burney Real Estate LLC welcomes clients to our office at Churchill
                Tower, Business Bay — a prime business location near Downtown Dubai.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Info icon={<MapPin />} title="Address" text="Churchill Tower - 3707, Marasi Dr, Business Bay, Dubai" />
                <Info icon={<Phone />} title="Phone" text="+971 50 648 6626" />
                <Info icon={<Mail />} title="Email" text="info@burneyrealestate.com" />
                <Info icon={<Clock />} title="Hours" text="Mon - Sat, 10:00 AM - 7:00 PM" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="https://wa.me/971506486626" target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Link>

                <Link href="tel:+971506486626" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-bold text-white hover:text-[#EBCB4C]">
                  <Phone className="h-4 w-4" />
                  Call
                </Link>

                <Link href="https://www.google.com/maps/search/?api=1&query=Churchill+Tower+3707+Business+Bay+Dubai" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-[#EBCB4C]/35 px-5 py-3 text-xs font-bold text-[#EBCB4C] hover:bg-[#EBCB4C] hover:text-black">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-6">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#EBCB4C]/20 blur-3xl" />

              <div className="relative rounded-3xl border border-white/10 bg-black/45 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBCB4C] text-black">
                  <MapPin className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  Churchill Tower
                </h3>

                <p className="mt-2 text-sm text-[#EBCB4C]">
                  Business Bay, Dubai
                </p>

                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <Mini label="Office" value="3707" />
                  <Mini label="Area" value="Business Bay" />
                  <Mini label="City" value="Dubai, UAE" />
                  <Mini label="Nearby" value="Downtown Dubai" />
                </div>

                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Churchill+Tower+3707+Business+Bay+Dubai"
                  target="_blank"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-xs font-bold text-white hover:bg-[#EBCB4C] hover:text-black"
                >
                  Open Google Maps
                  <Navigation className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <div className="flex gap-3">
        <span className="mt-0.5 text-[#EBCB4C] [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{title}</p>
          <p className="mt-1 text-xs leading-6 text-white/65">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</span>
      <span className="text-xs font-semibold text-white">{value}</span>
    </div>
  );
}