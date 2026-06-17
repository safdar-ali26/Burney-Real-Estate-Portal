/**
 * =====================================================
 * FILE: logout-button.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium logout button matching Burney branding.
 * =====================================================
 */

"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-[#EBCB4C]/60 hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}