/**
 * =====================================================
 * FILE: src/app/dashboard/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Protected dashboard page.
 * Only logged-in users can access this page.
 * =====================================================
 */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold text-[#EBCB4C]">
          Dashboard
        </h1>

        <p className="mt-4 text-white/80">
          Welcome, {session.user.name}
        </p>

        <p className="mt-2 text-white/60">
          Role: {(session.user as any).role}
        </p>
      </div>
    </main>
  );
}