import type { Event, Post } from "@/types/content";

export type PostStatus = "draft" | "scheduled" | "published" | "archived";

export const postStatusLabels: Record<PostStatus, string> = {
  draft: "Rascunho",
  scheduled: "Agendado",
  published: "Publicado",
  archived: "Arquivado",
};

export type EventStatus = "draft" | "published" | "closed" | "cancelled";

export const eventStatusLabels: Record<EventStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  closed: "Encerrado",
  cancelled: "Cancelado",
};

export type AdminPost = Post & {
  status: PostStatus;
  publishAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type AdminEvent = Event & {
  status: EventStatus;
};
