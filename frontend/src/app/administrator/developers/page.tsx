import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function DevelopersPage() {
  await requireRole("ADMIN");

  const developers = await prisma.developer.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },
  });

  return (
    <AdminLayout
      title="Developers"
      subtitle="CRM synced developers and their project inventory."
    >
      <div className="space-y-6">
        {developers.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <Building2 className="h-10 w-10 text-[#EBCB4C]" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                No developers found
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Developers synced from CRM will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  {developers.map((developer) => (
    <div
      key={developer.id}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#EBCB4C]/10 blur-2xl transition group-hover:bg-[#EBCB4C]/20" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#EBCB4C]/30 bg-white shadow-md">
          {developer.logo ? (
            <Image
              src={developer.logo}
              alt={developer.name}
              fill
              className="object-contain p-3"
            />
          ) : (
            <Building2 className="h-6 w-6 text-black" />
          )}
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[36px] text-sm font-bold text-foreground">
          {developer.name}
        </h3>

        <div className="mt-3 w-full rounded-xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#EBCB4C]">
            Properties
          </p>

          <p className="mt-1 text-lg font-bold text-foreground">
            {developer._count.properties}
          </p>
        </div>

        <Link
          href={`/administrator/developers/${developer.id}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-[#EBCB4C] px-3 py-2 text-xs font-bold text-black transition hover:opacity-90"
        >
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
    </AdminLayout>
  );
}