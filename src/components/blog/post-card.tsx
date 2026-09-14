import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/types/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Badge className="w-fit bg-gidib-navy text-white hover:bg-gidib-navy">
          {post.category.toUpperCase()}
        </Badge>
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          {post.date} • {post.readingTime}
        </p>
      </div>
    </Link>
  );
}
