"use client";

import { Trash2 } from "lucide-react";

interface DeleteAgentButtonProps {
  action: () => Promise<void>;
}

export default function DeleteAgentButton({ action }: DeleteAgentButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this agent? This action cannot be undone."
    );

    if (!confirmed) return;

    await action();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
    >
      <Trash2 className="h-4 w-4" />
      Delete Agent
    </button>
  );
}