/**
 * =====================================================
 * FILE: src/app/administrator/properties/[id]/edit/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Edit property page.
 *
 * FEATURES:
 * - Protected admin page
 * - Loads existing property data
 * - Updates property in Supabase through Prisma
 * - Developer dropdown
 * - Featured image URL update
 * - District dropdown support
 * =====================================================
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { updatePropertyAction } from "@/actions/update-property";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

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

export default async function EditPropertyPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  const developers = await prisma.developer.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const updatePropertyWithId = updatePropertyAction.bind(null, property.id);

  const galleryImagesValue = property.images
    .map((image) => image.url)
    .join("\n");

  return (
    <AdminLayout
      title="Edit Property"
      subtitle="Update property listing details."
    >
      <form
        action={updatePropertyWithId}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <Link
            href={`/administrator/properties/${property.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Property Details
          </Link>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Property Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update property details below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Property Title
            </label>

            <input
              name="title"
              required
              defaultValue={property.title}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>

            <select
              name="category"
              defaultValue={property.category}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="BUY">Buy</option>
              <option value="RENT">Rent</option>
              <option value="OFFPLAN">Off Plan</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Status
            </label>

            <select
              name="status"
              defaultValue={property.status}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="AVAILABLE">Available</option>
              <option value="LIMITED">Limited</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Price
            </label>

            <input
              name="price"
              type="number"
              defaultValue={property.price || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bedrooms
            </label>

            <select
              name="bedrooms"
              defaultValue={property.bedrooms || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Bedroom</option>
              <option value="Studio">Studio</option>
              <option value="1 BR">1 BR</option>
              <option value="2 BR">2 BR</option>
              <option value="3 BR">3 BR</option>
              <option value="4 BR">4 BR</option>
              <option value="5 BR">5 BR</option>
              <option value="6 BR">6 BR</option>
              <option value="7 BR">7 BR</option>
              <option value="8 BR">8 BR</option>
              <option value="11 BR">11 BR</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bathrooms
            </label>

            <input
              name="bathrooms"
              type="number"
              defaultValue={property.bathrooms || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Size SQFT
            </label>

            <input
              name="size"
              type="number"
              defaultValue={property.size || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Emirate
            </label>

            <select
              name="emirate"
              defaultValue={property.emirate || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Emirate</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Fujairah">Fujairah</option>
              <option value="Ras Al Khaimah">Ras Al Khaimah</option>
              <option value="Umm Al Quwain">Umm Al Quwain</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              District
            </label>

            <select
              name="district"
              defaultValue={property.district || ""}
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
              name="type"
              defaultValue={property.type || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Hotel Apartment">Hotel Apartment</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Developer
            </label>

            <select
              name="developerId"
              defaultValue={property.developerId || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            >
              <option value="">Select Developer</option>
              {developers.map((developer) => (
                <option key={developer.id} value={developer.id}>
                  {developer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Description
            </label>

            <textarea
              name="description"
              rows={6}
              defaultValue={property.description || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Featured Image URL
            </label>

            <input
              name="featuredImage"
              defaultValue={property.featuredImage || ""}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              This image will be used as the main property image.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Gallery Images URLs
            </label>

            <textarea
              name="galleryImages"
              rows={5}
              defaultValue={galleryImagesValue}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Add one image URL per line.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/administrator/properties/${property.id}`}
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