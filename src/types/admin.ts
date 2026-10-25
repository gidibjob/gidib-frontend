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

export type MembershipStatus = "new" | "in_review" | "approved" | "rejected";

export const membershipStatusLabels: Record<MembershipStatus, string> = {
  new: "Nova",
  in_review: "Em análise",
  approved: "Aprovada",
  rejected: "Recusada",
};

export const memberTypeLabels: Record<string, string> = {
  profissional: "Profissional",
  estudante: "Estudante",
  empresa: "Empresa / instituição",
};

export type MembershipRequest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  memberType: string;
  organization: string | null;
  jobTitle: string | null;
  city: string | null;
  message: string | null;
  status: MembershipStatus;
  createdAt: string;
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
