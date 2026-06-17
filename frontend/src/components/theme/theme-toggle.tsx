"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppTheme } from "@/components/providers/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useAppTheme();

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