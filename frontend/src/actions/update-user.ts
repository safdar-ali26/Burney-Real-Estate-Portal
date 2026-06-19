"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function updateUserAction(userId: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const profileImage = String(formData.get("profileImage") || "").trim();
  const isActive = formData.get("isActive") === "on";

  if (!email) {
    throw new Error("Email is required.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id: userId,
      },
    },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  const data: any = {
    name,
    email,
    phone,
    whatsapp,
    profileImage,
    isActive,
    role: "USER",
  };

  if (password.trim()) {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

  revalidatePath("/administrator/users");

  redirect("/administrator/users");
}