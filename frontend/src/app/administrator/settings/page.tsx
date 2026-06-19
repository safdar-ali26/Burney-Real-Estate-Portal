import AdminLayout from "@/components/admin/admin-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import { updateSiteSettingsAction } from "@/actions/update-site-settings";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    success?: string;
  }>;
}

export default async function SettingsPage({ searchParams }: Props) {
  await requireRole("ADMIN");

  const params = await searchParams;
  const isSuccess = params.success === "1";
  const settings = await prisma.siteSetting.findFirst();

  return (
    <AdminLayout
      title="Settings"
      subtitle="Manage company, branding and notification settings."
    >
      <form
        action={updateSiteSettingsAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Company Settings
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            These details will be used across the portal and future public
            website.
          </p>
        </div>
        {isSuccess ? (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-600">
            Settings saved successfully.
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Company Name
            </label>
            <input
              name="companyName"
              defaultValue={settings?.companyName || "Burney Real Estate LLC"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Company Email
            </label>
            <input
              name="companyEmail"
              type="email"
              defaultValue={
                settings?.companyEmail || "info@burneyrealestate.com"
              }
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Company Phone
            </label>
            <input
              name="companyPhone"
              defaultValue={settings?.companyPhone || "+971 50 648 6626"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Website
            </label>
            <input
              name="website"
              defaultValue={settings?.website || "https://burneyrealestate.com"}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Office Address
            </label>
            <textarea
              name="address"
              rows={3}
              defaultValue={
                settings?.address ||
                "Churchill Tower - 3707 - Marasi Dr, Business Bay - Dubai"
              }
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="text-xl font-bold text-foreground">
            Notification Settings
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Admin WhatsApp
              </label>
              <input
                name="adminWhatsapp"
                defaultValue={settings?.adminWhatsapp || "+971 50 648 6626"}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Admin Email
              </label>
              <input
                name="adminEmail"
                type="email"
                defaultValue={
                  settings?.adminEmail || "info@burneyrealestate.com"
                }
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h2 className="text-xl font-bold text-foreground">Branding</h2>

          <div className="mt-5">
            <ImageUploadField
              label="Company Logo"
              name="logoUrl"
              defaultValue={settings?.logoUrl || ""}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Save Settings
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
