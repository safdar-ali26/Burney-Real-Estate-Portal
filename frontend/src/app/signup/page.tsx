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
  User,
} from "lucide-react";

import { signupUserAction } from "@/actions/signup-user";
import CustomPhoneInput from "@/components/ui/phone-input";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#^()_\-+=]/.test(password),
  };

  const passedChecks = Object.values(passwordChecks).filter(Boolean).length;
  const isPasswordStrong = passedChecks === 5;
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  let strengthLabel = "Very Weak";
  let strengthColor = "bg-red-500";
  let strengthWidth = "20%";

  if (passedChecks === 2) {
    strengthLabel = "Weak";
    strengthColor = "bg-orange-500";
    strengthWidth = "40%";
  }

  if (passedChecks === 3) {
    strengthLabel = "Fair";
    strengthColor = "bg-yellow-500";
    strengthWidth = "60%";
  }

  if (passedChecks === 4) {
    strengthLabel = "Strong";
    strengthColor = "bg-lime-500";
    strengthWidth = "80%";
  }

  if (passedChecks === 5) {
    strengthLabel = "Very Strong";
    strengthColor = "bg-green-500";
    strengthWidth = "100%";
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signupUserAction(formData);

    if (result?.error) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const email = String(formData.get("email") || "");

    setLoading(false);
    router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,203,76,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,203,76,0.12),transparent_35%)]" />

      <div className="absolute left-10 top-16 h-36 w-36 animate-pulse rounded-full bg-[#EBCB4C]/10 blur-3xl" />
      <div className="absolute bottom-14 right-16 h-48 w-48 animate-pulse rounded-full bg-[#EBCB4C]/10 blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden min-h-[620px] flex-col justify-between border-r border-white/10 bg-gradient-to-br from-[#EBCB4C]/15 via-transparent to-transparent p-8 lg:flex">
          <div>
            <div className="inline-flex rounded-xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
              Burney Real Estate
            </div>

            <h1 className="mt-7 max-w-xl text-4xl font-bold leading-tight">
              Create your
              <span className="block text-[#EBCB4C]">Property Account</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              Save favourite properties, compare listings and manage your real
              estate preferences through your personal Burney portal.
            </p>
          </div>

          <div className="grid gap-3">
            <FeatureCard
              title="Save Properties"
              text="Keep your favourite listings in one place."
            />
            <FeatureCard
              title="Compare Listings"
              text="Compare prices, size and locations easily."
            />
            <FeatureCard
              title="Smart Preferences"
              text="Get recommendations based on your needs."
            />
          </div>
        </section>

        <section className="p-5 sm:p-7">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 shadow-[0_0_35px_rgba(235,203,76,0.22)]">
                <Sparkles className="h-6 w-6 text-[#EBCB4C]" />
              </div>

              <h2 className="text-2xl font-bold text-[#EBCB4C]">
                Create Account
              </h2>

              <p className="mt-1 text-xs text-white/60">
                Sign up as a registered user.
              </p>
            </div>

            {error ? (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSignup} className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <InputField
                  icon={<User />}
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  required
                />

                <InputField
                  icon={<User />}
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </div>

              <InputField
                icon={<Mail />}
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />

              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">
                  Phone Number
                </label>

                <CustomPhoneInput
                  value={phone}
                  onChange={setPhone}
                  name="phone"
                  required
                />
              </div>

              <PasswordField
                label="Password"
                name="password"
                placeholder="Create password"
                value={password}
                onChange={setPassword}
                show={showPassword}
                onToggle={() => setShowPassword((current) => !current)}
              />
              <PasswordStrengthMeter
                passwordChecks={passwordChecks}
                strengthLabel={strengthLabel}
                strengthColor={strengthColor}
                strengthWidth={strengthWidth}
              />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((current) => !current)}
              />

              {confirmPassword ? (
                <p
                  className={`text-[11px] font-semibold ${
                    passwordsMatch ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "× Passwords do not match"}
                </p>
              ) : null}

              <label className="flex items-start gap-2 text-xs leading-5 text-white/60">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-3.5 w-3.5 accent-[#EBCB4C]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="#" className="font-semibold text-[#EBCB4C]">
                    Terms & Conditions
                  </Link>{" "}
                  and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || !isPasswordStrong || !passwordsMatch}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-4 py-3 text-xs font-bold text-black shadow-[0_0_30px_rgba(235,203,76,0.2)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Create Account"}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </button>
            </form>

            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] text-white/40">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:border-[#EBCB4C]/40 hover:bg-[#EBCB4C]/10 disabled:opacity-60"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                G
              </span>
              {googleLoading ? "Opening Google..." : "Continue with Google"}
            </button>

            <p className="mt-4 text-center text-xs text-white/55">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#EBCB4C] transition hover:opacity-80"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InputField({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-white/80">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 [&_svg]:h-3.5 [&_svg]:w-3.5">
          {icon}
        </span>

        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
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
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          type={show ? "text" : "password"}
          required
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-9 pr-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#EBCB4C]"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-[#EBCB4C]"
        >
          {show ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
function PasswordStrengthMeter({
  passwordChecks,
  strengthLabel,
  strengthColor,
  strengthWidth,
}: {
  passwordChecks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  strengthLabel: string;
  strengthColor: string;
  strengthWidth: string;
}) {
  const checks = [
    ["Minimum 8 characters", passwordChecks.length],
    ["Uppercase letter", passwordChecks.uppercase],
    ["Lowercase letter", passwordChecks.lowercase],
    ["Number", passwordChecks.number],
    ["Special character", passwordChecks.special],
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-white/60">
          Password Strength
        </p>

        <p className="text-[11px] font-bold text-[#EBCB4C]">{strengthLabel}</p>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
          style={{ width: strengthWidth }}
        />
      </div>

      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {checks.map(([label, passed]) => (
          <div key={String(label)} className="flex items-center gap-2">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                passed ? "bg-green-500 text-black" : "bg-white/10 text-white/35"
              }`}
            >
              {passed ? "✓" : "×"}
            </span>

            <p
              className={`text-[11px] ${
                passed ? "text-green-300" : "text-white/45"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs text-white/55">{text}</p>
    </div>
  );
}
