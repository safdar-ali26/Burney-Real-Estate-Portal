/**
 * =====================================================
 * FILE: src/components/admin/admin-profile-dropdown.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium admin profile dropdown.
 *
 * FEATURES:
 * - Shows logged-in user's name
 * - Shows user role
 * - Profile links
 * - Logout action
 * =====================================================
 */

"use client";

import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminProfileDropdown() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Admin User";
  const userEmail = session?.user?.email || "admin@burneyrealestate.com";
  const userRole = (session?.user as any)?.role || "ADMIN";
  const profileImage = (session?.user as any)?.profileImage || "";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 shadow-sm transition hover:border-[#EBCB4C]/50 hover:bg-[#EBCB4C]/10">
          <Avatar className="h-9 w-9 border border-[#EBCB4C]/30">
            {profileImage ? (
              <AvatarImage src={profileImage} alt={userName} />
            ) : null}

            <AvatarFallback className="bg-[#EBCB4C]/15 text-sm font-semibold text-[#EBCB4C]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left xl:block">
            <p className="text-sm font-semibold text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userRole}</p>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-2xl border-border bg-card p-2 shadow-2xl"
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-[#EBCB4C]/30">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={userName} />
              ) : null}

              <AvatarFallback className="bg-[#EBCB4C]/15 font-semibold text-[#EBCB4C]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/administrator/my-profile"
            className="cursor-pointer rounded-xl"
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/administrator/account-settings"
            className="cursor-pointer rounded-xl"
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="cursor-pointer rounded-xl text-[#B99100] focus:text-[#B99100] dark:text-[#EBCB4C] dark:focus:text-[#EBCB4C]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
