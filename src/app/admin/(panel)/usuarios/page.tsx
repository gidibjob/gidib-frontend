import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UsersManager } from "./users-manager";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (data?.role !== "admin") redirect("/admin");

  return <UsersManager currentUserId={user.id} />;
}
