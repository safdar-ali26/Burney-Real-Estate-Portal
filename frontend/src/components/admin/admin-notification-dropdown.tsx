/**
 * =====================================================
 * FILE: src/components/admin/admin-notification-dropdown.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium notification dropdown for admin dashboard.
 *
 * FEATURES:
 * - Notification bell
 * - Unread indicator
 * - Recent system alerts
 * - Theme compatible UI
 * =====================================================
 */

"use client";

import { Bell, CheckCircle2, Clock, Database, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Temporary static notifications.
 * Later we will replace this with real notifications from Supabase.
 */
const notifications = [
  {
    title: "Authentication Active",
    description: "Admin, Agent and User login system is working.",
    time: "Today",
    icon: CheckCircle2,
  },
  {
    title: "Database Connected",
    description: "Supabase and Prisma connection is active.",
    time: "Today",
    icon: Database,
  },
  {
    title: "Agent User Created",
    description: "Test agent account has been added successfully.",
    time: "Today",
    icon: UserPlus,
  },
  {
    title: "CRM Sync Pending",
    description: "Leadrat off-plan sync will be configured soon.",
    time: "Pending",
    icon: Clock,
  },
];

export default function AdminNotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <button className="relative rounded-2xl border border-border bg-card p-2.5 text-foreground shadow-sm transition hover:border-[#EBCB4C]/50 hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]">
          <Bell className="h-5 w-5" />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EBCB4C] text-[10px] font-bold text-black">
            3
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 rounded-2xl border-border bg-card p-2 shadow-2xl"
      >
        <DropdownMenuLabel>
          <div>
            <p className="text-base font-semibold text-foreground">
              Notifications
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Latest admin portal updates
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="space-y-2 p-1">
          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                key={notification.title}
                className="rounded-2xl border border-border bg-background p-4 transition hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">
                        {notification.title}
                      </p>

                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        <button className="w-full rounded-xl px-3 py-2 text-sm font-medium text-[#8A6A00] transition hover:bg-[#EBCB4C]/10 dark:text-[#EBCB4C]">
          View all notifications
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}