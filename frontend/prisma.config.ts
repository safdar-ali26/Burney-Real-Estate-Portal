/**
 * =====================================================
 * FILE: prisma.config.ts
 * PROJECT: Burney Real Estate Portal
 * PURPOSE:
 * Prisma 7 configuration file.
 *
 * In Prisma 7, database connection URL is configured
 * here instead of inside schema.prisma.
 * =====================================================
 */

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  /**
   * Prisma schema file location
   */
  schema: "prisma/schema.prisma",

  /**
   * Migration files location
   */
  migrations: {
    path: "prisma/migrations",
  },

  /**
   * Database connection URL
   * This reads DATABASE_URL from .env file.
   */
  datasource: {
    url: env("DATABASE_URL"),
  },
});