import AdminLayout from "@/components/admin/admin-layout";
import { updateAccountSettingsAction } from "@/actions/update-account-settings";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AccountSettingsPage() {
  const session = await requireRole("ADMIN");
  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return (
    <AdminLayout
      title="Account Settings"
      subtitle="Manage your login email and password."
    >
      <form
        action={updateAccountSettingsAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Login & Security
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your account email or change your password.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue={user.email}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Current Password
            </label>
            <input
              name="currentPassword"
              type="password"
              required
              placeholder="Enter current password to confirm changes"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="Leave empty if you do not want to change password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirm New Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-muted-foreground">
          For security, you must enter your current password before updating
          your email or password.
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Save Account Settings
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}