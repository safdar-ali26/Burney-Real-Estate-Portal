"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { resendSignupOtpAction } from "@/actions/resend-signup-otp";
import { verifySignupOtpAction } from "@/actions/verify-signup-otp";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function VerifySignupContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [resendSeconds, setResendSeconds] = useState(60);
  const [expirySeconds, setExpirySeconds] = useState(10 * 60);
  const [resendCount, setResendCount] = useState(0);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [shake, setShake] = useState(false);
  const [verified, setVerified] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = otpValues.join("");

  useEffect(() => {
    const timer = setInterval(() => {
      setResendSeconds((current) => Math.max(current - 1, 0));
      setExpirySeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function triggerWrongOtpAnimation() {
    setShake(true);
    setTimeout(() => setShake(false), 450);
  }

  async function verifyOtp(finalOtp: string) {
    if (finalOtp.length !== 6 || loading || verified) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", finalOtp);

    try {
      const result = await verifySignupOtpAction(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        setOtpValues(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        triggerWrongOtpAnimation();
        return;
      }

      setVerified(true);
      setSuccessMessage("Account verified successfully. Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 900);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      triggerWrongOtpAnimation();
    }
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    const nextValues = [...otpValues];
    nextValues[index] = digit;
    setOtpValues(nextValues);
    setError("");
    setSuccessMessage("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const finalOtp = nextValues.join("");

    if (finalOtp.length === 6) {
      verifyOtp(finalOtp);
    }
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const nextValues = ["", "", "", "", "", ""];

    pasted.split("").forEach((digit, index) => {
      nextValues[index] = digit;
    });

    setOtpValues(nextValues);
    setError("");
    setSuccessMessage("");

    const nextFocusIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();

    if (pasted.length === 6) {
      verifyOtp(pasted);
    }
  }

  async function handleManualSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await verifyOtp(otp);
  }

  async function handleResendOtp() {
    if (resendSeconds > 0 || resending || resendCount >= 5) return;

    setResending(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await resendSignupOtpAction(email);

      if (result?.error) {
        setError(result.error);
        setResending(false);
        triggerWrongOtpAnimation();
        return;
      }

      setOtpValues(["", "", "", "", "", ""]);
      setResendSeconds(60);
      setExpirySeconds(10 * 60);
      setResendCount((current) => current + 1);
      setSuccessMessage("A new OTP has been sent to your email.");
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error(error);
      setError("Could not resend OTP. Please try again.");
      triggerWrongOtpAnimation();
    }

    setResending(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      <style>{`
        @keyframes bre-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }

        @keyframes bre-pop {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .bre-shake {
          animation: bre-shake 0.45s ease-in-out;
        }

        .bre-pop {
          animation: bre-pop 0.35s ease-out;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,203,76,0.12),transparent_35%)]" />

      <div className="absolute left-10 top-16 h-40 w-40 animate-pulse rounded-full bg-[#EBCB4C]/10 blur-3xl" />
      <div className="absolute bottom-14 right-16 h-56 w-56 animate-pulse rounded-full bg-[#EBCB4C]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg rounded-[30px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
        <div className="text-center">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border shadow-[0_0_50px_rgba(235,203,76,0.25)] ${
              verified
                ? "border-green-500/30 bg-green-500/10"
                : "border-[#EBCB4C]/30 bg-[#EBCB4C]/10"
            }`}
          >
            {verified ? (
              <CheckCircle2 className="bre-pop h-8 w-8 text-green-400" />
            ) : (
              <ShieldCheck className="h-8 w-8 text-[#EBCB4C]" />
            )}
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-[#EBCB4C]">
            Email Verification
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {verified ? "Email Verified" : "Enter Verification Code"}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/60">
            We sent a 6-digit OTP to{" "}
            <span className="font-bold text-white">{email}</span>
          </p>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#EBCB4C]" />
            <div>
              <p className="text-[11px] text-white/45">OTP expires in</p>
              <p className="text-sm font-bold text-white">
                {formatTime(expirySeconds)}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[11px] text-white/45">Resend attempts</p>
            <p className="text-sm font-bold text-white">{resendCount}/5</p>
          </div>
        </div>

        {error ? (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <XCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {successMessage}
          </div>
        ) : null}

        <form onSubmit={handleManualSubmit} className="mt-7 space-y-6">
          <div className={`flex justify-center gap-3 ${shake ? "bre-shake" : ""}`}>
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                value={value}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                disabled={loading || verified}
                className={`h-14 w-12 rounded-2xl border text-center text-xl font-black outline-none transition sm:h-16 sm:w-14 sm:text-2xl ${
                  error
                    ? "border-red-500/40 bg-red-500/10 text-red-200"
                    : verified
                      ? "border-green-500/40 bg-green-500/10 text-green-300"
                      : "border-white/10 bg-white/10 text-white focus:border-[#EBCB4C] focus:bg-[#EBCB4C]/10"
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6 || !email || verified}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-4 text-sm font-bold text-black shadow-[0_0_35px_rgba(235,203,76,0.22)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verified
              ? "Verified"
              : loading
                ? "Verifying..."
                : "Verify Account"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row">
          <p className="text-xs text-white/55">Didn&apos;t receive the code?</p>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={
              resendSeconds > 0 ||
              resending ||
              resendCount >= 5 ||
              loading ||
              verified
            }
            className="inline-flex items-center gap-2 text-xs font-bold text-[#EBCB4C] transition hover:opacity-80 disabled:cursor-not-allowed disabled:text-white/35"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {resending
              ? "Sending..."
              : resendCount >= 5
                ? "Limit Reached"
                : resendSeconds > 0
                  ? `Resend in ${resendSeconds}s`
                  : "Resend OTP"}
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-white/55">
          Wrong email?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#EBCB4C] transition hover:opacity-80"
          >
            Change Email
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function VerifySignupPage() {
  return (
    <Suspense>
      <VerifySignupContent />
    </Suspense>
  );
}