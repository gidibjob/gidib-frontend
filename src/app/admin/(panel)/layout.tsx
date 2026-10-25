import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { createClient } from "@/lib/supabase/server";

async function getRole() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  return (data?.role as "admin" | "editor" | undefined) ?? null;
}

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRole();
  const isAdmin = role !== null;

  return (
    <div className="flex min-h-svh">
      <AdminSidebar isSuperAdmin={role === "admin"} />
      <div className="flex min-h-svh flex-1 flex-col">
        <AdminTopbar isSuperAdmin={role === "admin"} />
        {!isAdmin && (
          <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive sm:px-6">
            Sua conta não tem permissão de administrador. Peça para um
            administrador liberar o acesso — você poderá ver o painel, mas não
            salvar alterações.
          </div>
        )}
        <main className="flex-1 bg-muted/30 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
