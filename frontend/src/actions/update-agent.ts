"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function updateAgentAction(agentId: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const phone = String(formData.get("phone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const designation = String(formData.get("designation") || "").trim();
  const profileImage = String(formData.get("profileImage") || "").trim();
  const isActive = formData.get("isActive") === "on";

  if (!email) {
    throw new Error("Email is required.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id: agentId,
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
    designation,
    profileImage,
    isActive,
    role: "AGENT",
  };

  if (password.trim()) {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({
    where: {
      id: agentId,
    },
    data,
  });

  revalidatePath("/administrator/agents");
  revalidatePath(`/administrator/agents/${agentId}`);

  redirect(`/administrator/agents/${agentId}`);
}