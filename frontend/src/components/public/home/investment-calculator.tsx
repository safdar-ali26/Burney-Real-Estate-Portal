"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle, Phone, Wallet } from "lucide-react";

import Container from "@/components/public/ui/container";
import Section from "@/components/public/ui/section";

function formatAED(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InvestmentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(1500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [annualRent, setAnnualRent] = useState(90000);

  const result = useMemo(() => {
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPayment;

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;

    const monthlyMortgage =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : loanAmount / totalMonths;

    const dldFee = propertyPrice * 0.04;
    const trusteeFee = 4200;
    const registrationFee = propertyPrice >= 500000 ? 4000 : 2000;
    const totalUpfrontCost =
      downPayment + dldFee + trusteeFee + registrationFee;

    const totalCost = propertyPrice + dldFee + trusteeFee + registrationFee;
    const roi = propertyPrice > 0 ? (annualRent / propertyPrice) * 100 : 0;

    return {
      downPayment,
      loanAmount,
      monthlyMortgage,
      dldFee,
      trusteeFee,
      registrationFee,
      totalUpfrontCost,
      totalCost,
      roi,
    };
  }, [propertyPrice, downPaymentPercent, years, interestRate, annualRent]);

  return (
    <Section className="bg-black">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
              <Calculator className="h-3.5 w-3.5" />
              Investment Calculator
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-white md:text-4xl">
              Estimate your Dubai property investment.
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 md:text-sm">
              Calculate monthly mortgage, upfront cost, DLD fees and estimated
              rental ROI before speaking with our advisors.
            </p>

            <div className="mt-8 grid gap-4">
              <InputField
                label="Property Price"
                value={propertyPrice}
                onChange={setPropertyPrice}
                prefix="AED"
                min={100000}
                step={50000}
              />

              <InputField
                label="Annual Expected Rent"
                value={annualRent}
                onChange={setAnnualRent}
                prefix="AED"
                min={0}
                step={5000}
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <InputField
                  label="Down Payment"
                  value={downPaymentPercent}
                  onChange={setDownPaymentPercent}
                  suffix="%"
                  min={5}
                  max={80}
                  step={5}
                />

                <InputField
                  label="Mortgage Years"
                  value={years}
                  onChange={setYears}
                  suffix="Years"
                  min={1}
                  max={30}
                  step={1}
                />

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  onChange={setInterestRate}
                  suffix="%"
                  min={1}
                  max={12}
                  step={0.1}
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#EBCB4C]/20 bg-[#080808] p-6 shadow-[0_0_35px_rgba(235,203,76,0.10)] md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBCB4C]/10 text-[#EBCB4C]">
                <Wallet className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
                  Estimated Result
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Investment Summary
                </h3>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ResultCard
                label="Monthly Mortgage"
                value={formatAED(result.monthlyMortgage)}
                highlight
              />
              <ResultCard
                label="Down Payment"
                value={formatAED(result.downPayment)}
              />
              <ResultCard label="DLD Fee 4%" value={formatAED(result.dldFee)} />
              <ResultCard
                label="Upfront Cost"
                value={formatAED(result.totalUpfrontCost)}
              />
              <ResultCard
                label="Total Cost"
                value={formatAED(result.totalCost)}
              />
              <ResultCard
                label="Estimated ROI"
                value={`${result.roi.toFixed(2)}%`}
                highlight
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-semibold text-white">Need Help?</p>
              <p className="mt-2 text-xs leading-6 text-white/55">
                Speak with Burney Real Estate advisor for exact mortgage,
                payment plan and investment breakdown.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/971506486626"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#EBCB4C] px-4 py-2.5 text-xs font-bold text-black transition hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Talk to Advisor
                </a>

                <a
                  href="tel:+971506486626"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#EBCB4C]/40 hover:text-[#EBCB4C]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
                </a>
              </div>
            </div>

            <p className="mt-4 text-[10px] leading-5 text-white/35">
              Disclaimer: This calculator provides estimates only. Actual bank
              approvals, fees and rates may vary.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-white/60">
        {label}
      </span>

      <div className="flex h-11 items-center overflow-hidden rounded-xl border border-white/10 bg-black/35 focus-within:border-[#EBCB4C]">
        {prefix ? (
          <span className="border-r border-white/10 px-3 text-[11px] font-bold text-[#EBCB4C]">
            {prefix}
          </span>
        ) : null}

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none"
        />

        {suffix ? (
          <span className="border-l border-white/10 px-3 text-[11px] font-bold text-white/45">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-[#EBCB4C]/30 bg-[#EBCB4C]/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-bold ${
          highlight ? "text-[#EBCB4C]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}