import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import * as mock from "@/lib/mock-data";
import {
  rowToEvent,
  rowToPartner,
  rowToPost,
  rowToProject,
  type EventRow,
  type PartnerRow,
  type PostRow,
  type ProjectRow,
} from "@/lib/mappers";
import type { Event, Partner, Post, Project } from "@/types/content";

// Leitura pública do conteúdo (server-side). Usa a chave anônima sem cookies,
// então as páginas continuam estáticas/ISR e a RLS garante que só o publicado
// é retornado. Sem as variáveis de ambiente, cai no conteúdo de demonstração.

let client: SupabaseClient | null | undefined;

function getClient() {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

function fail(what: string, message: string): never {
  throw new Error(`Falha ao carregar ${what} do Supabase: ${message}`);
}

export async function getPosts(): Promise<Post[]> {
  const supabase = getClient();
  if (!supabase) return mock.posts;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) fail("artigos", error.message);
  return (data as PostRow[]).map(rowToPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const supabase = getClient();
  if (!supabase) return mock.getPostBySlug(slug);
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) fail("artigo", error.message);
  return data ? rowToPost(data as PostRow) : undefined;
}

export async function getRelatedPosts(post: Post): Promise<Post[]> {
  const supabase = getClient();
  if (!supabase) return mock.getRelatedPosts(post);

  if (post.relatedSlugs?.length) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .in("slug", post.relatedSlugs);
    if (error) fail("artigos relacionados", error.message);
    const bySlug = new Map(
      (data as PostRow[]).map((row) => [row.slug, rowToPost(row)])
    );
    return post.relatedSlugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Post => Boolean(p));
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", post.category)
    .neq("slug", post.slug)
    .order("published_at", { ascending: false })
    .limit(5);
  if (error) fail("artigos relacionados", error.message);
  return (data as PostRow[]).map(rowToPost);
}

export async function getCategories(): Promise<string[]> {
  const supabase = getClient();
  if (!supabase) return [...mock.categories];
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name");
  if (error) fail("categorias", error.message);
  return (data as { name: string }[]).map((row) => row.name);
}

// Data de hoje (YYYY-MM-DD) no fuso de Brasília, para o evento do dia continuar
// visível até a meia-noite daqui, e não do servidor (UTC).
export function todayInSaoPaulo() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

// Só eventos publicados cuja data é hoje ou futura, do mais próximo ao mais distante.
export async function getUpcomingEvents(): Promise<Event[]> {
  const today = todayInSaoPaulo();
  const supabase = getClient();
  if (!supabase) return mock.events.filter((e) => e.date >= today);
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .gte("event_date", today)
    .order("event_date")
    .order("event_time");
  if (error) fail("eventos", error.message);
  return (data as EventRow[]).map(rowToEvent);
}

export async function getProjects(): Promise<Project[]> {
  const supabase = getClient();
  if (!supabase) return mock.projects;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  if (error) fail("projetos", error.message);
  return (data as ProjectRow[]).map(rowToProject);
}

export async function getPartners(): Promise<Partner[]> {
  const supabase = getClient();
  if (!supabase) return mock.partners;
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order");
  if (error) fail("parceiros", error.message);
  return (data as PartnerRow[]).map(rowToPartner);
}
