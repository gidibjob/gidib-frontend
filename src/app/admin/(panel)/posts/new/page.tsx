"use client";

import { useAdminPosts } from "@/lib/admin-store";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  const { create } = useAdminPosts();

  return (
    <div>
      <PostForm submitLabel="Criar artigo" onSubmit={create} />
    </div>
  );
}
