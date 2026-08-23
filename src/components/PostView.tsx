import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { getDictionary, Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SubscribeForm } from "@/components/SubscribeForm";

export const revalidate = 60;

export async function getPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || post.status !== "PUBLISHED") return null;
  return post;
}

export async function buildPostMetadata(
  slug: string,
  locale: Locale = "en",
): Promise<Metadata> {
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: locale === "fr" ? `/fr/posts/${slug}` : `/posts/${slug}`,
      languages: {
        en: `/posts/${slug}`,
        fr: `/fr/posts/${slug}`,
        "x-default": `/posts/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function PostView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const dict = getDictionary(locale);
  const post = await getPost(slug);
  if (!post) notFound();

  const switchHref = locale === "fr" ? `/posts/${slug}` : `/fr/posts/${slug}`;

  return (
    <>
      <SiteHeader locale={locale} switchHref={switchHref} />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 pt-14 pb-10">
          <p className="font-mono text-xs text-ink-sub mb-3">
            {post.publishedAt?.toLocaleDateString(dict.dateLocale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1 className="font-serif font-extrabold text-3xl md:text-4xl leading-tight tracking-tight mb-8 text-balance">
            {post.title}
          </h1>
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="w-full rounded-lg mb-10 border border-border"
            />
          ) : null}
          <div className="prose-post">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.contentMd}
            </ReactMarkdown>
          </div>
        </article>

        <div className="max-w-3xl mx-auto px-6 pb-24">
          <div className="border-t border-border pt-8">
            <p className="font-semibold mb-3">{dict.postFooterLead}</p>
            <div className="max-w-sm">
              <SubscribeForm source="blog-post" locale={locale} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
