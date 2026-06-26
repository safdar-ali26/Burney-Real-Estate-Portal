/**
 * =====================================================
 * FILE: src/app/login/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium animated login page.
 * Supports credentials login, password visibility,
 * signup link, forgot password link, and Google login UI.
 * =====================================================
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,203,76,0.12),transparent_35%)]" />

      <div className="absolute left-10 top-16 h-40 w-40 animate-pulse rounded-full border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 blur-2xl" />
      <div className="absolute bottom-14 right-16 h-56 w-56 animate-pulse rounded-full border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 blur-3xl" />

      {/* Floating 3D elements */}
      <div className="absolute left-[12%] top-[22%] hidden h-24 w-24 rotate-12 rounded-3xl border border-[#EBCB4C]/30 bg-white/5 shadow-[0_0_60px_rgba(235,203,76,0.18)] backdrop-blur-xl lg:block" />
      <div className="absolute right-[14%] bottom-[24%] hidden h-28 w-28 -rotate-12 rounded-full border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_70px_rgba(235,203,76,0.22)] backdrop-blur-xl lg:block" />
      <div className="absolute right-[22%] top-[18%] hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70 shadow-2xl backdrop-blur-xl xl:block">
        <Sparkles className="mr-2 inline h-4 w-4 text-[#EBCB4C]" />
        Premium Portal
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left content */}
        <section className="hidden min-h-[620px] flex-col justify-between border-r border-white/10 bg-gradient-to-br from-[#EBCB4C]/15 via-transparent to-transparent p-10 lg:flex">
          <div>
            <div className="inline-flex rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#EBCB4C]">
              Burney Real Estate
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
              Welcome to your
              <span className="block text-[#EBCB4C]">
                Real Estate Portal
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              Manage properties, leads, preferences and saved listings through
              one premium dashboard built for Burney Real Estate.
            </p>
          </div>

          <div className="grid gap-4">
            <FeatureCard title="Admin Portal" text="CRM, properties, agents and leads." />
            <FeatureCard title="Agent Portal" text="Secondary listings and assigned leads." />
            <FeatureCard title="User Portal" text="Saved properties, compare and preferences." />
          </div>
        </section>

        {/* Login card */}
        <section className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_50px_rgba(235,203,76,0.25)]">
                <KeyRound className="h-8 w-8 text-[#EBCB4C]" />
              </div>

              <h2 className="text-3xl font-bold text-[#EBCB4C]">
                Login Account
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {error ? (
              <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="admin@burneyrealestate.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-11 pr-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-white/80">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#EBCB4C] transition hover:opacity-80"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-11 pr-12 text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-[#EBCB4C]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-4 text-sm font-bold text-black shadow-[0_0_35px_rgba(235,203,76,0.22)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/40">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm font-bold text-white transition hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10 disabled:opacity-60"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                G
              </span>
              {googleLoading ? "Opening Google..." : "Continue with Google"}
            </button>

            <p className="mt-7 text-center text-sm text-white/55">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#EBCB4C] transition hover:opacity-80"
              >
                Create account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
      <h3 className="font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/55">{text}</p>
    </div>
  );
}