"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { categories, posts } from "@/lib/mock-data";

const PAGE_SIZE = 6;
const FILTERS = ["Todos", ...categories] as const;

export function BlogPageClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>(
    "Todos"
  );
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
  }, [activeFilter, search]);

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
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "border-gidib-green bg-gidib-green text-white"
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
            className="pl-9"
          />
        </div>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Nenhum artigo encontrado para essa busca.
        </p>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          >
            Carregar mais artigos
          </Button>
        </div>
      )}
    </>
  );
}
