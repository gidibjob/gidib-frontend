import type { Metadata } from "next";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog e Notícias",
  description: "Conteúdos que impulsionam a indústria brasileira.",
};

export default function BlogPage() {
  return (
    <div className="bg-gidib-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Blog e Notícias
        </h1>
        <p className="mt-2 text-white/80">
          Conteúdos que impulsionam a indústria brasileira.
        </p>
      </div>

      <div className="rounded-t-3xl bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogPageClient />
        </div>
      </div>
    </div>
  );
}
