"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CalendarDays,
  FolderKanban,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Tags,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Artigos", icon: Newspaper },
  { href: "/admin/events", label: "Eventos", icon: CalendarDays },
  { href: "/admin/projects", label: "Projetos", icon: FolderKanban },
  { href: "/admin/partners", label: "Parceiros", icon: Handshake },
  { href: "/admin/messages", label: "Mensagens", icon: Mail },
  { href: "/admin/categorias", label: "Categorias e tags", icon: Tags },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r border-white/10 bg-gidib-navy text-white lg:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <Image
          src="/logo-gidib.jpeg"
          alt="GIDIB"
          width={32}
          height={32}
          className="size-8 rounded-md object-cover"
        />
        <span className="text-base font-extrabold tracking-tight text-white">
          GIDIB
        </span>
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4 shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  );
}
