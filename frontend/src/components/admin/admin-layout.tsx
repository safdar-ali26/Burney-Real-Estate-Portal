/**
 * =====================================================
 * FILE: src/components/admin/admin-layout.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium theme-aware admin dashboard layout.
 * =====================================================
 */

import { Search } from "lucide-react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import ThemeToggle from "@/components/theme/theme-toggle";
import AdminProfileDropdown from "@/components/admin/admin-profile-dropdown";
import AdminNotificationDropdown from "@/components/admin/admin-notification-dropdown";

export default function AdminLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <main className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground">
      <AdminSidebar />

      <section className="min-w-0 flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-8 py-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#EBCB4C]">
                Burney Admin
              </p>

              <h1 className="mt-1 text-2xl font-bold text-foreground">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm lg:flex">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search portal..."
                  className="w-52 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <AdminNotificationDropdown />
              <ThemeToggle />
              <AdminProfileDropdown />
            </div>
          </div>
        </header>

        <div className="w-full max-w-full overflow-x-hidden p-8">{children}</div>
      </section>
    </main>
  );
}