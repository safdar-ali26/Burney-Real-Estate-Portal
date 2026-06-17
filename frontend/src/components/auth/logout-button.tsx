/**
 * =====================================================
 * FILE: logout-button.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Logout button for authenticated users.
 *
 * FEATURES:
 * - Destroy session
 * - Redirect to login page
 * =====================================================
 */

"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
}