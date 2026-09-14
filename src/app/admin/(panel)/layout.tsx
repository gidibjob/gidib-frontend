import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      <AdminSidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <AdminTopbar />
        <div className="border-b border-gidib-yellow/30 bg-gidib-yellow/10 px-4 py-2 text-center text-xs text-gidib-navy sm:px-6">
          Ambiente de demonstração — as alterações ficam salvas apenas
          neste navegador até a integração com o Supabase.
        </div>
        <main className="flex-1 bg-muted/30 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
