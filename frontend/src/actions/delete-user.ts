"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function deleteUserAction(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "USER") {
    throw new Error("User not found.");
  }

  await prisma.savedProperty.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/administrator/users");

  redirect("/administrator/users");
}