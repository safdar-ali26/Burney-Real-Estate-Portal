import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Edit,
  Eye,
  FileText,
  Trash2,
} from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { deleteBlogAction } from "@/actions/delete-blog";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminBlogDetailsPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  const deleteBlog = deleteBlogAction.bind(null, blog.id);

  return (
    <AdminLayout title={blog.title} subtitle="Blog Details">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-xl md:flex-row md:items-center">
          <Link
            href="/administrator/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-[#EBCB4C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/administrator/blogs/${blog.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
            >
              <Edit className="h-4 w-4" />
              Edit Blog
            </Link>

            <form action={deleteBlog}>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                <Trash2 className="h-4 w-4" />
                Delete Blog
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <main className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <div className="relative h-[420px] bg-muted">
                {blog.featuredImage ? (
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No Featured Image
                  </div>
                )}

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#EBCB4C] px-4 py-2 text-xs font-bold text-black">
                    {blog.status}
                  </span>

                  {blog.isFeatured ? (
                    <span className="rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-white">
                      FEATURED
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#EBCB4C]">
                  {blog.category?.name || "Uncategorized"}
                </p>

                <h1 className="mt-3 text-3xl font-bold text-foreground">
                  {blog.title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {blog.excerpt || "No excerpt available."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge icon={<Eye />} text={`${blog.views} Views`} />
                  <Badge icon={<FileText />} text={`${blog.readTime || 1} min read`} />
                  <Badge
                    icon={<CalendarDays />}
                    text={
                      blog.publishedAt
                        ? blog.publishedAt.toLocaleDateString("en-GB")
                        : "Not Published"
                    }
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-foreground">
                Blog Content
              </h2>

              <div
                className="prose prose-sm mt-6 max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-foreground">
                SEO Details
              </h2>

              <div className="mt-6 space-y-0">
                <DetailRow label="Meta Title" value={blog.metaTitle || "-"} />
                <DetailRow
                  label="Meta Description"
                  value={blog.metaDescription || "-"}
                />
                <DetailRow label="OG Image" value={blog.ogImage || "-"} />
                <DetailRow
                  label="Canonical URL"
                  value={blog.canonicalUrl || "-"}
                />
                <DetailRow label="Slug" value={blog.slug} />
              </div>
            </section>
          </main>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-foreground">
                Publish Info
              </h2>

              <div className="mt-6 space-y-0">
                <DetailRow label="Status" value={blog.status} />
                <DetailRow
                  label="Featured"
                  value={blog.isFeatured ? "Yes" : "No"}
                />
                <DetailRow
                  label="Author"
                  value={blog.author?.name || blog.author?.email || "Admin"}
                />
                <DetailRow
                  label="Category"
                  value={blog.category?.name || "Uncategorized"}
                />
                <DetailRow
                  label="Created"
                  value={blog.createdAt.toLocaleDateString("en-GB")}
                />
                <DetailRow
                  label="Updated"
                  value={blog.updatedAt.toLocaleDateString("en-GB")}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <h2 className="text-xl font-bold text-foreground">Tags</h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {blog.tags.length > 0 ? (
                  blog.tags.map((item) => (
                    <span
                      key={item.tagId}
                      className="rounded-full bg-[#EBCB4C]/10 px-3 py-1.5 text-xs font-bold text-[#EBCB4C]"
                    >
                      {item.tag.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tags assigned.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5">
      <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
      {text}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[42%_58%] items-start border-b border-border py-4 last:border-b-0">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="break-words text-right text-sm font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}