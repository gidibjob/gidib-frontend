"use client";

import { Mail, MailOpen, Trash2 } from "lucide-react";
import { useAdminMessages } from "@/lib/admin-store";

export default function AdminMessagesPage() {
  const { items, hydrated, error, setRead, remove } = useAdminMessages();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      {items.map((msg) => (
        <article
          key={msg.id}
          className={`rounded-xl border bg-card p-5 ${
            msg.read ? "border-border" : "border-gidib-green/50"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {msg.subject || "(sem assunto)"}
              </p>
              <p className="text-xs text-muted-foreground">
                {msg.name} ·{" "}
                <a
                  href={`mailto:${msg.email}`}
                  className="text-gidib-green hover:underline"
                >
                  {msg.email}
                </a>{" "}
                · {new Date(msg.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => void setRead(msg.id, !msg.read)}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-gidib-green"
                aria-label={msg.read ? "Marcar como não lida" : "Marcar como lida"}
              >
                {msg.read ? (
                  <MailOpen className="size-4" />
                ) : (
                  <Mail className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Excluir esta mensagem?")) void remove(msg.id);
                }}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Excluir"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">
            {msg.message}
          </p>
        </article>
      ))}

      {hydrated && items.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Nenhuma mensagem recebida.
        </p>
      )}
    </div>
  );
}
