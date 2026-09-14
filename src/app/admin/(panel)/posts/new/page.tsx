"use client";

import { useAdminPosts } from "@/lib/admin-store";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  const { create } = useAdminPosts();

  return (
    <div className="mx-auto max-w-3xl">
      <PostForm submitLabel="Criar artigo" onSubmit={create} />
    </div>
  );
}
