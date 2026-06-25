import {
  Heart,
  Scale,
  Search,
  UserCircle,
} from "lucide-react";

import UserLayout from "@/components/user/user-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function UserDashboardPage() {
  const session = await requireRole("USER");

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      savedProperties: true,
    },
  });

  const savedCount = user?.savedProperties.length ?? 0;

  return (
    <UserLayout
      title="Dashboard"
      subtitle="Welcome back! Manage your saved properties and preferences."
    >
      <div className="space-y-8">
        {/* Welcome Card */}

        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="bg-gradient-to-r from-[#EBCB4C]/15 via-transparent to-transparent p-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EBCB4C]/10">
                <UserCircle className="h-12 w-12 text-[#EBCB4C]" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Welcome,
                  <span className="ml-2 text-[#EBCB4C]">
                    {user?.name}
                  </span>
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Discover your next investment and manage your favourite
                  properties from one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            icon={<Heart className="h-7 w-7 text-[#EBCB4C]" />}
            title="Saved Properties"
            value={savedCount}
          />

          <DashboardCard
            icon={<Scale className="h-7 w-7 text-[#EBCB4C]" />}
            title="Compare List"
            value="0"
          />

          <DashboardCard
            icon={<Search className="h-7 w-7 text-[#EBCB4C]" />}
            title="Recent Searches"
            value="0"
          />

          <DashboardCard
            icon={<UserCircle className="h-7 w-7 text-[#EBCB4C]" />}
            title="Profile Status"
            value="100%"
          />
        </div>

        {/* Quick Actions */}

        <section className="rounded-3xl border border-border bg-card p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground">
            Quick Actions
          </h2>

          <p className="mt-2 text-muted-foreground">
            Quickly access your most frequently used features.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <QuickAction
              href="/user/saved-properties"
              title="Saved Properties"
              description="View all favourite properties."
            />

            <QuickAction
              href="/user/compare"
              title="Compare Properties"
              description="Compare multiple listings."
            />

            <QuickAction
              href="/user/profile"
              title="My Profile"
              description="Update your profile."
            />

            <QuickAction
              href="/properties"
              title="Browse Properties"
              description="Explore new listings."
            />
          </div>
        </section>
      </div>
    </UserLayout>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl transition hover:-translate-y-1 hover:border-[#EBCB4C]/40">
      <div className="flex items-center justify-between">
        {icon}

        <h2 className="text-4xl font-bold text-foreground">
          {value}
        </h2>
      </div>

      <p className="mt-5 text-sm font-medium text-muted-foreground">
        {title}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-3xl border border-border bg-background p-6 transition hover:border-[#EBCB4C]/40 hover:shadow-lg"
    >
      <h3 className="text-lg font-bold text-foreground">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-6 inline-flex rounded-xl bg-[#EBCB4C] px-4 py-2 text-sm font-bold text-black">
        Open
      </div>
    </a>
  );
}