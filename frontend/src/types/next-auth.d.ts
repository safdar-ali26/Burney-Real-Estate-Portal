/**
 * =====================================================
 * FILE: src/types/next-auth.d.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Extend NextAuth session types.
 *
 * This allows us to access:
 * - session.user.id
 * - session.user.role
 * =====================================================
 */

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}