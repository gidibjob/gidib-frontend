"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  adminEventToRow,
  adminPartnerToRow,
  adminPostToRow,
  adminProjectToRow,
  rowToAdminEvent,
  rowToAdminPartner,
  rowToAdminPost,
  rowToAdminProject,
  rowToContactMessage,
  rowToMembershipRequest,
  type MembershipRequestRow,
  type ContactMessageRow,
  type EventRow,
  type PartnerRow,
  type PostRow,
  type ProjectRow,
} from "@/lib/mappers";
import type {
  AdminEvent,
  AdminPartner,
  AdminPost,
  AdminProject,
  ContactMessage,
  MembershipRequest,
  MembershipStatus,
} from "@/types/admin";

// Mensagem amigável para os erros mais comuns do Postgres/PostgREST.
export function describeError(error: { code?: string; message: string }) {
  if (error.code === "23505") return "Já existe um registro com esse slug/nome.";
  if (error.code === "23503")
    return "Este item está em uso por outros registros e não pode ser removido.";
  if (error.code === "42501")
    return "Sem permissão. Verifique se sua conta é de administrador.";
  return error.message;
}

type Identifiable = { slug: string } | { id?: string };

type CollectionConfig<T> = {
  table: string;
  fromRow: (row: never) => T;
  toRow: (item: T) => object;
  orderBy: { column: string; ascending: boolean };
  // Coluna usada para localizar o registro em update/remove.
  key: "slug" | "id";
};

function useCollection<T extends Identifiable>(config: CollectionConfig<T>) {
  const { table, fromRow, toRow, orderBy, key } = config;
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy.column, { ascending: orderBy.ascending });
    if (error) {
      setError(describeError(error));
    } else {
      setError(null);
      setItems((data as never[]).map(fromRow));
    }
    setHydrated(true);
  }, [supabase, table, fromRow, orderBy.column, orderBy.ascending]);

  useEffect(() => {
    // Carga inicial a partir do Supabase.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  const create = useCallback(
    async (item: T) => {
      const { error } = await supabase.from(table).insert(toRow(item));
      if (error) throw new Error(describeError(error));
      await reload();
    },
    [supabase, table, toRow, reload]
  );

  const update = useCallback(
    async (id: string, item: T) => {
      const { error } = await supabase
        .from(table)
        .update(toRow(item))
        .eq(key, id);
      if (error) throw new Error(describeError(error));
      await reload();
    },
    [supabase, table, toRow, key, reload]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error } = await supabase.from(table).delete().eq(key, id);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, table, key, reload]
  );

  return { items, hydrated, error, create, update, remove, reload };
}

const POSTS_CONFIG: CollectionConfig<AdminPost> = {
  table: "posts",
  fromRow: (row) => rowToAdminPost(row as PostRow),
  toRow: adminPostToRow,
  orderBy: { column: "created_at", ascending: false },
  key: "slug",
};

const EVENTS_CONFIG: CollectionConfig<AdminEvent> = {
  table: "events",
  fromRow: (row) => rowToAdminEvent(row as EventRow),
  toRow: adminEventToRow,
  orderBy: { column: "event_date", ascending: true },
  key: "slug",
};

const PROJECTS_CONFIG: CollectionConfig<AdminProject> = {
  table: "projects",
  fromRow: (row) => rowToAdminProject(row as ProjectRow),
  toRow: adminProjectToRow,
  orderBy: { column: "sort_order", ascending: true },
  key: "id",
};

const PARTNERS_CONFIG: CollectionConfig<AdminPartner> = {
  table: "partners",
  fromRow: (row) => rowToAdminPartner(row as PartnerRow),
  toRow: adminPartnerToRow,
  orderBy: { column: "sort_order", ascending: true },
  key: "id",
};

export function useAdminPosts() {
  return useCollection<AdminPost>(POSTS_CONFIG);
}

export function useAdminEvents() {
  return useCollection<AdminEvent>(EVENTS_CONFIG);
}

export function useAdminProjects() {
  return useCollection<AdminProject>(PROJECTS_CONFIG);
}

export function useAdminPartners() {
  return useCollection<AdminPartner>(PARTNERS_CONFIG);
}

function useNameList(table: "categories" | "tags") {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select("name")
      .order("name");
    if (error) {
      setError(describeError(error));
    } else {
      setError(null);
      setItems((data as { name: string }[]).map((row) => row.name));
    }
    setHydrated(true);
  }, [supabase, table]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  const add = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed || items.includes(trimmed)) return;
      const { error } = await supabase.from(table).insert({ name: trimmed });
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, table, items, reload]
  );

  const remove = useCallback(
    async (value: string) => {
      const { error } = await supabase.from(table).delete().eq("name", value);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, table, reload]
  );

  return { items, hydrated, error, add, remove };
}

export function useAdminCategories() {
  return useNameList("categories");
}

export function useAdminTags() {
  return useNameList("tags");
}

export function useAdminMessages() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(describeError(error));
    } else {
      setError(null);
      setItems((data as ContactMessageRow[]).map(rowToContactMessage));
    }
    setHydrated(true);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  const setRead = useCallback(
    async (id: string, read: boolean) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read })
        .eq("id", id);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, reload]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, reload]
  );

  return { items, hydrated, error, setRead, remove };
}

export function useAdminMemberships() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<MembershipRequest[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await supabase
      .from("membership_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(describeError(error));
    } else {
      setError(null);
      setItems((data as MembershipRequestRow[]).map(rowToMembershipRequest));
    }
    setHydrated(true);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  const setStatus = useCallback(
    async (id: string, status: MembershipStatus) => {
      const { error } = await supabase
        .from("membership_requests")
        .update({ status })
        .eq("id", id);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, reload]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from("membership_requests")
        .delete()
        .eq("id", id);
      if (error) {
        setError(describeError(error));
        return;
      }
      await reload();
    },
    [supabase, reload]
  );

  return { items, hydrated, error, setStatus, remove };
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
