import Image from "next/image";

import AdminLayout from "@/components/admin/admin-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { updateMyProfileAction } from "@/actions/update-my-profile";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function MyProfilePage() {
  const session = await requireRole("ADMIN");

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <AdminLayout
      title="My Profile"
      subtitle="Manage your personal profile information."
    >
      <form
        action={updateMyProfileAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your name, contact information and profile image.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-background p-5">
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-muted-foreground">
                  {user.name?.charAt(0) || "A"}
                </span>
              )}
            </div>

            <div className="mt-5 text-center">
              <h3 className="text-lg font-bold text-foreground">
                {user.name || "Admin User"}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {user.designation || "Administrator"}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-[#EBCB4C]/10 px-3 py-1 text-xs font-bold text-[#EBCB4C]">
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-2 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                name="name"
                defaultValue={user.name || ""}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Designation
              </label>
              <input
                name="designation"
                defaultValue={user.designation || "Administrator"}
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
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Save Profile
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}