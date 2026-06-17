/**
 * =====================================================
 * FILE: stats-card.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium animated KPI card.
 * =====================================================
 */

"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

export default function StatsCard({
  title,
  value,
  change,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-xl
      "
    >
      {/* Gold Glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#EBCB4C]/10 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h3>

          <p className="mt-2 text-sm text-[#EBCB4C]">
            {change}
          </p>
        </div>
      </div>
    </motion.div>
  );
}