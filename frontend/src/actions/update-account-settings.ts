"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function updateAccountSettingsAction(formData: FormData) {
  const session = await requireRole("ADMIN");
  const userId = (session.user as any).id;

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!email) {
    throw new Error("Email is required.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.password) {
    throw new Error("User not found.");
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect.");
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
    email,
  };

  if (newPassword || confirmPassword) {
    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters.");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match.");
    }

    data.password = await bcrypt.hash(newPassword, 10);
  }

  await prisma.user.update({
    where: { id: userId },
    data,
  });

  revalidatePath("/administrator/account-settings");
  redirect("/administrator/account-settings");
}