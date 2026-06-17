/**
 * =====================================================
 * FILE: recent-leads.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Shows latest leads preview in admin dashboard.
 * Static data for now, database integration later.
 * =====================================================
 */

const leads = [
  {
    name: "Ahmed Khan",
    property: "Jaddaf Beach Oasis",
    phone: "+971 50 000 0001",
    status: "New",
  },
  {
    name: "Sarah Malik",
    property: "Dubai South Apartment",
    phone: "+971 55 000 0002",
    status: "Contacted",
  },
  {
    name: "Omar Ali",
    property: "Business Bay Tower",
    phone: "+971 56 000 0003",
    status: "Qualified",
  },
];

export default function RecentLeads() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Recent Leads
        </h3>
        <p className="text-sm text-white/45">
          Latest property inquiries
        </p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.phone}
            className="rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-white">{lead.name}</p>
                <p className="mt-1 text-sm text-white/45">
                  {lead.property}
                </p>
                <p className="mt-1 text-xs text-white/35">
                  {lead.phone}
                </p>
              </div>

              <span className="rounded-full border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-3 py-1 text-xs text-[#EBCB4C]">
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}