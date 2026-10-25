import type { Metadata } from "next";
import { Lightbulb, Network, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { MembershipForm } from "./membership-form";

export const metadata: Metadata = {
  title: "Associe-se",
  description:
    "Faça parte da GIDIB e conecte-se a profissionais, ideias e projetos que impulsionam a indústria brasileira.",
};

const benefits = [
  {
    icon: Users,
    title: "Qualificação profissional",
    description:
      "Acesso a conteúdos, workshops e debates para o seu crescimento na indústria.",
  },
  {
    icon: Network,
    title: "Rede de contatos",
    description:
      "Conecte-se com profissionais, estudantes e empresas do setor industrial.",
  },
  {
    icon: Lightbulb,
    title: "Inovação e projetos",
    description:
      "Participe de iniciativas que levam tecnologia e inovação à indústria brasileira.",
  },
];

export default function AssocieSePage() {
  return (
    <>
      <PageHero
        title="Associe-se"
        subtitle="Faça parte do grupo que conecta ideias, projetos e pessoas para uma indústria mais forte."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-h3 text-foreground">Por que se associar?</h2>
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-h3 text-foreground">Quero me associar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha os dados abaixo. Nossa equipe analisa a solicitação e
              entra em contato.
            </p>
            <div className="mt-6">
              <MembershipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
