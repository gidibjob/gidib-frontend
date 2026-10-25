"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const MEMBER_TYPES = [
  { value: "profissional", label: "Profissional da indústria" },
  { value: "estudante", label: "Estudante" },
  { value: "empresa", label: "Empresa / instituição" },
] as const;

const fieldClass =
  "w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function MembershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gidib-green/30 bg-gidib-green/5 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-gidib-green/10 text-gidib-green">
          <CheckCircle2 className="size-6" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Solicitação enviada com sucesso!
        </p>
        <p className="text-sm text-muted-foreground">
          Obrigado pelo interesse em fazer parte da GIDIB. Nossa equipe
          analisará seus dados e entrará em contato.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const text = (key: string) => String(data.get(key) ?? "").trim() || null;

        setSending(true);
        setError(null);
        const { error } = await createClient()
          .from("membership_requests")
          .insert({
            name: String(data.get("name")).trim(),
            email: String(data.get("email")).trim(),
            phone: text("phone"),
            member_type: String(data.get("member_type")),
            organization: text("organization"),
            job_title: text("job_title"),
            city: text("city"),
            message: text("message"),
            consent: data.get("consent") === "on",
          });
        setSending(false);
        if (error) {
          setError("Não foi possível enviar sua solicitação. Tente novamente.");
          return;
        }
        form.reset();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Nome completo">
          <Input id="name" name="name" required maxLength={200} />
        </Field>
        <Field id="email" label="E-mail">
          <Input id="email" name="email" type="email" required maxLength={320} />
        </Field>
        <Field id="phone" label="Telefone / WhatsApp">
          <Input id="phone" name="phone" type="tel" maxLength={40} />
        </Field>
        <Field id="member_type" label="Eu sou">
          <select
            id="member_type"
            name="member_type"
            required
            defaultValue="profissional"
            className={`${fieldClass} h-9`}
          >
            {MEMBER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="organization" label="Empresa / instituição">
          <Input id="organization" name="organization" maxLength={200} />
        </Field>
        <Field id="job_title" label="Cargo / curso">
          <Input id="job_title" name="job_title" maxLength={200} />
        </Field>
        <Field id="city" label="Cidade / UF">
          <Input id="city" name="city" maxLength={120} placeholder="São Paulo - SP" />
        </Field>
      </div>

      <Field id="message" label="Por que quer se associar? (opcional)">
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={3000}
          className={`${fieldClass} py-2`}
        />
      </Field>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 shrink-0 accent-gidib-green"
        />
        Concordo que a GIDIB use meus dados para analisar esta solicitação e
        entrar em contato comigo.
      </label>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="btn-hero-primary mt-2 w-fit bg-gidib-green hover:bg-gidib-green-dark"
      >
        {sending ? "Enviando..." : "Enviar solicitação"}
      </Button>
    </form>
  );
}
