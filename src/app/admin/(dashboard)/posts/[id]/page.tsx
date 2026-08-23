import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "../PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return <PostEditor post={post} />;
}
