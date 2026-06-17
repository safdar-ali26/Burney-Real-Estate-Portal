/**
 * =====================================================
 * FILE: session-provider.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Wrap application with NextAuth SessionProvider.
 *
 * This allows:
 * - Login state
 * - Logout
 * - Session access
 * =====================================================
 */

"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}