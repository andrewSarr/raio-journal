import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// New posts are published via the admin UI, not a redeploy — without this,
// the sitemap would be frozen at whatever existed at the last build.
export const revalidate = 3600;

const BASE = "https://raio-journal.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/fr`, changeFrequency: "daily", priority: 1 },
  ];

  for (const post of posts) {
    entries.push({
      url: `${BASE}/posts/${post.slug}`,
      lastModified: post.publishedAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    entries.push({
      url: `${BASE}/fr/posts/${post.slug}`,
      lastModified: post.publishedAt ?? undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
