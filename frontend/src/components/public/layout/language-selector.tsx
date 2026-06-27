"use client";

import { useState } from "react";
import { X } from "lucide-react";

const languages = [
  ["🇬🇧", "English"],
  ["🇦🇪", "Arabic"],
  ["🇷🇺", "Russian"],
  ["🇮🇳", "Hindi"],
  ["🇵🇰", "Urdu"],
  ["🇨🇳", "Chinese"],
  ["🇫🇷", "French"],
  ["🇩🇪", "German"],
  ["🇪🇸", "Spanish"],
  ["🇮🇹", "Italian"],
  ["🇹🇷", "Turkish"],
  ["🇵🇹", "Portuguese"],
  ["🇯🇵", "Japanese"],
  ["🇰🇷", "Korean"],
  ["🇳🇱", "Dutch"],
  ["🇸🇪", "Swedish"],
  ["🇵🇱", "Polish"],
  ["🇺🇦", "Ukrainian"],
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]"
      >
        <span>🇬🇧</span>
        English
      </button>

      {open ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl rounded-2xl bg-white p-7 text-black shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 text-slate-500 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {languages.map(([flag, name]) => (
                <button
                  key={name}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
                >
                  <span className="text-xl">{flag}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}