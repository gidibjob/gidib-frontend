"use client";

import { useCallback, useEffect, useState } from "react";
import { categories, events, posts } from "@/lib/mock-data";
import type { AdminEvent, AdminPost } from "@/types/admin";

const POSTS_KEY = "gidib-admin-posts";
const EVENTS_KEY = "gidib-admin-events";
const CATEGORIES_KEY = "gidib-admin-categories";
const TAGS_KEY = "gidib-admin-tags";

const seedCategories: string[] = [...categories];
const seedTags: string[] = Array.from(
  new Set(posts.flatMap((post) => post.tags))
).sort();

const seedPosts: AdminPost[] = posts.map((post) => ({
  ...post,
  status: "published",
}));

const seedEvents: AdminEvent[] = events.map((event) => ({
  ...event,
  status: "published",
}));

function readStorage<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return seed;
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

function writeStorage<T>(key: string, value: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage indisponível (modo privado, quota excedida, etc.) — ignora.
  }
}

function useAdminCollection<T extends { slug: string }>(
  key: string,
  seed: T[]
) {
  const [items, setItems] = useState<T[]>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hidrata a partir do localStorage — só existe no client, por isso não dá
    // pra ler no useState inicial (evita mismatch de hydration do SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage(key, seed));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      writeStorage(key, next);
    },
    [key]
  );

  const create = useCallback(
    (item: T) => persist([item, ...items]),
    [items, persist]
  );

  const update = useCallback(
    (slug: string, patch: Partial<T>) =>
      persist(
        items.map((item) =>
          item.slug === slug ? { ...item, ...patch } : item
        )
      ),
    [items, persist]
  );

  const remove = useCallback(
    (slug: string) => persist(items.filter((item) => item.slug !== slug)),
    [items, persist]
  );

  const getBySlug = useCallback(
    (slug: string) => items.find((item) => item.slug === slug),
    [items]
  );

  return { items, hydrated, create, update, remove, getBySlug };
}

export function useAdminPosts() {
  return useAdminCollection<AdminPost>(POSTS_KEY, seedPosts);
}

export function useAdminEvents() {
  return useAdminCollection<AdminEvent>(EVENTS_KEY, seedEvents);
}

function useStringList(key: string, seed: string[]) {
  const [items, setItems] = useState<string[]>(seed);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage(key, seed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      setItems(next);
      writeStorage(key, next);
    },
    [key]
  );

  const add = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || items.includes(trimmed)) return;
      persist([...items, trimmed]);
    },
    [items, persist]
  );

  const remove = useCallback(
    (value: string) => persist(items.filter((item) => item !== value)),
    [items, persist]
  );

  return { items, add, remove };
}

export function useAdminCategories() {
  return useStringList(CATEGORIES_KEY, seedCategories);
}

export function useAdminTags() {
  return useStringList(TAGS_KEY, seedTags);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
