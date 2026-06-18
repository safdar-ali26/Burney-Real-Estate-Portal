import AdminLayout from "@/components/admin/admin-layout";
import { syncCrmPropertiesAction } from "@/actions/sync-crm-properties";
import { requireRole } from "@/lib/auth-guard";

export default async function CrmSyncPage() {
  await requireRole("ADMIN");

  return (
    <AdminLayout
      title="CRM Sync"
      subtitle="Sync off-plan projects and developers from LeadRat CRM."
    >
      <div className="grid gap-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-xl font-bold text-foreground">
            Sync CRM Properties
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This will fetch all off-plan projects from LeadRat CRM and save them
            into your portal database. CRM properties will be marked as read-only.
          </p>

          <form action={syncCrmPropertiesAction} className="mt-6">
            <button
              type="submit"
              className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
            >
              Sync CRM Properties
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}