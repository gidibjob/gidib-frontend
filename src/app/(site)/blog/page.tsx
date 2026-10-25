import type { Metadata } from "next";
import { getCategories, getPosts } from "@/lib/content";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog e Notícias",
  description: "Conteúdos que impulsionam a indústria brasileira.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  return (
    <div className="bg-gidib-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-h2">Blog e Notícias</h1>
        <p className="mt-2 text-white/80">
          Conteúdos que impulsionam a indústria brasileira.
        </p>
      </div>

      <div className="rounded-t-3xl bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogPageClient posts={posts} categories={categories} />
        </div>
      </div>
    </div>
  );
}
