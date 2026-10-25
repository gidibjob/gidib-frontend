"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAdminMemberships } from "@/lib/admin-store";
import {
  memberTypeLabels,
  membershipStatusLabels,
  type MembershipStatus,
} from "@/types/admin";

type Filter = "all" | MembershipStatus;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "new", label: membershipStatusLabels.new },
  { value: "in_review", label: membershipStatusLabels.in_review },
  { value: "approved", label: membershipStatusLabels.approved },
  { value: "rejected", label: membershipStatusLabels.rejected },
];

export default function AdminMembershipsPage() {
  const { items, hydrated, error, setStatus, remove } = useAdminMemberships();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!query) return true;
      return (
        r.name.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query) ||
        (r.organization ?? "").toLowerCase().includes(query)
      );
    });
  }, [items, filter, search]);

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

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail..."
            className="pl-9"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="w-8 px-4 py-3" />
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Perfil</th>
              <th className="px-4 py-3 font-medium">Recebida em</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((r) => {
              const open = openId === r.id;
              return (
                <Fragment key={r.id}>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : r.id)}
                        aria-label={open ? "Recolher detalhes" : "Ver detalhes"}
                        aria-expanded={open}
                        className="text-muted-foreground hover:text-gidib-green"
                      >
                        {open ? (
                          <ChevronDown className="size-4" />
                        ) : (
                          <ChevronRight className="size-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {r.name}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${r.email}`}
                        className="text-gidib-green hover:underline"
                      >
                        {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {memberTypeLabels[r.memberType] ?? r.memberType}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          void setStatus(r.id, e.target.value as MembershipStatus)
                        }
                        className="h-8 rounded-md border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-gidib-green"
                      >
                        {(
                          Object.keys(
                            membershipStatusLabels
                          ) as MembershipStatus[]
                        ).map((s) => (
                          <option key={s} value={s}>
                            {membershipStatusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Excluir a solicitação de ${r.name}?`)) {
                              void remove(r.id);
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
                  {open && (
                    <tr className="bg-muted/20">
                      <td />
                      <td colSpan={6} className="px-4 py-4">
                        <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                          {[
                            ["Telefone", r.phone],
                            ["Empresa / instituição", r.organization],
                            ["Cargo / curso", r.jobTitle],
                            ["Cidade / UF", r.city],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <dt className="text-xs text-muted-foreground">
                                {label}
                              </dt>
                              <dd className="text-foreground">{value || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                        {r.message && (
                          <p className="mt-4 whitespace-pre-wrap text-sm text-foreground">
                            {r.message}
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {hydrated && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhuma solicitação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
