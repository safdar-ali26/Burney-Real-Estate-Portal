"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function updateSiteSettingsAction(formData: FormData) {
  await requireRole("ADMIN");

  const companyName = String(formData.get("companyName") || "").trim();
  const companyEmail = String(formData.get("companyEmail") || "").trim();
  const companyPhone = String(formData.get("companyPhone") || "").trim();
  const website = String(formData.get("website") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const adminWhatsapp = String(formData.get("adminWhatsapp") || "").trim();
  const adminEmail = String(formData.get("adminEmail") || "").trim();
  const logoUrl = String(formData.get("logoUrl") || "").trim();

  const existingSetting = await prisma.siteSetting.findFirst();

  if (existingSetting) {
    await prisma.siteSetting.update({
      where: {
        id: existingSetting.id,
      },
      data: {
        companyName,
        companyEmail,
        companyPhone,
        website,
        address,
        adminWhatsapp,
        adminEmail,
        logoUrl,
      },
    });
  } else {
    await prisma.siteSetting.create({
      data: {
        companyName,
        companyEmail,
        companyPhone,
        website,
        address,
        adminWhatsapp,
        adminEmail,
        logoUrl,
      },
    });
  }

  revalidatePath("/administrator/settings");
  redirect("/administrator/settings?success=1");
}