"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function userDeletePreferenceAction() {
  const session = await requireRole("USER");
  const userId = (session.user as any).id;

  await prisma.userPreference.deleteMany({
    where: {
      userId,
    },
  });

  revalidatePath("/user/preferences");
}