/**
 * =====================================================
 * FILE: theme-logo.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Switches logo based on dark/light theme.
 * =====================================================
 */

"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /**
   * Prevent hydration mismatch because theme is only known
   * after client mounts.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[42px] w-[42px]" />;
  }

  const logoSrc =
    resolvedTheme === "light" ? "/logo-black.png" : "/logo.png";

  return (
    <Image
      src={logoSrc}
      alt="Burney Real Estate"
      width={42}
      height={42}
      className="object-contain"
      priority
    />
  );
}