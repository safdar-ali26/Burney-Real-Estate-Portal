import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { updateAgentAction } from "@/actions/update-agent";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAgentPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const agent = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!agent || agent.role !== "AGENT") {
    notFound();
  }

  const updateAgentWithId = updateAgentAction.bind(null, agent.id);

  return (
    <AdminLayout title="Edit Agent" subtitle="Update agent profile and access.">
      <form
        action={updateAgentWithId}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <Link
            href={`/administrator/agents/${agent.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agent Details
          </Link>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Agent Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update agent details below. Leave password empty if you do not want
            to change it.
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
              defaultValue={agent.name || ""}
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
              defaultValue={agent.email}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              New Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Leave empty to keep current password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Designation
            </label>
            <input
              name="designation"
              defaultValue={agent.designation || "Property Consultant"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Phone
            </label>
            <input
              name="phone"
              defaultValue={agent.phone || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              WhatsApp
            </label>
            <input
              name="whatsapp"
              defaultValue={agent.whatsapp || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUploadField
              label="Profile Image"
              name="profileImage"
              defaultValue={agent.profileImage || ""}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={agent.isActive}
                className="h-4 w-4 accent-[#EBCB4C]"
              />
              Active agent account
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/administrator/agents/${agent.id}`}
            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}