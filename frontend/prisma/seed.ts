/**
 * =====================================================
 * FILE: prisma/seed.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Create test users for development:
 * - Admin
 * - Agent
 * - Normal User
 *
 * IMPORTANT:
 * These are test credentials for local development.
 * Passwords should be changed before production.
 * =====================================================
 */

import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * -----------------------------------------------------
 * POSTGRES CONNECTION POOL
 * -----------------------------------------------------
 * Reads DATABASE_URL from .env file.
 * -----------------------------------------------------
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * -----------------------------------------------------
 * PRISMA ADAPTER
 * -----------------------------------------------------
 * Required for Prisma 7 PostgreSQL connection.
 * -----------------------------------------------------
 */
const adapter = new PrismaPg(pool);

/**
 * -----------------------------------------------------
 * PRISMA CLIENT
 * -----------------------------------------------------
 * Prisma 7 requires adapter inside PrismaClient.
 * -----------------------------------------------------
 */
const prisma = new PrismaClient({
  adapter,
});

/**
 * -----------------------------------------------------
 * CREATE USER IF NOT EXISTS
 * -----------------------------------------------------
 * This helper prevents duplicate users.
 * -----------------------------------------------------
 */
async function createUserIfNotExists({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "AGENT" | "USER";
}) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.log(`${role} already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  console.log(`${role} created successfully: ${email}`);
}

/**
 * -----------------------------------------------------
 * MAIN SEED FUNCTION
 * -----------------------------------------------------
 * Creates default development users.
 * -----------------------------------------------------
 */
async function main() {
  console.log("Starting database seed...");

  await createUserIfNotExists({
    name: "Burney Admin",
    email: "admin@burneyrealestate.com",
    password: "Admin@123",
    role: "ADMIN",
  });

  await createUserIfNotExists({
    name: "Safdar Agent",
    email: "agent@burneyrealestate.com",
    password: "Agent@123",
    role: "AGENT",
  });

  await createUserIfNotExists({
    name: "Test User",
    email: "user@burneyrealestate.com",
    password: "User@123",
    role: "USER",
  });

  console.log("Database seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });