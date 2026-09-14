import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link2, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/reveal";
import { categoryBadgeClass } from "@/lib/category-styles";
import { getPostBySlug, getRelatedPosts, posts } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>{" "}
        &gt;{" "}
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>{" "}
        &gt;{" "}
        <span className="text-foreground">{post.category}</span>
      </nav>

      <Badge className={`mt-4 hover:opacity-100 ${categoryBadgeClass(post.category)}`}>
        {post.category.toUpperCase()}
      </Badge>

      <h1 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-3 text-sm text-muted-foreground">
        Por {post.author} • {post.date} • {post.readingTime}
      </p>

      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-4">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        <aside>
          <h2 className="text-sm font-semibold text-foreground">
            Você também pode gostar
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {relatedPosts.slice(0, 4).map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-gidib-green hover:underline hover:underline-offset-4"
              >
                {related.title}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
        <span className="text-sm font-medium text-muted-foreground">
          Compartilhar:
        </span>
        <div className="flex gap-2">
          {[
            { icon: Share2, label: "Compartilhar no LinkedIn" },
            { icon: Share2, label: "Compartilhar no Facebook" },
            { icon: MessageCircle, label: "Compartilhar no WhatsApp" },
            { icon: Link2, label: "Copiar link" },
          ].map(({ icon: Icon, label }, i) => (
            <button
              key={i}
              type="button"
              aria-label={label}
              title={label}
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-gidib-green hover:text-gidib-green hover:shadow-md hover:shadow-gidib-green/15"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-foreground">
            Artigos relacionados
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.slice(0, 3).map((related, i) => (
              <Reveal key={related.slug} delay={i * 80}>
                <PostCard post={related} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
