import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Cpu,
  Factory,
  FileText,
  Lightbulb,
  Network,
  Users,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { EventCard } from "@/components/events/event-card";
import { events, posts, stats } from "@/lib/mock-data";

const statIcons = [Users, FileText, CalendarDays, Network];

const pillars = [
  {
    icon: Users,
    title: "Qualificação profissional",
    description:
      "Capacitando pessoas para o futuro da indústria.",
  },
  {
    icon: Lightbulb,
    title: "Inovação e tecnologia",
    description:
      "Estimulando soluções para uma indústria mais competitiva.",
  },
  {
    icon: Factory,
    title: "Desenvolvimento da indústria",
    description: "Conectando ideias, projetos e pessoas.",
  },
  {
    icon: Cpu,
    title: "Impacto social",
    description: "Contribuindo para uma sociedade mais preparada.",
  },
];

export default function Home() {
  const featuredPosts = posts.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80"
            alt="Profissional da indústria brasileira"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="hero-scrim absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl rounded-3xl bg-background/75 p-6 backdrop-blur-md sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Inovação, conhecimento</span>
              <span className="hero-gradient-text block">
                e pessoas para o futuro da indústria.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Transformando o Brasil por meio da conscientização,
              qualificação e desenvolvimento dos profissionais da indústria
              verde e amarela.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="btn-hero-primary w-full bg-gidib-green hover:bg-gidib-green-dark sm:w-auto"
              >
                Conheça a GIDIB
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-hero-outline w-full border-foreground/20 bg-background/70 backdrop-blur hover:border-gidib-green hover:text-gidib-green sm:w-auto"
              >
                Associe-se agora
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-6 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:pt-8">
              {[
                { icon: Cpu, label: "Tecnologia" },
                { icon: Users, label: "Pessoas" },
                { icon: Factory, label: "Desenvolvimento" },
                { icon: Lightbulb, label: "Indústria 4.0" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 shrink-0 text-gidib-green" />
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conteúdos em destaque */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Conteúdos que impulsionam a indústria brasileira
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
              Ver todos os conteúdos
            </Link>
          </div>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Próximos eventos
        </h2>
        <div className="mt-8 grid gap-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/eventos" className={buttonVariants({ variant: "outline" })}>
            Ver todos os eventos
          </Link>
        </div>
      </section>

      {/* Números */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-card">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Uma indústria brasileira mais preparada para o futuro.
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                A GIDIB promove iniciativas, conteúdos e parcerias que
                impulsionam o desenvolvimento da indústria com foco em
                pessoas, tecnologia e sustentabilidade.
              </p>
              <Button className="mt-6 bg-gidib-green hover:bg-gidib-green-dark">
                Saiba mais
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-background p-4 text-center"
                  >
                    <div className="mx-auto flex size-9 items-center justify-center rounded-lg bg-gidib-green/10 text-gidib-green">
                      <Icon className="size-4" />
                    </div>
                    <p className="mt-2 text-lg font-extrabold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
