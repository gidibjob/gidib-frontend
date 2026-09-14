"use client";

import Link from "next/link";
import { CalendarDays, Eye, Newspaper, Users } from "lucide-react";
import { useAdminEvents, useAdminPosts } from "@/lib/admin-store";

export default function AdminDashboardPage() {
  const { items: posts } = useAdminPosts();
  const { items: events } = useAdminEvents();

  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const publishedEvents = events.filter((e) => e.status === "published").length;

  const cards = [
    {
      icon: Eye,
      label: "Visitantes (30 dias)",
      value: "—",
      hint: "Conecte o Supabase/Analytics para números reais",
    },
    {
      icon: Newspaper,
      label: "Artigos publicados",
      value: publishedPosts,
      hint: `${posts.length} no total`,
    },
    {
      icon: CalendarDays,
      label: "Eventos publicados",
      value: publishedEvents,
      hint: `${events.length} no total`,
    },
    {
      icon: Users,
      label: "Usuários do painel",
      value: 1,
      hint: "Administrador",
    },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, label, value, hint }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
                <Icon className="size-4" />
              </div>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
            <p className="mt-3 text-2xl font-extrabold tabular-nums text-foreground">
              {value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Últimos artigos
          </h2>
          <Link
            href="/admin/posts"
            className="text-sm font-medium text-gidib-green hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="mt-4 flex flex-col divide-y divide-border">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/admin/posts/${post.slug}`}
              className="flex items-center justify-between gap-4 py-3 text-sm hover:text-gidib-green"
            >
              <span className="truncate font-medium text-foreground">
                {post.title}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
