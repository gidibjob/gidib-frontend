"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/reveal";
import type { Post } from "@/types/content";

const PAGE_SIZE = 6;

export function BlogPageClient({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const FILTERS = ["Todos", ...categories];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeFilter === "Todos" || post.category === activeFilter;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.some((block) => block.toLowerCase().includes(query)) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [posts, activeFilter, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "border-gidib-green bg-gidib-green text-white shadow-md shadow-gidib-green/20"
                  : "border-border bg-background text-muted-foreground hover:border-gidib-green hover:text-gidib-green"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Buscar artigos..."
            className="pl-9 focus-visible:border-gidib-green"
          />
        </div>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % PAGE_SIZE) * 60}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            Nenhum artigo encontrado para essa busca.
          </p>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="hover:border-gidib-green hover:text-gidib-green"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          >
            Carregar mais artigos
          </Button>
        </div>
      )}
    </>
  );
}
