/**
 * =====================================================
 * FILE: property-actions.ts
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Property approval workflow.
 *
 * FEATURES:
 * - Approve property
 * - Reject property
 * - Revalidate properties page
 * =====================================================
 */

"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

/**
 * -----------------------------------------------------
 * APPROVE PROPERTY
 * -----------------------------------------------------
 * Changes approval status:
 *
 * PENDING → APPROVED
 * -----------------------------------------------------
 */
export async function approveProperty(propertyId: string) {
  await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      approvalStatus: "APPROVED",
    },
  });

  revalidatePath("/administrator/properties");
}

/**
 * -----------------------------------------------------
 * REJECT PROPERTY
 * -----------------------------------------------------
 * Changes approval status:
 *
 * PENDING → REJECTED
 * -----------------------------------------------------
 */
export async function rejectProperty(propertyId: string) {
  await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      approvalStatus: "REJECTED",
    },
  });

  revalidatePath("/administrator/properties");
}