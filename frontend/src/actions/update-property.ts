"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function updatePropertyAction(
  propertyId: string,
  formData: FormData
) {
  const featuredImage = String(formData.get("featuredImage") || "");

  const galleryImagesRaw = String(formData.get("galleryImages") || "");

  const galleryImages = galleryImagesRaw
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),

      category: formData.get("category") as any,
      status: formData.get("status") as any,

      price: Number(formData.get("price") || 0),

      bedrooms: String(formData.get("bedrooms") || ""),
      bathrooms: Number(formData.get("bathrooms") || 0),
      size: Number(formData.get("size") || 0),

      emirate: String(formData.get("emirate") || ""),
      district: String(formData.get("district") || ""),
      type: String(formData.get("type") || ""),

      featuredImage,

      developerId: String(formData.get("developerId") || "") || null,
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
        url,
        order: index,
        propertyId,
      })),
    });
  }

  revalidatePath("/administrator/properties");
  revalidatePath(`/administrator/properties/${propertyId}`);

  redirect(`/administrator/properties/${propertyId}`);
}