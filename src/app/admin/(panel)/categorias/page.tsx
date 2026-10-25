"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminCategories, useAdminTags } from "@/lib/admin-store";

function ManagedList({
  title,
  description,
  items,
  onAdd,
  onRemove,
  placeholder,
  error,
}: {
  title: string;
  description: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  placeholder: string;
  error: string | null;
}) {
  const [value, setValue] = useState("");

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(value);
          setValue("");
        }}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 bg-gidib-green hover:bg-gidib-green-dark"
          aria-label="Adicionar"
        >
          <Plus className="size-4" />
        </Button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(item)}
              aria-label={`Remover ${item}`}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </span>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">Nada cadastrado.</p>
        )}
      </div>
    </section>
  );
}

export default function AdminCategoriasPage() {
  const categories = useAdminCategories();
  const tags = useAdminTags();

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <ManagedList
        title="Categorias"
        description="Usadas para organizar artigos e projetos no site."
        items={categories.items}
        onAdd={categories.add}
        onRemove={categories.remove}
        error={categories.error}
        placeholder="Nova categoria"
      />
      <ManagedList
        title="Tags"
        description="Usadas na busca e nos artigos relacionados."
        items={tags.items}
        onAdd={tags.add}
        onRemove={tags.remove}
        error={tags.error}
        placeholder="Nova tag"
      />
    </div>
  );
}
