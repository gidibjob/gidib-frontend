import type { Metadata } from "next";
import Image from "next/image";
import { Cpu, Factory, History, Lightbulb, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/mock-data";

const values = [
  "Conhecimento, Competência, Conteúdo",
  "Altruísmo",
  "Pioneirismo",
  "Profissionalismo",
  "Valorização e respeito às pessoas",
  "Responsabilidade social",
  "Ética e Integridade",
  "Inovação e Tecnologia",
  "Colaboração e Credibilidade",
];

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
            <h2 className="text-h2 text-foreground">
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

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80"
            alt="Engenharia e tecnologia industrial"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gidib-navy/85" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto block h-0.5 w-10 bg-gidib-green" />
          <p className="mt-4 text-base text-white/80">
            Saiba mais sobre nossos ideais e onde queremos chegar.
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6 text-left">
            <Reveal delay={0}>
              <div className="h-full rounded-xl bg-background p-8 shadow-xl">
                <h3 className="text-center text-xl font-bold text-foreground">
                  Missão
                </h3>
                <p className="mt-3 text-center text-base text-muted-foreground">
                  Contribuir para com a sociedade brasileira, promovendo
                  debates sobre temas e tendências relevantes e atuais da
                  tecnologia para proporcionar evolução e crescimento dos
                  profissionais e estudantes brasileiros.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-xl bg-background p-8 shadow-xl">
                <h3 className="text-center text-xl font-bold text-foreground">
                  Visão
                </h3>
                <p className="mt-3 text-center text-base text-muted-foreground">
                  Ser um grupo de excelência no apoio à inovação e tecnologia
                  nas organizações e qualificação dos profissionais
                  brasileiros.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-xl bg-background p-8 shadow-xl">
                <h3 className="text-center text-xl font-bold text-foreground">
                  Valores
                </h3>
                <ul className="mt-4 gap-x-10 space-y-2 text-base text-muted-foreground sm:columns-2">
                  {values.map((value) => (
                    <li key={value} className="flex gap-2 break-inside-avoid">
                      <span className="text-gidib-green">•</span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-h2 text-gidib-yellow">
          Nossa História
        </h2>
        <div className="mx-auto mt-4 flex size-10 items-center justify-center rounded-full bg-gidib-yellow/10 text-gidib-yellow">
          <History className="size-5" />
        </div>

        <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            Fundado em 2017, em São Paulo, e idealizado pelo membro Cleiton
            Leite Souza, o{" "}
            <strong className="text-foreground">
              Grupo de Inovação e Desenvolvimento da Indústria Brasileira
              (GIDIB)
            </strong>
            , busca desenvolver ações socio inovadoras para contribuir
            ativamente no desenvolvimento das pessoas, criando uma atmosfera
            de conhecimento compartilhado.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Fruto de uma rede de parcerias entre os membros e suas
            respectivas empresas, instituições de ensino e associações, há
            um forte auxílio no fomento de novos projetos e iniciativas, em
            prol de um Brasil mais competitivo e sustentável.
          </p>
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-h2 text-foreground">
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
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
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
