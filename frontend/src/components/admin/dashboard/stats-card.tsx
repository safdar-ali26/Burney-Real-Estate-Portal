/**
 * =====================================================
 * FILE: stats-card.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium animated KPI card for admin dashboard.
 *
 * FEATURES:
 * - Dark / Light mode compatible
 * - Safe icon handling inside client component
 * - Gold brand glow using #EBCB4C
 * - 3D hover animation
 * =====================================================
 */

"use client";

import { motion } from "framer-motion";
import {
  Building2,
  FolderKanban,
  TrendingUp,
  UserCog,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

/**
 * -----------------------------------------------------
 * GET CARD ICON
 * -----------------------------------------------------
 * Selects icon based on card title.
 * This avoids passing icon components from Server Component
 * to Client Component.
 * -----------------------------------------------------
 */
function getCardIcon(title: string) {
  if (title.includes("Properties")) {
    return FolderKanban;
  }

  if (title.includes("Developers")) {
    return Building2;
  }

  if (title.includes("Leads")) {
    return TrendingUp;
  }

  if (title.includes("Agents")) {
    return UserCog;
  }

  return TrendingUp;
}

export default function StatsCard({
  title,
  value,
  change,
}: StatsCardProps) {
  const Icon = getCardIcon(title);

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.025,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-xl
        backdrop-blur-xl
        transition
      "
    >
      {/* Gold radial glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#EBCB4C]/15 blur-3xl transition group-hover:bg-[#EBCB4C]/25" />

      {/* Premium hover gradient border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#EBCB4C]/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

      {/* Soft bottom depth effect */}
      <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#EBCB4C]/40 to-transparent opacity-40" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-3 text-4xl font-bold text-foreground">
            {value}
          </h3>

          <p className="mt-2 text-sm font-medium text-[#EBCB4C]">
            {change}
          </p>
        </div>

        <div className="rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-3 shadow-[0_0_30px_rgba(235,203,76,0.12)]">
          <Icon className="h-6 w-6 text-[#EBCB4C]" />
        </div>
      </div>
    </motion.div>
  );
}