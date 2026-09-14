"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-svh items-center justify-center bg-gidib-navy px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-background p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <Image
            src="/logo-gidib.jpeg"
            alt="GIDIB"
            width={48}
            height={48}
            className="size-12 rounded-lg object-cover"
          />
          <h1 className="mt-2 text-lg font-bold text-foreground">
            Painel administrativo
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com sua conta GIDIB para gerenciar o site.
          </p>
        </div>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            router.push("/admin");
          }}
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder="voce@gidib.org.br"
              className="focus-visible:border-gidib-green"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="focus-visible:border-gidib-green"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="btn-hero-primary mt-2 bg-gidib-green hover:bg-gidib-green-dark"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <button
            type="button"
            className="text-center text-sm text-muted-foreground hover:text-gidib-green"
          >
            Esqueci minha senha
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tela de demonstração — a autenticação real via Supabase Auth entra
          quando o backend estiver conectado.
        </p>
      </div>
    </div>
  );
}
