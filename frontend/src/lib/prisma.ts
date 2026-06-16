/**
 * =====================================================
 * FILE: src/lib/prisma.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Create a single Prisma Client instance for the app.
 *
 * IMPORTANT:
 * Prisma 7 requires a database driver adapter.
 * For PostgreSQL/Supabase, we use:
 * - pg
 * - @prisma/adapter-pg
 *
 * This file prevents multiple database connections
 * during Next.js development hot reload.
 * =====================================================
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * -----------------------------------------------------
 * POSTGRES CONNECTION POOL
 * -----------------------------------------------------
 * DATABASE_URL comes from .env file.
 * This connects Prisma to Supabase PostgreSQL.
 * -----------------------------------------------------
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * -----------------------------------------------------
 * PRISMA POSTGRES ADAPTER
 * -----------------------------------------------------
 * Prisma 7 needs this adapter to talk to PostgreSQL.
 * -----------------------------------------------------
 */
const adapter = new PrismaPg(pool);

/**
 * -----------------------------------------------------
 * GLOBAL PRISMA INSTANCE
 * -----------------------------------------------------
 * Prevents creating multiple PrismaClient instances
 * during development.
 * -----------------------------------------------------
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * -----------------------------------------------------
 * PRISMA CLIENT
 * -----------------------------------------------------
 * We pass the PostgreSQL adapter here.
 * This is required in Prisma 7.
 * -----------------------------------------------------
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}