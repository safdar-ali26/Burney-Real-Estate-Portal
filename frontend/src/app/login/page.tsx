/**
 * =====================================================
 * FILE: src/app/login/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Client-side login page for Admin, Agents, and Users.
 *
 * WHY CLIENT SIDE?
 * This uses next-auth/react signIn, which is simpler
 * and more stable for credentials login testing.
 * =====================================================
 */

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Stores loading state while login request is processing
  const [loading, setLoading] = useState(false);

  // Stores error message if login fails
  const [error, setError] = useState("");

  /**
   * -----------------------------------------------------
   * HANDLE LOGIN
   * -----------------------------------------------------
   * This function runs when user submits login form.
   * It sends email/password to NextAuth Credentials Provider.
   * -----------------------------------------------------
   */
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#EBCB4C]">
            Burney Real Estate
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Login to your account
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/80">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="admin@burneyrealestate.com"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/80">
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              placeholder="Enter password"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#EBCB4C] px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}