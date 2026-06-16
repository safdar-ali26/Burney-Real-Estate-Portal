/**
 * =====================================================
 * FILE: prisma/seed.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Create the first Admin user in the database.
 *
 * LOGIN DETAILS:
 * Email: admin@burneyrealestate.com
 * Password: Admin@123
 *
 * IMPORTANT:
 * Change password after first login.
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

async function main() {
  console.log("Creating Admin User...");

  /**
   * Convert plain password into encrypted hash.
   * We never store plain passwords in database.
   */
  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  /**
   * Check if admin already exists.
   * This prevents duplicate admin accounts.
   */
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@burneyrealestate.com",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  /**
   * Create first admin user.
   */
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "info@burneyrealestate.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin created successfully.");
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