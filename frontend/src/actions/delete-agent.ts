"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export async function deleteAgentAction(agentId: string) {
  const agent = await prisma.user.findUnique({
    where: {
      id: agentId,
    },
  });

  if (!agent || agent.role !== "AGENT") {
    throw new Error("Agent not found.");
  }

  await prisma.property.updateMany({
    where: {
      agentId,
    },
    data: {
      agentId: null,
    },
  });

  await prisma.user.delete({
    where: {
      id: agentId,
    },
  });

  revalidatePath("/administrator/agents");
  redirect("/administrator/agents");
}