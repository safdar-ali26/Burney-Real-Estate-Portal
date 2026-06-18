import Image from "next/image";
import Link from "next/link";
import { Building2, Globe, Plus } from "lucide-react";

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
      subtitle="Manage property developers and CRM synced developers."
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
                Developers added manually or synced from CRM will appear here.
              </p>

              <Link
                href="/administrator/developers/add"
                className="mt-6 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Add First Developer
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
                    {developer.logo ? (
                      <Image
                        src={developer.logo}
                        alt={developer.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <Building2 className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                      {developer.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {developer._count.properties} properties
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-muted-foreground">
                  {developer.description || "No description available."}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  {developer.website ? (
                    <a
                      href={developer.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No website
                    </span>
                  )}

                  <Link
                    href={`/administrator/developers/${developer.id}`}
                    className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    View
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