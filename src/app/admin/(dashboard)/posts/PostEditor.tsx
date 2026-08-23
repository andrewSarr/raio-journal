"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { savePost } from "./actions";
import { slugify } from "@/lib/slug";

// react-md-editor touches `navigator` at module scope — must load client-only.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PostEditorProps = {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    contentMd: string;
    coverImage: string | null;
    status: "DRAFT" | "PUBLISHED";
  };
};

export function PostEditor({ post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [content, setContent] = useState(post?.contentMd ?? "");

  return (
    <form action={savePost} className="max-w-4xl mx-auto px-6 py-8">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <input type="hidden" name="contentMd" value={content} />

      <div className="flex items-center justify-between mb-6">
        <a href="/admin" className="text-sm text-ink-sub hover:text-ink">
          &larr; Back to posts
        </a>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            name="intent"
            value="draft"
            className="text-sm font-medium border border-border rounded-md px-4 py-2 hover:bg-cream-panel cursor-pointer"
          >
            Save draft
          </button>
          <button
            type="submit"
            name="intent"
            value="publish"
            className="text-sm font-semibold bg-rust hover:bg-rust-deep text-cream rounded-md px-4 py-2 cursor-pointer"
          >
            {post?.status === "PUBLISHED" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <input
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (!slugTouched) setSlug(slugify(e.target.value));
        }}
        placeholder="Post title"
        required
        className="w-full font-serif font-extrabold text-3xl placeholder:text-ink-sub/40 border-none outline-none bg-transparent mb-3"
      />

      <div className="flex items-center gap-2 mb-4 font-mono text-sm text-ink-sub">
        <span>/posts/</span>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          required
          className="border-b border-dashed border-border outline-none bg-transparent flex-1 focus:border-rust"
        />
      </div>

      <textarea
        name="excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="One or two sentences for the post list and link previews."
        required
        rows={2}
        className="w-full border border-border rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-rust/40 focus:border-rust resize-none"
      />

      <input
        name="coverImage"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        placeholder="Cover image URL (optional)"
        className="w-full border border-border rounded-md px-3 py-2 text-sm mb-6 font-mono focus:outline-none focus:ring-2 focus:ring-rust/40 focus:border-rust"
      />

      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(v) => setContent(v ?? "")}
          height={520}
          preview="live"
        />
      </div>
    </form>
  );
}
