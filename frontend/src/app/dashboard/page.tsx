/**
 * =====================================================
 * FILE: src/app/dashboard/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Central dashboard redirect page.
 *
 * LOGIC:
 * - ADMIN redirects to /administrator
 * - AGENT redirects to /agent
 * - USER redirects to /user
 * =====================================================
 */

import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth-guard";

export default async function DashboardPage() {
  const session = await requireAuth();

  const userRole = (session.user as any).role;

  if (userRole === "ADMIN") {
    redirect("/administrator");
  }

  if (userRole === "AGENT") {
    redirect("/agent");
  }

  if (userRole === "USER") {
    redirect("/user");
  }

  redirect("/login");
}