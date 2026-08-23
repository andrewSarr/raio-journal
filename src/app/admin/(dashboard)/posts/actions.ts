"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentMd = String(formData.get("contentMd") ?? "");
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const intent = String(formData.get("intent") ?? "draft"); // "draft" | "publish"
  let slug = String(formData.get("slug") ?? "").trim();

  if (!title) {
    throw new Error("Title is required.");
  }
  if (!slug) {
    slug = slugify(title);
  } else {
    slug = slugify(slug);
  }

  const status = intent === "publish" ? "PUBLISHED" : "DRAFT";

  if (id) {
    const existing = await prisma.post.findUnique({ where: { id } });
    const publishedAt =
      status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt ?? null;

    await prisma.post.update({
      where: { id },
      data: { title, slug, excerpt, contentMd, coverImage, status, publishedAt },
    });
  } else {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        contentMd,
        coverImage,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/posts/${slug}`);
  redirect("/admin");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const post = await prisma.post.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/posts/${post.slug}`);
}
