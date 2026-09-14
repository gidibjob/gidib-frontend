import Image from "next/image";
import Link from "next/link";
import { Cpu, Factory, Lightbulb, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { EventCard } from "@/components/events/event-card";
import { events, posts, stats } from "@/lib/mock-data";

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
      <section className="relative overflow-hidden bg-background">
        <div className="hero-glow pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="relative z-10">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Grupo de Inovação e Desenvolvimento da Indústria Brasileira
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Inovação, conhecimento</span>
              <span className="hero-gradient-text block">
                e pessoas para o futuro da indústria.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Transformando o Brasil por meio da conscientização,
              qualificação e desenvolvimento dos profissionais da indústria
              verde e amarela.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="btn-hero-primary bg-gidib-green hover:bg-gidib-green-dark"
              >
                Conheça a GIDIB
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-hero-outline hover:border-gidib-green hover:text-gidib-green"
              >
                Associe-se agora
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-8">
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
                  <Icon className="size-4 text-gidib-green" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-xl shadow-gidib-navy/10 lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=80"
                alt="Profissional da indústria brasileira"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-xl backdrop-blur sm:block">
              <p className="text-2xl font-extrabold text-gidib-green">
                {stats[0].value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stats[0].label}
              </p>
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
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Uma indústria brasileira mais preparada para o futuro.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            A GIDIB promove iniciativas, conteúdos e parcerias que impulsionam
            o desenvolvimento da indústria com foco em pessoas, tecnologia e
            sustentabilidade.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-extrabold text-gidib-green">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button className="bg-gidib-green hover:bg-gidib-green-dark">
              Saiba mais
            </Button>
          </div>
        </div>
      </section>

      {/* CTA institucional */}
      <section className="bg-gidib-navy py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-xl font-semibold italic">
            &ldquo;Conhecimento transforma pessoas. Pessoas transformam a
            indústria.&rdquo;
          </p>
          <Button className="bg-gidib-yellow text-gidib-navy hover:bg-gidib-yellow/90">
            Conheça a GIDIB
          </Button>
        </div>
      </section>
    </>
  );
}
