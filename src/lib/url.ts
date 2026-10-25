// Aceita só http(s); qualquer outra coisa (javascript:, data:, texto solto) vira undefined.
export function safeExternalUrl(value?: string | null) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

// Para o admin: "gidib.org.br" vira "https://gidib.org.br".
export function normalizeExternalUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
