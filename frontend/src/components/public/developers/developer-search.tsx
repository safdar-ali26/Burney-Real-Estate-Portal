"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Loader2, Search } from "lucide-react";

export default function DeveloperSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      startTransition(() => {
        router.replace(`/developers?${params.toString()}`, { scroll: false });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [search, router, searchParams]);

  return (
    <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/35 p-2">
      <Search className="ml-3 h-4 w-4 text-white/40" />

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search developer..."
        className="h-10 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/35"
      />

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBCB4C] text-black">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
    </div>
  );
}
