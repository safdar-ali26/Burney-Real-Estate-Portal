"use client";

import { Trash2 } from "lucide-react";

interface DeleteUserButtonProps {
  action: () => Promise<void>;
}

export default function DeleteUserButton({ action }: DeleteUserButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this user? This action cannot be undone."
    );

    if (!confirmed) return;

    await action();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  );
}