"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-guard";
import { cloudinary } from "@/lib/cloudinary";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function calculateReadTime(content: string) {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean);
  return Math.max(1, Math.ceil(words.length / 200));
}

async function uploadBlogImage(file: File) {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "burney/blogs",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });

  return result.secure_url as string;
}

export async function createBlogAction(formData: FormData) {
  const user = await requireRole("ADMIN");

  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const featuredImageFile = formData.get("featuredImage") as File | null;
const featuredImage = featuredImageFile
  ? await uploadBlogImage(featuredImageFile)
  : null;

  const categoryId = String(formData.get("categoryId") || "").trim() || null;

  const status = String(formData.get("status") || "DRAFT");
  const isFeatured = formData.get("isFeatured") === "on";

  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const ogImage = String(formData.get("ogImage") || "").trim();
  const canonicalUrl = String(formData.get("canonicalUrl") || "").trim();

  if (!title) {
    throw new Error("Blog title is required.");
  }

  if (!content) {
    throw new Error("Blog content is required.");
  }

  const slug = createSlug(slugInput || title);

  await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,

      status: status as any,
      isFeatured,
      publishedAt: status === "PUBLISHED" ? new Date() : null,

      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      ogImage: ogImage || null,
      canonicalUrl: canonicalUrl || null,

      readTime: calculateReadTime(content),

      authorId: user.id,
      categoryId,
    },
  });

  revalidatePath("/administrator/blogs");
  revalidatePath("/blogs");

  redirect("/administrator/blogs");
}