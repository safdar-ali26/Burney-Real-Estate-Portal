/**
 * =====================================================
 * FILE: src/app/api/auth/[...nextauth]/route.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * NextAuth v4 route handler for App Router.
 * =====================================================
 */

import NextAuth from "next-auth";
import { authOptions } from "@/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };