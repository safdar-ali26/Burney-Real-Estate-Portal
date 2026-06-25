"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function userUpdateProfileAction(formData: FormData) {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const profileImage = String(formData.get("profileImage") || "").trim();

  if (!name) {
    throw new Error("Name is required.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      phone,
      whatsapp,
      profileImage,
    },
  });

  revalidatePath("/user/profile");
}