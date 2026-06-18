import Link from "next/link";

import AdminLayout from "@/components/admin/admin-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { createAgentAction } from "@/actions/create-agent";
import { requireRole } from "@/lib/auth-guard";

export default async function AddAgentPage() {
  await requireRole("ADMIN");

  return (
    <AdminLayout
      title="Add Agent"
      subtitle="Create a new property consultant account."
    >
      <form
        action={createAgentAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <Link
            href="/administrator/agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            ← Back to Agents
          </Link>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Agent Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add agent details and login credentials below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              name="name"
              required
              placeholder="Example: Safdar Ali"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="agent@burneyrealestate.com"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Create password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Designation
            </label>
            <input
              name="designation"
              placeholder="Property Consultant"
              defaultValue="Property Consultant"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Phone
            </label>
            <input
              name="phone"
              placeholder="+971 50 000 0000"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              WhatsApp
            </label>
            <input
              name="whatsapp"
              placeholder="+971 50 000 0000"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUploadField label="Profile Image" name="profileImage" />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#EBCB4C]"
              />
              Active agent account
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/administrator/agents"
            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Create Agent
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}