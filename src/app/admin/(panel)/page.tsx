"use client";

import Link from "next/link";
import {
  CalendarDays,
  FolderKanban,
  Handshake,
  Mail,
  Newspaper,
  UserPlus,
} from "lucide-react";
import {
  EventStatusBadge,
  PostStatusBadge,
} from "@/components/admin/status-badge";
import {
  useAdminEvents,
  useAdminMemberships,
  useAdminMessages,
  useAdminPartners,
  useAdminPosts,
  useAdminProjects,
} from "@/lib/admin-store";
import { memberTypeLabels, membershipStatusLabels } from "@/types/admin";

const RECENT = 5;

type RecentItem = {
  key: string;
  title: string;
  href: string;
  meta?: string;
  badge?: React.ReactNode;
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function formatEventDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function NewDot() {
  return (
    <span
      className="size-2 shrink-0 rounded-full bg-gidib-green"
      aria-label="Novo"
      title="Novo"
    />
  );
}

function RecentCard({
  title,
  href,
  items,
  empty,
}: {
  title: string;
  href: string;
  items: RecentItem[];
  empty: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <Link
          href={href}
          className="text-sm font-medium text-gidib-green hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="mt-4 flex flex-col divide-y divide-border">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="flex items-center justify-between gap-4 py-3 text-sm hover:text-gidib-green"
          >
            <span className="flex min-w-0 items-center gap-2">
              {item.badge}
              <span className="truncate font-medium text-foreground">
                {item.title}
              </span>
            </span>
            {item.meta && (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {item.meta}
              </span>
            )}
          </Link>
        ))}

        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {empty}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { items: posts } = useAdminPosts();
  const { items: events } = useAdminEvents();
  const { items: projects } = useAdminProjects();
  const { items: partners } = useAdminPartners();
  const { items: messages } = useAdminMessages();
  const { items: memberships } = useAdminMemberships();

  const unreadMessages = messages.filter((m) => !m.read).length;
  const newMemberships = memberships.filter((m) => m.status === "new").length;

  const cards = [
    {
      icon: Newspaper,
      label: "Artigos publicados",
      value: posts.filter((p) => p.status === "published").length,
      hint: `${posts.length} no total`,
    },
    {
      icon: CalendarDays,
      label: "Eventos publicados",
      value: events.filter((e) => e.status === "published").length,
      hint: `${events.length} no total`,
    },
    {
      icon: FolderKanban,
      label: "Projetos visíveis",
      value: projects.filter((p) => p.published).length,
      hint: `${projects.length} no total`,
    },
    {
      icon: Handshake,
      label: "Parceiros visíveis",
      value: partners.filter((p) => p.published).length,
      hint: `${partners.length} cadastrados`,
    },
    {
      icon: UserPlus,
      label: "Associações novas",
      value: newMemberships,
      hint: `${memberships.length} no total`,
    },
    {
      icon: Mail,
      label: "Mensagens novas",
      value: unreadMessages,
      hint: `${messages.length} no total`,
    },
  ];

  // Eventos: os mais recentes por data (os futuros aparecem primeiro).
  const recentEvents = [...events]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, RECENT);

  const recent = {
    posts: posts.slice(0, RECENT).map<RecentItem>((post) => ({
      key: post.slug,
      title: post.title,
      href: `/admin/posts/${post.slug}`,
      meta: post.date,
      badge: <PostStatusBadge status={post.status} />,
    })),
    events: recentEvents.map<RecentItem>((event) => ({
      key: event.slug,
      title: event.title,
      href: `/admin/events/${event.slug}`,
      meta: formatEventDate(event.date),
      badge: <EventStatusBadge status={event.status} />,
    })),
    projects: projects.slice(0, RECENT).map<RecentItem>((project) => ({
      key: project.id ?? project.slug,
      title: project.title,
      href: "/admin/projects",
      meta: project.category,
    })),
    partners: partners.slice(0, RECENT).map<RecentItem>((partner) => ({
      key: partner.id ?? partner.name,
      title: partner.name,
      href: "/admin/partners",
      meta: partner.websiteUrl ? "Com site" : undefined,
    })),
    memberships: memberships.slice(0, RECENT).map<RecentItem>((request) => ({
      key: request.id,
      title: request.name,
      href: "/admin/associados",
      meta: `${memberTypeLabels[request.memberType] ?? request.memberType} · ${
        membershipStatusLabels[request.status]
      } · ${formatDateTime(request.createdAt)}`,
      badge: request.status === "new" ? <NewDot /> : undefined,
    })),
    messages: messages.slice(0, RECENT).map<RecentItem>((message) => ({
      key: message.id,
      title: message.subject || message.name,
      href: "/admin/messages",
      meta: formatDateTime(message.createdAt),
      badge: message.read ? undefined : <NewDot />,
    })),
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map(({ icon: Icon, label, value, hint }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
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

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <RecentCard
          title="Últimos artigos"
          href="/admin/posts"
          items={recent.posts}
          empty="Nenhum artigo ainda."
        />
        <RecentCard
          title="Eventos"
          href="/admin/events"
          items={recent.events}
          empty="Nenhum evento ainda."
        />
        <RecentCard
          title="Projetos"
          href="/admin/projects"
          items={recent.projects}
          empty="Nenhum projeto ainda."
        />
        <RecentCard
          title="Parceiros"
          href="/admin/partners"
          items={recent.partners}
          empty="Nenhum parceiro ainda."
        />
        <RecentCard
          title="Últimas solicitações de associação"
          href="/admin/associados"
          items={recent.memberships}
          empty="Nenhuma solicitação ainda."
        />
        <RecentCard
          title="Últimas mensagens"
          href="/admin/messages"
          items={recent.messages}
          empty="Nenhuma mensagem ainda."
        />
      </div>
    </div>
  );
}
