"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function userUpdatePreferencesAction(formData: FormData) {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  const preferredEmirate = String(
    formData.get("preferredEmirate") || "",
  ).trim();
  const preferredDistrict = String(
    formData.get("preferredDistrict") || "",
  ).trim();
  const preferredPropertyType = String(
    formData.get("preferredPropertyType") || "",
  ).trim();
  const preferredBedrooms = String(
    formData.get("preferredBedrooms") || "",
  ).trim();

  const minBudget = Number(formData.get("minBudget")) || null;
  const maxBudget = Number(formData.get("maxBudget")) || null;

  const buyingPurpose = String(formData.get("buyingPurpose") || "").trim();
  const contactPreference = String(
    formData.get("contactPreference") || "",
  ).trim();

  const emailAlerts = formData.get("emailAlerts") === "on";
  const whatsappAlerts = formData.get("whatsappAlerts") === "on";

  await prisma.userPreference.upsert({
    where: {
      userId,
    },
    update: {
      preferredEmirate,
      preferredDistrict,
      preferredPropertyType,
      preferredBedrooms,
      minBudget,
      maxBudget,
      buyingPurpose,
      contactPreference,
      emailAlerts,
      whatsappAlerts,
    },
    create: {
      userId,
      preferredEmirate,
      preferredDistrict,
      preferredPropertyType,
      preferredBedrooms,
      minBudget,
      maxBudget,
      buyingPurpose,
      contactPreference,
      emailAlerts,
      whatsappAlerts,
    },
  });

  revalidatePath("/user/preferences");
  revalidatePath("/user/preferences/add");

  redirect("/user/preferences");
}
