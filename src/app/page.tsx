import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SubscribeForm } from "@/components/SubscribeForm";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bp-grid">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-14">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-rust mb-4">
            <span className="w-5 h-px bg-rust" /> Open source &middot; Rust
          </span>
          <h1 className="font-serif font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4 text-balance">
            Notes from building raio.
          </h1>
          <p className="text-lg text-ink-sub max-w-xl mb-8">
            Design decisions, architecture, and progress on an open-source
            instant-payment foundation in Rust — built for African rails and
            interoperability.
          </p>
          <div className="max-w-sm">
            <SubscribeForm source="blog-home" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-24">
          {posts.length === 0 ? (
            <p className="text-ink-sub border-t border-border pt-8">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="border-t border-border">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="block border-b border-border py-7 group"
                >
                  <p className="font-mono text-xs text-ink-sub mb-2">
                    {post.publishedAt?.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="font-serif font-bold text-2xl mb-2 group-hover:text-rust-deep transition-colors text-balance">
                    {post.title}
                  </h2>
                  <p className="text-ink-sub">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
