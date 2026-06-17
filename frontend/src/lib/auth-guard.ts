/**
 * =====================================================
 * FILE: src/lib/auth-guard.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Helper functions for protected pages.
 *
 * FEATURES:
 * - Check if user is logged in
 * - Check user role
 * - Redirect unauthorized users
 * =====================================================
 */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";

/**
 * -----------------------------------------------------
 * GET CURRENT USER SESSION
 * -----------------------------------------------------
 * Returns current logged-in session.
 * If no session found, redirects to login.
 * -----------------------------------------------------
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

/**
 * -----------------------------------------------------
 * REQUIRE ROLE
 * -----------------------------------------------------
 * Use this function to protect pages by role.
 *
 * Example:
 * await requireRole("ADMIN")
 * await requireRole("AGENT")
 * -----------------------------------------------------
 */
export async function requireRole(role: "ADMIN" | "AGENT" | "USER") {
  const session = await requireAuth();

  const userRole = (session.user as any).role;

  if (userRole !== role) {
    redirect("/dashboard");
  }

  return session;
}