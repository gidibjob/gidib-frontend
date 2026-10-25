"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function resetPassword() {
    setError(null);
    setNotice(null);
    if (!email) {
      setError("Informe seu e-mail para receber o link de redefinição.");
      return;
    }
    const { error } = await createClient().auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setNotice("Enviamos um link de redefinição para o seu e-mail.");
  }

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
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            setNotice(null);
            const { error } = await createClient().auth.signInWithPassword({
              email,
              password,
            });
            if (error) {
              setError("E-mail ou senha inválidos.");
              setLoading(false);
              return;
            }
            router.replace("/admin");
            router.refresh();
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pr-10 focus-visible:border-gidib-green"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
                className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="text-sm text-gidib-green">
              {notice}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="btn-hero-primary mt-2 bg-gidib-green hover:bg-gidib-green-dark"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <button
            type="button"
            onClick={resetPassword}
            className="text-center text-sm text-muted-foreground hover:text-gidib-green"
          >
            Esqueci minha senha
          </button>
        </form>

      </div>
    </div>
  );
}
