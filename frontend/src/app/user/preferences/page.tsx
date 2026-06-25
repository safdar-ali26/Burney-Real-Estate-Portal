import Link from "next/link";
import {
  Bell,
  Building2,
  Edit,
  Home,
  MapPin,
  MessageCircle,
  Plus,
  Trash2,
  Wallet,
} from "lucide-react";

import UserLayout from "@/components/user/user-layout";
import { userDeletePreferenceAction } from "@/actions/user-delete-preferences";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function formatAED(value?: number | null) {
  if (!value) return "-";
  return `AED ${Number(value).toLocaleString()}`;
}

export default async function UserPreferencesPage() {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  const preference = await prisma.userPreference.findUnique({
    where: {
      userId,
    },
  });

  return (
    <UserLayout
      title="Preferences"
      subtitle="View and manage your property preferences."
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              My Saved Preferences
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {preference
                ? "Your saved preferences are shown below."
                : "You have not added any preferences yet."}
            </p>
          </div>

          {!preference ? (
            <Link
              href="/user/preferences/add"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Preference
            </Link>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/user/preferences/add"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
              >
                <Edit className="h-4 w-4" />
                Edit Preference
              </Link>

              <form action={userDeletePreferenceAction}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Preference
                </button>
              </form>
            </div>
          )}
        </div>

        {!preference ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EBCB4C]/10">
              <Home className="h-10 w-10 text-[#EBCB4C]" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-foreground">
              No preferences saved yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              You have not added any property preferences yet. Add your
              preferred location, budget, property type and contact method to
              receive better recommendations.
            </p>

            <Link
              href="/user/preferences/add"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add First Preference
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            <PreferenceCard
              icon={<MapPin className="h-5 w-5" />}
              title="Location Preference"
              items={[
                ["Preferred Emirate", preference.preferredEmirate || "-"],
                ["Preferred District", preference.preferredDistrict || "-"],
              ]}
            />

            <PreferenceCard
              icon={<Building2 className="h-5 w-5" />}
              title="Property Preference"
              items={[
                ["Property Type", preference.preferredPropertyType || "-"],
                ["Bedrooms", preference.preferredBedrooms || "-"],
                ["Buying Purpose", preference.buyingPurpose || "-"],
              ]}
            />

            <PreferenceCard
              icon={<Wallet className="h-5 w-5" />}
              title="Budget Preference"
              items={[
                ["Minimum Budget", formatAED(preference.minBudget)],
                ["Maximum Budget", formatAED(preference.maxBudget)],
              ]}
            />

            <PreferenceCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="Contact Preference"
              items={[
                ["Preferred Contact", preference.contactPreference || "-"],
              ]}
            />

            <PreferenceCard
              icon={<Bell className="h-5 w-5" />}
              title="Notification Alerts"
              items={[
                ["Email Alerts", preference.emailAlerts ? "Enabled" : "Disabled"],
                [
                  "WhatsApp Alerts",
                  preference.whatsappAlerts ? "Enabled" : "Disabled",
                ],
              ]}
            />
          </div>
        )}
      </div>
    </UserLayout>
  );
}

function PreferenceCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl transition hover:-translate-y-1 hover:border-[#EBCB4C]/40">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
          {icon}
        </div>

        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      <div className="mt-6 space-y-4">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0"
          >
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className="text-right text-sm font-bold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}