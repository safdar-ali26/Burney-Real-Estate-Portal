"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Scale,
  Settings,
  User,
} from "lucide-react";

import ThemeToggle from "@/components/theme/theme-toggle";
import ThemeLogo from "@/components/brand/theme-logo";

export default function UserLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 h-screen w-72 shrink-0 border-r border-border bg-card p-5">
        <div className="mb-8 rounded-3xl border border-border bg-background/60 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_30px_rgba(235,203,76,0.18)]">
              <ThemeLogo />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-wide text-[#EBCB4C]">
                Burney
              </h2>

              <p className="text-xs text-muted-foreground">User Portal</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          <UserNavItem
            href="/user"
            icon={<LayoutDashboard />}
            label="Dashboard"
            pathname={pathname}
          />

          <UserNavItem
            href="/user/saved-properties"
            icon={<Heart />}
            label="Saved Properties"
            pathname={pathname}
          />

          <UserNavItem
            href="/user/compare"
            icon={<Scale />}
            label="Compare"
            pathname={pathname}
          />

          <UserNavItem
            href="/user/profile"
            icon={<User />}
            label="My Profile"
            pathname={pathname}
          />

          <UserNavItem
            href="/user/preferences"
            icon={<Settings />}
            label="Preferences"
            pathname={pathname}
          />
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-8 py-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#EBCB4C]">
                User Portal
              </p>

              <h1 className="mt-1 text-2xl font-bold text-foreground">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <ThemeToggle />
          </div>
        </header>

        <div className="p-8">{children}</div>
      </section>
    </main>
  );
}

function UserNavItem({
  href,
  icon,
  label,
  pathname,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
}) {
  const isActive =
    href === "/user" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition [&_svg]:h-4 [&_svg]:w-4 ${
        isActive
          ? "bg-[#EBCB4C] text-black shadow-lg"
          : "text-muted-foreground hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
      }`}
    >
      {isActive ? (
        <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-black/70" />
      ) : null}

      {icon}
      {label}
    </Link>
  );
}