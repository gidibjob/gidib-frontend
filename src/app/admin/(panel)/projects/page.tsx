"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ImageField } from "@/components/admin/image-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify, useAdminProjects } from "@/lib/admin-store";
import type { AdminProject } from "@/types/admin";

const EMPTY: AdminProject = {
  slug: "",
  title: "",
  description: "",
  category: "",
  image: "",
  sortOrder: 0,
  published: true,
};

export default function AdminProjectsPage() {
  const { items, error, create, update, remove } = useAdminProjects();
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isNew = editing !== null && !editing.id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setFormError(null);
    const project = {
      ...editing,
      slug: editing.slug.trim() || slugify(editing.title),
    };
    try {
      if (isNew) await create(project);
      else await update(editing.id!, project);
      setEditing(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="gap-2 bg-gidib-green hover:bg-gidib-green-dark"
          onClick={() => {
            setFormError(null);
            setEditing({ ...EMPTY, sortOrder: items.length });
          }}
        >
          <Plus className="size-4" />
          Novo projeto
        </Button>
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
            {isNew ? "Novo projeto" : "Editar projeto"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                required
                value={editing.title}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                    slug: isNew ? slugify(e.target.value) : editing.slug,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Categoria</label>
              <Input
                required
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
                placeholder="Qualificação, Inovação..."
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
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                required
                rows={3}
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium">Imagem</label>
              <ImageField
                value={editing.image}
                onChange={(image) => setEditing({ ...editing, image })}
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
              <th className="px-4 py-3 font-medium">Projeto</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Visível</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((project) => (
              <tr key={project.id} className="hover:bg-muted/30">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-foreground">
                  {project.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {project.category}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {project.published ? "Sim" : "Não"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        setEditing(project);
                      }}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-gidib-green"
                      aria-label="Editar"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Excluir o projeto "${project.title}"?`)) {
                          void remove(project.id!);
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
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhum projeto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
