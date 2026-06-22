"use client";

import { useState } from "react";

function cleanDescription(description?: string | null) {
  if (!description) return "No description available.";

  return description.replaceAll("#####", "").replaceAll("####", "").trim();
}

export default function ReadMoreDescription({
  description,
}: {
  description?: string | null;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="rounded-3xl border border-border bg-card p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-foreground">About this project</h2>

      <div
        className="mt-8 overflow-hidden"
        style={{
          maxHeight: isExpanded ? "none" : "128px",
        }}
      >
        <p className="whitespace-pre-line text-base leading-8 text-foreground">
          {cleanDescription(description)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#EBCB4C]"
      >
        {isExpanded ? "Read Less" : "Read More"}
        <span>{isExpanded ? "⌃" : "⌄"}</span>
      </button>
    </section>
  );
}
