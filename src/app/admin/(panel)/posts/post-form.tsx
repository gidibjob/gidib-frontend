"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/admin-store";
import { categories } from "@/lib/mock-data";
import type { AdminPost } from "@/types/admin";
import { postStatusLabels } from "@/types/admin";
import type { PostCategory } from "@/types/content";

const STATUS_OPTIONS = Object.entries(postStatusLabels) as Array<
  [AdminPost["status"], string]
>;

type Props = {
  initial?: AdminPost;
  onSubmit: (post: AdminPost) => void;
  submitLabel: string;
};

export function PostForm({ initial, onSubmit, submitLabel }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [category, setCategory] = useState<PostCategory>(
    initial?.category ?? categories[0]
  );
  const [author, setAuthor] = useState(initial?.author ?? "Equipe GIDIB");
  const [image, setImage] = useState(initial?.image ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(
    initial?.content?.join("\n\n") ?? ""
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState<AdminPost["status"]>(
    initial?.status ?? "draft"
  );
  const [publishAt, setPublishAt] = useState(initial?.publishAt ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initial?.seoDescription ?? ""
  );

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        const finalSlug = slug.trim() || slugify(title);
        const now = new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        onSubmit({
          slug: finalSlug,
          title,
          excerpt,
          category,
          author,
          date: initial?.date ?? now,
          readingTime: initial?.readingTime ?? "5 min de leitura",
          image: image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          content: content
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean),
          status,
          publishAt: status === "scheduled" ? publishAt : undefined,
          seoTitle,
          seoDescription,
        });
        router.push("/admin/posts");
      }}
    >
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Conteúdo</h2>
        <div className="mt-4 grid gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Título
            </label>
            <Input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              placeholder="Título do artigo"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Slug (URL)
            </label>
            <Input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="titulo-do-artigo"
            />
            <p className="text-xs text-muted-foreground">
              /blog/{slug || "titulo-do-artigo"}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Resumo
            </label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumo curto exibido nos cards"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Conteúdo (um parágrafo por bloco, separado por linha em branco)
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva o conteúdo do artigo..."
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Organização
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PostCategory)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-gidib-green"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Autor
            </label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Tags (separadas por vírgula)
            </label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="IA, Indústria 4.0, Dados"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Imagem (URL)
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Publicação
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as AdminPost["status"])
              }
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-gidib-green"
            >
              {STATUS_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {status === "scheduled" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Data de publicação
              </label>
              <Input
                type="date"
                value={publishAt}
                onChange={(e) => setPublishAt(e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">SEO</h2>
        <div className="mt-4 grid gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Meta título
            </label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Se vazio, usa o título do artigo"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Meta descrição
            </label>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Se vazio, usa o resumo do artigo"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/posts")}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="btn-hero-primary bg-gidib-green hover:bg-gidib-green-dark"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
