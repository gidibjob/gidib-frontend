// Administrador geral máximo: só ele pode excluir a própria conta, alterar a
// própria senha ou ser alterado. Nenhum outro administrador mexe nesta conta.
export const OWNER_EMAIL = "bagalholeslie@gmail.com";

export function isOwnerEmail(email?: string | null) {
  return email?.trim().toLowerCase() === OWNER_EMAIL;
}
