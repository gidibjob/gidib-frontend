"use client";

import { notFound, useParams } from "next/navigation";
import { useAdminPosts } from "@/lib/admin-store";
import { PostForm } from "../post-form";

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const { items, hydrated, update } = useAdminPosts();
  const post = items.find((p) => p.slug === params.slug);

  if (hydrated && !post) notFound();
  if (!post) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <PostForm
        initial={post}
        submitLabel="Salvar alterações"
        onSubmit={(updated) => update(params.slug, updated)}
      />
    </div>
  );
}
