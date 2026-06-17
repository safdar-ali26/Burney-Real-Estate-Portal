/**
 * =====================================================
 * FILE: src/components/theme/theme-toggle.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Dark / Light mode toggle button.
 * =====================================================
 */

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border-border/60"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[#EBCB4C]" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}