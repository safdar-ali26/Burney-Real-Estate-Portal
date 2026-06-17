"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function deletePropertyAction(
  propertyId: string
) {
  /**
   * Delete gallery images first
   */
  await prisma.propertyImage.deleteMany({
    where: {
      propertyId,
    },
  });

  /**
   * Delete property
   */
  await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });

  revalidatePath("/administrator/properties");

  redirect("/administrator/properties");
}