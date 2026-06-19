"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function updateMyProfileAction(formData: FormData) {
  const session = await requireRole("ADMIN");

  const userId = (session.user as any).id;

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const designation = String(formData.get("designation") || "").trim();
  const profileImage = String(formData.get("profileImage") || "").trim();

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      phone,
      whatsapp,
      designation,
      profileImage,
    },
  });

  revalidatePath("/administrator/my-profile");
  redirect("/administrator/my-profile");
}