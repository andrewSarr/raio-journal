import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-extrabold text-2xl">
            Subscribers
          </h1>
          <p className="text-sm text-ink-sub mt-1">{subscribers.length} total</p>
        </div>
        <a
          href="/admin/subscribers/export"
          className="text-sm font-medium border border-border rounded-md px-4 py-2 hover:bg-cream-panel"
        >
          Export CSV
        </a>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-10 text-center text-ink-sub">
          No subscribers yet.
        </div>
      ) : (
        <div className="bg-white border border-border rounded-lg divide-y divide-border overflow-hidden">
          {subscribers.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between px-5 py-3 text-sm"
            >
              <span className="font-mono">{s.email}</span>
              <span className="text-ink-sub">
                {s.source} &middot;{" "}
                {s.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/admin"
        className="inline-block mt-6 text-sm text-ink-sub hover:text-ink"
      >
        &larr; Back to posts
      </Link>
    </div>
  );
}
