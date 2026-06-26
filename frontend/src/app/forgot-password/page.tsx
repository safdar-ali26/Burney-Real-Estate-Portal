"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

import { requestPasswordResetAction } from "@/actions/request-password-reset";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await requestPasswordResetAction(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setSent(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,203,76,0.12),transparent_35%)]" />

      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10">
            <ShieldCheck className="h-7 w-7 text-[#EBCB4C]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#EBCB4C]">
            Forgot Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Enter your email and we will send you a secure password reset link.
          </p>
        </div>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
            {error}
          </div>
        ) : null}

        {sent ? (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-center">
            <p className="text-sm font-bold text-green-300">
              Reset link sent successfully.
            </p>

            <p className="mt-2 text-xs leading-5 text-white/55">
              Please check your inbox. The link will expire in 15 minutes.
            </p>

            <Link
              href="/login"
              className="mt-5 inline-flex rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-4 py-3 text-xs font-bold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-xs text-white/55">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-[#EBCB4C]">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}