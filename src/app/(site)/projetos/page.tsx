import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Conheça os projetos e iniciativas da GIDIB para o desenvolvimento da indústria brasileira.",
};

export const revalidate = 60;

export default async function ProjetosPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        title="Projetos"
        subtitle="Iniciativas que conectam ideias, projetos e pessoas para uma indústria mais forte."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {projects.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Em breve novos projetos por aqui.
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
