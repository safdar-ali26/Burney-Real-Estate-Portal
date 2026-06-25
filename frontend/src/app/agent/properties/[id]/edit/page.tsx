import Link from "next/link";
import { notFound } from "next/navigation";

import AgentLayout from "@/components/agent/agent-layout";
import ImageUploadField from "@/components/admin/image-upload-field";
import MultipleImageUploadField from "@/components/admin/multiple-image-upload-field";
import { agentUpdatePropertyAction } from "@/actions/agent-update-property";
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

export default async function AgentEditPropertyPage({ params }: Props) {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const { id } = await params;

  const property = await prisma.property.findFirst({
    where: {
      id,
      agentId,
      isFromCRM: false,
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

  const updateProperty = agentUpdatePropertyAction.bind(null, property.id);

  return (
    <AgentLayout
      title="Edit Property"
      subtitle="Update your property details and resubmit for admin approval."
    >
      <form
        action={updateProperty}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <Link
            href={`/agent/properties/${property.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            ← Back to Property
          </Link>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Property Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Any update will send this property back for admin approval.
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
              Approval Status
            </label>
            <select
              disabled
              className="w-full cursor-not-allowed rounded-2xl border border-border bg-muted px-4 py-3 text-muted-foreground outline-none"
            >
              <option>{property.approvalStatus}</option>
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
            <ImageUploadField
              label="Featured Image"
              name="featuredImage"
              defaultValue={property.featuredImage || ""}
            />

            <p className="mt-2 text-xs text-muted-foreground">
              This image will be used as the main property image.
            </p>
          </div>

          <div className="md:col-span-2">
            <MultipleImageUploadField
              label="Gallery Images"
              name="galleryImages"
              defaultValue={property.images.map((image) => image.url)}
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Upload multiple images for this property gallery.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/agent/properties/${property.id}`}
            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Update Property
          </button>
        </div>
      </form>
    </AgentLayout>
  );
}