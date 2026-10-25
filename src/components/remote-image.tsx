import Image, { type ImageProps } from "next/image";

// Hosts liberados no otimizador do Next (ver next.config.ts).
const OPTIMIZED_HOSTS = [/^images\.unsplash\.com$/, /\.supabase\.co$/];

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const { hostname } = new URL(src);
    return OPTIMIZED_HOSTS.some((pattern) => pattern.test(hostname));
  } catch {
    return false;
  }
}

// Imagens de conteúdo vêm de links colados no painel e podem ser de qualquer
// domínio. As de domínios fora da lista carregam direto no navegador, sem o
// otimizador (que rejeitaria o host). Sem imagem, mostra só o fundo.
export function RemoteImage({ src, alt, ...props }: ImageProps & { src: string }) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={!canOptimize(src)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
