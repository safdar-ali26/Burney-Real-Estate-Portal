"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";

import { resetPasswordAction } from "@/actions/reset-password";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    formData.append("token", token);

    const result = await resetPasswordAction(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,203,76,0.12),transparent_35%)]" />

      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10">
            <KeyRound className="h-7 w-7 text-[#EBCB4C]" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#EBCB4C]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Create a new password for your Burney Real Estate account.
          </p>
        </div>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-center">
            <p className="text-sm font-bold text-green-300">
              Password updated successfully.
            </p>

            <Link
              href="/login"
              className="mt-5 inline-flex rounded-xl bg-[#EBCB4C] px-5 py-3 text-xs font-bold text-black"
            >
              Login Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <PasswordField
              label="New Password"
              name="password"
              show={showPassword}
              onToggle={() => setShowPassword((current) => !current)}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((current) => !current)}
            />

            <button
              type="submit"
              disabled={loading || !token}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-4 py-3 text-xs font-bold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

function PasswordField({
  label,
  name,
  show,
  onToggle,
}: {
  label: string;
  name: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-white/80">
        {label}
      </label>

      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />

        <input
          name={name}
          type={show ? "text" : "password"}
          required
          placeholder="Enter password"
          className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-9 pr-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-[#EBCB4C]"
        >
          {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}