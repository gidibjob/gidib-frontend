import type {
  MembershipRequest,
  MembershipStatus,
  AdminEvent,
  AdminPartner,
  AdminPost,
  AdminProject,
  ContactMessage,
} from "@/types/admin";
import type { Event, EventModality, Partner, Post, Project } from "@/types/content";

// Tipos das linhas do Postgres (snake_case) usadas só na borda com o Supabase.
export type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  content: string[];
  reading_time: string;
  related_slugs: string[];
  status: AdminPost["status"];
  publish_at: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
};

export type EventRow = {
  slug: string;
  title: string;
  description: string;
  modality: EventModality;
  event_date: string;
  event_time: string;
  location: string;
  registration_url: string;
  status: AdminEvent["status"];
};

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  sort_order: number;
  published: boolean;
};

export type PartnerRow = {
  id: string;
  name: string;
  website_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export type MembershipRequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  member_type: string;
  organization: string | null;
  job_title: string | null;
  city: string | null;
  message: string | null;
  status: MembershipStatus;
  created_at: string;
};

export function rowToMembershipRequest(
  row: MembershipRequestRow
): MembershipRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    memberType: row.member_type,
    organization: row.organization,
    jobTitle: row.job_title,
    city: row.city,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

const SHORT_MONTHS = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

const EVENT_MONTHS = SHORT_MONTHS.map((m) => m.toUpperCase());

export function formatPostDate(iso: string) {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function estimateReadingTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min de leitura`;
}

export function rowToPost(row: PostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: formatPostDate(row.published_at ?? row.created_at),
    readingTime: row.reading_time,
    image: row.image,
    tags: row.tags,
    content: row.content,
    relatedSlugs: row.related_slugs,
  };
}

export function rowToAdminPost(row: PostRow): AdminPost {
  return {
    ...rowToPost(row),
    status: row.status,
    publishAt: row.publish_at ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
}

export function adminPostToRow(post: AdminPost) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    image: post.image,
    tags: post.tags,
    content: post.content,
    reading_time: estimateReadingTime(post.content),
    related_slugs: post.relatedSlugs ?? [],
    status: post.status,
    publish_at: post.status === "scheduled" ? post.publishAt || null : null,
    seo_title: post.seoTitle || null,
    seo_description: post.seoDescription || null,
  };
}

export function rowToEvent(row: EventRow): Event {
  // event_date vem como "YYYY-MM-DD"; evita new Date() para não deslocar o dia por fuso.
  const [, month, day] = row.event_date.split("-");
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    modality: row.modality,
    date: row.event_date,
    day,
    month: EVENT_MONTHS[Number(month) - 1],
    time: row.event_time,
    location: row.location,
    registrationUrl: row.registration_url,
  };
}

export function rowToAdminEvent(row: EventRow): AdminEvent {
  return { ...rowToEvent(row), status: row.status };
}

export function adminEventToRow(event: AdminEvent) {
  return {
    slug: event.slug,
    title: event.title,
    description: event.description,
    modality: event.modality,
    event_date: event.date,
    event_time: event.time,
    location: event.location,
    registration_url: event.registrationUrl,
    status: event.status,
  };
}

export function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    image: row.image,
  };
}

export function rowToAdminProject(row: ProjectRow): AdminProject {
  return {
    ...rowToProject(row),
    id: row.id,
    sortOrder: row.sort_order,
    published: row.published,
  };
}

export function adminProjectToRow(project: AdminProject) {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    image: project.image,
    sort_order: project.sortOrder,
    published: project.published,
  };
}

export function rowToPartner(row: PartnerRow): Partner {
  return {
    name: row.name,
    websiteUrl: row.website_url ?? undefined,
    imageUrl: row.image_url ?? undefined,
  };
}

export function rowToAdminPartner(row: PartnerRow): AdminPartner {
  return {
    id: row.id,
    name: row.name,
    websiteUrl: row.website_url ?? "",
    imageUrl: row.image_url ?? "",
    sortOrder: row.sort_order,
    published: row.published,
  };
}

export function adminPartnerToRow(partner: AdminPartner) {
  return {
    name: partner.name,
    website_url: partner.websiteUrl || null,
    image_url: partner.imageUrl || null,
    sort_order: partner.sortOrder,
    published: partner.published,
  };
}

export function rowToContactMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}
