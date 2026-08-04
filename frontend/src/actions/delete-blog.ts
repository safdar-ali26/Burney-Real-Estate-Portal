"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";

export async function deleteBlogAction(blogId: string) {
  await requireRole("ADMIN");

  await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  revalidatePath("/administrator/blogs");
  revalidatePath("/blogs");

  redirect("/administrator/blogs");
}