/**
 * =====================================================
 * FILE: src/components/providers/theme-provider.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Provides dark/light theme support for the whole website.
 *
 * PACKAGE:
 * next-themes
 * =====================================================
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}