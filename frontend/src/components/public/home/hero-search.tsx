"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Search } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

export default function HeroSearch({
  emirates,
  developers,
}: {
  emirates: Option[];
  districts: Option[];
  developers: Option[];
  types: Option[];
  bedrooms: Option[];
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [emirate, setEmirate] = useState("");
  const [developerId, setDeveloperId] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (emirate) params.set("emirate", emirate);
    if (developerId) params.set("developerId", developerId);

    router.push(`/off-plan?${params.toString()}`);
  }

  return (
    <div className="relative mt-6 w-full max-w-[760px] rounded-2xl border border-white/10 bg-black/40 p-2 shadow-[0_0_22px_rgba(235,203,76,0.12)] backdrop-blur-xl">
      <div className="grid gap-2 md:grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr]">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search project, area or developer"
        />

        <SearchSelect
          icon={<MapPin />}
          value={emirate}
          onChange={setEmirate}
          options={emirates}
          placeholder="Emirate"
        />

        <SearchSelect
          icon={<Building2 />}
          value={developerId}
          onChange={setDeveloperId}
          options={developers}
          placeholder="Developer"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#EBCB4C] px-4 text-[11px] font-bold text-black transition hover:opacity-90"
        >
          <Search className="h-3.5 w-3.5" />
          Search
        </button>
      </div>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3">
      <Search className="h-3.5 w-3.5 text-white/45" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[11px] text-white outline-none placeholder:text-white/45"
      />
    </div>
  );
}

function SearchSelect({
  icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
}) {
  return (
    <div className="relative flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-black/45 px-3">
      <span className="text-[#EBCB4C] [&_svg]:h-3.5 [&_svg]:w-3.5">
        {icon}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-transparent text-[11px] font-medium text-white outline-none"
      >
        <option value="" className="bg-black text-white">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-black text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}