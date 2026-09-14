"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="reveal is-visible flex flex-col items-center gap-3 rounded-xl border border-gidib-green/30 bg-gidib-green/5 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-gidib-green/10 text-gidib-green">
          <CheckCircle2 className="size-6" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Mensagem enviada com sucesso!
        </p>
        <p className="text-sm text-muted-foreground">
          Nossa equipe entrará em contato em breve.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-medium text-gidib-green underline-offset-4 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nome
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Seu nome"
            className="focus-visible:border-gidib-green"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            E-mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="focus-visible:border-gidib-green"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Assunto
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="Sobre o que você quer falar?"
          className="focus-visible:border-gidib-green"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Escreva sua mensagem..."
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-gidib-green focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <Button
        type="submit"
        className="btn-hero-primary mt-2 w-fit bg-gidib-green hover:bg-gidib-green-dark"
      >
        Enviar mensagem
      </Button>
    </form>
  );
}
