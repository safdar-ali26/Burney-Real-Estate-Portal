/**
 * =====================================================
 * FILE: src/app/administrator/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Admin dashboard page.
 *
 * ACCESS:
 * Only ADMIN users can access this page.
 * =====================================================
 */

import LogoutButton from "@/components/auth/logout-button";
import { requireRole } from "@/lib/auth-guard";

export default async function AdministratorPage() {
  const session = await requireRole("ADMIN");

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Admin Panel
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#EBCB4C]">
              Administrator Dashboard
            </h1>

            <p className="mt-4 text-white/70">
              Welcome, {session.user.name}. You have full access to Burney Portal.
            </p>
          </div>

          <LogoutButton />
        </div>
      </div>
    </main>
  );
}