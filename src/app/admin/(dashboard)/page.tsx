import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./posts/actions";
import { DeleteButton } from "./posts/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [posts, subscriberCount] = await Promise.all([
    prisma.post.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.subscriber.count(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-extrabold text-2xl">Posts</h1>
          <p className="text-sm text-ink-sub mt-1">
            {subscriberCount} newsletter subscriber
            {subscriberCount === 1 ? "" : "s"} &middot;{" "}
            <Link href="/admin/subscribers" className="underline">
              view list
            </Link>
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-rust hover:bg-rust-deep text-cream font-semibold text-sm rounded-md px-4 py-2.5 transition-colors"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-10 text-center text-ink-sub">
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="underline text-rust-deep">
            Write the first one
          </Link>
          .
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg divide-y divide-border overflow-hidden">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-semibold hover:underline truncate"
                  >
                    {post.title}
                  </Link>
                  <span
                    className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      post.status === "PUBLISHED"
                        ? "bg-success-tint text-success"
                        : "bg-cream-panel text-ink-sub"
                    }`}
                  >
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-ink-sub mt-1 font-mono">
                  /posts/{post.slug} &middot; updated{" "}
                  {post.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-sm text-ink-sub hover:text-ink"
                >
                  Edit
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <DeleteButton />
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
