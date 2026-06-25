"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function agentCreatePropertyAction(formData: FormData) {
  const session = await requireRole("AGENT");

  const agentId = (session.user as any).id;

  const title = String(formData.get("title") || "").trim();

  if (!title) {
    throw new Error("Property title is required.");
  }

  const description = String(formData.get("description") || "").trim();

  const category =
    (String(formData.get("category") || "BUY") as "BUY" | "RENT");

  const status =
    (String(formData.get("status") || "AVAILABLE") as "AVAILABLE");

  const price =
    Number(formData.get("price")) || null;

  const bedrooms =
    String(formData.get("bedrooms") || "").trim();

  const bathrooms =
    Number(formData.get("bathrooms")) || null;

  const size =
    Number(formData.get("size")) || null;

  const emirate =
    String(formData.get("emirate") || "").trim();

  const district =
    String(formData.get("district") || "").trim();

  const type =
    String(formData.get("type") || "").trim();

  const featuredImage =
    String(formData.get("featuredImage") || "").trim();

  const galleryImages = String(
    formData.get("galleryImages") || ""
  )
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  const property = await prisma.property.create({
    data: {
      title,
      slug: `${createSlug(title)}-${Date.now()}`,

      description,

      category,

      status,

      approvalStatus: "PENDING",

      price,
      bedrooms,
      bathrooms,
      size,

      emirate,
      district,
      type,

      featuredImage,

      agentId,

      isFromCRM: false,
    },
  });

  if (galleryImages.length > 0) {
    await prisma.propertyImage.createMany({
      data: galleryImages.map((url, index) => ({
        propertyId: property.id,
        url,
        order: index,
      })),
    });
  }

  revalidatePath("/agent/properties");
  revalidatePath("/administrator/properties");

  redirect("/agent/properties");
}