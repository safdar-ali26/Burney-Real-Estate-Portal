import Link from "next/link";
import {
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black pt-40 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(235,203,76,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(235,203,76,0.10),transparent_25%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black to-black" />

        <Container className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#EBCB4C]">
            Contact Us
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-light uppercase leading-tight tracking-[0.08em] text-white md:text-6xl">
            Let's Talk About Your
            <span className="block font-semibold text-[#EBCB4C]">
              Property Goals
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
            Whether you're buying, selling, renting or investing in Dubai real
            estate, our team is ready to guide you.
          </p>
        </Container>
      </section>

      <Section className="bg-[#050505]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
                Send Inquiry
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Request a Call Back
              </h2>

              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Phone Number" />
                </div>

                <Input placeholder="Email Address" type="email" />

                <select className="h-12 rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-white outline-none focus:border-[#EBCB4C]/50">
                  <option className="bg-black">I am interested in</option>
                  <option className="bg-black">Buying Property</option>
                  <option className="bg-black">Selling Property</option>
                  <option className="bg-black">Renting Property</option>
                  <option className="bg-black">Off Plan Investment</option>
                  <option className="bg-black">Property Management</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="rounded-xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EBCB4C]/50"
                />

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-6 text-sm font-bold text-black transition hover:opacity-90"
                >
                  Submit Inquiry
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <ContactCard
                icon={<Phone />}
                title="Call Us"
                text="+971 50 648 6626"
                href="tel:+971506486626"
              />

              <ContactCard
                icon={<MessageCircle />}
                title="WhatsApp"
                text="+971 50 648 6626"
                href="https://wa.me/971506486626"
              />

              <ContactCard
                icon={<Mail />}
                title="Email"
                text="info@burneyrealestate.com"
                href="mailto:info@burneyrealestate.com"
              />

              <ContactCard
                icon={<MapPin />}
                title="Office Address"
                text="Churchill Tower - 3707 - Marasi Dr, Business Bay - Dubai"
                href="https://www.google.com/maps/search/?api=1&query=Churchill+Tower+3707+Business+Bay+Dubai"
              />

              <div className="rounded-[28px] border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-6">
                <Building2 className="h-8 w-8 text-[#EBCB4C]" />

                <h3 className="mt-5 text-xl font-semibold text-white">
                  Burney Real Estate LLC
                </h3>

                <div className="mt-5 flex gap-3 text-sm text-white/60">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#EBCB4C]" />
                  <span>Monday to Saturday — 10:00 AM to 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-black">
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-3">
            <iframe
              title="Burney Real Estate Office Location"
              src="https://www.google.com/maps?q=Churchill%20Tower%203707%20Business%20Bay%20Dubai&output=embed"
              className="h-[420px] w-full rounded-[24px] border-0 grayscale invert"
              loading="lazy"
            />

            <div className="pointer-events-none absolute inset-3 rounded-[24px] bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </Container>
      </Section>
    </>
  );
}

function Input({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 rounded-xl border border-white/10 bg-black/35 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#EBCB4C]/50"
    />
  );
}

function ContactCard({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className="group flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#EBCB4C]/35"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EBCB4C]/10 text-[#EBCB4C] [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
          {title}
        </p>
        <p className="mt-2 text-sm font-semibold text-white group-hover:text-[#EBCB4C]">
          {text}
        </p>
      </div>
    </Link>
  );
}