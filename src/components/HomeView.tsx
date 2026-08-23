import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getDictionary, Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SubscribeForm } from "@/components/SubscribeForm";

export const revalidate = 60;

export async function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const postsBase = locale === "fr" ? "/fr/posts" : "/posts";

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <SiteHeader locale={locale} switchHref={locale === "fr" ? "/" : "/fr"} />
      <main className="flex-1 bp-grid">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-14">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-rust mb-4">
            <span className="w-5 h-px bg-rust" /> {dict.heroEyebrow}
          </span>
          <h1 className="font-serif font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4 text-balance">
            {dict.heroTitle}
          </h1>
          <p className="text-lg text-ink-sub max-w-xl mb-8">{dict.heroLead}</p>
          <div className="max-w-sm">
            <SubscribeForm source="blog-home" locale={locale} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-24">
          {posts.length === 0 ? (
            <p className="text-ink-sub border-t border-border pt-8">
              {dict.emptyPosts}
            </p>
          ) : (
            <div className="border-t border-border">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`${postsBase}/${post.slug}`}
                  className="block border-b border-border py-7 group"
                >
                  <p className="font-mono text-xs text-ink-sub mb-2">
                    {post.publishedAt?.toLocaleDateString(dict.dateLocale, {
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
      <SiteFooter locale={locale} />
    </>
  );
}
