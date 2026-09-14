"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventStatusBadge } from "@/components/admin/status-badge";
import { useAdminEvents } from "@/lib/admin-store";
import type { EventStatus } from "@/types/admin";
import { eventStatusLabels } from "@/types/admin";

const FILTERS: Array<"Todos" | EventStatus> = [
  "Todos",
  "draft",
  "published",
  "closed",
  "cancelled",
];

export default function AdminEventsPage() {
  const { items, remove } = useAdminEvents();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((event) => {
      if (filter !== "Todos" && event.status !== filter) return false;
      if (!query) return true;
      return event.title.toLowerCase().includes(query);
    });
  }, [items, filter, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === f
                  ? "border-gidib-green bg-gidib-green text-white"
                  : "border-border bg-background text-muted-foreground hover:border-gidib-green hover:text-gidib-green"
              }`}
            >
              {f === "Todos" ? "Todos" : eventStatusLabels[f]}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título..."
              className="pl-9"
            />
          </div>
          <Link
            href="/admin/events/new"
            className={buttonVariants({
              className: "gap-2 bg-gidib-green hover:bg-gidib-green-dark",
            })}
          >
            <Plus className="size-4" />
            Novo evento
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Modalidade</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((event) => (
              <tr key={event.slug} className="hover:bg-muted/30">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-foreground">
                  {event.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {event.modality}
                </td>
                <td className="px-4 py-3">
                  <EventStatusBadge status={event.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">
                  {event.day} {event.month}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/events/${event.slug}`}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-gidib-green"
                      aria-label="Editar"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Excluir o evento "${event.title}"?`)) {
                          remove(event.slug);
                        }
                      }}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Excluir"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhum evento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
