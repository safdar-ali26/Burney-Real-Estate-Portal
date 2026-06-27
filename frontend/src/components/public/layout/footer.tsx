import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import ThemeLogo from "@/components/brand/theme-logo";
import Container from "@/components/public/ui/container";

const propertyLinks = [
  { label: "Buy Properties", href: "/buy" },
  { label: "Rent Properties", href: "/rent" },
  { label: "Off Plan Projects", href: "/off-plan" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Developers", href: "/developers" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <Container>
        <div className="grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10">
                <ThemeLogo />
              </div>

              <div>
                <p className="text-xl font-bold text-[#EBCB4C]">Burney</p>
                <p className="text-xs text-white/55">Real Estate LLC</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Burney Real Estate connects clients with premium Dubai property
              opportunities across off-plan, secondary sales and leasing.
            </p>

            <div className="mt-5 grid gap-2 text-xs text-white/45">
              <p>ORN: 2381816</p>
              <p>DED License: 1397573</p>
            </div>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Properties" links={propertyLinks} />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <ContactRow icon={<Phone />} text="+971 50 648 6626" />
              <ContactRow icon={<Mail />} text="info@burneyrealestate.com" />
              <ContactRow
                icon={<MapPin />}
                text="Churchill Tower - 3707 - Marasi Dr, Business Bay - Dubai"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Burney Real Estate LLC. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-[#EBCB4C]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#EBCB4C]">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
        {title}
      </h3>

      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-white/55 transition hover:text-[#EBCB4C]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ContactRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex gap-3 text-sm text-white/55">
      <span className="mt-0.5 text-[#EBCB4C] [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </span>
      <span className="leading-6">{text}</span>
    </div>
  );
}