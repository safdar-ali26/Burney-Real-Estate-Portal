"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function approvePropertyAction(propertyId: string) {
  await requireRole("ADMIN");

  await prisma.property.update({
    where: { id: propertyId },
    data: {
      approvalStatus: "APPROVED",
    },
  });

  revalidatePath("/administrator/properties");
  revalidatePath(`/administrator/properties/${propertyId}`);
  revalidatePath("/agent/properties");
}

export async function rejectPropertyAction(propertyId: string) {
  await requireRole("ADMIN");

  await prisma.property.update({
    where: { id: propertyId },
    data: {
      approvalStatus: "REJECTED",
    },
  });

  revalidatePath("/administrator/properties");
  revalidatePath(`/administrator/properties/${propertyId}`);
  revalidatePath("/agent/properties");
}