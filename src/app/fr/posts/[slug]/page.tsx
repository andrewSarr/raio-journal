import type { Metadata } from "next";
import { PostView, buildPostMetadata } from "@/components/PostView";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildPostMetadata(slug, "fr");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostView locale="fr" slug={slug} />;
}
