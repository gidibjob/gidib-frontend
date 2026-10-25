"use client";

import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

// As imagens são sempre links externos: nada é enviado ao Supabase,
// então o banco e o Storage não crescem com arquivos.
export function ImageField({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... (link direto da imagem)"
      />
      <p className="text-xs text-muted-foreground">
        Cole o link da imagem (por exemplo, do Unsplash ou do seu site). Use
        links fixos: links temporários, como os de redes sociais, podem parar
        de funcionar.
      </p>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Pré-visualização"
          referrerPolicy="no-referrer"
          className="h-32 w-auto max-w-full rounded-md border border-border object-cover"
        />
      )}
    </div>
  );
}
