"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Newspaper, Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/reveal";
import type { Post } from "@/types/content";

const PAGE_SIZE = 12;

function NoPosts() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-gidib-green/10 text-gidib-green">
        <Newspaper className="size-5" />
      </div>
      <p className="text-base font-semibold text-foreground">
        Em breve novos conteúdos
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Ainda não há artigos publicados. Volte em breve para acompanhar as
        novidades da GIDIB.
      </p>
    </div>
  );
}

export function BlogPageClient({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const FILTERS = ["Todos", ...categories];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);

  // A busca do menu navega para /blog?q=...; com a página já aberta o
  // componente não remonta, então sincroniza o termo aqui.
  const urlQuery = searchParams.get("q") ?? "";
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(urlQuery);
    setPage(1);
  }, [urlQuery]);
  const listRef = useRef<HTMLDivElement>(null);

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

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function goToPage(next: number) {
    setPage(next);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (posts.length === 0) return <NoPosts />;

  return (
    <>
      <div
        ref={listRef}
        className="flex scroll-mt-24 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setPage(1);
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
              setPage(1);
            }}
            placeholder="Buscar artigos..."
            className="pl-9 focus-visible:border-gidib-green"
          />
        </div>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 6) * 60}>
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

      {totalPages > 1 && (
        <nav
          aria-label="Paginação"
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-foreground"
        >
          <Button
            variant="outline"
            className="gap-1 text-foreground hover:border-gidib-green hover:text-gidib-green"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            <ChevronLeft className="size-4" />
            Anterior
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goToPage(n)}
              aria-label={`Página ${n}`}
              aria-current={n === currentPage ? "page" : undefined}
              className={`size-8 rounded-lg border text-sm font-medium transition-colors ${
                n === currentPage
                  ? "border-gidib-green bg-gidib-green text-white"
                  : "border-border bg-background text-foreground hover:border-gidib-green hover:text-gidib-green"
              }`}
            >
              {n}
            </button>
          ))}

          <Button
            variant="outline"
            className="gap-1 text-foreground hover:border-gidib-green hover:text-gidib-green"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Próxima
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}
    </>
  );
}
