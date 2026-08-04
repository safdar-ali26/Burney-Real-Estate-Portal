import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import AdminLayout from "@/components/admin/admin-layout";
import BlogEditor from "@/components/admin/blog/blog-editor";
import { createBlogAction } from "@/actions/create-blog";
import { requireRole } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export default async function AddBlogPage() {
  await requireRole("ADMIN");

  const categories = await prisma.blogCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AdminLayout
      title="Add Blog"
      subtitle="Create a new SEO article or market update."
    >
      <div className="space-y-6">
        <Link
          href="/administrator/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#EBCB4C]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        <form
          action={createBlogAction}
          className="grid gap-6 xl:grid-cols-[1fr_360px]"
        >
          <div className="space-y-6">
            <Card title="Blog Content">
              <div className="grid gap-4">
                <Input
                  name="title"
                  label="Title *"
                  placeholder="Enter blog title"
                />

                <Input
                  name="slug"
                  label="Slug"
                  placeholder="auto-generated from title if empty"
                />

                <Textarea
                  name="excerpt"
                  label="Short Description"
                  placeholder="Write a short blog summary..."
                />

                <div>
                  <Label>Content *</Label>
                  <BlogEditor name="content" />
                </div>
              </div>
            </Card>

            <Card title="SEO Settings">
              <div className="grid gap-4">
                <Input
                  name="metaTitle"
                  label="Meta Title"
                  placeholder="SEO title"
                />

                <Textarea
                  name="metaDescription"
                  label="Meta Description"
                  placeholder="SEO description"
                />

                <Input
                  name="ogImage"
                  label="OG Image URL"
                  placeholder="https://..."
                />

                <Input
                  name="canonicalUrl"
                  label="Canonical URL"
                  placeholder="https://burneyrealestate.com/blogs/..."
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Publish Settings">
              <div className="grid gap-4">
                <div>
                  <Label>Status</Label>
                  <select
                    name="status"
                    defaultValue="DRAFT"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-[#EBCB4C]"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div>
                  <Label>Category</Label>
                  <select
                    name="categoryId"
                    defaultValue=""
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-[#EBCB4C]"
                  >
                    <option value="">Uncategorized</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Featured Image</Label>
                  <input
                    type="file"
                    name="featuredImage"
                    accept="image/*"
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none file:mr-4 file:rounded-xl file:border-0 file:bg-[#EBCB4C] file:px-4 file:py-2 file:text-sm file:font-bold file:text-black focus:border-[#EBCB4C]"
                  />
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    className="h-4 w-4 accent-[#EBCB4C]"
                  />
                  <span className="text-sm font-semibold text-foreground">
                    Mark as featured blog
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EBCB4C] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
                >
                  <Save className="h-4 w-4" />
                  Save Blog
                </button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

function Input({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[#EBCB4C]"
      />
    </div>
  );
}

function Textarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[#EBCB4C]"
      />
    </div>
  );
}
