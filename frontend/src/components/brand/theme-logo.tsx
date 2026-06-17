"use client";

import Image from "next/image";
import { useAppTheme } from "@/components/providers/theme-provider";

export default function ThemeLogo() {
  const { theme } = useAppTheme();

  const logoSrc = theme === "light" ? "/logo-black.png" : "/logo.png";

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