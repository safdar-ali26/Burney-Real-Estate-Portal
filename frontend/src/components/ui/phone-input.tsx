"use client";

import "react-phone-number-input/style.css";

import { useEffect, useState } from "react";
import PhoneInput, { Country } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";

function detectCountry(): Country {
  if (typeof window === "undefined") return "AE";

  const locale = navigator.language || "";
  const region = locale.split("-")[1]?.toUpperCase();

  const supportedRegions: Country[] = [
    "AE",
    "PK",
    "IN",
    "SA",
    "QA",
    "OM",
    "KW",
    "BH",
    "GB",
    "US",
  ];

  if (region && supportedRegions.includes(region as Country)) {
    return region as Country;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes("Dubai")) return "AE";
  if (timezone.includes("Karachi")) return "PK";
  if (timezone.includes("Kolkata")) return "IN";
  if (timezone.includes("Riyadh")) return "SA";
  if (timezone.includes("Qatar")) return "QA";
  if (timezone.includes("Muscat")) return "OM";
  if (timezone.includes("Kuwait")) return "KW";
  if (timezone.includes("Bahrain")) return "BH";
  if (timezone.includes("London")) return "GB";

  return "AE";
}

export default function CustomPhoneInput({
  value,
  onChange,
  name = "phone",
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
}) {
  const [defaultCountry, setDefaultCountry] = useState<Country>("AE");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setDefaultCountry(detectCountry());
  }, []);

  const hasValue = value.trim().length > 0;
  const isValid = hasValue && isValidPhoneNumber(value);
  const showInvalid = touched && hasValue && !isValid;
  const showValid = touched && isValid;

  return (
    <div className="space-y-1.5">
      <div
        className={`phone-input-wrapper ${
          showInvalid
            ? "phone-input-error"
            : showValid
              ? "phone-input-success"
              : ""
        }`}
      >
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          value={value}
          onChange={(value) => onChange(value || "")}
          onBlur={() => setTouched(true)}
          placeholder="Enter phone number"
          className="phone-input"
        />

        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      </div>

      {showInvalid ? (
        <p className="text-[11px] font-semibold text-red-300">
          × Please enter a valid phone number.
        </p>
      ) : null}

      {showValid ? (
        <p className="text-[11px] font-semibold text-green-300">
          ✓ Valid phone number
        </p>
      ) : null}

      <style jsx global>{`
        .phone-input-wrapper {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.1);
          transition: 0.2s ease;
        }

        .phone-input-wrapper:focus-within {
          border-color: #ebcb4c;
          background: rgba(235, 203, 76, 0.08);
        }

        .phone-input-error {
          border-color: rgba(239, 68, 68, 0.6);
          background: rgba(239, 68, 68, 0.08);
        }

        .phone-input-success {
          border-color: rgba(34, 197, 94, 0.55);
          background: rgba(34, 197, 94, 0.08);
        }

        .phone-input {
          width: 100%;
          padding: 0.75rem;
          color: white;
        }

        .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 0.875rem;
        }

        .PhoneInputInput::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .PhoneInputCountry {
          margin-right: 0.65rem;
        }

        .PhoneInputCountrySelect {
          color: black;
        }

        .PhoneInputCountryIcon {
          border-radius: 4px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}