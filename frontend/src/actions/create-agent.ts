"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function createAgentAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const designation = String(formData.get("designation") || "").trim();
  const profileImage = String(formData.get("profileImage") || "").trim();
  const isActive = formData.get("isActive") === "on";

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      whatsapp,
      designation,
      profileImage,
      isActive,
      role: "AGENT",
    },
  });

  revalidatePath("/administrator/agents");
  redirect("/administrator/agents");
}