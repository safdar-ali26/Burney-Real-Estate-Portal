/**
 * =====================================================
 * FILE: src/components/admin/admin-layout.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium reusable admin dashboard layout.
 *
 * Includes:
 * - Sidebar
 * - Header
 * - Theme toggle
 * - Logout button
 * =====================================================
 */

import LogoutButton from "@/components/auth/logout-button";
import AdminSidebar from "@/components/admin/admin-sidebar";
import ThemeToggle from "@/components/theme/theme-toggle";

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
    <main className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />

      <section className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-background/80 px-8 py-5 backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>

            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <div className="p-8">{children}</div>
      </section>
    </main>
  );
}