/**
 * =====================================================
 * FILE: src/actions/create-property.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Creates a new property from admin panel.
 *
 * FEATURES:
 * - Basic property details
 * - AED price stored as number
 * - Featured image URL
 * - Gallery image URLs
 * - Developer relation
 * - Admin-created properties are auto-approved
 * =====================================================
 */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

/**
 * Converts property title into SEO-friendly slug.
 */
function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createPropertyAction(formData: FormData) {
  const title = String(formData.get("title") || "");

  const category = String(formData.get("category") || "BUY") as
    | "BUY"
    | "RENT"
    | "OFFPLAN";

  const status = String(formData.get("status") || "AVAILABLE") as
    | "AVAILABLE"
    | "LIMITED"
    | "SOLD";

  const price = Number(formData.get("price") || 0);
  const bedrooms = String(formData.get("bedrooms") || "");
  const bathrooms = Number(formData.get("bathrooms") || 0);
  const size = Number(formData.get("size") || 0);

  const emirate = String(formData.get("emirate") || "");
  const district = String(formData.get("district") || "");
  const type = String(formData.get("type") || "");
  const description = String(formData.get("description") || "");

  const featuredImage = String(formData.get("featuredImage") || "");
  const developerId = String(formData.get("developerId") || "") || undefined;

  /**
   * Gallery images are entered as one URL per line.
   */
  const galleryImagesRaw = String(formData.get("galleryImages") || "");

  const galleryImages = galleryImagesRaw
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  const slug = `${createSlug(title)}-${Date.now()}`;

  /**
   * Create main property record.
   */
  const property = await prisma.property.create({
    data: {
      title,
      slug,
      description,
      category,
      status,
      approvalStatus: "APPROVED",
      price,
      bedrooms,
      bathrooms,
      size,
      emirate,
      district,
      type,
      featuredImage,
      developerId,
      isFromCRM: false,
    },
  });

  /**
   * Save gallery images in PropertyImage table.
   */
  if (galleryImages.length > 0) {
    await prisma.propertyImage.createMany({
      data: galleryImages.map((url, index) => ({
        url,
        order: index,
        propertyId: property.id,
      })),
    });
  }

  revalidatePath("/administrator/properties");
  redirect("/administrator/properties");
}