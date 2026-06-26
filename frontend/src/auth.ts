/**
 * =====================================================
 * FILE: src/auth.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * NextAuth v4 configuration.
 * Supports:
 * - Email/password login
 * - Google login/signup
 * - Role based session
 * =====================================================
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        if (!user.isActive) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        } as any;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email?.trim().toLowerCase();

        if (!email) {
          return false;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || "Google User",
              email,
              profileImage: user.image || null,
              role: "USER",
              isActive: true,
            },
          });
        } else {
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              name: existingUser.name || user.name,
              profileImage: existingUser.profileImage || user.image,
            },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.profileImage = dbUser.profileImage;
        }
      }

      if (user && !token.id) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.profileImage = (user as any).profileImage;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).profileImage = token.profileImage;
      }

      return session;
    },
  },
};