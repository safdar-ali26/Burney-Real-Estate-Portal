import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye, Plus, Search } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    category?: string;
  }>;
}

export default async function AdminBlogsPage({ searchParams }: Props) {
  await requireRole("ADMIN");

  const params = await searchParams;

  const currentPage = Math.max(Number(params.page || "1"), 1);
  const pageSize = 12;
  const skip = (currentPage - 1) * pageSize;

  const search = params.search?.trim() || "";
  const status = params.status?.trim() || "";
  const category = params.category?.trim() || "";

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });

  const whereClause = {
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } },
              {
                author: {
                  name: { contains: search, mode: "insensitive" as const },
                },
              },
            ],
          }
        : {},
      status ? { status: status as any } : {},
      category ? { categoryId: category } : {},
    ],
  };

  const totalBlogs = await prisma.blog.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalBlogs / pageSize);

  const blogs = await prisma.blog.findMany({
    where: whereClause,
    skip,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
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

  const hasFilters = search || status || category;

  function createPageUrl(page: number) {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (status) query.set("status", status);
    if (category) query.set("category", category);

    query.set("page", String(page));

    return `/administrator/blogs?${query.toString()}`;
  }

  return (
    <AdminLayout
      title="Blogs"
      subtitle="Manage website articles, SEO content and market updates."
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-xl lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Blog Management
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create, publish and manage SEO blogs for Burney Real Estate.
            </p>
          </div>

          <Link
            href="/administrator/blogs/add"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Blog
          </Link>
        </div>

        <form className="rounded-3xl border border-border bg-card p-4 shadow-xl">
          <input type="hidden" name="page" value="1" />

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by title, excerpt or author..."
                className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-[#EBCB4C]"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <select
              name="category"
              defaultValue={category}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#EBCB4C]"
            >
              <option value="">All Categories</option>

              {categories.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Apply Filters
            </button>

            {hasFilters ? (
              <Link
                href="/administrator/blogs"
                className="flex items-center justify-center rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
              >
                Clear Filters
              </Link>
            ) : null}
          </div>
        </form>

        {blogs.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="rounded-full bg-[#EBCB4C]/10 p-6">
                <span className="text-4xl">📝</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-foreground">
                {hasFilters ? "No matching blogs found" : "No blogs found"}
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {hasFilters
                  ? "Try changing your search or selected filters."
                  : "Blogs created by admin will appear here."}
              </p>

              <Link
                href="/administrator/blogs/add"
                className="mt-6 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Add First Blog
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground">
              <span>
                Showing {blogs.length} of {totalBlogs} blogs
              </span>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {blogs.map((blog) => {
                const imageUrl =
                  blog.featuredImage &&
                  (blog.featuredImage.startsWith("http://") ||
                    blog.featuredImage.startsWith("https://") ||
                    blog.featuredImage.startsWith("/"))
                    ? blog.featuredImage
                    : "";

                return (
                  <Link
                    key={blog.id}
                    href={`/administrator/blogs/${blog.id}`}
                    className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:border-[#EBCB4C]/40 hover:shadow-2xl"
                  >
                    <div className="relative h-52 overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          No Image
                        </div>
                      )}

                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-full bg-[#EBCB4C] px-3 py-1 text-[10px] font-bold text-black shadow-sm backdrop-blur">
                          {blog.status}
                        </span>

                        {blog.isFeatured ? (
                          <span className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white shadow-sm backdrop-blur">
                            FEATURED
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EBCB4C]">
                        {blog.category?.name || "Uncategorized"}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-lg font-bold text-foreground">
                        {blog.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {blog.excerpt || "No excerpt available."}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted/60 px-3 py-1.5">
                          {blog.author?.name || "Admin"}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          {blog.views}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {blog.publishedAt
                            ? blog.publishedAt.toLocaleDateString("en-GB")
                            : "Not Published"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-xs text-muted-foreground">
                          {blog.tags.length} Tags
                        </span>

                        <span className="text-xs font-bold text-[#EBCB4C]">
                          Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-xl">
                {currentPage > 1 ? (
                  <Link
                    href={createPageUrl(currentPage - 1)}
                    className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    Previous
                  </Link>
                ) : null}

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  return (
                    <Link
                      key={page}
                      href={createPageUrl(page)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        page === currentPage
                          ? "bg-[#EBCB4C] text-black"
                          : "border border-border text-foreground hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}

                {currentPage < totalPages ? (
                  <Link
                    href={createPageUrl(currentPage + 1)}
                    className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
                  >
                    Next
                  </Link>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </AdminLayout>
  );
}