"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { KeyRound, Search, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createUser,
  deleteUser,
  listUsers,
  setUserPassword,
  updateUserRole,
  type PanelRole,
  type PanelUser,
} from "./actions";

const ROLE_LABELS: Record<PanelRole, string> = {
  admin: "Administrador",
  editor: "Usuário (conteúdo)",
};

type Filter = "all" | PanelRole;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "admin", label: "Administradores" },
  { value: "editor", label: "Usuários" },
];

function formatDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleString("pt-BR") : "Nunca";
}

export function UsersManager({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<PanelUser[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<PanelRole>("editor");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((u) => {
      if (filter !== "all" && u.role !== filter) return false;
      return !query || u.email.toLowerCase().includes(query);
    });
  }, [users, filter, search]);

  const reload = useCallback(async () => {
    const result = await listUsers();
    setUsers(result.users);
    setError(result.error ?? null);
    setLoaded(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  async function run(action: () => Promise<{ error?: string }>) {
    setError(null);
    const result = await action();
    if (result.error) setError(result.error);
    await reload();
    return !result.error;
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const ok = await run(() => createUser({ email, password, role }));
    setSaving(false);
    if (ok) {
      setEmail("");
      setPassword("");
      setRole("editor");
      setShowForm(false);
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
              placeholder="Buscar por e-mail..."
              className="pl-9"
            />
          </div>
          <Button
            className="gap-2 bg-gidib-green hover:bg-gidib-green-dark"
            onClick={() => setShowForm((v) => !v)}
          >
            <UserPlus className="size-4" />
            Novo usuário
          </Button>
        </div>
      </div>

      {showForm && (
      <form
        onSubmit={handleCreate}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h2 className="text-sm font-semibold text-foreground">Novo usuário</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Administradores gerenciam conteúdo e usuários. Usuários comuns
          gerenciam apenas o conteúdo do site.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">E-mail</label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="pessoa@gidib.org.br"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Senha inicial</label>
            <Input
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Perfil</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as PanelRole)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-gidib-green"
            >
              <option value="editor">{ROLE_LABELS.editor}</option>
              <option value="admin">{ROLE_LABELS.admin}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-gidib-green hover:bg-gidib-green-dark"
          >
            {saving ? "Criando..." : "Criar usuário"}
          </Button>
        </div>
      </form>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Perfil</th>
              <th className="px-4 py-3 font-medium">Último acesso</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((user) => {
              const isMe = user.id === currentUserId;
              return (
                <tr key={user.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {user.email}
                    {isMe && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        (você)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      disabled={isMe}
                      onChange={(e) =>
                        void run(() => updateUserRole(user.id, e.target.value))
                      }
                      className="h-8 rounded-md border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-gidib-green disabled:opacity-60"
                    >
                      <option value="editor">{ROLE_LABELS.editor}</option>
                      <option value="admin">{ROLE_LABELS.admin}</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">
                    {formatDate(user.lastSignInAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const next = prompt(
                            `Nova senha para ${user.email} (mínimo 8 caracteres):`
                          );
                          if (next) void run(() => setUserPassword(user.id, next));
                        }}
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-gidib-green"
                        aria-label="Redefinir senha"
                        title="Redefinir senha"
                      >
                        <KeyRound className="size-4" />
                      </button>
                      <button
                        type="button"
                        disabled={isMe}
                        onClick={() => {
                          if (confirm(`Excluir o usuário ${user.email}?`)) {
                            void run(() => deleteUser(user.id));
                          }
                        }}
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Excluir"
                        title="Excluir"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {loaded && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
