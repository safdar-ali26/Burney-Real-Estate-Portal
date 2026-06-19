import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { updateUserAction } from "@/actions/update-user";
import { deleteUserAction } from "@/actions/delete-user";
import DeleteUserButton from "@/components/admin/delete-user-button";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user || user.role !== "USER") {
    notFound();
  }

  const updateUserWithId = updateUserAction.bind(null, user.id);
  const deleteUserWithId = deleteUserAction.bind(null, user.id);

  return (
    <AdminLayout title="Edit User" subtitle="Update website user account.">
      <form
        action={updateUserWithId}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <Link
              href="/administrator/users"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Link>

            <h2 className="mt-4 text-xl font-bold text-foreground">
              User Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update user details below. Leave password empty if you do not want
              to change it.
            </p>
          </div>

          <DeleteUserButton action={deleteUserWithId} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              name="name"
              required
              defaultValue={user.name || ""}
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
              defaultValue={user.email}
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
              Phone
            </label>
            <input
              name="phone"
              defaultValue={user.phone || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              WhatsApp
            </label>
            <input
              name="whatsapp"
              defaultValue={user.whatsapp || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUploadField
              label="Profile Image"
              name="profileImage"
              defaultValue={user.profileImage || ""}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={user.isActive}
                className="h-4 w-4 accent-[#EBCB4C]"
              />
              Active user account
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/administrator/users"
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