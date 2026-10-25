"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isOwnerEmail } from "@/lib/owner";

export type PanelRole = "admin" | "editor";

export type PanelUser = {
  id: string;
  email: string;
  role: PanelRole;
  createdAt: string;
  lastSignInAt: string | null;
  isOwner: boolean;
};

type Result = { error?: string };

const MIN_PASSWORD = 8;

// Garante que quem chama é admin geral e devolve o id e se é o admin máximo.
async function requireSuperAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sessão expirada. Entre novamente.");

  const { data } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (data?.role !== "admin") {
    throw new Error("Apenas administradores podem gerenciar usuários.");
  }
  return { id: user.id, isOwner: isOwnerEmail(user.email) };
}

async function isOwnerUser(userId: string) {
  const { data } = await createServiceClient().auth.admin.getUserById(userId);
  return isOwnerEmail(data.user?.email);
}

function message(err: unknown) {
  return err instanceof Error ? err.message : "Erro inesperado.";
}

function isRole(value: string): value is PanelRole {
  return value === "admin" || value === "editor";
}

export async function listUsers(): Promise<{
  users: PanelUser[];
  error?: string;
}> {
  try {
    await requireSuperAdmin();
    const service = createServiceClient();

    const [{ data: roles, error: rolesError }, authResult] = await Promise.all([
      service.from("admin_users").select("user_id, role"),
      service.auth.admin.listUsers({ perPage: 200 }),
    ]);
    if (rolesError) throw rolesError;
    if (authResult.error) throw authResult.error;

    const roleById = new Map(
      (roles ?? []).map((r) => [r.user_id as string, r.role as PanelRole])
    );
    const users = authResult.data.users
      .filter((u) => roleById.has(u.id))
      .map((u) => ({
        id: u.id,
        email: u.email ?? "",
        role: roleById.get(u.id)!,
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
        isOwner: isOwnerEmail(u.email),
      }))
      .sort((a, b) => a.email.localeCompare(b.email));
    return { users };
  } catch (err) {
    return { users: [], error: message(err) };
  }
}

export async function createUser(input: {
  email: string;
  password: string;
  role: string;
}): Promise<Result> {
  try {
    await requireSuperAdmin();
    const email = input.email.trim().toLowerCase();
    if (!email) return { error: "Informe o e-mail." };
    if (input.password.length < MIN_PASSWORD) {
      return { error: `A senha deve ter ao menos ${MIN_PASSWORD} caracteres.` };
    }
    if (!isRole(input.role)) return { error: "Perfil inválido." };

    const service = createServiceClient();
    const { data, error } = await service.auth.admin.createUser({
      email,
      password: input.password,
      email_confirm: true,
    });
    if (error) {
      return {
        error: /already|registered|exists/i.test(error.message)
          ? "Já existe um usuário com esse e-mail."
          : error.message,
      };
    }

    const { error: roleError } = await service
      .from("admin_users")
      .insert({ user_id: data.user.id, role: input.role });
    if (roleError) {
      // Não deixa um usuário órfão sem perfil.
      await service.auth.admin.deleteUser(data.user.id);
      return { error: roleError.message };
    }

    revalidatePath("/admin/usuarios");
    return {};
  } catch (err) {
    return { error: message(err) };
  }
}

export async function updateUserRole(
  userId: string,
  role: string
): Promise<Result> {
  try {
    const me = await requireSuperAdmin();
    if (!isRole(role)) return { error: "Perfil inválido." };
    if (userId === me.id) {
      return { error: "Você não pode alterar o seu próprio perfil." };
    }
    if (await isOwnerUser(userId)) {
      return { error: "O administrador geral máximo não pode ser alterado." };
    }

    const { error } = await createServiceClient()
      .from("admin_users")
      .update({ role })
      .eq("user_id", userId);
    if (error) return { error: error.message };

    revalidatePath("/admin/usuarios");
    return {};
  } catch (err) {
    return { error: message(err) };
  }
}

export async function setUserPassword(
  userId: string,
  password: string
): Promise<Result> {
  try {
    const me = await requireSuperAdmin();
    if (userId !== me.id && (await isOwnerUser(userId))) {
      return {
        error: "Apenas o administrador geral máximo altera a própria senha.",
      };
    }
    if (password.length < MIN_PASSWORD) {
      return { error: `A senha deve ter ao menos ${MIN_PASSWORD} caracteres.` };
    }
    const { error } = await createServiceClient().auth.admin.updateUserById(
      userId,
      { password }
    );
    if (error) return { error: error.message };
    return {};
  } catch (err) {
    return { error: message(err) };
  }
}

export async function deleteUser(userId: string): Promise<Result> {
  try {
    const me = await requireSuperAdmin();
    if (userId === me.id) {
      // Só o administrador geral máximo pode excluir a própria conta.
      if (!me.isOwner) {
        return { error: "Você não pode excluir a sua própria conta." };
      }
    } else if (await isOwnerUser(userId)) {
      return {
        error: "O administrador geral máximo só pode ser excluído por ele mesmo.",
      };
    }
    const { error } = await createServiceClient().auth.admin.deleteUser(userId);
    if (error) return { error: error.message };

    revalidatePath("/admin/usuarios");
    return {};
  } catch (err) {
    return { error: message(err) };
  }
}
