"use client";

import { Bell, Search } from "lucide-react";

import ThemeToggle from "@/components/theme/theme-toggle";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-[#EBCB4C]">
          Burney Real Estate
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          Administrator Dashboard
        </h1>

        <p className="mt-2 text-white/50">
          Manage leads, properties, developers and CRM integrations.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <Search className="h-4 w-4 text-white/50" />
          <input
            placeholder="Search..."
            className="bg-transparent text-sm outline-none"
          />
        </div>

        <button className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <Bell className="h-5 w-5" />
        </button>

        <ThemeToggle />
      </div>
    </div>
  );
}