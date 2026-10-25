import type { Event, Post, Project } from "@/types/content";

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

export type AdminProject = Project & {
  id?: string;
  sortOrder: number;
  published: boolean;
};

export type AdminPartner = {
  id?: string;
  name: string;
  websiteUrl: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};
