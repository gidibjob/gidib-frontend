"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CalendarDays,
  FolderKanban,
  Handshake,
  LayoutDashboard,
  Mail,
  Menu,
  Newspaper,
  ShieldCheck,
  Tags,
  UserPlus,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Artigos", icon: Newspaper },
  { href: "/admin/events", label: "Eventos", icon: CalendarDays },
  { href: "/admin/projects", label: "Projetos", icon: FolderKanban },
  { href: "/admin/partners", label: "Parceiros", icon: Handshake },
  { href: "/admin/associados", label: "Associações", icon: UserPlus },
  { href: "/admin/messages", label: "Mensagens", icon: Mail },
  { href: "/admin/categorias", label: "Categorias e tags", icon: Tags },
  { href: "/admin/usuarios", label: "Usuários", icon: ShieldCheck, adminOnly: true },
];

function titleForPath(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/posts/new")) return "Novo artigo";
  if (pathname.startsWith("/admin/posts")) return "Artigos";
  if (pathname.startsWith("/admin/events/new")) return "Novo evento";
  if (pathname.startsWith("/admin/events")) return "Eventos";
  if (pathname.startsWith("/admin/projects")) return "Projetos";
  if (pathname.startsWith("/admin/partners")) return "Parceiros";
  if (pathname.startsWith("/admin/associados")) return "Associações";
  if (pathname.startsWith("/admin/messages")) return "Mensagens";
  if (pathname.startsWith("/admin/usuarios")) return "Usuários";
  if (pathname.startsWith("/admin/categorias")) return "Categorias e tags";
  return "Admin";
}

export function AdminTopbar({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const pathname = usePathname();
  const title = titleForPath(pathname);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-gidib-green/10 text-xs font-semibold text-gidib-green">
              {(email[0] ?? "A").toUpperCase()}
            </div>
            <span className="text-sm font-medium text-foreground">
              {email || "Administrador"}
            </span>
          </div>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-3 py-3 lg:hidden">
          {NAV_ITEMS.filter((item) => isSuperAdmin || !item.adminOnly).map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
