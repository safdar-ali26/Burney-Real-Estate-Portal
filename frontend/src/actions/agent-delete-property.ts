"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export async function agentDeletePropertyAction(propertyId: string) {
  const session = await requireRole("AGENT");
  const agentId = (session.user as any).id;

  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      agentId,
      isFromCRM: false,
    },
  });

  if (!property) {
    throw new Error("Property not found or unauthorized.");
  }

  await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });

  revalidatePath("/agent/properties");
  redirect("/agent/properties");
}