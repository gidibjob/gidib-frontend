"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminPartners } from "@/lib/admin-store";
import { normalizeExternalUrl } from "@/lib/url";
import type { AdminPartner } from "@/types/admin";

type Filter = "all" | "visible" | "hidden";

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "visible", label: "Visíveis" },
  { value: "hidden", label: "Ocultos" },
];

const EMPTY: AdminPartner = {
  name: "",
  websiteUrl: "",
  imageUrl: "",
  sortOrder: 0,
  published: true,
};

export default function AdminPartnersPage() {
  const { items, error, create, update, remove } = useAdminPartners();
  const [editing, setEditing] = useState<AdminPartner | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((p) => {
      if (filter === "visible" && !p.published) return false;
      if (filter === "hidden" && p.published) return false;
      return !query || p.name.toLowerCase().includes(query);
    });
  }, [items, filter, search]);

  const isNew = editing !== null && !editing.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setFormError(null);
    try {
      const partner = {
        ...editing,
        websiteUrl: normalizeExternalUrl(editing.websiteUrl),
      };
      if (isNew) await create(partner);
      else await update(editing.id!, partner);
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === f.value
                  ? "border-gidib-green bg-gidib-green text-white"
                  : "border-border bg-background text-muted-foreground hover:border-gidib-green hover:text-gidib-green"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome..."
              className="pl-9"
            />
          </div>
          <Button
            className="gap-2 bg-gidib-green hover:bg-gidib-green-dark"
            onClick={() => {
              setFormError(null);
              setEditing({ ...EMPTY, sortOrder: items.length });
            }}
          >
            <Plus className="size-4" />
            Novo parceiro
          </Button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {editing && (
        <form
          onSubmit={save}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
        >
          <h2 className="text-sm font-semibold text-foreground">
            {isNew ? "Novo parceiro" : "Editar parceiro"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Nome</label>
              <Input
                required
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Site (opcional — destaca o parceiro)</label>
              <Input
                value={editing.websiteUrl}
                onChange={(e) =>
                  setEditing({ ...editing, websiteUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Ordem</label>
              <Input
                type="number"
                value={editing.sortOrder}
                onChange={(e) =>
                  setEditing({ ...editing, sortOrder: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium">Logo (link da imagem)</label>
              <ImageField
                value={editing.imageUrl}
                onChange={(imageUrl) => setEditing({ ...editing, imageUrl })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) =>
                  setEditing({ ...editing, published: e.target.checked })
                }
              />
              Visível no site
            </label>
          </div>
          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(null)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gidib-green hover:bg-gidib-green-dark"
            >
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Site</th>
              <th className="px-4 py-3 font-medium">Imagem</th>
              <th className="px-4 py-3 font-medium">Visível</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((partner) => (
              <tr key={partner.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">
                  {partner.name}
                </td>
                <td className="max-w-xs px-4 py-3">
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-gidib-green hover:underline"
                      title={partner.websiteUrl}
                    >
                      {partner.websiteUrl}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {partner.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partner.imageUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="size-8 rounded border border-border bg-white object-contain"
                    />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {partner.published ? "Sim" : "Não"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        setEditing(partner);
                      }}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-gidib-green"
                      aria-label="Editar"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Excluir o parceiro "${partner.name}"?`)) {
                          void remove(partner.id!);
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
                  Nenhum parceiro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
