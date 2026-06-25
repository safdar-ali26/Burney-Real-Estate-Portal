"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function agentUpdatePropertyAction(
  propertyId: string,
  formData: FormData
) {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const existingProperty = await prisma.property.findFirst({
    where: {
      id: propertyId,
      agentId,
      isFromCRM: false,
    },
  });

  if (!existingProperty) {
    throw new Error("Property not found or unauthorized.");
  }

  const title = String(formData.get("title") || "").trim();

  if (!title) {
    throw new Error("Property title is required.");
  }

  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "BUY") as "BUY" | "RENT";
  const status = String(formData.get("status") || "AVAILABLE") as
    | "AVAILABLE"
    | "LIMITED"
    | "SOLD";

  const price = Number(formData.get("price")) || null;
  const bedrooms = String(formData.get("bedrooms") || "").trim();
  const bathrooms = Number(formData.get("bathrooms")) || null;
  const size = Number(formData.get("size")) || null;

  const emirate = String(formData.get("emirate") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const type = String(formData.get("type") || "").trim();

  const featuredImage = String(formData.get("featuredImage") || "").trim();

  const galleryImages = String(formData.get("galleryImages") || "")
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      title,
      slug:
        title !== existingProperty.title
          ? `${createSlug(title)}-${Date.now()}`
          : existingProperty.slug,

      description,
      category,
      status,

      /**
       * Important:
       * Agent edit ke baad property dobara pending approval me chali jayegi.
       */
      approvalStatus: "PENDING",

      price,
      bedrooms,
      bathrooms,
      size,
      emirate,
      district,
      type,
      featuredImage,
    },
  });

  await prisma.propertyImage.deleteMany({
    where: {
      propertyId,
    },
  });

  if (galleryImages.length > 0) {
    await prisma.propertyImage.createMany({
      data: galleryImages.map((url, index) => ({
        propertyId,
        url,
        order: index,
      })),
    });
  }

  revalidatePath("/agent/properties");
  revalidatePath(`/agent/properties/${propertyId}`);
  revalidatePath("/administrator/properties");

  redirect(`/agent/properties/${propertyId}`);
}