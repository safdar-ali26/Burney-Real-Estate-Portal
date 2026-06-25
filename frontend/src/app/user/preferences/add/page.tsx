import Link from "next/link";

import UserLayout from "@/components/user/user-layout";
import { userUpdatePreferencesAction } from "@/actions/user-update-preferences";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

const districts = [
  "Al Barari",
  "Al Barsha",
  "Al Furjan",
  "Al Jaddaf",
  "Al Jaddaf Waterfront",
  "Al Quoz 2",
  "Al Satwa",
  "Al Sufouh",
  "Al Warsan",
  "Arabian Ranches 3",
  "Arjan",
  "Azizi Riviera at Meydan One",
  "Beach Front",
  "Bukadra",
  "Business Bay",
  "City Of Arabia",
  "City Walk",
  "Damac Hills",
  "Damac Hills 2",
  "Damac Lagoons",
  "Damac Riverside",
  "Damac Suncity",
  "DIFC (Dubai International Financial Center)",
  "Discovery Gardens",
  "Downtown Dubai",
  "Dubai Creek Harbour",
  "Dubai Design District",
  "Dubai Expo City",
  "Dubai Harbour",
  "Dubai Hills",
  "Dubai Industrial City",
  "Dubai International City",
  "Dubai Internet City",
  "Dubai Investments Park",
  "Dubai Islands",
  "Dubai Land",
  "Dubai Land Residence Complex",
  "Dubai Marina",
  "Dubai Motor City",
  "Dubai Production City",
  "Dubai Science Park",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Dubai Sports City",
  "Dubai Studio City",
  "Dubailand Residence Complex",
  "Emaar South",
  "Es Sanhaya 2",
  "Grand Polo Club and Resort",
  "Green Gate at Dubai Creek Harbour",
  "Jebel Ali Freezone Extension",
  "Jebel Ali Village",
  "JLT (Jumeirah Lake Towers)",
  "Jumeirah Beach Residence (JBR)",
  "Jumeirah Golf Estates",
  "Jumeirah Islands",
  "Jumeirah Second",
  "JVC (Jumeirah Village Circle)",
  "JVT (Jumeirah Village Triangle)",
  "Majan",
  "Maritime City",
  "MBR District 1",
  "MBR District 11 (Meydan South)",
  "Meydan (Nad Al Sheba 1)",
  "Mina Rashid",
  "Mirdif",
  "MJL (Madinat Jumeirah Living)",
  "Mudon",
  "Nad Al Sheba Gardens",
  "Palm Jebel Ali",
  "Palm Jumeirah",
  "Pearl Jumeirah",
  "Port De La Mer",
  "Ras Al Khor",
  "Remraam",
  "Safa Park",
  "Saih Shuaib",
  "Sobha Central",
  "Sobha Hartland",
  "Sobha Hartland 2",
  "The Heights",
  "The Oasis",
  "The Valley",
  "Tilal Al Ghaf",
  "Town Square",
  "Trade Center",
  "Wadi Al Safa 2",
  "Wadi Al Safa 3",
  "Wadi Al Safa 7",
  "World of Islands",
  "Zabeel 1&2",
];

export default async function UserAddPreferencePage() {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  const preference = await prisma.userPreference.findUnique({
    where: { userId },
  });

  return (
    <UserLayout
      title={preference ? "Edit Preference" : "Add Preference"}
      subtitle="Manage your property interest, budget and contact preferences."
    >
      <form
        action={userUpdatePreferencesAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <Link
            href="/user/preferences"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            ← Back to Preferences
          </Link>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Preference Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Add your preferred property details below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Preferred Emirate
            </label>
            <select
              name="preferredEmirate"
              defaultValue={preference?.preferredEmirate || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Emirate</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Ras Al Khaimah">Ras Al Khaimah</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Preferred District
            </label>
            <select
              name="preferredDistrict"
              defaultValue={preference?.preferredDistrict || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Property Type
            </label>
            <select
              name="preferredPropertyType"
              defaultValue={preference?.preferredPropertyType || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bedrooms
            </label>
            <select
              name="preferredBedrooms"
              defaultValue={preference?.preferredBedrooms || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Bedrooms</option>
              <option value="Studio">Studio</option>
              <option value="1 BR">1 BR</option>
              <option value="2 BR">2 BR</option>
              <option value="3 BR">3 BR</option>
              <option value="4 BR">4 BR</option>
              <option value="5 BR">5 BR</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Minimum Budget
            </label>
            <input
              name="minBudget"
              type="number"
              defaultValue={preference?.minBudget || ""}
              placeholder="500000"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Maximum Budget
            </label>
            <input
              name="maxBudget"
              type="number"
              defaultValue={preference?.maxBudget || ""}
              placeholder="2000000"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Buying Purpose
            </label>
            <select
              name="buyingPurpose"
              defaultValue={preference?.buyingPurpose || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Purpose</option>
              <option value="Investment">Investment</option>
              <option value="Self Living">Self Living</option>
              <option value="Holiday Home">Holiday Home</option>
              <option value="Rental Income">Rental Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Preferred Contact Method
            </label>
            <select
              name="contactPreference"
              defaultValue={preference?.contactPreference || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Contact Method</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone Call">Phone Call</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-3xl border border-border bg-background p-5">
              <h3 className="text-lg font-bold text-foreground">
                Notification Preferences
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      Email Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive recommended properties by email.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="emailAlerts"
                    defaultChecked={preference?.emailAlerts ?? true}
                    className="h-5 w-5 accent-[#EBCB4C]"
                  />
                </label>

                <label className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      WhatsApp Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive matching listings on WhatsApp.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="whatsappAlerts"
                    defaultChecked={preference?.whatsappAlerts ?? true}
                    className="h-5 w-5 accent-[#EBCB4C]"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/user/preferences"
            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            {preference ? "Update Preference" : "Save Preference"}
          </button>
        </div>
      </form>
    </UserLayout>
  );
}