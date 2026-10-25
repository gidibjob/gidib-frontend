import type { Metadata } from "next";
import { RemoteImage } from "@/components/remote-image";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Conheça os projetos e iniciativas da GIDIB para o desenvolvimento da indústria brasileira.",
};

export const revalidate = 60;

const projectCategoryClass: Record<string, string> = {
  Qualificação: "bg-gidib-green text-white",
  Inovação: "bg-gidib-blue text-white",
  Sustentabilidade: "bg-gidib-green-dark text-white",
};

export default async function ProjetosPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Iniciativas que conectam ideias, projetos e pessoas para uma indústria mais forte."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gidib-green/40 hover:shadow-xl hover:shadow-gidib-navy/10">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <RemoteImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <Badge
                    className={`w-fit hover:opacity-100 ${
                      projectCategoryClass[project.category] ??
                      "bg-gidib-navy text-white"
                    }`}
                  >
                    {project.category.toUpperCase()}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-gidib-green">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
