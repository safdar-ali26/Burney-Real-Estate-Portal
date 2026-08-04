import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone, UserRound } from "lucide-react";

type AgentCardProps = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  profileImage?: string | null;
  designation?: string | null;
  propertyCount: number;
};

export default function AgentCard({
  id,
  name,
  email,
  phone,
  whatsapp,
  profileImage,
  designation,
  propertyCount,
}: AgentCardProps) {
  const whatsappNumber = whatsapp || phone || "";

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-[#EBCB4C]/40">
      <Link href={`/agents/${id}`} className="block">
        <div className="relative aspect-[4/4.4] bg-[#EBCB4C]/10">
          {profileImage ? (
            <Image
              src={profileImage}
              alt={name || "Agent"}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#EBCB4C]">
              <UserRound className="h-20 w-20" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
              Burney Real Estate
            </p>

            <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-white">
              {name || "Property Consultant"}
            </h3>

            <p className="mt-1 text-xs text-white/55">
              {designation || "Property Consultant"}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Listings
          </span>

          <span className="text-sm font-bold text-white">{propertyCount}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="flex h-10 items-center justify-center rounded-xl bg-[#EBCB4C] text-black transition hover:opacity-90"
            >
              <Phone className="h-4 w-4" />
            </a>
          ) : null}

          {whatsappNumber ? (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          ) : null}

          {email ? (
            <a
              href={`mailto:${email}`}
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
            >
              <Mail className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <Link
          href={`/agents/${id}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#EBCB4C]/35 px-4 py-3 text-xs font-bold text-[#EBCB4C] transition hover:bg-[#EBCB4C] hover:text-black"
        >
          View Profile
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}