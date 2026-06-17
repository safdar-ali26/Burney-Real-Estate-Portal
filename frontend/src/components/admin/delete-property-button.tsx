"use client";

import { Trash2 } from "lucide-react";

export default function DeletePropertyButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <button
      type="button"
      onClick={async () => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this property?"
        );

        if (!confirmed) return;

        await action();
      }}
      className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        bg-red-500
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-red-600
      "
    >
      <Trash2 className="h-4 w-4" />
      Delete Property
    </button>
  );
}