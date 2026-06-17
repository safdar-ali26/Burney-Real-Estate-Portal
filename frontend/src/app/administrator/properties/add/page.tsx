/**
 * =====================================================
 * FILE: src/app/administrator/properties/add/page.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Admin add property page.
 *
 * FEATURES:
 * - Protected admin page
 * - Property creation form
 * - Saves property to Supabase through Prisma
 * =====================================================
 */

import AdminLayout from "@/components/admin/admin-layout";
import { createPropertyAction } from "@/actions/create-property";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AddPropertyPage() {
  await requireRole("ADMIN");
  const developers = await prisma.developer.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AdminLayout
      title="Add Property"
      subtitle="Create a new Buy, Rent or Off-Plan property."
    >
      <form
        action={createPropertyAction}
        className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-xl"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Property Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add basic property details below.
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
              placeholder="Example: Luxury 2BR Apartment in Al Jaddaf"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              name="category"
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
              placeholder="1200000"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bedrooms
            </label>
            <select
              name="bedrooms"
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
              placeholder="2"
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
              placeholder="1150"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Emirate
            </label>
            <select
              name="emirate"
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
            <input
              name="district"
              placeholder="Al Jaddaf"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Property Type
            </label>
            <select
              name="type"
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
              placeholder="Write property description..."
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Featured Image URL
            </label>
            <input
              name="featuredImage"
              placeholder="https://example.com/property-main-image.jpg"
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
              placeholder={`https://example.com/image-1.jpg
https://example.com/image-2.jpg
https://example.com/image-3.jpg`}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-[#EBCB4C]"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Add one image URL per line. Later we will replace this with direct
              image upload.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <a
            href="/administrator/properties"
            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
          >
            Cancel
          </a>

          <button
            type="submit"
            className="rounded-2xl bg-[#EBCB4C] px-6 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            Create Property
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
