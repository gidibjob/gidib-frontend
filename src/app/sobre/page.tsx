import type { Metadata } from "next";
import Image from "next/image";
import { Cpu, Factory, Lightbulb, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a GIDIB — Grupo de Inovação e Desenvolvimento da Indústria Brasileira.",
};

const pillars = [
  {
    icon: Users,
    title: "Qualificação profissional",
    description: "Capacitando pessoas para o futuro da indústria.",
    accent: "bg-gidib-green/10 text-gidib-green",
  },
  {
    icon: Lightbulb,
    title: "Inovação e tecnologia",
    description: "Estimulando soluções para uma indústria mais competitiva.",
    accent: "bg-gidib-blue/10 text-gidib-blue",
  },
  {
    icon: Factory,
    title: "Desenvolvimento da indústria",
    description: "Conectando ideias, projetos e pessoas.",
    accent: "bg-gidib-yellow/15 text-gidib-navy",
  },
  {
    icon: Cpu,
    title: "Impacto social",
    description: "Contribuindo para uma sociedade mais preparada.",
    accent: "bg-gidib-navy/10 text-gidib-navy",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        title="Sobre a GIDIB"
        subtitle="Grupo de Inovação e Desenvolvimento da Indústria Brasileira."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Conhecimento, tecnologia e pessoas para uma indústria
              brasileira mais forte e sustentável.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              A GIDIB nasceu com o propósito de transformar o Brasil por meio
              da conscientização, qualificação e desenvolvimento dos
              profissionais da indústria verde e amarela. Acreditamos que
              conhecimento transforma pessoas, e pessoas transformam a
              indústria.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Reunimos conteúdo, eventos e iniciativas voltadas para
              inovação, tecnologia e desenvolvimento profissional, com foco
              em preparar a indústria brasileira para os desafios da
              Indústria 4.0.
            </p>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80"
              alt="Profissionais da indústria brasileira"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Nossos pilares
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, description, accent }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gidib-navy/10">
                  <div
                    className={`flex size-11 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${accent}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="text-center transition-transform duration-300 hover:-translate-y-1">
                <p className="text-3xl font-extrabold tabular-nums text-gidib-green">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
