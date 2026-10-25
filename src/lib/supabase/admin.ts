import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente com service_role: ignora a RLS. Só pode ser usado no servidor
// (server actions / route handlers), depois de verificar que quem chama é admin.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Variável SUPABASE_SERVICE_ROLE_KEY não configurada no servidor."
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
