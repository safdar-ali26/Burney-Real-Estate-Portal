import Image from "next/image";
import { Mail, Phone, UserRound } from "lucide-react";

import UserLayout from "@/components/user/user-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { userUpdateProfileAction } from "@/actions/user-update-profile";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function UserProfilePage() {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return (
    <UserLayout
      title="My Profile"
      subtitle="View and update your personal account information."
    >
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-[#EBCB4C]/40 bg-muted shadow-xl">
              {user.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserRound className="h-16 w-16 text-[#EBCB4C]" />
              )}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-foreground">
              {user.name || "Registered User"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Registered User
            </p>

            <div className="mt-6 w-full space-y-3 text-left">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
                <Mail className="h-4 w-4 text-[#EBCB4C]" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
                <Phone className="h-4 w-4 text-[#EBCB4C]" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-semibold text-foreground">
                    {user.phone || "-"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBCB4C]">
                  Account Status
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {user.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <form
          action={userUpdateProfileAction}
          className="rounded-3xl border border-border bg-card p-6 shadow-xl"
        >
          <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your display information below.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <input
                name="name"
                required
                defaultValue={user.name || ""}
                className="input-style"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <input
                name="phone"
                defaultValue={user.phone || ""}
                className="input-style"
              />
            </div>

            <div>
              <Label>WhatsApp</Label>
              <input
                name="whatsapp"
                defaultValue={user.whatsapp || ""}
                className="input-style"
              />
            </div>

            <div>
              <Label>Email</Label>
              <input
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-2xl border border-border bg-muted px-4 py-3 text-muted-foreground outline-none"
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

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-foreground">
      {children}
    </label>
  );
}